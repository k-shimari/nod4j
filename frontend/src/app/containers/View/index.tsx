import { ValueListItem } from 'app/components/organisms/valueList';
import { Sourcecode, VarValueData } from 'app/components/sourcecode';
import * as JavaLexer from 'app/models/javaLexer';
import { rawSourceCode } from 'app/models/rawSourceCode';
import { SourceCodeToken } from 'app/models/token';
import { jsonData, JsonData, VarInfo } from 'app/models/variable';
import * as React from 'react';

function computeTokenId(variable: VarInfo, tokens: SourceCodeToken[]): string {
  const { linenum, count, var: varName } = variable;
  const match = tokens.filter((x) => x.startLine === Number(linenum) && x.image === varName);

  if (count > match.length) {
    throw new Error('Impossible');
  }
  const id = match[count - 1].id;
  return id;
}

function createVarValueData(data: JsonData, tokens: SourceCodeToken[]): VarValueData {
  let result: any = {};
  for (const d of data.data) {
    const item: ValueListItem[] = d.valueList.map((x, index) => ({
      id: index.toString(),
      value: x.data
    }));

    const id = computeTokenId(d, tokens);
    result[id] = item;
  }

  return result;
}

export class ViewContainer extends React.Component {
  render() {
    const tokens = JavaLexer.tokenize(rawSourceCode);
    const varValueData = createVarValueData(jsonData, tokens);
    return (
      <div>
        <Sourcecode tokens={tokens} data={varValueData} />
      </div>
    );
  }
}
