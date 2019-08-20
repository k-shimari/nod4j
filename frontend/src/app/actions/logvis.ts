import { VarValueData } from 'app/components/sourcecode';
import { ExecId } from 'app/reducers/state';
import { createAction } from 'redux-actions';

export type RangeFilterKind = 'top' | 'bottom';

export namespace LogvisActions {
  export enum Type {
    DUMMY_ACTION = 'DUMMY_ACTION',

    // Filter系
    SET_VALUE_LIST_FILTER = 'SET_VALUE_LIST_FILTER',
    REMOVE_VALUE_LIST_FILTER = 'REMOVE_VALUE_LIST_FILTER',
    CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS',

    SET_ORIGINAL_VALUE_LIST_DATA = 'SET_ORIGINAL_VALUE_LIST_DATA',
    SET_FILTERED_VALUE_LIST_DATA = 'SET_FILTERED_VALUE_LIST_DATA'
  }

  export namespace Payload {
    export interface SetValueListFilter {
      execId: ExecId;
      kind: RangeFilterKind;
    }

    export interface RemoveValueListFilter {
      kind: RangeFilterKind;
    }

    export interface SetOriginalValueListData {
      data: VarValueData;
    }

    export interface SetFilteredValueListData {
      data: VarValueData;
    }
  }

  export const dummyAction = createAction(Type.DUMMY_ACTION);
  export const setValueListFilter = createAction<Payload.SetValueListFilter>(
    Type.SET_VALUE_LIST_FILTER
  );
  export const removeValueListFilter = createAction<Payload.RemoveValueListFilter>(
    Type.REMOVE_VALUE_LIST_FILTER
  );
  export const clearAllFilters = createAction(Type.CLEAR_ALL_FILTERS);
  export const setOriginalValueListData = createAction<Payload.SetOriginalValueListData>(
    Type.SET_ORIGINAL_VALUE_LIST_DATA
  );
  export const setFilteredValueListData = createAction<Payload.SetFilteredValueListData>(
    Type.SET_FILTERED_VALUE_LIST_DATA
  );
}

export type LogvisActions = Omit<typeof LogvisActions, 'Type'>;
