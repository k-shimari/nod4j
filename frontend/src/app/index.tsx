import { App as LogvisApp } from 'app/containers/App';
import { FilesContainer } from 'app/containers/Files';
import { ViewContainer } from 'app/containers/View';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';

export const App = hot(module)(() => (
  <div>
    <Route exact path="/" component={LogvisApp} />
    <Route path="/files" component={FilesContainer} />
    <Route path="/view" component={ViewContainer} />
  </div>
));
