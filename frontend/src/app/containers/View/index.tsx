import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { LogvisActions, TimestampRangeFilterKind } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { FilterDisplay } from 'app/components/atoms/filterDisplay';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { RangeFilterClickEventHandler2 } from 'app/components/organisms/valueList';
import { Sourcecode } from 'app/components/sourcecode';
import { UrlParser } from 'app/models/pathParser';
import { RootState } from 'app/reducers';
import * as _ from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

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
  const { location, match } = useReactRouter<{ projectName: string }>();
  const currentUrl = location.pathname;
  const { dirs, file } = UrlParser.matchDirAndFileOfViewUrl(currentUrl);
  const { projectName } = match.params;

  React.useEffect(() => {
    dispatch(LogvisActions.initViewPage({ projectName }));
    dispatch(LogvisActions.requestSourceCodeData({ projectName, target: { dirs, file } }));
    dispatch(LogvisActions.loadInitialValueListFilter({ projectName }));
  }, []);

  const tokens = logvisState.sourceCodeTokens;
  const { filteredValueListData } = logvisState;
  const onArrowUpClick: RangeFilterClickEventHandler2 = (item, varInfo) => {
    dispatch(
      LogvisActions.requestValueListFilterChange({
        projectName,
        kind: 'right',
        context: {
          timestamp: item.timestamp,
          lineNumber: varInfo.startLine || 0,
          fileName: file
        },
        preferNotify: true
      })
    );
  };

  const onArrowDownClick: RangeFilterClickEventHandler2 = (item, varInfo) => {
    dispatch(
      LogvisActions.requestValueListFilterChange({
        projectName,
        kind: 'left',
        context: {
          timestamp: item.timestamp,
          lineNumber: varInfo.startLine || 0,
          fileName: file
        },
        preferNotify: true
      })
    );
  };

  function renderFilterChip(kind: TimestampRangeFilterKind) {
    const { left, right } = logvisState.filter.range;
    const icon = kind === 'left' ? <ArrowDownward /> : <ArrowUpward />;
    const target = kind === 'left' ? left : right;
    const labelPrefix = kind === 'left' ? 'After' : 'Before';
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
          projectName,
          kind: kind,
          context: undefined,
          preferNotify: true
        })
      );

    const hasValue = !_.isNil(target);

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
      <PathNavigation projectName={projectName} items={[...dirs, file]} />
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
