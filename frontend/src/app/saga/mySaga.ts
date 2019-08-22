import { LogvisActions } from 'app/actions';
import { parseFilesPath } from 'app/models/pathParser';
import { ProjectModel } from 'app/models/project';
import { delay, put, takeEvery } from 'redux-saga/effects';

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

function* dummyWorker() {
  yield put(LogvisActions.dummyAction());
}

function* mySaga() {
  yield takeEvery(LogvisActions.dummyAction, dummyWorker);
  yield takeEvery(LogvisActions.requestFiles, requestFiles);
}

export default mySaga;
