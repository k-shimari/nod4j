import { IToken } from 'chevrotain';
import * as React from 'react';
import { Line } from './line';

interface Props {
  tokens: IToken[];
}

function splitIntoLines(tokens: IToken[]): IToken[][] {
  const lineCount = tokens[tokens.length - 1].startLine!;
  const result: IToken[][] = Array.from({ length: lineCount }, (v, k) => k).map(() => []);

  for (const token of tokens) {
    result[token.startLine! - 1].push(token);
  }

  return result;
}

export class Sourcecode extends React.Component<Props> {
  render() {
    const { tokens } = this.props;

    return (
      <pre>
        <code>
          {splitIntoLines(tokens).map((lineTokens, index) => (
            <Line key={index} tokens={lineTokens} line={1} />
          ))}
        </code>
      </pre>
    );
  }
}
