import { createAction } from 'redux-actions';

export const actionTypes = {
  LOGIN: '[AUTH] - Login',
  LOGIN_SUCCESS: '[AUTH] - Login Success',
  LOGIN_FAILURE: '[AUTH] - Login Failure',
  SIGNUP: '[AUTH] - Signup',
  SIGNUP_SUCCESS: '[AUTH] - Signup Success',
  SIGNUP_FAILURE: '[AUTH] - Signup Failure',
  GET_PROFILE: '[AUTH] - Get Profile',
  GET_PROFILE_SUCCESS: '[AUTH] - Get Profile Success',
  GET_PROFILE_FAILURE: '[AUTH] - Get Profile Failure',
  LOGOUT: '[AUTH] - Logout',
};

export const Login = createAction(actionTypes.LOGIN);
export const LoginSuccess = createAction(actionTypes.LOGIN_SUCCESS);
export const LoginFailure = createAction(actionTypes.LOGIN_FAILURE);

export const Signup = createAction(actionTypes.SIGNUP);
export const SignupSuccess = createAction(actionTypes.SIGNUP_SUCCESS);
export const SignupFailure = createAction(actionTypes.SIGNUP_FAILURE);

export const GetProfile = createAction(actionTypes.GET_PROFILE);
export const GetProfileSuccess = createAction(actionTypes.GET_PROFILE_SUCCESS);
export const GetProfileFailure = createAction(actionTypes.GET_PROFILE_FAILURE);

export const Logout = createAction(actionTypes.LOGOUT);
