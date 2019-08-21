import { App as LogvisApp } from 'app/containers/App';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import { FilesContainer } from 'app/containers/Files';

export const App = hot(module)(() => (
  <div>
    <Route exact path="/" component={LogvisApp} />
    <Route path="/files" component={FilesContainer} />
  </div>
));
