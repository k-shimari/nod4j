import { LogvisActions } from 'app/actions';
import { ValueListItem } from 'app/components/organisms/valueList';
import { VarValueData } from 'app/components/sourcecode';
import * as JavaLexer from 'app/models/javaLexer';
import { rawSourceCode } from 'app/models/rawSourceCode';
import { SourceCodeToken } from 'app/models/token';
import { JsonData, jsonData, VarInfo } from 'app/models/variable';
import { handleActions } from 'redux-actions';
import { RootState } from './index';

const initialState: RootState.LogvisState = {
  filter: {
    range: {}
  },
  originalValueListData: {},
  filteredValueListData: {},
  files: {
    parentDirs: [],
    currentDir: '/',
    items: [],
    loading: true
  }
};

function computeTokenId(variable: VarInfo, tokens: SourceCodeToken[]): string {
  const { linenum, count, var: varName } = variable;
  const match = tokens.filter((x) => x.startLine === Number(linenum) && x.image === varName);

  if (count > match.length) {
    throw new Error('Impossible');
  }
  const id = match[count - 1].id;
  return id;
}

function createVarValueData(data: JsonData, tokens: SourceCodeToken[]): VarValueData {
  let result: any = {};
  for (const d of data.data) {
    const item: ValueListItem[] = d.valueList.map((x, index) => ({
      id: index.toString(),
      value: x.data
    }));

    const id = computeTokenId(d, tokens);
    result[id] = item;
  }

  return result;
}

export const logvisReducer = handleActions<RootState.LogvisState, any>(
  // TODO: Filter系のreducerの中でoriginalValueListDataから
  // filteredValueListDataを作る
  {
    [LogvisActions.Type.SET_VALUE_LIST_FILTER]: (state, action) => {
      const { execId, kind } = action.payload! as LogvisActions.Payload.SetValueListFilter;

      const top = kind === 'top' ? execId : state.filter.range.top;
      const bottom = kind === 'bottom' ? execId : state.filter.range.bottom;

      // ここで計算してあげよう
      const tokens = JavaLexer.tokenize(rawSourceCode);
      const varValueData = createVarValueData(jsonData, tokens);

      return {
        ...state,
        filter: { range: { top, bottom } },
        filteredValueListData: varValueData
      };
    },
    [LogvisActions.Type.REMOVE_VALUE_LIST_FILTER]: (state, actiion) => {
      const { kind } = actiion.payload! as LogvisActions.Payload.RemoveValueListFilter;
      const top = kind === 'top' ? undefined : state.filter.range.top;
      const bottom = kind === 'bottom' ? undefined : state.filter.range.bottom;

      return {
        ...state,
        filter: { range: { top, bottom } }
      };
    },
    [LogvisActions.Type.CLEAR_ALL_FILTERS]: (state, action) => {
      return {
        ...state,
        filter: { range: { top: undefined, bottom: undefined } }
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
    [LogvisActions.Type.REQUEST_FILES]: (state, action) => {
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
    }
  },
  initialState
);
