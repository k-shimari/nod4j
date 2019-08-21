import * as React from 'react';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { FileTable } from 'app/components/organisms/fileTable';

export class FilesContainer extends React.Component {
  render() {
    return (
      <div>
        <PathNavigation parentDirs={[]} currentDir="/" />
        <FileTable
          data={[
            {
              name: 'index.js',
              author: 'naoto',
              date: new Date(),
              kind: 'file'
            }
          ]}
        ></FileTable>
      </div>
    );
  }
}
