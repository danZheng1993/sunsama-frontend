import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import mainSaga from './sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

export const persistor = persistStore(store);

sagaMiddleware.run(mainSaga);

export default store;
