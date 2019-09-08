import { LogvisActions } from 'app/actions';
import { ValueListItemData } from 'app/components/organisms/valueList';
import * as JavaLexer from 'app/models/javaLexer';
import { splitPathToDirs } from 'app/models/pathParser';
import { ProjectItemFileModel, ProjectModel } from 'app/models/project';
import { rawProjectJsonData } from 'app/models/rawProjectData';
import { varListJsonData } from 'app/models/rawVarListData';
import { SourceCodeToken } from 'app/models/token';
import { VarInfo, VarListDataModel, VarListJsonData } from 'app/models/varListData';
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

function createVarValueData(
  data: VarListJsonData,
  file: string,
  tokens: SourceCodeToken[]
): VarValueData {
  let result: any = {};
  const model = new VarListDataModel(data);
  const ds = model.getDataOfFile(file);
  for (const d of ds) {
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
  const { dirs } = splitPathToDirs('files', path);

  // itemsをproject modelから取得する

  const project = ProjectModel.loadFromJsonFile(rawProjectJsonData)!;
  const items = project.getItems(dirs);

  // ロードしているっぽく見せるためにわざと時間差をつけている
  yield delay(500);
  yield put(
    LogvisActions.setFilesData({
      dirs,
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

function* requestSourceCodeData(action: ReturnType<typeof LogvisActions.requestSourceCodeData>) {
  const { target } = action.payload!;
  const { dirs, file } = target;

  const project = ProjectModel.loadFromJsonFile(rawProjectJsonData)!;
  const requestedFile = project
    .getItems(dirs)
    .find<ProjectItemFileModel>(
      (x): x is ProjectItemFileModel => x.type === 'file' && x.name === file
    )!;

  const tokens = JavaLexer.tokenize(requestedFile.joinedContent);
  yield put(
    LogvisActions.SetSourceCodeData({
      tokens
    })
  );

  const varValueData = createVarValueData(varListJsonData, file, tokens);

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
