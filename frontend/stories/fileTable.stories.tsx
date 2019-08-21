import { storiesOf } from '@storybook/react';
import { FileTable, FileTableRow } from 'app/components/organisms/fileTable';
import * as React from 'react';

storiesOf('File Table', module).add('Basic', () => (
  <FileTable
    data={[
      { name: 'package.json', author: 'naoto', date: new Date(), kind: 'file' },
      { name: '.gitignore', author: 'naoto', date: new Date(), kind: 'file' },
      { name: 'node_modules', author: 'naoto', date: new Date(), kind: 'dir' }
    ]}
  ></FileTable>
));
