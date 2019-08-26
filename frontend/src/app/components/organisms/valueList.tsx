import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {
  ValueListItemId,
  ValueListItemValue,
  ValueListItem
} from 'app/components/atoms/valueListItem';
import * as React from 'react';
import { Timestamp } from 'app/reducers/state';

export namespace ValueListItemData {
  export function create(
    id: ValueListItemId,
    value: ValueListItemValue,
    timestamp: Timestamp
  ): ValueListItemData {
    return { id, value, timestamp };
  }
}

export interface ValueListItemData {
  id: ValueListItemId;
  value: ValueListItemValue;
  timestamp: Timestamp;
}

export interface RangeFilterClickEventHandler {
  (id: ValueListItemId): void;
}

export namespace ValueList {
  export interface Props {
    style?: React.CSSProperties;
    items: ValueListItemData[];
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
