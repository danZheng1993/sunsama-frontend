import { put, takeEvery, call } from 'redux-saga/effects';
import get from 'lodash.get';

import { actionTypes } from '../actions/auth';

import { Mutations } from '../../apollo';

function* loginRequest(action) {
  const { client, email, password } = action.payload;
  try {
    const result = yield call(client.mutate, {
      mutation: Mutations.loginMutation,
      variables: { email, password }
    });
    const token = get(result, 'data.login.token');
    yield put({ type: actionTypes.LOGIN_SUCCESS, payload: token });
  } catch(err) {
    yield put({ type: actionTypes.SIGNUP_FAILURE, payload: err.message });
  }
}

function* signupRequest(action) {
  const { client, name, email, password } = action.payload;
  try {
    const result = yield call(client.mutate, {
      mutation: Mutations.userAddMutation,
      variables: { name, email, password }
    });
    const token = get(result, 'data.login.token');
    yield put({ type: actionTypes.SIGNUP_SUCCESS, payload: token });
  } catch(err) {
    yield put({ type: actionTypes.SIGNUP_FAILURE, payload: err.message });
  }
}

export default function* AuthSaga() {
  yield takeEvery(actionTypes.LOGIN, loginRequest);
  yield takeEvery(actionTypes.SIGNUP, signupRequest);
}
