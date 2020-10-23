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

/**
 * create the set of each data for visualization
 */
export namespace ValueListItemData {
  export function create(
    id: ValueListItemId,
    value: ValueListItemValue,
    timestamp: Timestamp
  ): ValueListItemData {
    return { id, value, timestamp };
  }
}

/**
 * create the set of each data (token ID, token value, token timestamp) for visualization
 */
export interface ValueListItemData {
  id: ValueListItemId;
  value: ValueListItemValue;
  timestamp: Timestamp;
}

export interface RangeFilterClickEventHandler {
  (item: ValueListItemData, varInfo: SourceCodeToken): void;
}

/**
 * @param items is the set of the data (token ID, token value, token timestamp)
 * @param onArrowUpwardClick gets the click event at values of variable at the filtering end point.
 * @param onArrowDownwardClick gets the click event at values of variable at the filtering start point.
 * @param currentFilterValue is the pair of the filtering start and end point information.
 * @param onEnter is whether the mouse cursor hovers at the point.
 * @param onLeave is whether the mouse cursor leaves at the point.
 */
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

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 240,
    maxHeight: 400,
    overflowY: 'auto'
  }
}));

/**
 * return the valueList component of the specified varable.
 */
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
