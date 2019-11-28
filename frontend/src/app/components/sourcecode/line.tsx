import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';
import * as React from 'react';
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
  if (tokens.length === 0) {
    return [<span key={props.line + "s"}> </span>];
  }
  const result: React.ReactElement[] = [];
  let preEndColumn = 0;
  let spaceId = 99999;

  for (const token of tokens) {
    const startColumn = token.startColumn!;
    const endColumn = token.endColumn!;
    const delta = startColumn - preEndColumn - 1;
    if (delta > 0) {
      result.push(<Space key={spaceId++} length={delta} />);
    }

    const valueList = data.find(token.id);
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
    preEndColumn = endColumn;
  }

  return result;
}

interface LineNumberProps {
  number: number;
}

const LineNumber: React.FunctionComponent<LineNumberProps> = (props) => (
  <span
    style={{
      display: 'inline-block',
      color: 'gray',
      textAlign: 'right',
      fontSize: 10,
      width: 32,
      marginRight: 8
    }}
  >
    {props.number}
  </span>
);

export const Line: React.FunctionComponent<Props> = (props, ref) => {
  return (
    <div>
      <LineNumber key={props.line} number={props.line} />
      <span style={{ display: 'inline', fontSize: 12 }}>{spreadTokens(props)}</span>
    </div>
  );
};
