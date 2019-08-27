import { makeStyles, Paper } from '@material-ui/core';
import { LogvisActions } from 'app/actions';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { ValueListItemData } from 'app/components/organisms/valueList';
import { Sourcecode } from 'app/components/sourcecode';
import { parsePath } from 'app/models/pathParser';
import { RootState } from 'app/reducers';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    width: 720
  }
}));

export function ViewContainer() {
  const logvisState = useSelector<RootState, RootState.LogvisState>((state) => state.logvis);
  const dispatch = useDispatch();
  const { location } = useReactRouter();
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(LogvisActions.requestSourceCodeData({}));
  }, []);

  const tokens = logvisState.sourceCodeTokens;
  const { filteredValueListData } = logvisState;
  function onArrowUpClick(item: ValueListItemData) {
    dispatch(
      LogvisActions.requestValueListFilterChange({ kind: 'right', timestamp: item.timestamp })
    );
  }

  function onArrowDownClick(item: ValueListItemData) {
    dispatch(
      LogvisActions.requestValueListFilterChange({ kind: 'left', timestamp: item.timestamp })
    );
  }

  const currentUrl = location.pathname;
  const { parentDirs, currentDir } = parsePath('view', currentUrl);

  return tokens ? (
    <div>
      <PathNavigation parentDirs={parentDirs} currentDir={currentDir} />
      <Paper className={classes.paper}>
        <Sourcecode
          tokens={tokens}
          varValueData={filteredValueListData}
          onArrowUpwardClick={onArrowUpClick}
          onArrowDownwardClick={onArrowDownClick}
        />
      </Paper>
    </div>
  ) : null;
}
