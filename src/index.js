import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import AppContainer from './containers/app-container';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  global.document.getElementById('app-entry-point')
);
