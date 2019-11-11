import { SourceCodeToken } from 'app/models/token';
import * as React from 'react';
import { interval, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';

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
          {data.map((data, index) => (
            <Line
              line={index + 1}
              data={data}
            >
            </Line>
          ))}
        </code>
      </pre>
    </div>
  );
}
