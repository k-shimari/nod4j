import { storiesOf } from '@storybook/react';
import { FileTable } from 'app/components/organisms/fileTable';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import * as React from 'react';

storiesOf('File Navigation', module)
  .add('File Table', () => (
    <FileTable
      data={[
        {
          name: 'package.json',
          author: 'naoto',
          lastModifiedDate: new Date(),
          kind: 'file',
          navigateTo: '#'
        },
        {
          name: '.gitignore',
          author: 'naoto',
          lastModifiedDate: new Date(),
          kind: 'file',
          navigateTo: '#'
        },
        {
          name: 'node_modules',
          author: 'naoto',
          lastModifiedDate: new Date(),
          kind: 'dir',
          navigateTo: '#'
        }
      ]}
    ></FileTable>
  ))
  .add('Path navigation', () => (
    <PathNavigation currentDir="atoms" parentDirs={['src', 'components']} />
  ));
