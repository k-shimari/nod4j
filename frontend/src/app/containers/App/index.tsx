import { Button, Link as MULink, makeStyles, Paper, Typography, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { LogvisActions } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <MULink href="/project/demo/files">Demo</MULink>
      </Typography>
      <Typography component="p" color="textSecondary">
        Source code is availabe on{' '}
        <MULink href="https://github.com/k-shimari/LOGVIS" target="_blank">
          GitHub
        </MULink>
        .
      </Typography>
      <Typography component="p" color="textSecondary">
        Author:{' '}
        <MULink href="https://github.com/k-shimari" target="_blank">
          k-shimari
        </MULink>{' '}
        <MULink href="https://github.com/maxfie1d" target="_blank">
          maxfie1d
        </MULink>
      </Typography>
    </Paper>
  );
}

function OpenProjectPanel() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3" gutterBottom>
        Open project
      </Typography>
      <Button variant="contained" color="primary" href="/open">
        Open project
      </Button>
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <OpenProjectPanel />
        </Grid>
        <Grid item xs={6}>
          <DebugPanel />
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
