import { LogvisActions } from 'app/actions';
import { ValueListItem } from 'app/components/organisms/valueList';
import { VarValueData } from 'app/components/sourcecode';
import * as JavaLexer from 'app/models/javaLexer';
import { parseFilesPath } from 'app/models/pathParser';
import { ProjectModel } from 'app/models/project';
import { rawSourceCode } from 'app/models/rawSourceCode';
import { SourceCodeToken } from 'app/models/token';
import { JsonData, jsonData, VarInfo } from 'app/models/variable';
import { delay, put, takeEvery } from 'redux-saga/effects';

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

function* requestFiles(action: ReturnType<typeof LogvisActions.requestFiles>) {
  const { path } = action.payload!;
  console.log('Path: ' + path);

  // pathを操作してcurrentDirとparentDirに分離する
  const { parentDirs, currentDir } = parseFilesPath(path);

  // itemsをproject modelから取得する
  const project = new ProjectModel();
  const items = project.getItems(parentDirs.join('/'));

  // ロードしているっぽく見せるためにわざと時間差をつけている
  yield delay(500);
  yield put(
    LogvisActions.setFilesData({
      parentDirs,
      currentDir,
      items
    })
  );
}

function* requestValueListFilterChange(
  action: ReturnType<typeof LogvisActions.requestValueListFilterChange>
) {
  const { kind, execId } = action.payload!;

  yield put(LogvisActions.setValueListFilter({ kind, execId }));
  const tokens = JavaLexer.tokenize(rawSourceCode);
  const varValueData = createVarValueData(jsonData, tokens);

  yield put(LogvisActions.setFilteredValueListData({ data: varValueData }));
}

function* dummyWorker() {
  yield put(LogvisActions.dummyAction());
}

function* mySaga() {
  yield takeEvery(LogvisActions.dummyAction, dummyWorker);
  yield takeEvery(LogvisActions.requestFiles, requestFiles);
  yield takeEvery(LogvisActions.requestValueListFilterChange, requestValueListFilterChange);
}

export default mySaga;
