import { ProjectInfo } from 'app/models/api';
import { ProjectItem } from 'app/models/project';
import { SourceCodeToken } from 'app/models/token';
//import { JsonLogs } from 'app/models/json';
import { VarValueData } from 'app/models/varValueData';
import { TimestampRangeFilterContext } from 'app/reducers/state';
import { createAction } from 'redux-actions';
import { VarInfo } from 'app/models/varListData';

export type TimestampRangeFilterKind = 'left' | 'right';
export type Directory = string[];

export namespace nod3vActions {
  export enum Type {
    DUMMY_ACTION = 'DUMMY_ACTION',

    // Project系
    REQUEST_PROJECTS = 'REQUEST_PROJECTS',
    SET_PROJECTS = 'SET_PROJECTS',
    REQUEST_ADD_PROJECT = 'REQUEST_ADD_PROJECT',
    ADD_PROJECT = 'ADD_PROJECT',
    REQUEST_REMOVE_PROJECT = 'REQUEST_REMOVE_PROJECT',
    REMOVE_PROJECT = 'REMOVE_PROJECT',

    // Filter系
    REQUEST_VALUE_LIST_FILTER_CHANGE = 'REQUEST_VALUE_LIST_FILTER_CHANGE',
    LOAD_INITIAL_VALUE_LIST_FILTER = 'LOAD_INITIAL_VALUE_LIST_FILTER',
    SET_VALUE_LIST_FILTER = 'SET_VALUE_LIST_FILTER',
    CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS',

    SET_ORIGINAL_VALUE_LIST_DATA = 'SET_ORIGINAL_VALUE_LIST_DATA',
    SET_FILTERED_VALUE_LIST_DATA = 'SET_FILTERED_VALUE_LIST_DATA',

    // Files系
    REQUEST_FILES = 'REQUEST_FILES',
    SET_FILES_DATA = 'SET_FILES_DATA',

    // Source code系
    REQUEST_SOURCE_CODE_DATA = 'REQUEST_SOURCE_CODE_DATA',
    SET_SOURCE_CODE_DATA = 'SET_SOURCE_CODE_DATA',

    // Logs系
    REQUEST_JSON = 'REQUEST_JSON',
    SET_VAR_LIST_JSON_DATA = 'SET_VAR_LIST_JSON_DATA',

    // Debug系
    CLEAR_LOCAL_STORAGE = 'CLEAR_LOCAL_STORAGE',

    // その他
    INIT_VIEW_PAGE = 'INIT_VIEW_PAGE'
  }

  export namespace Payload {
    export interface SetProjects {
      projects: ProjectInfo[];
    }

    export interface RequestAddProject {
      project: ProjectInfo;
    }

    export type AddProject = RequestAddProject;
    export type RequestRemoveProject = RequestAddProject;
    export type RemoveProject = RequestAddProject;

    export interface RequestValueListFilterChange {
      projectName: string;
      kind: TimestampRangeFilterKind;
      context: TimestampRangeFilterContext | undefined;
      preferNotify?: boolean;
    }

    export interface LoadInitialValueListFilterChange {
      projectName: string;
    }

    export interface SetValueListFilter {
      kind: TimestampRangeFilterKind;
      context: TimestampRangeFilterContext | undefined;
    }

    export interface SetOriginalValueListData {
      data: VarValueData;
    }

    export interface SetFilteredValueListData {
      data: VarValueData;
    }

    export interface RequestFilesPayload {
      projectName: string;
      directory: Directory;
    }
    

    export interface SetFilesDataPayload {
      dirs: string[];
      items: ProjectItem[];
    }

    export interface RequestSourceCodeData {
      projectName: string;
      target: {
        dirs: string[];
        file: string;
      };
    }

    export interface SetSourceCodeData {
      tokens: SourceCodeToken[];
    }

    export interface RequestJson {
      projectName: string;
      target: {
        dirs: string[];
        file: string;
      };
    }

    export interface SetVarListJsonData {
      data: VarInfo[];
    }

    export interface InitViewPage {
      projectName: string;
    }
  }

  export const dummyAction = createAction(Type.DUMMY_ACTION);

  // Project系
  export const requestProjects = createAction(Type.REQUEST_PROJECTS);
  export const setProjects = createAction<Payload.SetProjects>(Type.SET_PROJECTS);
  export const requestAddProject = createAction<Payload.RequestAddProject>(
    Type.REQUEST_ADD_PROJECT
  );
  export const addProject = createAction<Payload.AddProject>(Type.ADD_PROJECT);
  export const requestRemoveProject = createAction<Payload.RequestRemoveProject>(
    Type.REQUEST_REMOVE_PROJECT
  );
  export const removeProject = createAction<Payload.RemoveProject>(Type.REMOVE_PROJECT);

  // Filter系
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

  // Files系
  export const requestFiles = createAction<Payload.RequestFilesPayload>(Type.REQUEST_FILES);
  export const setFilesData = createAction<Payload.SetFilesDataPayload>(Type.SET_FILES_DATA);

  // Source code系
  export const requestSourceCodeData = createAction<Payload.RequestSourceCodeData>(
    Type.REQUEST_SOURCE_CODE_DATA
  );
  export const SetSourceCodeData = createAction<Payload.SetSourceCodeData>(
    Type.SET_SOURCE_CODE_DATA
  );

  //JsonLog系
  export const requestJson = createAction<Payload.RequestJson>(Type.REQUEST_JSON);
  export const setVarListJsonData = createAction<Payload.SetVarListJsonData>(Type.SET_VAR_LIST_JSON_DATA);

  // Debug系
  export const clearLocalStorage = createAction(Type.CLEAR_LOCAL_STORAGE);

  // その他
  export const initViewPage = createAction<Payload.InitViewPage>(Type.INIT_VIEW_PAGE);
}

export type nod3vActions = Omit<typeof nod3vActions, 'Type'>;
