import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = persistCombineReducers(persistConfig, {
  auth,
});

export default rootReducer;
