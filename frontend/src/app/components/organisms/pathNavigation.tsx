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
  items: string[];
}

function computeHref(index: number, dirs: string[]): string {
  return '/files/' + dirs.slice(0, index).join('/');
}

export const PathNavigation: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { items } = props;
  const parentDirs = ['/', ...items.slice(0, items.length - 1)];
  return (
    <Paper className={classes.paper}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {parentDirs.map((item, index) => (
          <Link key={index} title={item} color="inherit" href={computeHref(index, items)}>
            {item}
          </Link>
        ))}
        {items.length > 0 ? (
          <Typography color="textPrimary">{items[items.length - 1]}</Typography>
        ) : null}
      </Breadcrumbs>
    </Paper>
  );
};
