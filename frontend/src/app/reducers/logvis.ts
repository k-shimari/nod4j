import { handleActions } from 'redux-actions';
import { RootState } from './index';

const initialState: RootState.LogvisState = {
  filter: {
    range: {}
  },
  originalValueListData: {},
  filteredValueListData: {}
};

export const logvisReducer = handleActions<RootState.LogvisState, any>({}, initialState);
