import { storiesOf } from '@storybook/react';
import { HelloWorld } from 'app/components/atoms/helloWorld';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import * as React from 'react';

storiesOf('Logvis', module)
  .add('Hello, World!!', () => <HelloWorld />)
  .add('Path navigation', () => <PathNavigation />);
