import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1, 2)
  }
}));

export const PathNavigation: React.FunctionComponent = (props) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/">
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
    </Paper>
  );
};
