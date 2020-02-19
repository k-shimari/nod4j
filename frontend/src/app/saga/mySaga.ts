import { nod3vActions } from 'app/actions';
import { ValueListItemData } from 'app/components/organisms/valueList';
import { nod3vApi, ProjectInfo } from 'app/models/api';
import * as JavaLexer from 'app/models/javaLexer';
import { ProjectItemFileModel, ProjectModel } from 'app/models/project';
import { ProjectManager } from 'app/models/projectManager';
import { SharedEventModel } from 'app/models/sharedEvent';
import { SourceCodeToken } from 'app/models/token';
import { VarInfo, VarListDataModel, VarListJsonData } from 'app/models/varListData';
import { VarValueData } from 'app/models/varValueData';
import { RootState } from 'app/reducers';
import { TimeStampRangeFilter, TimestampRangeFilterContext } from 'app/reducers/state';
import { store } from 'app/store';
import * as _ from 'lodash';
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';


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

    try {
      const tokenId = computeTokenId(d, tokens);
      result[tokenId] = item;
    } catch (e) {
      // ignore
    }
  }

  return new VarValueData(result);
}


function* requestFiles(action: ReturnType<typeof nod3vActions.requestFiles>) {
  const { projectName, directory } = action.payload!;

  const project: ProjectModel | undefined = yield call(() =>
    new nod3vApi().fetchFileInfo(projectName)
  );
  if (!project) {
    throw new Error('Unknown project: ' + projectName);
  }

  const items = project.getItems(directory);

  // ロードしているっぽく見せるためにわざと時間差をつけている
  yield delay(300);
  yield put(
    nod3vActions.setFilesData({
      dirs: directory,
      items
    })
  );
}

function* requestValueListFilterChange(
  action: ReturnType<typeof nod3vActions.requestValueListFilterChange>
) {
  const { projectName, kind, context, preferNotify } = action.payload!;

  // contextが同じであれば更新の必要はない
  const s: TimeStampRangeFilter = yield select((state: RootState) => state.nod3v.filter.range);
  if (kind === 'left' && _.isEqual(context, s.left)) return;
  if (kind === 'right' && _.isEqual(context, s.right)) return;

  yield put(nod3vActions.setValueListFilter({ kind, context }));

  // localStorageに保存することによってフィルターの変更を通知する
  if (preferNotify) {
    const sharedEvent = new SharedEventModel(projectName);
    sharedEvent.notifyFilterChanged(kind, context);
  }

  const state: RootState = yield select();
  const original = state.nod3v.originalValueListData;
  const filtered = original.filterByRange(state.nod3v.filter.range);

  yield put(nod3vActions.setFilteredValueListData({ data: filtered }));
}

function* requestSourceCodeData(action: ReturnType<typeof nod3vActions.requestSourceCodeData>) {
  const { projectName, target } = action.payload!;
  const { dirs, file } = target;
  let filepath;

  console.log(dirs.slice(0, 3).join("/"))
  if (dirs.length >= 3 && (dirs.slice(0, 3).join("/") === "src/main/java" || dirs.slice(0, 3).join("/") === "src/test/java" || dirs.slice(0, 3).join("/") === "test/main/java"|| dirs.slice(0, 3).join("/") === "tests/main/java")) {
    filepath = dirs.slice(3).join("/") + "/" + file;
  } else if (dirs.length >= 1 && (dirs[0] === "src" || dirs[0] === "source" || dirs[0] === "sources" || dirs[0] === "test" || dirs[0] === "tests")) {
    filepath = dirs.slice(1).join("/") + "/" + file;
  } else {
    filepath = dirs.join("/") + "/" + file
  }

  const api = new nod3vApi();
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
    nod3vActions.SetSourceCodeData({
      tokens
    })
  );

  const varListJsonData: VarListJsonData = yield call(() => api.fetchVarInfo(projectName));
  const varValueData = createVarValueData(varListJsonData, filepath, tokens);

  yield put(
    nod3vActions.setOriginalValueListData({
      data: varValueData
    })
  );
  yield put(
    nod3vActions.setFilteredValueListData({
      data: varValueData
    })
  );
}


