import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { nod3vActions, TimestampRangeFilterKind } from 'app/actions';
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
  const nod3vState = useSelector<RootState, RootState.nod3vState>((state) => state.nod3v);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { location, match } = useReactRouter<{ projectName: string }>();
  const currentUrl = location.pathname;
  const logUrl = currentUrl.replace(/\/view/, '/logs');
  const { dirs, file } = UrlParser.matchDirAndFileOfViewUrl(currentUrl);
  const { projectName } = match.params;

  React.useEffect(() => {
    dispatch(nod3vActions.initViewPage({ projectName }));
    dispatch(nod3vActions.requestSourceCodeData({ projectName, target: { dirs, file } }));
    dispatch(nod3vActions.loadInitialValueListFilter({ projectName }));
  }, []);

  const tokens = nod3vState.sourceCodeTokens;
  const { filteredValueListData } = nod3vState;
  const onArrowUpClick: RangeFilterClickEventHandler2 = (item, varInfo) => {
    dispatch(
      nod3vActions.requestValueListFilterChange({
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
      nod3vActions.requestValueListFilterChange({
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
    const { left, right } = nod3vState.filter.range;
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
        nod3vActions.requestValueListFilterChange({
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
          currentFilterValue={nod3vState.filter.range}
          tokens={tokens}
          varValueData={filteredValueListData}
          onArrowUpwardClick={onArrowUpClick}
          onArrowDownwardClick={onArrowDownClick}
        />
      </Paper>
    </ContentContainer>
  ) : null;
}
