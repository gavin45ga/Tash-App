import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { MESSAGE, MESSAGE_HISTORY, MESSAGE_DELETE } from "shared/store/actions";
import { navigationRef } from "shared/navigation";
import { Alert } from "react-native";
import { getRequest, postRequest } from "api/axios";
import { client as io } from "api/socket";
import { getUserInfo } from "screens/login/store/actions";
import { store } from "shared/store/store";
import { getHistory } from "./actions";

function* messageSaga(action) {
  try {
    const auth = yield select((state) => state.auth);
    io.emit("user_message", action.payload);
    io.on(`message_res_${auth.user._id}`, (res) => {
      if (res.status === 200) {
        store.dispatch(getUserInfo());
        store.dispatch(getHistory());
      } else {
        Alert.alert("Error", res.message);
      }
    });
  } catch (exception) {
    Alert.alert("Error", "Message sending failed");
    console.log(exception, "Message Exception");
  }
}
function* messageHistorySaga(action) {
  try {
    const result = yield call(getRequest, "/user/messages");

    if (result && result.status === 200) {
      yield put({ type: MESSAGE_HISTORY.DONE, payload: result.data.history });
    } else {
      Alert.alert("Error", result.data.message);
    }
  } catch (exception) {
    Alert.alert("Error", "Failed to get messages");
    console.log(exception, "History Exception");
  }
}

function* deleteMessageSaga(action) {
  try {
    const result = yield call(
      postRequest,
      "/user/deleteMessages",
      action.payload
    );
    if (result && result.status === 200) {
      yield put({ type: MESSAGE_DELETE.DONE, payload: result.data.history });
    } else {
      Alert.alert("Error", result.data.message);
    }
  } catch (exception) {
    Alert.alert("Error", "Failed to delete messages");
    console.log(exception, "Delete Exception");
  }
}

export function* watchMessagesSaga() {
  yield all([
    takeLatest(MESSAGE.REQUEST, messageSaga),
    takeLatest(MESSAGE_HISTORY.REQUEST, messageHistorySaga),
    takeLatest(MESSAGE_DELETE.REQUEST, deleteMessageSaga),
  ]);
}
