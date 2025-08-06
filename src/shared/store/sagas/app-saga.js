import { NetInfo, Alert } from "react-native";
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { REHYDRATE } from "redux-persist/es/constants";
import { STARTUP, resetStore } from "../actions";
import { navigationRef } from "shared/navigation";
import { getUserInfo } from "screens/login/store/actions";
import { store } from "../store";
import { client as io } from "api/socket";
import { getHistory } from "screens/Chat/store/actions";

function* startUpSaga() {
  try {
    const auth = yield select((state) => state.auth);

    io.on("connect", () => {
      console.log("Socket is working fine");
    });

    auth.user._id &&
      io.on(`payment_success_${auth.user._id}`, (message) => {
        // Alert.alert('Success', message);
        store.dispatch(getUserInfo());
        navigationRef.current &&
          navigationRef.current.navigate("Homepage", { tranResult: message });
      });

    io.on(`admin_response_${auth.user._id}`, (data) => {
      store.dispatch(getUserInfo());
      store.dispatch(getHistory());
    });
    if (auth.token) {
      yield put(getUserInfo());
      yield put(getHistory());
      navigationRef.current &&
        navigationRef.current.navigate("AuthedUserStack");
    } else {
      yield put(resetStore());
    }
  } catch (exception) {
    console.log(exception, "App exception");
  }
}

export function* watchStartUpSaga() {
  yield all(
    [takeLatest(REHYDRATE, startUpSaga)],
    [takeLatest(STARTUP, startUpSaga)]
  );
}
