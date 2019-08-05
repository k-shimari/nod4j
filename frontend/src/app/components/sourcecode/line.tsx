import { SourceCodeToken } from 'app/models/token';
import * as React from 'react';
import { HighlightedToken } from './highlightedToken';
import { VarValueData } from './index';
import { Space } from './space';
import { Token } from './token';

interface Props {
  line: number;
  tokens: SourceCodeToken[];
  data: VarValueData;
}

function f(tokens: SourceCodeToken[], data: VarValueData): React.ReactElement[] {
  const result: React.ReactElement[] = [];
  let preEndColumn = 0;
  for (const token of tokens) {
    const startColumn = token.startColumn!;
    const endColumn = token.endColumn!;

    const delta = startColumn - preEndColumn - 1;
    if (delta > 0) {
      result.push(<Space length={delta} />);
    }
    // ここでチェックして、トークンんを切り替える
    const valueList = data[token.id];
    if (valueList) {
      result.push(<HighlightedToken items={valueList} >{token.image}</HighlightedToken>);
    } else {
      result.push(<Token>{token.image}</Token>);
    }

    preEndColumn = endColumn!;
  }

  return result;
}

export const Line: React.FunctionComponent<Props> = (props) => (
  <span style={{ display: 'block' }}>{f(props.tokens, props.data)}</span>
);
