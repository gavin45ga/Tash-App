const generateActionTypes = action => ({
  DONE: `${action}_DONE`,
  FAILED: `${action}_FAILED`,
  REQUEST: `${action}_REQUEST`,
  STATUS: `${action}_STATUS`,
});

// Status Action types
export const UPDATE_STATUS = 'STATUS/UPDATE';
export const SET_LOADING = 'SET_LOADING';
export const STATUS = {
  CANCELLED: 'CANCELLED',
  DONE: 'DONE',
  FAILED: 'FAILED',
  IN_PROGRESS: 'IN_PROGRESS',
};

export const LOGIN = generateActionTypes('LOGIN');
export const SIGNUP = generateActionTypes('SIGNUP');
export const USER_INFO = generateActionTypes('USER_INFO');
export const MESSAGE = generateActionTypes('MESSAGE');
export const MESSAGE_HISTORY = generateActionTypes('MESSAGE_HISTORY');
export const MESSAGE_DELETE = generateActionTypes('MESSAGE_DELETE');
export const updateStatus = payload => ({
  payload,
  type: UPDATE_STATUS,
});

export const setLoader = payload => ({
  payload,
  type: SET_LOADING,
});

export const STARTUP = 'STARTUP';
export const startUp = () => ({
  type: STARTUP,
});
