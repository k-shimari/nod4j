import { RenderFunction, storiesOf } from '@storybook/react';
import { ValueList } from 'app/components/organisms/valueList';
import { Token } from 'app/components/sourcecode/token';
import * as React from 'react';

storiesOf('Source code', module).add('Basic', () => <Token>public</Token>);
