import { createAction } from 'redux-actions';

export namespace LogvisActions {
  export enum Type {
    DUMMY_ACTION = 'DUMMY_ACTION'
  }

  export const dummyAction = createAction(Type.DUMMY_ACTION);
}

export type LogvisActions = Omit<typeof LogvisActions, 'Type'>;
