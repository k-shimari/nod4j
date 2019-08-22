import { LogvisActions } from 'app/actions';
import { FileTable } from 'app/components/organisms/fileTable';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

interface Props extends RouteComponentProps {
  actions: LogvisActions;
  files: RootState.FilesState;
}

@connect(
  (state: RootState) => ({
    files: state.logvis.files
  }),
  (dispatch: Dispatch) => ({
    actions: bindActionCreators(omit(LogvisActions, 'Type'), dispatch)
  })
)
class FilesContainerComp extends React.Component<Props> {
  componentDidMount() {
    const currentUrl = this.props.location.pathname;
    this.props.actions.requestFiles({ path: currentUrl });
  }

  render() {
    const { files } = this.props;
    const { currentDir, parentDirs, items } = files;

    return (
      <div>
        <PathNavigation parentDirs={parentDirs} currentDir={currentDir} />
        <FileTable
          data={items.map((item) => ({
            name: item.name,
            author: item.author,
            date: item.lastModifiedDate,
            kind: item.kind
          }))}
        ></FileTable>
      </div>
    );
  }
}

export const FilesContainer = withRouter(FilesContainerComp);
