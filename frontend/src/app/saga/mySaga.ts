import { LogvisActions } from 'app/actions';
import { put, takeEvery } from 'redux-saga/effects';

function* dummyWorker() {
  yield put(LogvisActions.dummyAction());
}

function* mySaga() {
  yield takeEvery(LogvisActions.dummyAction, dummyWorker);
}

export default mySaga;
