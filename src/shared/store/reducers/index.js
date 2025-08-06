
import { combineReducers } from 'redux';
import statusReducer from './status-reducer';
import authReducer from 'screens/login/store/reducer';
import chatReducer from "screens/Chat/store/reducer";


export const rootReducer = combineReducers({
  status: statusReducer,
  auth: authReducer,
  chat: chatReducer
});
