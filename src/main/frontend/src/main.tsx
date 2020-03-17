import { CssBaseline } from '@material-ui/core';
import { store } from 'app/store';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './app';
import './style.scss';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <CssBaseline />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
