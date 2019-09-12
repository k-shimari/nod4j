import { LogvisActions } from 'app/actions';
import { ValueListItemData } from 'app/components/organisms/valueList';
import { LogvisApi, ProjectInfo } from 'app/models/api';
import * as JavaLexer from 'app/models/javaLexer';
import { ProjectItemFileModel, ProjectModel } from 'app/models/project';
import { SharedEventModel } from 'app/models/sharedEvent';
import { SourceCodeToken } from 'app/models/token';
import { VarInfo, VarListDataModel, VarListJsonData } from 'app/models/varListData';
import { VarValueData } from 'app/models/varValueData';
import { RootState } from 'app/reducers';
import { TimeStampRangeFilter, TimestampRangeFilterContext } from 'app/reducers/state';
import { store } from 'app/store';
import * as _ from 'lodash';
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';
import { ProjectManager } from 'app/models/projectManager';

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
  const { projectName, directory } = action.payload!;

  const project: ProjectModel | undefined = yield call(() =>
    new LogvisApi().fetchFileInfo(projectName)
  );
  if (!project) {
    throw new Error('Unknown project: ' + projectName);
  }

  const items = project.getItems(directory);

  // ロードしているっぽく見せるためにわざと時間差をつけている
  yield delay(300);
  yield put(
    LogvisActions.setFilesData({
      dirs: directory,
      items
    })
  );
}

function* requestValueListFilterChange(
  action: ReturnType<typeof LogvisActions.requestValueListFilterChange>
) {
  const { projectName, kind, context, preferNotify } = action.payload!;

  // contextが同じであれば更新の必要はない
  const s: TimeStampRangeFilter = yield select((state: RootState) => state.logvis.filter.range);
  if (kind === 'left' && _.isEqual(context, s.left)) return;
  if (kind === 'right' && _.isEqual(context, s.right)) return;

  yield put(LogvisActions.setValueListFilter({ kind, context }));

  // localStorageに保存することによってフィルターの変更を通知する
  if (preferNotify) {
    const sharedEvent = new SharedEventModel(projectName);
    sharedEvent.notifyFilterChanged(kind, context);
  }

  const state: RootState = yield select();
  const original = state.logvis.originalValueListData;
  const filtered = original.filterByRange(state.logvis.filter.range);

  yield put(LogvisActions.setFilteredValueListData({ data: filtered }));
}

function* requestSourceCodeData(action: ReturnType<typeof LogvisActions.requestSourceCodeData>) {
  const { projectName, target } = action.payload!;
  const { dirs, file } = target;

  const api = new LogvisApi();
  const project: ProjectModel | undefined = yield call(() => api.fetchFileInfo(projectName));
  if (!project) {
    throw new Error('Unknown project: ' + projectName);
  }

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

  const varListJsonData: VarListJsonData = yield call(() => api.fetchVarInfo(projectName));
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

function* clearLocalStorage() {
  yield call(() => SharedEventModel.clearAllData());
  console.debug('Cleared local storage');
}

function* loadInitialValueListFilter(
  action: ReturnType<typeof LogvisActions.loadInitialValueListFilter>
) {
  const { projectName } = action.payload!;
  const timestampFilter: TimeStampRangeFilter = yield call(() => {
    const sharedEvent = new SharedEventModel(projectName);
    return sharedEvent.loadData();
  });
  const { left, right } = timestampFilter;
  yield put(
    LogvisActions.requestValueListFilterChange({ projectName, kind: 'left', context: left })
  );
  yield put(
    LogvisActions.requestValueListFilterChange({ projectName, kind: 'right', context: right })
  );
}

function initViewPage(action: ReturnType<typeof LogvisActions.initViewPage>) {
  const { projectName } = action.payload!;

  const sharedEvent = new SharedEventModel(projectName);
  sharedEvent.startWatching();
  sharedEvent.subscribeFilterChange((args) => {
    const { kind, newValue } = args;

    const context = newValue as TimestampRangeFilterContext;
    store.dispatch(LogvisActions.requestValueListFilterChange({ projectName, kind, context }));
  });
}

function* requestProjects() {
  const manager = new ProjectManager();
  const projects: ProjectInfo[] = yield call(() => manager.getAllProjects());
  yield put(LogvisActions.setProjects({ projects }));
}

function* requestAddProject(action: ReturnType<typeof LogvisActions.requestAddProject>) {
  const { project } = action.payload!;
  const manager = new ProjectManager();
  const success: boolean = yield call(() => manager.addProject(project));
  if (success) {
    yield put(LogvisActions.addProject({ project }));
  }
}

function* requestRemoveProject(action: ReturnType<typeof LogvisActions.requestRemoveProject>) {
  const { project } = action.payload!;
  const manager = new ProjectManager();
  const success: boolean = yield call(() => manager.removeProject(project));
  if (success) {
    yield put(LogvisActions.removeProject({ project }));
  }
}

function* mySaga() {
  yield takeEvery(LogvisActions.dummyAction, dummyWorker);
  yield takeEvery(LogvisActions.requestFiles, requestFiles);
  yield takeEvery(LogvisActions.requestValueListFilterChange, requestValueListFilterChange);
  yield takeEvery(LogvisActions.requestSourceCodeData, requestSourceCodeData);
  yield takeEvery(LogvisActions.clearLocalStorage, clearLocalStorage);
  yield takeEvery(LogvisActions.loadInitialValueListFilter, loadInitialValueListFilter);
  yield takeEvery(LogvisActions.initViewPage, initViewPage);
  yield takeEvery(LogvisActions.requestProjects, requestProjects);
  yield takeEvery(LogvisActions.requestAddProject, requestAddProject);
  yield takeEvery(LogvisActions.requestRemoveProject, requestRemoveProject);
}

export default mySaga;
