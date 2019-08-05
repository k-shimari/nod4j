import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/Delete';

import * as React from 'react';

export const ValueListItem: React.FunctionComponent = (props) => {
  return (
    <ListItem button>
      <ListItemText primary="Single-line item" />
      <ListItemSecondaryAction>
        <IconButton>
          <ArrowUpward />
        </IconButton>
        <IconButton>
          <ArrowDownward />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
