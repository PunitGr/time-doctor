import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import timer from './store/reducers';
import App from './components/App';

const configureStore = () => createStore(timer);
const store = configureStore(timer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
