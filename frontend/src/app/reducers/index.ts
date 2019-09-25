import { combineReducers } from 'redux';
import { logvisReducer } from './logvis';
import { RootState } from './state';

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  logvis: logvisReducer as any
});
