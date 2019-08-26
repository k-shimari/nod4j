import { ProjectItem } from 'app/models/project';
import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';

export interface RootState {
  logvis: RootState.LogvisState;
  router?: any;
}

export type Timestamp = string;
export interface TimeStampRangeFilter {
  left?: Timestamp;
  right?: Timestamp;
}

export namespace RootState {
  export interface FilterState {
    range: TimeStampRangeFilter;
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
