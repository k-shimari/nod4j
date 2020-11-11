import * as React from 'react';
import { Line } from './line';
import { VarInfo } from 'app/models/varListData';

interface Props {
  data: VarInfo[];
}
/**
 * @param props 
 * This function displays the variable information for the Line component units.
 */
export function JsonLogs(props: Props) {
  const { data } = props;
  return (
    <div>
      <pre>
        <code>
          {data.map((data,index) => (
            <Line
              key={index+1}
              data={data}
            >
            </Line>
          ))}
        </code>
      </pre>
    </div>
  );
}
