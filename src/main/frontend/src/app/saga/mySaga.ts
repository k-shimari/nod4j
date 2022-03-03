import { nod4jActions } from 'app/actions';
import { ValueListItemData } from 'app/components/organisms/valueList';
import { nod4jApi, ProjectInfo } from 'app/models/api';
import * as JavaLexer from 'app/models/javaLexer';
import { ProjectItemFileModel, ProjectModel } from 'app/models/project';
import { ProjectManager } from 'app/models/projectManager';
import { SharedEventModel } from 'app/models/sharedEvent';
import { SourceCodeToken } from 'app/models/token';
import { VarInfo, VarListDataModel, VarListJsonData } from 'app/models/varListData';
import { VarValueData } from 'app/models/varValueData';
import { RootState } from 'app/reducers';
import { TimeStampRangeFilter, TimeStampRangeFilter2, TimestampRangeFilterContext } from 'app/reducers/state';
import { store } from 'app/store';
import * as _ from 'lodash';
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';

/**
 * @param variable is the target variable got from the recorded log.
 * @param tokens are the tokens in the source code.
 * This function computes the token id of the variable whose line number and variable name match with the token in the source.
 */
function computeTokenId(variable: VarInfo, tokens: SourceCodeToken[]): string {
  const { linenum, count, var: varName } = variable;
  const match = tokens.filter((x) => x.startLine === Number(linenum) && x.image === varName);

  if (count > match.length) {
    if(varName === "_ArrayStore"){
      if (process.env.NODE_ENV !== 'production') {
        console.log(varName, count, linenum);
      }
      return "";
    }
    throw new Error('Impossible');
  }
  const id = match[count - 1].id;
  return id;
}

/**
 * @param data is the all variable and value data of the target source file.
 * @param file is the source file.
 * @param tokens are the tokens in the source code.
 * This function appends the value information to each token and return all tokens with values.
 */
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
      timestamp: x.timestamp,
      inst: d.inst.toString()
    }));
    try {
      const tokenId = computeTokenId(d, tokens);
      result[tokenId] = item;
    } catch (e) {
      console.log('Cannot compute token id.');
    }
  }
  return new VarValueData(result);
}

/**
 * This function gets the files of the project for the fileTable page and returns the directories and files in the specific directory.
 */
function* requestFiles(action: ReturnType<typeof nod4jActions.requestFiles>) {
  const { projectName, directory } = action.payload!;

  const project: ProjectModel | undefined = yield call(() =>
    new nod4jApi().fetchFileInfo(projectName)
  );
  if (!project) {
    throw new Error('Unknown project: ' + projectName);
  }

  const items = project.getItems(directory);
  /* for loading */
  yield delay(300);
  yield put(
    nod4jActions.setFilesData({
      dirs: directory,
      items
    })
  );
}

/**
 * This function sets the latest filter information to the view.
 */
function* requestValueListFilterChange(
  action: ReturnType<typeof nod4jActions.requestValueListFilterChange>
) {
  const { projectName, kind, context, preferNotify } = action.payload!;

  /**
   * If the context is same, the update does not need.
   */
  const s: TimeStampRangeFilter = yield select((state: RootState) => state.nod4j.filter.range);
  if (kind === 'left' && _.isEqual(context, s.left)) return;
  if (kind === 'right' && _.isEqual(context, s.right)) return;

  yield put(nod4jActions.setValueListFilter({ kind, context }));

  /*
   * Notify the change of the filtering by storing at localStorage
   */
  if (preferNotify) {
    const sharedEvent = new SharedEventModel(projectName);
    sharedEvent.notifyFilterChanged(kind, context);
  }

  const state: RootState = yield select();
  const original = state.nod4j.originalValueListData;
  const filtered = original.filterByRange(state.nod4j.filter.range);

  yield put(nod4jActions.setFilteredValueListData({ data: filtered }));
}

/**
 * This function sets the source code information, tokenizes token and sets the filtered value for each token  .
 */
