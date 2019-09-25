import { storiesOf } from '@storybook/react';
import { HelloWorld } from 'app/components/atoms/helloWorld';
import * as React from 'react';

storiesOf('nod3v', module).add('Hello, World!!', () => <HelloWorld />);
