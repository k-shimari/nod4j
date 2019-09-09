import { Button, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { LogvisActions } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import * as React from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2)
  }
}));

function MainPanel() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Welcome to LOGVIS
      </Typography>
      <Typography component="p">
        <Link href="/files">Demo</Link>
      </Typography>
      <Typography component="p" color="textSecondary">
        Source code is availabe on{' '}
        <Link href="https://github.com/k-shimari/LOGVIS" target="_blank">
          GitHub
        </Link>
        .
      </Typography>
      <Typography component="p" color="textSecondary">
        Author:{' '}
        <Link href="https://github.com/k-shimari" target="_blank">
          k-shimari
        </Link>{' '}
        <Link href="https://github.com/maxfie1d" target="_blank">
          maxfie1d
        </Link>
      </Typography>
    </Paper>
  );
}

function DebugPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3" gutterBottom>
        Debug
      </Typography>
      <div>
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(LogvisActions.clearLocalStorage())}
        >
          Clear localStorage
          <DeleteIcon />
        </Button>
      </div>
    </Paper>
  );
}

export function App() {
  return (
    <ContentContainer>
      <MainPanel />
      <DebugPanel />
    </ContentContainer>
  );
}
