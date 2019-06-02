import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import Reactotron from '../ReactotronConfig';

import mainSaga from './sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer())
);

export const persistor = persistStore(store);

sagaMiddleware.run(mainSaga);

export default store;
