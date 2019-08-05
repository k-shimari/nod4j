import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {
  ValueListItem,
  ValueListItemId,
  ValueListItemValue
} from 'app/components/atoms/valueListItem';
import * as React from 'react';

interface Props {
  items: {
    id: ValueListItemId;
    value: ValueListItemValue;
  }[];
  onArrowUpwardClick?(id: ValueListItemId): void;
  onArrowDownwardClick?(id: ValueListItemId): void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300
  }
}));

export const ValueList: React.FunctionComponent<Props> = (props) => {
  const { items, onArrowDownwardClick, onArrowUpwardClick } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <List dense={false}>
        {items.map(({ id, value }) => (
          <ValueListItem
            key={id}
            id={id}
            value={value}
            onArrowUpwardClick={onArrowUpwardClick}
            onArrowDownwardClick={onArrowDownwardClick}
          ></ValueListItem>
        ))}
      </List>
    </Paper>
  );
};
