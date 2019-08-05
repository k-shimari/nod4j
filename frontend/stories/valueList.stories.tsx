import { storiesOf } from '@storybook/react';
import { ValueListItem } from 'app/components/atoms/valueListItem';
import { ValueList } from 'app/components/organisms/valueList';
import * as React from 'react';

storiesOf('Value List', module).add('Value List', () => <ValueList />);
