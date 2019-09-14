import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {
  ValueListItem,
  ValueListItemId,
  ValueListItemValue
} from 'app/components/atoms/valueListItem';
import { SourceCodeToken } from 'app/models/token';
import { Timestamp, TimeStampRangeFilter } from 'app/reducers/state';
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

export interface RangeFilterClickEventHandler2 {
  (item: ValueListItemData, varInfo: SourceCodeToken): void;
}

export namespace ValueList {
  export interface Props {
    style?: React.CSSProperties;
    items: ValueListItemData[];
    onArrowUpwardClick?: RangeFilterClickEventHandler;
    onArrowDownwardClick?: RangeFilterClickEventHandler;
    currentFilterValue: TimeStampRangeFilter;
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
  const {
    style,
    items,
    onArrowDownwardClick,
    onArrowUpwardClick,
    onEnter,
    onLeave,
    currentFilterValue
  } = props;
  const classes = useStyles();
  const { left, right } = currentFilterValue;

  return (
    <Paper style={style} className={classes.root} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <List dense={true}>
        {items.map((item) => (
          <ValueListItem
            key={item.id}
            item={item}
            disableArrowUpward={right && right.timestamp === item.timestamp}
            disableArrowDownward={left && left.timestamp === item.timestamp}
            onArrowUpwardClick={onArrowUpwardClick}
            onArrowDownwardClick={onArrowDownwardClick}
          ></ValueListItem>
        ))}
      </List>
    </Paper>
  );
};
