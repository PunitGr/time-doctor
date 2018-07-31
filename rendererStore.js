// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';
import reducers from './src/store/reducers';

const enhancer = compose(
  applyMiddleware(thunk),
  electronEnhancer(true),
);

const store = createStore(reducers, {}, enhancer);

export default store;
