import { FileTable } from 'app/components/organisms/fileTable';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps {}

class FilesContainerComp extends React.Component<Props> {
  componentDidMount() {
    // URLを取得する

    const currentUrl = this.props.location.pathname;
    console.log(currentUrl);
  }

  render() {
    return (
      <div>
        <PathNavigation parentDirs={[]} currentDir="/" />
        <FileTable
          data={[
            {
              name: 'index.js',
              author: 'naoto',
              date: new Date(),
              kind: 'file'
            }
          ]}
        ></FileTable>
      </div>
    );
  }
}

export const FilesContainer = withRouter(FilesContainerComp);
