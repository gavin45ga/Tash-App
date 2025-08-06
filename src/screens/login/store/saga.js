import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { LOGIN, SIGNUP, USER_INFO, startUp } from "shared/store/actions";
import { navigationRef } from "shared/navigation";
import { Alert } from "react-native";
import { postRequest, getRequest } from "api/axios";

function* loginSaga(action) {
  try {
    const result = yield call(postRequest, "/login", action.payload);
    if (result && result.status === 200) {
      yield put({ type: LOGIN.DONE, payload: result.data });
    } else {
      Alert.alert("Error", "Login failed");
      yield put({ type: LOGIN.FAILED, payload: {} });
    }
  } catch (exception) {
    yield put({ type: LOGIN.FAILED, payload: null });
    Alert.alert("Error", exception?.response?.data?.message);
    console.log(exception, "Login Exception");
  }
}

function* signUpSaga(action) {
  try {
    const result = yield call(postRequest, "/signup", action.payload);
    if (result && result.status === 200) {
      yield put({ type: SIGNUP.DONE, payload: result.data });
    } else {
      yield put({ type: SIGNUP.FAILED, payload: {} });
    }
  } catch (exception) {
    yield put({ type: SIGNUP.FAILED, payload: null });

    Alert.alert("Error", exception?.response?.data?.message);
    console.log(exception, "SignUp Exception");
  }
}

function* userInfoSaga(action) {
  try {
    const result = yield call(getRequest, "/user/info");
    if (result && result.status === 200) {
      yield put({ type: USER_INFO.DONE, payload: result.data });
    } else {
      yield put({ type: USER_INFO.FAILED, payload: {} });
    }
  } catch (exception) {
    yield put({ type: USER_INFO.FAILED, payload: null });
    Alert.alert("Error", "Failed to get user information");
    console.log(exception, "User info Exception");
  }
}

export function* watchAuthSaga() {
  yield all([
    takeLatest(LOGIN.REQUEST, loginSaga),
    takeLatest(SIGNUP.REQUEST, signUpSaga),
    takeLatest(USER_INFO.REQUEST, userInfoSaga),
  ]);
}
