import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducer';

const middleWares = [thunkMiddleware];
middleWares.push(logger);

const middleWareEnhancer = applyMiddleware(...middleWares);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const store = createStore(rootReducer, {}, composeEnhancers(middleWareEnhancer));

export default store;
