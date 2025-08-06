/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-community/async-storage";
import { RESET_STORE } from "../actions";

/**
 * Add a reset to store state for given reducer
 * @param reducer
 * @param initialState - value we are resetting to
 * @returns composedReducer - Higher order function
 */

export const composeResetReducer = (reducer, initialState) => (
  state,
  action
) => {
  if (action.type === RESET_STORE) {
    AsyncStorage.clear();
    return initialState;
  }
  return reducer(state, action);
};
