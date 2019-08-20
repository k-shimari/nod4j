import { SourceCodeToken } from 'app/models/token';
import * as React from 'react';
import { ValueListItemValue } from '../atoms/valueListItem';
import { ValueListItem, ValueList } from '../organisms/valueList';
import { Line } from './line';
import { Popper, Paper } from '@material-ui/core';
import { timingSafeEqual } from 'crypto';

export type VarValueData = { [varId: string]: ValueListItem[] | undefined };

interface Props {
  tokens: SourceCodeToken[];
  data: VarValueData;
}

function groupTokensByLine(tokens: SourceCodeToken[]): SourceCodeToken[][] {
  const lineCount = tokens[tokens.length - 1].startLine!;
  const result: SourceCodeToken[][] = Array.from({ length: lineCount }, (v, k) => k).map(() => []);

  for (const token of tokens) {
    result[token.startLine! - 1].push(token);
  }

  return result;
}

interface State {
  data: ValueListItem[] | undefined;
  valueListVisible: boolean;
  popperAnchorEl: HTMLElement | undefined;
}

export class Sourcecode extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);

    this.state = {
      data: undefined,
      valueListVisible: false,
      popperAnchorEl: undefined
    };
  }

  onTokenEnter(tokenId: string, target: HTMLElement) {
    // ここでpopper.jsを使ってValueListコンポーネントを描画する
    console.log('On token enter: ' + tokenId);
    const valueListData = this.props.data[tokenId];
    if (valueListData) {
      this.setState({
        data: valueListData,
        valueListVisible: true,
        popperAnchorEl: target
      });
    }
  }

  onTokenLeave(tokenId: string, target: HTMLElement) {
    console.log('On token leave: ' + tokenId);
    this.setState({
      valueListVisible: false,
      popperAnchorEl: target
    });
  }

  render() {
    const { tokens, data } = this.props;

    return (
      <div>
        <pre>
          <code>
            {groupTokensByLine(tokens).map((lineTokens, index) => (
              <Line
                key={index}
                tokens={lineTokens}
                line={1}
                data={data}
                onTokenEnter={this.onTokenEnter.bind(this)}
                onTokenLeave={this.onTokenLeave.bind(this)}
              />
            ))}
          </code>
        </pre>
        <Popper
          open={this.state.valueListVisible}
          anchorEl={this.state.popperAnchorEl}
          placement="bottom"
        >
          {this.state.data ? <ValueList items={this.state.data} /> : null}
        </Popper>
      </div>
    );
  }
}
