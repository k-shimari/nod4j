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

interface Props {
  parentDirs: string[];
  currentDir: string;
}

function computeHref(index: number, dirs: string[]): string {
  return '/files/' + dirs.slice(1, index + 1).join('/');
}

export const PathNavigation: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {props.parentDirs.map((dir, index) => (
          <Link key={index} title={dir} color="inherit" href={computeHref(index, props.parentDirs)}>
            {dir}
          </Link>
        ))}
        <Typography color="textPrimary">{props.currentDir}</Typography>
      </Breadcrumbs>
    </Paper>
  );
};
