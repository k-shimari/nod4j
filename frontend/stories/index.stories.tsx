import { storiesOf } from '@storybook/react';
import { HelloWorld } from 'app/components/atoms/helloWorld';
import * as React from 'react';

storiesOf('Logvis', module)
  .add('Hello, World!!', () => <HelloWorld />)
