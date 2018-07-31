// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';
import timer from './src/store/reducers';

const enhancer = compose(
  applyMiddleware(thunk),
  electronEnhancer(),
);

const initialState = {
  timerState: false,
  startTime: null,
  stopTime: null,
  currentTime: null,
  timeStampObject: null,
};

const store = createStore(timer, initialState, enhancer);

export default store;
