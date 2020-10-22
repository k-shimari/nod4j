import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { SourceCodeToken } from 'app/models/token';

import * as React from 'react';
import { ValueListItemData } from '../organisms/valueList';

export type ValueListItemId = string;
export type ValueListItemValue = string | number;

/**
 * @param item: ValueListItemData;
 * @param disableArrowUpward: set the flag when the current filter is ended to this item
 * @param disableArrowDownward: set the flag when the current filter is started from this item
 * @param onArrowUpwardClick :
 * @param onArrowDownwardClick :
 */
interface Props {
  item: ValueListItemData;
  disableArrowUpward?: boolean;
  disableArrowDownward?: boolean;
  onArrowUpwardClick?(item: ValueListItemData, varInfo?: SourceCodeToken): void;
  onArrowDownwardClick?(item: ValueListItemData, varInfo?: SourceCodeToken): void;
}

/**
 * @param props
 *
 *
 */
export const ValueListItem: React.FunctionComponent<Props> = (props) => {
  const {
    item,
    disableArrowUpward,
    disableArrowDownward,
    onArrowUpwardClick,
    onArrowDownwardClick
  } = props;
  const { value } = item;

  return (
    <ListItem button dense={true}>
      <ListItemText
        primary={value}
        primaryTypographyProps={{ variant: 'caption' }}
        style={{ marginRight: 24 }}
      ></ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          disabled={disableArrowDownward}
          size="small"
          title="Filter after"
          onClick={() => onArrowDownwardClick && onArrowDownwardClick(item)}
        >
          <ArrowDownward fontSize="small" />
        </IconButton>
        <IconButton
          disabled={disableArrowUpward}
          size="small"
          title="Filter before"
          onClick={() => onArrowUpwardClick && onArrowUpwardClick(item)}
        >
          <ArrowUpward fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
