import { storiesOf } from '@storybook/react';
import { FileTable } from 'app/components/organisms/fileTable';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import * as React from 'react';

storiesOf('File Navigation', module)
  .add('File Table', () => (
    <FileTable
      data={[
        { name: 'package.json', author: 'naoto', date: new Date(), kind: 'file' },
        { name: '.gitignore', author: 'naoto', date: new Date(), kind: 'file' },
        { name: 'node_modules', author: 'naoto', date: new Date(), kind: 'dir' }
      ]}
    ></FileTable>
  ))
  .add('Path navigation', () => <PathNavigation />);
