import { LogvisActions } from 'app/actions';
import { VarValueData } from 'app/models/varValueData';
import { handleActions } from 'redux-actions';
import { RootState } from './index';

const initialState: RootState.LogvisState = {
  filter: {
    range: {}
  },
  originalValueListData: new VarValueData({}),
  filteredValueListData: new VarValueData({}),
  files: {
    parentDirs: [],
    currentDir: '/',
    items: [],
    loading: true
  },
  sourceCodeTokens: undefined
};

export const logvisReducer = handleActions<RootState.LogvisState, any>(
  {
    [LogvisActions.Type.SET_VALUE_LIST_FILTER]: (state, action) => {
      const { context, kind } = action.payload! as LogvisActions.Payload.SetValueListFilter;

      const left = kind === 'left' ? context : state.filter.range.left;
      const right = kind === 'right' ? context : state.filter.range.right;

      return {
        ...state,
        filter: { range: { left, right } }
      };
    },
    [LogvisActions.Type.REMOVE_VALUE_LIST_FILTER]: (state, actiion) => {
      const { kind } = actiion.payload! as LogvisActions.Payload.RemoveValueListFilter;
      const top = kind === 'left' ? undefined : state.filter.range.left;
      const bottom = kind === 'right' ? undefined : state.filter.range.right;

      return {
        ...state,
        filter: { range: { left: top, right: bottom } }
      };
    },
    [LogvisActions.Type.CLEAR_ALL_FILTERS]: (state) => {
      return {
        ...state,
        filter: { range: { left: undefined, right: undefined } }
      };
    },
    [LogvisActions.Type.SET_ORIGINAL_VALUE_LIST_DATA]: (state, action) => {
      const { data } = action.payload! as LogvisActions.Payload.SetOriginalValueListData;

      return {
        ...state,
        originalValueListData: data
      };
    },
    [LogvisActions.Type.SET_FILTERED_VALUE_LIST_DATA]: (state, action) => {
      const { data } = action.payload! as LogvisActions.Payload.SetFilteredValueListData;

      return {
        ...state,
        filteredValueListData: data
      };
    },
    [LogvisActions.Type.REQUEST_FILES]: (state) => {
      return {
        ...state,
        files: {
          ...state.files,
          loading: true
        }
      };
    },
    [LogvisActions.Type.SET_FILES_DATA]: (state, action) => {
      const {
        currentDir,
        parentDirs,
        items
      } = action.payload! as LogvisActions.Payload.SetFilesDataPayload;

      return {
        ...state,
        files: { currentDir, parentDirs, items, loading: false }
      };
    },
    [LogvisActions.Type.SET_SOURCE_CODE_DATA]: (state, action) => {
      const { tokens } = action.payload! as LogvisActions.Payload.SetSourceCodeData;

      return {
        ...state,
        sourceCodeTokens: tokens
      };
    }
  },
  initialState
);
