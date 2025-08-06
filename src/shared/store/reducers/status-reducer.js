import { composeResetReducer } from "./reset-reducer";
import { UPDATE_STATUS, SET_LOADING } from "../actions";

const defaultStatusState = {
  isConnected: true,
  isLoading: false,
};

const statusReducer = (state = defaultStatusState, action) => {
  if (action.type === UPDATE_STATUS) {
    return { ...state, ...action.payload };
  }
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: action.payload };
  }
  return state;
};

export default composeResetReducer(statusReducer, defaultStatusState);