function* requestJson(action: ReturnType<typeof nod3vActions.requestJson>) {
  const { projectName, target } = action.payload!;
  const { dirs, file } = target;
  const api = new nod3vApi();

  let filepath;

  console.log(dirs.slice(0, 3).join("/"))
  if (dirs.length >= 3 && (dirs.slice(0, 3).join("/") === "src/main/java" || dirs.slice(0, 3).join("/") === "src/test/java" || dirs.slice(0, 3).join("/") === "test/main/java")) {
    filepath = dirs.slice(3).join("/") + "/" + file;
  } else if (dirs.length >= 1 && (dirs[0] === "src" || dirs[0] === "test")) {
    filepath = dirs.slice(1).join("/") + "/" + file;
  } else {
    filepath = dirs.join("/") + "/" + file
  }

  const varListJsonData: VarListJsonData = yield call(() => api.fetchVarInfo(projectName));
  const model = new VarListDataModel(varListJsonData);


  const ds = model.getDataOfFile(filepath);

  console.log("-----------s");
  //console.log("json:");
  //console.log(varListJsonData);
  console.log("model:");
  console.log(model);
  console.log("filepath:");
  console.log(filepath);
  console.log("ds:");
  console.log(ds);
  console.log("-----------e");
  yield put(
    nod3vActions.setVarListJsonData({
      data: ds
    })
  );
}


function* dummyWorker() {
  yield put(nod3vActions.dummyAction());
}

function* clearLocalStorage() {
  yield call(() => SharedEventModel.clearAllData());
  console.debug('Cleared local storage');
}

function* loadInitialValueListFilter(
  action: ReturnType<typeof nod3vActions.loadInitialValueListFilter>
) {
  const { projectName } = action.payload!;
  const timestampFilter: TimeStampRangeFilter = yield call(() => {
    const sharedEvent = new SharedEventModel(projectName);
    return sharedEvent.loadData();
  });
  const { left, right } = timestampFilter;
  yield put(
    nod3vActions.requestValueListFilterChange({ projectName, kind: 'left', context: left })
  );
  yield put(
    nod3vActions.requestValueListFilterChange({ projectName, kind: 'right', context: right })
  );
}

function initViewPage(action: ReturnType<typeof nod3vActions.initViewPage>) {
  const { projectName } = action.payload!;

  const sharedEvent = new SharedEventModel(projectName);
  sharedEvent.startWatching();
  sharedEvent.subscribeFilterChange((args) => {
    const { kind, newValue } = args;

    const context = newValue as TimestampRangeFilterContext;
    store.dispatch(nod3vActions.requestValueListFilterChange({ projectName, kind, context }));
  });
}

function* requestProjects() {
  const manager = new ProjectManager();
  const projects: ProjectInfo[] = yield call(() => manager.getAllProjects());
  yield put(nod3vActions.setProjects({ projects }));
}

function* requestAddProject(action: ReturnType<typeof nod3vActions.requestAddProject>) {
  const { project } = action.payload!;
  const manager = new ProjectManager();
  const success: boolean = yield call(() => manager.addProject(project));
  if (success) {
    yield put(nod3vActions.addProject({ project }));
  }
}

function* requestRemoveProject(action: ReturnType<typeof nod3vActions.requestRemoveProject>) {
  const { project } = action.payload!;
  const manager = new ProjectManager();
  const success: boolean = yield call(() => manager.removeProject(project));
  if (success) {
    yield put(nod3vActions.removeProject({ project }));
  }
}

function* mySaga() {
  yield takeEvery(nod3vActions.dummyAction, dummyWorker);
  yield takeEvery(nod3vActions.requestFiles, requestFiles);
  yield takeEvery(nod3vActions.requestValueListFilterChange, requestValueListFilterChange);
  yield takeEvery(nod3vActions.requestSourceCodeData, requestSourceCodeData);
  yield takeEvery(nod3vActions.requestJson, requestJson);

  yield takeEvery(nod3vActions.clearLocalStorage, clearLocalStorage);
  yield takeEvery(nod3vActions.loadInitialValueListFilter, loadInitialValueListFilter);
  yield takeEvery(nod3vActions.initViewPage, initViewPage);
  yield takeEvery(nod3vActions.requestProjects, requestProjects);
  yield takeEvery(nod3vActions.requestAddProject, requestAddProject);
  yield takeEvery(nod3vActions.requestRemoveProject, requestRemoveProject);
}

export default mySaga;
