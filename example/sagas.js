import { fork, call, all } from 'redux-saga/effects';

function* waitingAwakeSaga(saga) {
  for (let i = 0; i < 100; i++) {
    try {
      yield call(saga);
    } catch (e) {
      console.error(e);
    }
  }
}

export default function* rootSaga() {
  const sagas = [...__redux_saga__].map(saga => fork(waitingAwakeSaga, saga));
  yield all(sagas);
}