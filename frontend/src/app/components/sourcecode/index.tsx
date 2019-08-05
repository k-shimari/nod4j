import { IToken } from 'chevrotain';
import * as React from 'react';
import { Token } from './token';

interface Props {
  tokens: IToken[];
}

export class Sourcecode extends React.Component<Props> {
  render() {
    const { tokens } = this.props;

    return (
      <div>
        {tokens.map((t, index) => (
          <Token key={index}>{t.image}</Token>
        ))}
      </div>
    );
  }
}
