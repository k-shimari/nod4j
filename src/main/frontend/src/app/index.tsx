import { App as nod4jApp } from 'app/containers/App';
import { FilesContainer } from 'app/containers/Files';
import { ViewContainer } from 'app/containers/View';
import { LogsContainer } from 'app/containers/Logs';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import { AppHeader } from './components/organisms/appHeader';

/**
 * Set all components of nod4j.
 */
export const App = hot(module)(() => (
  <div>
    <AppHeader appName="nod4j" />
    <Route exact path="/" component={nod4jApp} />
    <Route path="/project/:projectName/files" component={FilesContainer} />
    <Route path="/project/:projectName/view" component={ViewContainer} />
    <Route path="/project/:projectName/logs" component={LogsContainer} />
  </div>
));
