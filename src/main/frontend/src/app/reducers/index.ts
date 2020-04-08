import { combineReducers } from 'redux';
import { nod4jReducer } from './nod4j';
import { RootState } from './state';

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  nod4j: nod4jReducer as any
});
