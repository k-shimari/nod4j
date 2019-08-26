import { VarValueData } from 'app/components/sourcecode';
import { ProjectItem } from 'app/models/project';
import { SourceCodeToken } from 'app/models/token';

export interface RootState {
  logvis: RootState.LogvisState;
  router?: any;
}

export type ExecId = string;

export namespace RootState {
  export interface FilterState {
    range: {
      top?: ExecId;
      bottom?: ExecId;
    };
  }

  export interface FilesState {
    parentDirs: string[];
    currentDir: string;
    items: ProjectItem[];
    loading: boolean;
  }

  export interface LogvisState {
    filter: FilterState;
    originalValueListData: VarValueData;
    filteredValueListData: VarValueData;
    files: FilesState;
    sourceCodeTokens: SourceCodeToken[] | undefined;
  }
}
