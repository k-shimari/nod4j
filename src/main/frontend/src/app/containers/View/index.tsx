import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { nod4jActions, TimestampRangeFilterKind } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { FilterDisplay } from 'app/components/atoms/filterDisplay';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { RangeFilterClickEventHandler } from 'app/components/organisms/valueList';
import { Sourcecode } from 'app/components/sourcecode';
import { UrlParser } from 'app/models/pathParser';
import { RootState } from 'app/reducers';
import * as _ from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import Button from '@material-ui/core/Button';

/**
 * Set the style for the view page.
 */
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
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

/**
 * This function returns three components, which are pathNavigation, timestamp filter, and source code.
 * PathNavigation shows the current directory in the specified project.
 * Timestamp filter shows the current filtering informantion.
 * Source code shows the source code with highlighting, which shows the value of variable.
 */
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

  /**
   * @param item contains valuelistItemdata(thread ID, timestamp, value)
   * @param varInfo is the inforamtion of variables which is highlighted
   * This handler changes the filter end point inforamtion specified by (item,varInfo).
   */
  const onArrowUpwardClick: RangeFilterClickEventHandler = (item, varInfo) => {
    dispatch(
      nod4jActions.requestValueListFilterChange({
        projectName,
        kind: 'right',
        context: {
          timestamp: item.timestamp,
          value: item.value,
          lineNumber: varInfo.startLine || 0,
          fileName: file,
          varName: varInfo.image
          // isPut: item.
        },
        preferNotify: true
      })
    );
  };

  /**
   * @param item contains valuelistItemdata(thread ID, timestamp, value)
   * @param varInfo is the inforamtion of variables which is highlighted
   * This handler changes the filter start point inforamtion specified by (item,varInfo).
   */
  const onArrowDownwardClick: RangeFilterClickEventHandler = (item, varInfo) => {
    dispatch(
      nod4jActions.requestValueListFilterChange({
        projectName,
        kind: 'left',
        context: {
          timestamp: item.timestamp,
          value: item.value,
          lineNumber: varInfo.startLine || 0,
          fileName: file,
          varName: varInfo.image
          // isPut: varInfo
        },
        preferNotify: true
      })
    );
  };

  /*
   * This component is the timestamp filter, which shows the current filtering informantion.
   * Filtering information consists of the location of the filtering point, and the value of the instruction.
   */
  function renderFilterChip(kind: TimestampRangeFilterKind) {
    const { left, right } = nod4jState.filter.range;
    const icon = kind === 'left' ? <ArrowDownward /> : <ArrowUpward />;
    const target = kind === 'left' ? left : right;
    const labelPrefix = kind === 'left' ? 'After' : 'Before';
    /* @TODO add variable and instruction name */
    const labelValue = target
      ? (() => {
          const { fileName, lineNumber, varName, value } = target;
          return `Line${lineNumber},${varName},${value} @${fileName}`;
        })()
      : 'none';
    const label = `${labelPrefix}: ${labelValue}`;

    /**
     * delete the current project filter.
     * @param kind is the left filter which means the filtering start point or the right filter which means the filtering end point.
     * @param context is the filter information.
     * @param preferNotify notifies the changing of filtering by storing at localStorage
     */
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

    return labelValue !== 'none' ? (
      <FilterDisplay
        className={classes.chip}
        size="small"
        icon={icon}
        label={label}
        color={hasValue ? 'primary' : 'default'}
        variant={hasValue ? 'default' : 'outlined'}
        onDelete={hasValue ? onDelete : undefined}
      />
    ) : (
      ''
    );
  }

  interface LogUrlProps {
    logUrl: string;
  }

  /*
   * The button links to Logs page.
   */
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
            INSTRUCTION FILTER
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
          onArrowUpwardClick={onArrowUpwardClick}
          onArrowDownwardClick={onArrowDownwardClick}
        />
      </Paper>
      {/* <Button
        variant="outlined"
        size="small"
        onClick={() => {
          dispatch(
            nod4jActions.requestValueListFilterChange({
              projectName,
              kind: 'left',
              context: undefined,
              preferNotify: true
            })
          );
          dispatch(
            nod4jActions.requestValueListFilterChange({
              projectName,
              kind: 'right',
              context: undefined,
              preferNotify: true
            })
          );
        }}
      >
        Clear Instruction Filter
      </Button> */}
    </ContentContainer>
  ) : null;
}
