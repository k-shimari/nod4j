import { LogvisActions } from 'app/actions';
import { ValueListItemData } from 'app/components/organisms/valueList';
import * as JavaLexer from 'app/models/javaLexer';
import { parsePath } from 'app/models/pathParser';
import { ProjectModel } from 'app/models/project';
import { rawSourceCode } from 'app/models/rawSourceCode';
import { SourceCodeToken } from 'app/models/token';
import { JsonData, jsonData, VarInfo } from 'app/models/variable';
import { VarValueData } from 'app/models/varValueData';
import { RootState } from 'app/reducers';
import { delay, put, select, takeEvery } from 'redux-saga/effects';

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
    const item: ValueListItemData[] = d.valueList.map((x, index) => ({
      id: index.toString(),
      value: x.data,
      timestamp: x.timestamp
    }));

    const id = computeTokenId(d, tokens);
    result[id] = item;
  }

  return new VarValueData(result);
}

function* requestFiles(action: ReturnType<typeof LogvisActions.requestFiles>) {
  const { path } = action.payload!;
  console.log('Path: ' + path);

  // pathを操作してcurrentDirとparentDirに分離する
  const { parentDirs, currentDir } = parsePath('files', path);

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
  const { kind, context } = action.payload!;
  if (context) {
    yield put(LogvisActions.setValueListFilter({ kind, context }));
  } else {
    yield put(LogvisActions.removeValueListFilter({ kind }));
  }

  const state: RootState = yield select();
  const original = state.logvis.originalValueListData;
  const filtered = original.filterByRange(state.logvis.filter.range);

  yield put(LogvisActions.setFilteredValueListData({ data: filtered }));
}

function* requestSourceCodeData() {
  const tokens = JavaLexer.tokenize(rawSourceCode);
  yield put(
    LogvisActions.SetSourceCodeData({
      tokens
    })
  );

  const varValueData = createVarValueData(jsonData, tokens);

  yield put(
    LogvisActions.setOriginalValueListData({
      data: varValueData
    })
  );
  yield put(
    LogvisActions.setFilteredValueListData({
      data: varValueData
    })
  );
}

function* dummyWorker() {
  yield put(LogvisActions.dummyAction());
}

function* mySaga() {
  yield takeEvery(LogvisActions.dummyAction, dummyWorker);
  yield takeEvery(LogvisActions.requestFiles, requestFiles);
  yield takeEvery(LogvisActions.requestValueListFilterChange, requestValueListFilterChange);
  yield takeEvery(LogvisActions.requestSourceCodeData, requestSourceCodeData);
}

export default mySaga;
