import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {
  ValueListItem,
  ValueListItemId,
  ValueListItemValue
} from 'app/components/atoms/valueListItem';
import * as React from 'react';

export interface ValueListItem {
  id: ValueListItemId;
  value: ValueListItemValue;
}

export namespace ValueList {
  export interface Props {
    style?: React.CSSProperties;
    items: ValueListItem[];
    onArrowUpwardClick?(id: ValueListItemId): void;
    onArrowDownwardClick?(id: ValueListItemId): void;
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300
  }
}));

export const ValueList: React.FunctionComponent<ValueList.Props> = (props) => {
  const { style, items, onArrowDownwardClick, onArrowUpwardClick } = props;
  const classes = useStyles();

  return (
    <Paper style={style} className={classes.root}>
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
