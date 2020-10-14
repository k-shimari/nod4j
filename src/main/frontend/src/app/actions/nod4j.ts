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

    // Project
    REQUEST_PROJECTS = 'REQUEST_PROJECTS',
    SET_PROJECTS = 'SET_PROJECTS',
    REQUEST_ADD_PROJECT = 'REQUEST_ADD_PROJECT',
    ADD_PROJECT = 'ADD_PROJECT',
    REQUEST_REMOVE_PROJECT = 'REQUEST_REMOVE_PROJECT',
    REMOVE_PROJECT = 'REMOVE_PROJECT',

    // Filter
    REQUEST_VALUE_LIST_FILTER_CHANGE = 'REQUEST_VALUE_LIST_FILTER_CHANGE',
    LOAD_INITIAL_VALUE_LIST_FILTER = 'LOAD_INITIAL_VALUE_LIST_FILTER',
    SET_VALUE_LIST_FILTER = 'SET_VALUE_LIST_FILTER',
    CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS',

    SET_ORIGINAL_VALUE_LIST_DATA = 'SET_ORIGINAL_VALUE_LIST_DATA',
    SET_FILTERED_VALUE_LIST_DATA = 'SET_FILTERED_VALUE_LIST_DATA',

    // Files
    REQUEST_FILES = 'REQUEST_FILES',
    SET_FILES_DATA = 'SET_FILES_DATA',

    // Source code
    REQUEST_SOURCE_CODE_DATA = 'REQUEST_SOURCE_CODE_DATA',
    SET_SOURCE_CODE_DATA = 'SET_SOURCE_CODE_DATA',

    // Logs
    REQUEST_JSON = 'REQUEST_JSON',
    SET_VAR_LIST_JSON_DATA = 'SET_VAR_LIST_JSON_DATA',

    // Debug
    CLEAR_LOCAL_STORAGE = 'CLEAR_LOCAL_STORAGE',

    // Others
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

  // Project
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

  // Filter
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

  // Files
  export const requestFiles = createAction<Payload.RequestFilesPayload>(Type.REQUEST_FILES);
  export const setFilesData = createAction<Payload.SetFilesDataPayload>(Type.SET_FILES_DATA);

  // Source code
  export const requestSourceCodeData = createAction<Payload.RequestSourceCodeData>(
    Type.REQUEST_SOURCE_CODE_DATA
  );
  export const SetSourceCodeData = createAction<Payload.SetSourceCodeData>(
    Type.SET_SOURCE_CODE_DATA
  );

  //JsonLog
  export const requestJson = createAction<Payload.RequestJson>(Type.REQUEST_JSON);
  export const setVarListJsonData = createAction<Payload.SetVarListJsonData>(Type.SET_VAR_LIST_JSON_DATA);

  // Debug
  export const clearLocalStorage = createAction(Type.CLEAR_LOCAL_STORAGE);

  // Others
  export const initViewPage = createAction<Payload.InitViewPage>(Type.INIT_VIEW_PAGE);
}

export type nod4jActions = Omit<typeof nod4jActions, 'Type'>;
