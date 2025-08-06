import {composeResetReducer} from 'shared/store/reducers/reset-reducer';
import {MESSAGE_HISTORY, MESSAGE_DELETE} from 'shared/store/actions';

const initialState = {
  history: [],
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_HISTORY.DONE: {
      return {history: action.payload};
    }
    case MESSAGE_DELETE.DONE: {
      return {history: action.payload};
    }
    default:
      return state;
  }
};

export default composeResetReducer(chat, initialState);
