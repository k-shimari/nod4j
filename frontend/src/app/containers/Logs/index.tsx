import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import { nod3vActions, TimestampRangeFilterKind } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { JsonLogs } from 'app/components/jsonLog';
import { UrlParser } from 'app/models/pathParser';
import { RootState } from 'app/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import * as React from 'react';
import useReactRouter from 'use-react-router';
import { VarInfo } from 'app/models/varListData';



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

export function LogsContainer() {
    const nod3vState = useSelector<RootState, RootState.nod3vState>((state) => state.nod3v);

    const dispatch = useDispatch();
    //  const files = useSelector<RootState, RootState.FilesState>((state) => state.nod3v.files);
    const classes = useStyles();
    const { location, match } = useReactRouter<{ projectName: string }>();
    const currentUrl = location.pathname;
    const { dirs, file } = UrlParser.matchDirAndFileOfLogsUrl(currentUrl);
    const { projectName } = match.params;

    React.useEffect(() => {
        dispatch(nod3vActions.requestJson({ projectName, target: { dirs, file } }));
    }, []);
    const data = nod3vState.recentdata;

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
