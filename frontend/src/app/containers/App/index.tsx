import { Link, makeStyles, Paper, Typography } from '@material-ui/core';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export function App() {
  const classes = useStyles();

  return (
    <ContentContainer>
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
    </ContentContainer>
  );
}
