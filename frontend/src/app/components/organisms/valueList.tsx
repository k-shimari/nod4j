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

export interface RangeFilterClickEventHandler {
  (id: ValueListItemId): void;
}

export namespace ValueList {
  export interface Props {
    style?: React.CSSProperties;
    items: ValueListItem[];
    onArrowUpwardClick?: RangeFilterClickEventHandler;
    onArrowDownwardClick?: RangeFilterClickEventHandler;
    onEnter?(): void;
    onLeave?(): void;
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 280,
    maxWidth: 300
  }
}));

export const ValueList: React.FunctionComponent<ValueList.Props> = (props) => {
  const { style, items, onArrowDownwardClick, onArrowUpwardClick, onEnter, onLeave } = props;
  const classes = useStyles();

  return (
    <Paper style={style} className={classes.root} onPointerEnter={onEnter} onPointerLeave={onLeave}>
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
