import { createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { rootReducer } from "../reducers/index";
import rootSaga from "../sagas";

const persistConfig = {
  blacklist: ["status"],
  debug: __DEV__,
  key: "root",
  keyPrefix: "v.1",
  storage: AsyncStorage,
  timeout: 20000,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
let middleWare = applyMiddleware(sagaMiddleware);

if (__DEV__) {
  middleWare = applyMiddleware(sagaMiddleware, logger);
}

export const store = createStore(persistedReducer, middleWare);

persistStore(store, null, () => {
  // eslint-disable-next-line no-console
});
sagaMiddleware.run(rootSaga);
