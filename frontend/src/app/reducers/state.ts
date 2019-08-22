import { VarValueData } from 'app/components/sourcecode';
import { ProjectItem } from 'app/models/project';

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
  }

  export interface LogvisState {
    filter: FilterState;
    originalValueListData: VarValueData;
    filteredValueListData: VarValueData;
    files: FilesState;
  }
}
