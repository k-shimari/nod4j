import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { nod4jActions, TimestampRangeFilterKind } from 'app/actions';
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
import Button from '@material-ui/core/Button';

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
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
}));

export function ViewContainer() {
  const nod4jState = useSelector<RootState, RootState.nod4jState>((state) => state.nod4j);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { location, match } = useReactRouter<{ projectName: string }>();
  const currentUrl = location.pathname;
  const logUrl = currentUrl.replace(/\/view/, '/logs');
  const { dirs, file } = UrlParser.matchDirAndFileOfViewUrl(currentUrl);
  const { projectName } = match.params;

  React.useEffect(() => {
    dispatch(nod4jActions.initViewPage({ projectName }));
    dispatch(nod4jActions.requestSourceCodeData({ projectName, target: { dirs, file } }));
    dispatch(nod4jActions.loadInitialValueListFilter({ projectName }));
  }, []);

  const tokens = nod4jState.sourceCodeTokens;
  const { filteredValueListData } = nod4jState;
  const onArrowUpClick: RangeFilterClickEventHandler2 = (item, varInfo) => {
    dispatch(
      nod4jActions.requestValueListFilterChange({
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
      nod4jActions.requestValueListFilterChange({
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
    const { left, right } = nod4jState.filter.range;
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
        nod4jActions.requestValueListFilterChange({
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



  interface LogUrlProps {
    logUrl: string;
  }

  const LogUrl: React.FunctionComponent<LogUrlProps> = (props) => (

    <div>
      <Button className={classes.button} href={props.logUrl} target="_blank" rel="noopener">
        All Logs
        </Button>
    </div>

  );

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
        <LogUrl logUrl={logUrl} />

        <Divider />
        <Sourcecode
          currentFilterValue={nod4jState.filter.range}
          tokens={tokens}
          varValueData={filteredValueListData}
          onArrowUpwardClick={onArrowUpClick}
          onArrowDownwardClick={onArrowDownClick}
        />
      </Paper>
    </ContentContainer>
  ) : null;
}
