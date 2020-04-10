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
          {projects
            ? projects.map((item, index) => <ProjectListItem key={index} {...item} />)
            : null}
        </List>
      </div>
      <Box display="flex" alignItems="center" mt={1} mb={1}>
        <Box flexGrow={1}>
          <TextField
            margin="dense"
            variant="outlined"
            fullWidth
            placeholder="Your project name"
            value={addProjectName}
            onChange={(e) => setAddProejctName(e.target.value)}
          />
        </Box>
        <Box ml={2}>
          <Button
            onClick={() => addProject(addProjectName)}
            disabled={!addProjectName}
            variant="contained"
            color={addProjectName ? 'primary' : 'default'}
          >
            Add project
          </Button>
        </Box>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">
          <MULink href="https://github.com/k-shimari/nod4j" target="_blank"> 
          You can check how to import your project here.
          </MULink>
        </Typography>
      </Box>
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
          onClick={() => dispatch(nod4jActions.clearLocalStorage())}
        >
          Clear Timestamp Filter
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
