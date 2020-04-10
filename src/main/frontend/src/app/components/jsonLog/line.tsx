import * as React from 'react';
import { VarInfo } from 'app/models/varListData';

interface Props {
  data: VarInfo;
}

export const Line: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.data.valueList.map((val, index) => (
        <div key={index + 1} style={{ fontSize: 12 }}>
          ID:{props.data.dataid}, Line:{props.data.linenum}, Variable:{props.data.var}, Timestamp:{val.timestamp}, Data:{val.data}
        </div>
      ))}
    </div>
  );
};
