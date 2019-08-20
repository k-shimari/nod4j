import { SourceCodeToken } from 'app/models/token';
import * as React from 'react';
import { VarValueData } from './index';
import { Space } from './space';
import { Token } from './token';

interface Props {
  onTokenEnter?(tokenId: string, target: HTMLElement): void;
  onTokenLeave?(tokenId: string, target: HTMLElement): void;
  line: number;
  tokens: SourceCodeToken[];
  data: VarValueData;
}

function spreadTokens(props: Props): React.ReactElement[] {
  const { tokens, data, onTokenEnter, onTokenLeave } = props;

  const result: React.ReactElement[] = [];
  let preEndColumn = 0;
  for (const token of tokens) {
    const startColumn = token.startColumn!;
    const endColumn = token.endColumn!;

    const delta = startColumn - preEndColumn - 1;
    if (delta > 0) {
      result.push(<Space length={delta} />);
    }
    const valueList = data[token.id];
    const valueListExists = valueList !== undefined;
    result.push(
      <Token
        key={token.id}
        id={token.id}
        highlighted={valueListExists}
        data={valueList}
        onEnter={(id, target) => onTokenEnter && onTokenEnter(id, target)}
        onLeave={(id, target) => onTokenLeave && onTokenLeave(id, target)}
      >
        {token.image}
      </Token>
    );

    preEndColumn = endColumn!;
  }

  return result;
}

export const Line: React.FunctionComponent<Props> = (props) => (
  <span style={{ display: 'block' }}>{spreadTokens(props)}</span>
);
