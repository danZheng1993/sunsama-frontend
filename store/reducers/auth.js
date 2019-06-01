import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import { actionTypes } from '../actions/auth';

const initialState = {
  authToken: '',
  me: {},
  error: '',
  status: '',
};

export default handleActions(
  {
    [actionTypes.LOGIN]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.error = '';
      }),
    [actionTypes.LOGIN_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.authToken = action.payload;
      }),
    [actionTypes.LOGIN_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.authToken = '';
        draft.error = action.payload;
      }),
    [actionTypes.SIGNUP]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.error = '';
      }),
    [actionTypes.SIGNUP_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.authToken = action.payload;
      }),
    [actionTypes.SIGNUP_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.authToken = '';
        draft.error = action.payload;
      }),
    [actionTypes.GET_PROFILE]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.error = '';
      }),
    [actionTypes.GET_PROFILE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.me = action.payload;
      }),
    [actionTypes.GET_PROFILE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.me = {};
        draft.error = action.payload;
      }),
    [actionTypes.LOGOUT]: (state, action) =>
      produce(state, draft => {
        draft.status = action.type;
        draft.me = {};
        draft.authToken = ''
        draft.error = '';
      }),
  },
  initialState
);
