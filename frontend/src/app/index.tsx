import { App as LogvisApp } from 'app/containers/App';
import { FilesContainer } from 'app/containers/Files';
import { ViewContainer } from 'app/containers/View';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import { AppHeader } from './components/organisms/appHeader';

export const App = hot(module)(() => (
  <div>
    <AppHeader appName="LOGVIS" />
    <Route exact path="/" component={LogvisApp} />
    <Route path="/project/:projectName/files" component={FilesContainer} />
    <Route path="/project/:projectName/view" component={ViewContainer} />
  </div>
));
