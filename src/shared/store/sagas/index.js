
import { fork } from 'redux-saga/effects';
import { watchStartUpSaga } from './app-saga';
import { watchAuthSaga } from "screens/login/store/saga";
import { watchMessagesSaga } from "screens/Chat/store/saga";

export default function* rootSaga() {
  yield fork(watchStartUpSaga);
  yield fork(watchAuthSaga);
  yield fork(watchMessagesSaga);
}
