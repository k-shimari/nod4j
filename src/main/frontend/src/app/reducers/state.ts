import { ProjectInfo } from 'app/models/api';
import { ProjectItem } from 'app/models/project';
import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';
import { VarInfo } from 'app/models/varListData';

export interface RootState {
  nod4j: RootState.nod4jState;
  router?: any;
}

export type Timestamp = string;
export interface TimestampRangeFilterContext {
  timestamp: Timestamp;
  value: string | number;
  lineNumber: number;
  fileName: string;
  varName: string;
  // isPut: boolean;
}

export interface TimeStampRangeFilter {
  left?: TimestampRangeFilterContext;
  right?: TimestampRangeFilterContext;
}

export namespace RootState {
  export interface FilterState {
    range: TimeStampRangeFilter;
  }

  export interface FilesState {
    dirs: string[];
    items: ProjectItem[];
    loading: boolean;
  }

  export interface nod4jState {
    projects: ProjectInfo[] | undefined;
    filter: FilterState;
    originalValueListData: VarValueData;
    filteredValueListData: VarValueData;
    files: FilesState;
    sourceCodeTokens: SourceCodeToken[] | undefined;
    recentdata: VarInfo[] | undefined;
  }
}
