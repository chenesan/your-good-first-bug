import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers';
import AppContainer from './containers/app-container';

const store = createStore(reducer, applyMiddleware(createLogger()));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  global.document.getElementById('app-entry-point')
);
