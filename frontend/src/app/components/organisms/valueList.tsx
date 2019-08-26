import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {
  ValueListItem,
  ValueListItemId,
  ValueListItemValue
} from 'app/components/atoms/valueListItem';
import { Timestamp } from 'app/reducers/state';
import * as React from 'react';

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
  (item: ValueListItemData): void;
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
    minWidth: 240,
    maxHeight: 320,
    overflowY: 'auto'
  }
}));

export const ValueList: React.FunctionComponent<ValueList.Props> = (props) => {
  const { style, items, onArrowDownwardClick, onArrowUpwardClick, onEnter, onLeave } = props;
  const classes = useStyles();

  return (
    <Paper style={style} className={classes.root} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <List dense={true}>
        {items.map((item) => (
          <ValueListItem
            key={item.id}
            item={item}
            onArrowUpwardClick={onArrowUpwardClick}
            onArrowDownwardClick={onArrowDownwardClick}
          ></ValueListItem>
        ))}
      </List>
    </Paper>
  );
};
