import { ProjectItem } from 'app/models/project';
import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';
import { TimestampRangeFilterContext } from 'app/reducers/state';
import { createAction } from 'redux-actions';

export type TimestampRangeFilterKind = 'left' | 'right';
export type Directory = string[];

export namespace LogvisActions {
  export enum Type {
    DUMMY_ACTION = 'DUMMY_ACTION',

    // Filter系
    REQUEST_VALUE_LIST_FILTER_CHANGE = 'REQUEST_VALUE_LIST_FILTER_CHANGE',
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

    // Debug系
    CLEAR_LOCAL_STORAGE = 'CLEAR_LOCAL_STORAGE'
  }

  export namespace Payload {
    export interface RequestValueListFilterChange {
      kind: TimestampRangeFilterKind;
      context: TimestampRangeFilterContext | undefined;
      preferNotify?: boolean;
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
      target: {
        dirs: string[];
        file: string;
      };
    }

    export interface SetSourceCodeData {
      tokens: SourceCodeToken[];
    }
  }

  export const dummyAction = createAction(Type.DUMMY_ACTION);

  // Filter系
  export const requestValueListFilterChange = createAction<Payload.RequestValueListFilterChange>(
    Type.REQUEST_VALUE_LIST_FILTER_CHANGE
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

  // Debug系
  export const clearLocalStorage = createAction(Type.CLEAR_LOCAL_STORAGE);
}

export type LogvisActions = Omit<typeof LogvisActions, 'Type'>;
