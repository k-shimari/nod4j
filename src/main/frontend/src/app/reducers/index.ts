import { combineReducers } from 'redux';
import { nod3vReducer } from './nod3v';
import { RootState } from './state';

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  nod3v: nod3vReducer as any
});
