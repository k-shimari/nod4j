import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Switch,
  Typography
} from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { ValueListItem } from 'app/components/atoms/valueListItem';
import * as React from 'react';
import { RangeFilterClickEventHandler, ValueListItemData } from './valueList';

function VarToken(props: React.PropsWithChildren<{}>) {
  return (
    <Typography component="code" color="secondary">
      <span
        style={{
          backgroundColor: '#eee',
          borderRadius: 3,
          padding: '2px 4px',
          fontSize: 12,
          fontFamily: 'Fira Code'
        }}
      >
        {props.children}
      </span>
    </Typography>
  );
}

export namespace ValueList2 {
  export interface Props {
    varName: string;
    pinned: boolean;
    style?: React.CSSProperties;
    items: ValueListItemData[];
    onArrowUpwardClick?: RangeFilterClickEventHandler;
    onArrowDownwardClick?: RangeFilterClickEventHandler;
    currentFilterValue: {
      left?: string;
      right?: string;
    };
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

export const ValueList2: React.FunctionComponent<ValueList2.Props> = (props) => {
  const {
    varName,
    pinned,
    style,
    items,
    onArrowDownwardClick,
    onArrowUpwardClick,
    onEnter,
    onLeave
  } = props;
  const classes = useStyles();

  return (
    <Paper style={style} className={classes.root} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <Box display="flex" pl={2} pr={2} pt={1} pb={1}>
        <Box flexGrow={1}>
          <VarToken>{varName}</VarToken>
        </Box>
        <Box mr={3}>
          <Typography variant="overline" style={{ lineHeight: 'normal' }}>
            L103, C19
          </Typography>
        </Box>
        <Box>
          <FormGroup>
            <FormControlLabel
              control={<Switch size="small" checked={pinned} value="checkedB" color="primary" />}
              label="Pin"
              style={{ marginRight: 0 }}
            />
          </FormGroup>
        </Box>
      </Box>
      <Divider />
      <List dense={true}>
        {items.map((item) => (
          <ValueListItem
            key={item.id}
            item={item}
            disableArrowUpward={props.currentFilterValue.right === item.timestamp}
            disableArrowDownward={props.currentFilterValue.left === item.timestamp}
            onArrowUpwardClick={onArrowUpwardClick}
            onArrowDownwardClick={onArrowDownwardClick}
          ></ValueListItem>
        ))}
      </List>
    </Paper>
  );
};
