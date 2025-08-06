import {MESSAGE, MESSAGE_HISTORY, MESSAGE_DELETE} from 'shared/store/actions';

export const sendMessage = payload => ({
  type: MESSAGE.REQUEST,
  payload,
});

export const getHistory = payload => ({
  type: MESSAGE_HISTORY.REQUEST,
});

export const deleteMessages = payload => ({
  type: MESSAGE_DELETE.REQUEST,
  payload,
});
