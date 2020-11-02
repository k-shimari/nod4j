import { makeStyles, Paper } from '@material-ui/core';
import { nod4jActions} from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { JsonLogs } from 'app/components/jsonLog';
import { UrlParser } from 'app/models/pathParser';
import { RootState } from 'app/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import * as React from 'react';
import useReactRouter from 'use-react-router';

/**
 * Set Style for Logs Page.
 */
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1)
    }
}));

/**
 * Logs page shows the file path used PathNavigation and the logs imported from JsonLogs.
 * JsonLogs consists of the dataid, line, variable, timestamp, and value.
 */
export function LogsContainer() {
    const nod4jState = useSelector<RootState, RootState.nod4jState>((state) => state.nod4j);

    const dispatch = useDispatch();
    const classes = useStyles();
    const { location, match } = useReactRouter<{ projectName: string }>();
    const currentUrl = location.pathname;
    const { dirs, file } = UrlParser.matchDirAndFileOfLogsUrl(currentUrl);
    const { projectName } = match.params;

    React.useEffect(() => {
        dispatch(nod4jActions.requestJson({ projectName, target: { dirs, file } }));
    }, []);
    const data = nod4jState.recentdata;

    return data ? (
        <ContentContainer>
            <PathNavigation projectName={projectName} items={[...dirs, file]} />
            <Paper className={classes.paper}>
                <JsonLogs
                    data={data}
                />
            </Paper>
        </ContentContainer>
    ) : null;
}
