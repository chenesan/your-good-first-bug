import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import AppContainer from './containers/app-container';

const middlewares = [
  thunkMiddleware,
];

if (process.env.DEBUG) {
  middlewares.push(createLogger());
}

if (typeof sessionStorage !== 'undefined') {
  const issueSelector = JSON.parse(window.sessionStorage.getItem('issueSelector'));
  if (issueSelector) {
    window.__PRELOADED_STATE__.issueSelectors = issueSelector;
  }
}

const store = createStore(
  reducer,
  typeof window === 'undefined' ? undefined : window.__PRELOADED_STATE__,
  applyMiddleware(...middlewares)
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  global.document.getElementById('app-entry-point')
);
