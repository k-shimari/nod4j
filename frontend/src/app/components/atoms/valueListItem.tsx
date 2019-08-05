import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import * as React from 'react';

export type ValueListItemId = string;
export type ValueListItemValue = string | number;

interface Props {
  id: ValueListItemId;
  value: ValueListItemValue;
  onArrowUpwardClick?(id: ValueListItemId): void;
  onArrowDownwardClick?(id: ValueListItemId): void;
}

export const ValueListItem: React.FunctionComponent<Props> = (props) => {
  const { id, value, onArrowUpwardClick, onArrowDownwardClick } = props;

  return (
    <ListItem button>
      <ListItemText primary={value}></ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={() => onArrowDownwardClick && onArrowDownwardClick(id)}>
          <ArrowDownward />
        </IconButton>
        <IconButton onClick={() => onArrowUpwardClick && onArrowUpwardClick(id)}>
          <ArrowUpward />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
