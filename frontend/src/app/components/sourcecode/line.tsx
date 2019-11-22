import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';
import * as React from 'react';
import { Space } from './space';
import { Token } from './token';
import { Comment } from './Comment';

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
    if (Object.prototype.hasOwnProperty.call(token, "leadingComments")) {
      console.log("lc: " + props.line);
      result.push(
        <Comment
          key={token.id + "lc"}
          comments={Object.values(token)[Object.getOwnPropertyNames(token).length - 1]}
          id={token.id}
        >
        </Comment>
      );
    }
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
    if (Object.prototype.hasOwnProperty.call(token, "trailingComments")) {
      console.log("tc: " + props.line);
      console.log(Object.getOwnPropertyNames(token));
      result.push(
        <Comment
          key={token.id + "tc"}
          comments={Object.values(token)[Object.getOwnPropertyNames(token).length - 1]}
          id={token.id}
        >
        </Comment>
      );
    }
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

export const Line: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      <LineNumber key={props.line} number={props.line} />
      <span style={{ display: 'inline', fontSize: 12 }}>{spreadTokens(props)}</span>
    </div>
  );
};
