import * as React from 'react';
import { VarInfo } from 'app/models/varListData';

interface Props {
  data: VarInfo;
}

export const Line: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.data.valueList.map((val) => (
        <div style={{ fontSize: 12 }}>
          ID:{props.data.dataid}, L:{props.data.linenum}, var:{props.data.var}, (T:{val.timestamp}, D:{val.data})
        </div>
      ))}
    </div>
  );
};