function* requestSourceCodeData(action: ReturnType<typeof nod4jActions.requestSourceCodeData>) {
  const { projectName, target } = action.payload!;
  const { dirs, file } = target;
  let filePath = getFilePath(dirs, file);

  const api = new nod4jApi();
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
    nod4jActions.SetSourceCodeData({
      tokens
    })
  );

  const varListJsonData: VarListJsonData = yield call(() => api.fetchVarInfo(projectName));
  const varValueData = createVarValueData(varListJsonData, filePath, tokens);

  yield put(
    nod4jActions.setOriginalValueListData({
      data: varValueData
    })
  );

  /**
   * Get current filtering information and set filtered values to each variable
   */
  const timestampFilter: TimeStampRangeFilter2 = yield call(() => {
    const sharedEvent = new SharedEventModel(projectName);
    return sharedEvent.loadData();
  });
  const { left, right } = timestampFilter;
  // workaround ... convert null to undefined
  const left2 = left ? left : undefined;
  const right2 = right ? right : undefined;
  yield put(
    nod4jActions.requestValueListFilterChange({ projectName, kind: 'left', context: left2 })
  );
  yield put(
    nod4jActions.requestValueListFilterChange({ projectName, kind: 'right', context: right2 })
  );
  yield put(
    nod4jActions.setFilteredValueListData({
      data: varValueData
    })
  );
}

/*
 * This function processes and return the file path for mathcing the file path of trace (varinfo.json)
 */
function getFilePath(dirs: string[], file: string): string {
  if (
    dirs.length >= 3 &&
    (dirs.slice(0, 3).join('/') === 'src/main/java' ||
      dirs.slice(0, 3).join('/') === 'src/test/java' ||
      dirs.slice(0, 3).join('/') === 'test/main/java' ||
      dirs.slice(0, 3).join('/') === 'tests/main/java')
  ) {
    return dirs.slice(3).join('/') + '/' + file;
  } else if (
    dirs.length >= 1 &&
    (dirs[0] === 'src' ||
      dirs[0] === 'source' ||
      dirs[0] === 'sources' ||
      dirs[0] === 'test' ||
      dirs[0] === 'tests')
  ) {
    return dirs.slice(1).join('/') + '/' + file;
  } else {
    return dirs.join('/') + '/' + file;
  }
}

/**
 * This function sets the monitoring filter to notify the changing of filters to other files.
 */
function initViewPage(action: ReturnType<typeof nod4jActions.initViewPage>) {
  const { projectName } = action.payload!;

  const sharedEvent = new SharedEventModel(projectName);
  sharedEvent.startWatching();
  sharedEvent.subscribeFilterChange((args) => {
    const { kind, newValue } = args;

    const context = newValue as TimestampRangeFilterContext;
    store.dispatch(nod4jActions.requestValueListFilterChange({ projectName, kind, context }));
  });
}

/**
 * This function requests jsonfile by specifying the project name for Logs page.
 */
function* requestJson(action: ReturnType<typeof nod4jActions.requestJson>) {
  const { projectName, target } = action.payload!;
  const { dirs, file } = target;
  const api = new nod4jApi();
  let filePath = getFilePath(dirs, file);

  const varListJsonData: VarListJsonData = yield call(() => api.fetchVarInfo(projectName));
  const model = new VarListDataModel(varListJsonData);
  const ds = model.getDataOfFile(filePath);

  yield put(
    nod4jActions.setVarListJsonData({
      data: ds
    })
  );
}

/**
 * This function gets and sets all projects in the top page.
 */
function* requestProjects() {
  const manager = new ProjectManager();
  const projects: ProjectInfo[] = yield call(() => manager.getAllProjects());
  yield put(nod4jActions.setProjects({ projects }));
}

/**
 * This function sets the action executed asynchronously.
 */
function* mySaga() {
  yield takeEvery(nod4jActions.requestFiles, requestFiles);
  yield takeEvery(nod4jActions.requestValueListFilterChange, requestValueListFilterChange);
  yield takeEvery(nod4jActions.requestSourceCodeData, requestSourceCodeData);
  yield takeEvery(nod4jActions.requestJson, requestJson);

  yield takeEvery(nod4jActions.initViewPage, initViewPage);
  yield takeEvery(nod4jActions.requestProjects, requestProjects);
}

export default mySaga;
