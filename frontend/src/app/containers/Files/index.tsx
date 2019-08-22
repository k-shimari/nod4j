import { LogvisActions } from 'app/actions';
import { FileTable, FileTableRowProp } from 'app/components/organisms/fileTable';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import * as Path from 'path';
import { ProjectItem, ProjectItemKind } from 'app/models/project';
import { pathToFileURL } from 'url';
import { LinearProgress } from '@material-ui/core';

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

  computeLinkHref(name: string, kind: ProjectItemKind): string {
    const currentUrl = this.props.location.pathname;
    console.log(currentUrl);

    if (kind === 'file') {
      return Path.resolve(currentUrl.replace(/^\/files/, '/view'), name);
    } else {
      const navigateTo = Path.resolve(currentUrl, name);
      return navigateTo;
    }
  }

  mapItems(items: ProjectItem[]): FileTableRowProp[] {
    return items.map((item) => ({
      name: item.name,
      author: item.author,
      lastModifiedDate: item.lastModifiedDate,
      kind: item.kind,
      navigateTo: this.computeLinkHref(item.name, item.kind)
    }));
  }

  render() {
    const { files } = this.props;
    const { currentDir, parentDirs, items, loading } = files;

    return (
      <div>
        {loading ? (
          <LinearProgress variant="indeterminate" />
        ) : (
          <React.Fragment>
            <PathNavigation parentDirs={parentDirs} currentDir={currentDir} />
            <FileTable data={this.mapItems(items)} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export const FilesContainer = withRouter(FilesContainerComp);
