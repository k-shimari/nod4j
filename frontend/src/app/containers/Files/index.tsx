import { LinearProgress } from '@material-ui/core';
import { LogvisActions } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { FileTable, FileTableRowProp } from 'app/components/organisms/fileTable';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { ProjectItem, ProjectItemKind } from 'app/models/project';
import { RootState } from 'app/reducers';
import * as Path from 'path';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

export function FilesContainer() {
  const { location } = useReactRouter();
  const dispatch = useDispatch();
  const files = useSelector<RootState, RootState.FilesState>((state) => state.logvis.files);

  React.useEffect(() => {
    const currentUrl = location.pathname;
    dispatch(LogvisActions.requestFiles({ path: currentUrl }));
  }, []);

  function computeLinkHref(name: string, kind: ProjectItemKind): string {
    const currentUrl = location.pathname;
    console.log(currentUrl);

    if (kind === 'file') {
      return Path.resolve(currentUrl.replace(/^\/files/, '/view'), name);
    } else {
      const navigateTo = Path.resolve(currentUrl, name);
      return navigateTo;
    }
  }

  function mapItems(items: ProjectItem[]): FileTableRowProp[] {
    return items.map((item) => ({
      name: item.name,
      author: item.author,
      lastModifiedDate: item.lastModifiedDate,
      kind: item.kind,
      navigateTo: computeLinkHref(item.name, item.kind)
    }));
  }

  const { currentDir, parentDirs, items, loading } = files;

  return (
    <div>
      {loading ? (
        <LinearProgress variant="indeterminate" />
      ) : (
        <ContentContainer>
          <React.Fragment>
            <PathNavigation parentDirs={parentDirs} currentDir={currentDir} />
            <FileTable data={mapItems(items)} />
          </React.Fragment>
        </ContentContainer>
      )}
    </div>
  );
}
