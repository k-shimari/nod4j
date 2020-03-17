import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

interface Props {
  appName: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export const AppHeader: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" color="inherit">
            <Typography variant="h6" className={classes.title}>
              {props.appName}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
