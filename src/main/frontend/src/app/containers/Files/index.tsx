import { LinearProgress } from '@material-ui/core';
import { nod4jActions } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { FileTable, FileTableRowProp } from 'app/components/organisms/fileTable';
import { PathNavigation } from 'app/components/organisms/pathNavigation';
import { UrlParser } from 'app/models/pathParser';
import { ProjectItem, ProjectItemType } from 'app/models/project';
import { RootState } from 'app/reducers';
import * as Path from 'path';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

/**
 * This function returns two components, which are pathNavigation and fileTable.
 * PathNavigation shows the current directory in the specified project.
 * FileTable shows the list of files and directories in the current directory,
 * and maps the file to viewer for debugging.
 */
export function FilesContainer() {
  const { location, match } = useReactRouter<{ projectName: string }>();
  const dispatch = useDispatch();
  const files = useSelector<RootState, RootState.FilesState>((state) => state.nod4j.files);
  const projectName = match.params.projectName;

  React.useEffect(() => {
    const directory = UrlParser.matchDirOfProjectUrl(location.pathname);
    dispatch(nod4jActions.requestFiles({ projectName, directory }));
  }, []);

  /**
   * @param name
   * @param kind
   * Idetify whether the item is the file or not.
   * If the item is the file, link to the debugging view.
   * If the item is the direcotry, link to the directory.
   */
  function computeLinkHref(name: string, kind: ProjectItemType): string {
    const currentUrl = location.pathname;
    console.log(currentUrl);

    if (kind === 'file') {
      return Path.resolve(currentUrl.replace(/\/files/, '/view'), name);
    } else {
      const navigateTo = Path.resolve(currentUrl, name);
      return navigateTo;
    }
  }
  /**
   * @param items 
   * items are file or direcotry.
   * This function maps these items to the link of debugging view or directory fileTable.
   */
  function mapItems(items: ProjectItem[]): FileTableRowProp[] {
    return items.map((item) => ({
      name: item.name,
      type: item.type,
      navigateTo: computeLinkHref(item.name, item.type)
    }));
  }

  const { dirs, items, loading } = files;

  return (
    <div>
      {loading ? (
        <LinearProgress variant="indeterminate" />
      ) : (
        <ContentContainer>
          <React.Fragment>
            <PathNavigation projectName={projectName} items={dirs} />
            <FileTable data={mapItems(items)} />
          </React.Fragment>
        </ContentContainer>
      )}
    </div>
  );
}
