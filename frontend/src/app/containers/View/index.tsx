import { Chip, Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { LogvisActions, RangeFilterKind } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import {
  ValueListItemData,
  RangeFilterClickEventHandler2
} from 'app/components/organisms/valueList';
import { Sourcecode } from 'app/components/sourcecode';
import { parsePath } from 'app/models/pathParser';
import { RootState } from 'app/reducers';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { FilterDisplay } from 'app/components/atoms/filterDisplay';
import { SourceCodeToken } from 'app/models/token';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  timestampFilterSection: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export function ViewContainer() {
  const logvisState = useSelector<RootState, RootState.LogvisState>((state) => state.logvis);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { location } = useReactRouter();
  const currentUrl = location.pathname;
  const { parentDirs, currentDir } = parsePath('view', currentUrl);

  React.useEffect(() => {
    dispatch(LogvisActions.requestSourceCodeData({}));
  }, []);

  const tokens = logvisState.sourceCodeTokens;
  const { filteredValueListData } = logvisState;
  const onArrowUpClick: RangeFilterClickEventHandler2 = (item, varInfo) => {
    dispatch(
      LogvisActions.requestValueListFilterChange({
        kind: 'right',
        context: {
          timestamp: item.timestamp,
          lineNumber: varInfo.startLine || 0,
          fileName: currentDir
        }
      })
    );
  };

  const onArrowDownClick: RangeFilterClickEventHandler2 = (item, varInfo) => {
    dispatch(
      LogvisActions.requestValueListFilterChange({
        kind: 'left',
        context: {
          timestamp: item.timestamp,
          lineNumber: varInfo.startLine || 0,
          fileName: currentDir
        }
      })
    );
  };

  function renderFilterChip(leftOrRight: RangeFilterKind) {
    const { left, right } = logvisState.filter.range;
    const icon = leftOrRight === 'left' ? <ArrowDownward /> : <ArrowUpward />;
    const target = leftOrRight === 'left' ? left : right;
    const labelPrefix = leftOrRight === 'left' ? 'After' : 'Before';
    const labelValue = target
      ? (() => {
          const { fileName, lineNumber } = target;
          return `L${lineNumber}@${fileName}`;
        })()
      : 'none';
    const label = `${labelPrefix}: ${labelValue}`;
    const onDelete = () =>
      dispatch(
        LogvisActions.requestValueListFilterChange({
          kind: leftOrRight,
          context: undefined
        })
      );

    const hasValue = target !== undefined;
    return (
      <FilterDisplay
        className={classes.chip}
        size="small"
        icon={icon}
        label={label}
        color={hasValue ? 'primary' : 'default'}
        variant={hasValue ? 'default' : 'outlined'}
        onDelete={hasValue ? onDelete : undefined}
      />
    );
  }

  return tokens ? (
    <ContentContainer>
      <PathNavigation parentDirs={parentDirs} currentDir={currentDir} />
      <Paper className={classes.paper}>
        <div className={classes.timestampFilterSection}>
          <Typography variant="overline" color="textSecondary" gutterBottom>
            TIMESTAMP FILTER
          </Typography>
          <div>
            {renderFilterChip('left')}
            {renderFilterChip('right')}
          </div>
        </div>
        <Divider />
        <Sourcecode
          currentFilterValue={logvisState.filter.range}
          tokens={tokens}
          varValueData={filteredValueListData}
          onArrowUpwardClick={onArrowUpClick}
          onArrowDownwardClick={onArrowDownClick}
        />
      </Paper>
    </ContentContainer>
  ) : null;
}
