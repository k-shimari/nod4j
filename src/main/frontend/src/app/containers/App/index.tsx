import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link as MULink,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { nod4jActions } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { ProjectInfo } from 'app/models/api';
import { RootState } from 'app/reducers';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      <Typography variant="h5" component="h3" gutterBottom>
        Welcome to nod4j
      </Typography>
      <Typography component="p" color="textSecondary">
        Source code is availabe on{' '}
        <MULink href="https://github.com/k-shimari/nod4j" target="_blank">
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

function ProjectListItem(props: ProjectInfo) {
  const dispatch = useDispatch();

  const { name } = props;
  function onClickClearButton() {
    dispatch(nod4jActions.requestRemoveProject({ project: { name } }));
  }

  return (
    <ListItem button component="a" href={`project/${name}/files`}>
      <ListItemText primary={name} primaryTypographyProps={{ color: 'primary' }} />
      <ListItemSecondaryAction>
        <IconButton size="small" edge="end" onClick={onClickClearButton}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function OpenProjectPanel() {
  const [addProjectName, setAddProejctName] = React.useState('');

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(nod4jActions.requestProjects());
  }, []);

  const projects = useSelector((state: RootState) => state.nod4j.projects);

  function addProject(projectName: string) {
    dispatch(nod4jActions.requestAddProject({ project: { name: projectName } }));
    setAddProejctName('');
  }

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3" gutterBottom>
        Open project
      </Typography>
      <div>
        <List dense>
        <ListItem button component="a" href={`project/demo/files`}>
            <ListItemText
              key={-1}
              primary="Demo"
              secondary="This is the demo project."
              primaryTypographyProps={{ color: 'primary' }}
            />
          </ListItem>
        </List>
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
      </Grid>
    </ContentContainer>
  );
}
