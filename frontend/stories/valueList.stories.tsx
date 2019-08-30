import { Box, Typography } from '@material-ui/core';
import { RenderFunction, storiesOf } from '@storybook/react';
import { ValueList } from 'app/components/organisms/valueList';
import { ValueList2 } from 'app/components/organisms/valueList2';
import * as React from 'react';

const valueListRenderFunction: RenderFunction = () => {
  return (
    <ValueList
      items={[
        { id: '1', value: 123, timestamp: '1' },
        { id: '2', value: 456, timestamp: '2' },
        { id: '3', value: 789, timestamp: '3' }
      ]}
      currentFilterValue={{}}
      onArrowUpwardClick={(id) => console.log('Arrow upward: ' + id)}
      onArrowDownwardClick={(id) => console.log('Arrow downward: ' + id)}
    />
  );
};
const valueList = (
  <ValueList2
    varName="max"
    pinned={true}
    items={[
      { id: '1', value: 123, timestamp: '1' },
      { id: '2', value: 456, timestamp: '2' },
      { id: '3', value: 789, timestamp: '3' }
    ]}
    currentFilterValue={{}}
    style={{ marginBottom: 8 }}
  />
);

const pinnedValueListSideBar: RenderFunction = () => {
  // const classes = useStyles();
  return (
    <Box
      style={{ margin: 6, padding: 12, width: 320, height: '100%' }}
      borderRight={1}
      borderColor="grey.300"
    >
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Pinned items (3)
      </Typography>
      {[1, 2, 3].map((_, index) => valueList)}
    </Box>
  );
};

storiesOf('Value List', module)
  .add('Value List', valueListRenderFunction)
  .add('Pinned value list sidebar', pinnedValueListSideBar);
