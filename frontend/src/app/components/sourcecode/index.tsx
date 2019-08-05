import { SourceCodeToken } from 'app/models/token';
import * as React from 'react';
import { ValueListItemValue } from '../atoms/valueListItem';
import { ValueListItem } from '../organisms/valueList';
import { Line } from './line';

export type VarValueData = { [varId: string]: ValueListItem[] };

interface Props {
  tokens: SourceCodeToken[];
  data: VarValueData;
}

function splitIntoLines(tokens: SourceCodeToken[]): SourceCodeToken[][] {
  const lineCount = tokens[tokens.length - 1].startLine!;
  const result: SourceCodeToken[][] = Array.from({ length: lineCount }, (v, k) => k).map(() => []);

  for (const token of tokens) {
    result[token.startLine! - 1].push(token);
  }

  return result;
}

export class Sourcecode extends React.Component<Props> {
  render() {
    const { tokens, data } = this.props;

    return (
      <pre>
        <code>
          {splitIntoLines(tokens).map((lineTokens, index) => (
            <Line key={index} tokens={lineTokens} line={1} data={data} />
          ))}
        </code>
      </pre>
    );
  }
}
