import * as React from 'react';
import { VarInfo } from 'app/models/varListData';
interface Props {
  line: number;
  data: VarInfo; 
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
      <LineNumber number={props.line} />
      <span style={{ display: 'inline', fontSize: 12 }}>
        ID:{props.data.dataid}, L:{props.data.linenum}, var:{props.data.var}
        {/* TODO
        , value:{props.data.values}
        */}
      </span>
    </div>
  );
};
