import { RenderFunction, storiesOf } from '@storybook/react';
import { ValueList } from 'app/components/organisms/valueList';
import * as React from 'react';

const valueListRenderFunction: RenderFunction = () => {
  return (
    <ValueList
      items={[
        { id: '1', value: 123, timestamp: '1', inst: 'P' },
        { id: '2', value: 456, timestamp: '2', inst: 'P' },
        { id: '3', value: 789, timestamp: '3', inst: 'P' }
      ]}
      currentFilterValue={{}}
      onArrowUpwardClick={(id) => console.log('Arrow upward: ' + id)}
      onArrowDownwardClick={(id) => console.log('Arrow downward: ' + id)}
    />
  );
};

storiesOf('Value List', module).add('Value List', valueListRenderFunction);
