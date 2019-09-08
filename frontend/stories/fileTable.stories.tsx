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
          type: 'file',
          navigateTo: '#'
        },
        {
          name: '.gitignore',
          type: 'file',
          navigateTo: '#'
        },
        {
          name: 'node_modules',
          type: 'dir',
          navigateTo: '#'
        }
      ]}
    ></FileTable>
  ))
  .add('Path navigation', () => <PathNavigation items={['src', 'components', 'atoms']} />);
