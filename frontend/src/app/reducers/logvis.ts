import { handleActions } from 'redux-actions';
import { RootState } from './index';

const initialState: RootState.LogvisState = {};

export const logvisReducer = handleActions<RootState.LogvisState, any>({}, initialState);
