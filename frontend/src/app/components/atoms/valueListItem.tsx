import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import * as React from 'react';
import { ValueListItemData } from '../organisms/valueList';

export type ValueListItemId = string;
export type ValueListItemValue = string | number;

interface Props {
  item: ValueListItemData;
  onArrowUpwardClick?(item: ValueListItemData): void;
  onArrowDownwardClick?(item: ValueListItemData): void;
}

export const ValueListItem: React.FunctionComponent<Props> = (props) => {
  const { item, onArrowUpwardClick, onArrowDownwardClick } = props;
  const { value } = item;

  return (
    <ListItem button dense={true}>
      <ListItemText primary={value}></ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          size="small"
          title="Filter after"
          onClick={() => onArrowDownwardClick && onArrowDownwardClick(item)}
        >
          <ArrowDownward />
        </IconButton>
        <IconButton
          size="small"
          title="Filter before"
          onClick={() => onArrowUpwardClick && onArrowUpwardClick(item)}
        >
          <ArrowUpward />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
