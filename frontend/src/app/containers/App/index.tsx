import * as React from 'react';
import { Link } from '@material-ui/core';

export class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link href="/files">Files</Link>
        </div>
      </div>
    );
  }
}
