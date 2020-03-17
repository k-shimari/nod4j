import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { storiesOf } from '@storybook/react';
import { FilterDisplay } from 'app/components/atoms/filterDisplay';
import * as React from 'react';

storiesOf('Filters', module).add('Timestamp filter', () => (
  <div>
    <FilterDisplay size="small" icon={<ArrowDownward />} label="Filter" />

    <FilterDisplay
      size="small"
      icon={<ArrowUpward />}
      label="Filter"
      color="primary"
      onDelete={() => console.log('Delete click')}
    />
  </div>
));
