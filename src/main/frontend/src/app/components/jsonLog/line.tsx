import * as React from 'react';
import { VarInfo } from 'app/models/varListData';

interface Props {
  data: VarInfo;
}

/**
 * @param props 
 * Return each value and inforation on the variable.
 */
export const Line: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.data.valueList.map((val, index) => (
        <div key={index + 1} style={{ fontSize: 12 }}>
          ID:{props.data.dataid}, Line:{props.data.linenum}, Variable:{props.data.var}, Seqnum:{val.timestamp}, Data:{val.data}
        </div>
      ))}
    </div>
  );
};
