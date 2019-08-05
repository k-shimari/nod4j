import { IToken } from 'chevrotain';
import * as React from 'react';
import { Space } from './space';
import { Token } from './token';

interface Props {
  line: number;
  tokens: IToken[];
}

function f(tokens: IToken[]): React.ReactElement[] {
  const result: React.ReactElement[] = [];
  let preEndColumn = 0;
  for (const token of tokens) {
    const startColumn = token.startColumn!;
    const endColumn = token.endColumn!;

    const delta = startColumn - preEndColumn - 1;
    if (delta > 0) {
      result.push(<Space length={delta} />);
    }

    result.push(<Token>{token.image}</Token>);

    preEndColumn = endColumn!;
  }

  return result;
}

export const Line: React.FunctionComponent<Props> = (props) => (
  <span style={{ display: 'block' }}>{f(props.tokens)}</span>
);
