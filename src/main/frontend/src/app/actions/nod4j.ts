import { ProjectInfo } from 'app/models/api';
import { ProjectItem } from 'app/models/project';
import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';
import { TimestampRangeFilterContext } from 'app/reducers/state';
import { createAction } from 'redux-actions';
import { VarInfo } from 'app/models/varListData';

export type TimestampRangeFilterKind = 'left' | 'right';
export type Directory = string[];

export namespace nod4jActions {
  export enum Type {
    /**
     *  Actions for Project
     */
    REQUEST_PROJECTS = 'REQUEST_PROJECTS',
    SET_PROJECTS = 'SET_PROJECTS',

    /**
     *  Actions for Timestamp filter
     */
    REQUEST_VALUE_LIST_FILTER_CHANGE = 'REQUEST_VALUE_LIST_FILTER_CHANGE',
    LOAD_INITIAL_VALUE_LIST_FILTER = 'LOAD_INITIAL_VALUE_LIST_FILTER',
    SET_VALUE_LIST_FILTER = 'SET_VALUE_LIST_FILTER',
    CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS',

    SET_ORIGINAL_VALUE_LIST_DATA = 'SET_ORIGINAL_VALUE_LIST_DATA',
    SET_FILTERED_VALUE_LIST_DATA = 'SET_FILTERED_VALUE_LIST_DATA',

    /**
     *  Actions for files
     */
    REQUEST_FILES = 'REQUEST_FILES',
    SET_FILES_DATA = 'SET_FILES_DATA',

    /**
     *  Actions for Source code
     */
    REQUEST_SOURCE_CODE_DATA = 'REQUEST_SOURCE_CODE_DATA',
    SET_SOURCE_CODE_DATA = 'SET_SOURCE_CODE_DATA',

    /**
     *  Actions for Logs Page
     */
    REQUEST_JSON = 'REQUEST_JSON',
    SET_VAR_LIST_JSON_DATA = 'SET_VAR_LIST_JSON_DATA',

    /**
     *  Actions for initialization
     */
    INIT_VIEW_PAGE = 'INIT_VIEW_PAGE'
  }

  export namespace Payload {
    /**
     * @param projects contains the name of the project and api to read the json of the project.
     */
    export interface SetProjects {
      projects: ProjectInfo[];
    }

    /**
     * @param projectName is the name of the project.
     * @param kind is the left/right filter which means the filtering start/end point.
     * @param context is the filtering point information (e.g., token name, line number).
     * @param preferNotify notifies the changing of filtering by storing at localStorage
     */
    export interface RequestValueListFilterChange {
      projectName: string;
      kind: TimestampRangeFilterKind;
      context: TimestampRangeFilterContext | undefined;
      preferNotify?: boolean;
    }

    /**
     * @param projectName is the name of the project.
     */
    export interface LoadInitialValueListFilterChange {
      projectName: string;
    }

    /**
     * @param kind is the left/right filter which means the filtering start/end point.
     * @param context is the filtering point information (e.g., token name, line number).
     */
    export interface SetValueListFilter {
      kind: TimestampRangeFilterKind;
      context: TimestampRangeFilterContext | undefined;
    }

    /**
     * @param data are all values, thread IDs and timestamps recorded in the execution.
     */
    export interface SetOriginalValueListData {
      data: VarValueData;
    }

    /**
     * @param data are all values, thread IDs and timestamps recorded in the execution.
     */
    export interface SetFilteredValueListData {
      data: VarValueData;
    }

    /**
     * @param projectName is the name of the project.
     * @param directory is the array of the directory name.
     */
    export interface RequestFilesPayload {
      projectName: string;
      directory: Directory;
    }

    /**
     * @param dirs is the array of the directory name.
     * @param items are the array of the directory or file.
     */
    export interface SetFilesDataPayload {
      dirs: string[];
      items: ProjectItem[];
    }

    /**
     * @param projectName is the name of the project.
     * @param target is the target file and its path got by concatting dirs and file.
     */
    export interface RequestSourceCodeData {
      projectName: string;
      target: {
        dirs: string[];
        file: string;
      };
    }

    /**
     * @param tokens are the tokens in the source code.
     */
    export interface SetSourceCodeData {
      tokens: SourceCodeToken[];
    }

    /**
     * @param projectName is the name of the project.
     * @param target is the target file and its path got by concatting dirs and file.
     */
    export interface RequestJson {
      projectName: string;
      target: {
        dirs: string[];
        file: string;
      };
    }
    /**
     * @param data are the all variable information in the project.
     */
    export interface SetVarListJsonData {
      data: VarInfo[];
    }

    /**
     * @param projectName is the name of the project.
     */
    export interface InitViewPage {
      projectName: string;
    }
  }

  /**
   *  Create Actions for Project
   */
  export const requestProjects = createAction(Type.REQUEST_PROJECTS);
  export const setProjects = createAction<Payload.SetProjects>(Type.SET_PROJECTS);

  /**
   *  Create Actions for Filter
   */
  export const requestValueListFilterChange = createAction<Payload.RequestValueListFilterChange>(
    Type.REQUEST_VALUE_LIST_FILTER_CHANGE
  );
  export const loadInitialValueListFilter = createAction<Payload.LoadInitialValueListFilterChange>(
    Type.LOAD_INITIAL_VALUE_LIST_FILTER
  );
  export const setValueListFilter = createAction<Payload.SetValueListFilter>(
    Type.SET_VALUE_LIST_FILTER
  );
  export const clearAllFilters = createAction(Type.CLEAR_ALL_FILTERS);
  export const setOriginalValueListData = createAction<Payload.SetOriginalValueListData>(
    Type.SET_ORIGINAL_VALUE_LIST_DATA
  );
  export const setFilteredValueListData = createAction<Payload.SetFilteredValueListData>(
    Type.SET_FILTERED_VALUE_LIST_DATA
  );

  /**
   *  Create Actions for Files
   */
  export const requestFiles = createAction<Payload.RequestFilesPayload>(Type.REQUEST_FILES);
  export const setFilesData = createAction<Payload.SetFilesDataPayload>(Type.SET_FILES_DATA);

  /**
   *  Create Actions for Source code
   */
  export const requestSourceCodeData = createAction<Payload.RequestSourceCodeData>(
    Type.REQUEST_SOURCE_CODE_DATA
  );
  export const SetSourceCodeData = createAction<Payload.SetSourceCodeData>(
    Type.SET_SOURCE_CODE_DATA
  );

  /**
   *  Create Actions for Logs
   */
  export const requestJson = createAction<Payload.RequestJson>(Type.REQUEST_JSON);
  export const setVarListJsonData = createAction<Payload.SetVarListJsonData>(
    Type.SET_VAR_LIST_JSON_DATA
  );

  /**
   *  Create Actions for init View page
   */
  export const initViewPage = createAction<Payload.InitViewPage>(Type.INIT_VIEW_PAGE);
}

export type nod4jActions = Omit<typeof nod4jActions, 'Type'>;
