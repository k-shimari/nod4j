import { createAction } from 'redux-actions';

export namespace LogvisActions {
  export enum Type {
    DUMMY_ACTION = 'DUMMY_ACTION',

    // Filter系
    SET_VALUE_LIST_FILTER = 'SET_VALUE_LIST_FILTER',
    REMOVE_FILTER = 'REMOVE_FILTER',
    CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS',

    SET_ORIGINAL_VALUE_LIST_DATA = 'SET_ORIGINAL_VALUE_LIST_DATA',
    SET_FILTERED_VALUE_LIST_DATA = 'SET_FILTERED_VALUE_LIST_DATA'
  }

  export const dummyAction = createAction(Type.DUMMY_ACTION);
}

export type LogvisActions = Omit<typeof LogvisActions, 'Type'>;
