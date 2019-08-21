import { VarValueData } from 'app/components/sourcecode';

export interface RootState {
  logvis: RootState.LogvisState;
  router?: any;
}

export type ExecId = string;

export namespace RootState {
  export interface LogvisState {
    filter: {
      range: {
        top?: ExecId;
        bottom?: ExecId;
      };
    };
    originalValueListData: VarValueData;
    filteredValueListData: VarValueData;
  }
}
