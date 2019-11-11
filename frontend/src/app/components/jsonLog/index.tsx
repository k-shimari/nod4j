import * as React from 'react';
import { Line } from './line';
import { VarInfo } from 'app/models/varListData';

interface Props {
  data: VarInfo[];
}

export function JsonLogs(props: Props) {
  const { data } = props;


  return (
    <div>
      <pre>
        <code>
          {data.map((data) => (
            <Line
              data={data}
            >
            </Line>
          ))}
        </code>
      </pre>
    </div>
  );
}
