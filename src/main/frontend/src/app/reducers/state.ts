import { ProjectInfo } from 'app/models/api';
import { ProjectItem } from 'app/models/project';
import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';
import { VarInfo } from 'app/models/varListData';

/**
 * manage state and router of nod4j.
 */
export interface RootState {
  nod4j: RootState.nod4jState;
  router?: any;
}

export type Timestamp = string;
/**
 * @param timestamp is the timestamp of the recorded value.
 * @param value is the value of the variable.
 * @param lineNumber is the line number of the variable.
 * @param fileName is the fileName which contains the variable.
 * @param varName is the variable name.
 * @param inst is the instruction (refer or assign).
 */
export interface TimestampRangeFilterContext {
  timestamp: Timestamp;
  value: string | number;
  lineNumber: number;
  fileName: string;
  varName: string;
  inst: string;
}

/**
 * @param left is the start point of the filetering.
 * @param right is the start point of the filetering.
 */
export interface TimeStampRangeFilter {
  left?: TimestampRangeFilterContext;
  right?: TimestampRangeFilterContext;
}

export interface TimeStampRangeFilter2 {
  left: TimestampRangeFilterContext | null;
  right: TimestampRangeFilterContext | null;
}

export namespace RootState {
  /**
   * @param range contains the start and end point of the filtering.
   */
  export interface FilterState {
    range: TimeStampRangeFilter;
  }

  /**
   * @param dirs is the array of the directory name.
   * @param items are the array of the directory or file.
   * @param loading means whether contents have already displayed or not.
   */
  export interface FilesState {
    dirs: string[];
    items: ProjectItem[];
    loading: boolean;
  }
  /**
   * @param projects contains the name of the project and api to read the json of the project.
   * @param filter is the current filter condition.
   * @param originalValueListData are the all valueList data in the source file. 
   * @param filteredValueListData are the filtered valueList data by filter in the source file. 
   * @param files is the filestate.
   * @param sourceCodeTokens are the tokens in the source code.
   * @param recentdata are the variable information (variable name, line number...).
   */
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
