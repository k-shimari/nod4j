import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

/**
 * Set styles for ContentContainer, which contains component (e.g., view, fileTable, ...).
 */
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    paddingTop: theme.spacing(2),
    maxWidth: 920
  }
}));

export function ContentContainer(props: React.PropsWithChildren<{}>) {
  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
}
