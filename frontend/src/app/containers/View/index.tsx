import { Sourcecode } from 'app/components/sourcecode';
import * as JavaLexer from 'app/models/javaLexer';
import { rawSourceCode } from 'app/models/rawSourceCode';
import { jsonData } from 'app/models/variable';
import * as React from 'react';

export class ViewContainer extends React.Component {
  render() {
    const tokens = JavaLexer.tokenize(rawSourceCode);
    return (
      <div>
        <Sourcecode tokens={tokens} data={{}} />
        {jsonData.data.map((x) => (
          <div>{x.var}</div>
        ))}
      </div>
    );
  }
}
