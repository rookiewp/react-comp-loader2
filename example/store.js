import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { injectStore } from '../lib/injectStore';
const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers(__redux_reducer__)
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
injectStore(store);

export default store;