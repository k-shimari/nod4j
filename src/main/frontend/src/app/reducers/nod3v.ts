import { nod4jActions } from 'app/actions';
//import { VarInfo } from 'app/models/varListData';
import { VarValueData } from 'app/models/varValueData';
import { handleActions } from 'redux-actions';
import { RootState } from './index';

const initialState: RootState.nod4jState = {
  projects: undefined,
  filter: {
    range: {}
  },
  originalValueListData: new VarValueData({}),
  filteredValueListData: new VarValueData({}),
  files: {
    dirs: [],
    items: [],
    loading: true
  },
  sourceCodeTokens: undefined,
  recentdata:  undefined
};

export const nod4jReducer = handleActions<RootState.nod4jState, any>(
  {
    [nod4jActions.Type.SET_VALUE_LIST_FILTER]: (state, action) => {
      const { context, kind } = action.payload! as nod4jActions.Payload.SetValueListFilter;

      const left = kind === 'left' ? context : state.filter.range.left;
      const right = kind === 'right' ? context : state.filter.range.right;

      return {
        ...state,
        filter: { range: { left, right } }
      };
    },
    [nod4jActions.Type.CLEAR_ALL_FILTERS]: (state) => {
      return {
        ...state,
        filter: { range: { left: undefined, right: undefined } }
      };
    },
    [nod4jActions.Type.SET_ORIGINAL_VALUE_LIST_DATA]: (state, action) => {
      const { data } = action.payload! as nod4jActions.Payload.SetOriginalValueListData;

      return {
        ...state,
        originalValueListData: data
      };
    },
    [nod4jActions.Type.SET_FILTERED_VALUE_LIST_DATA]: (state, action) => {
      const { data } = action.payload! as nod4jActions.Payload.SetFilteredValueListData;

      return {
        ...state,
        filteredValueListData: data
      };
    },
    [nod4jActions.Type.REQUEST_FILES]: (state) => {
      return {
        ...state,
        files: {
          ...state.files,
          loading: true
        }
      };
    },
    [nod4jActions.Type.SET_FILES_DATA]: (state, action) => {
      const { dirs, items } = action.payload! as nod4jActions.Payload.SetFilesDataPayload;

      return {
        ...state,
        files: { dirs, items, loading: false }
      };
    },
    [nod4jActions.Type.SET_SOURCE_CODE_DATA]: (state, action) => {
      const { tokens } = action.payload! as nod4jActions.Payload.SetSourceCodeData;

      return {
        ...state,
        sourceCodeTokens: tokens
      };
    },
   [nod4jActions.Type.SET_VAR_LIST_JSON_DATA]: (state, action) => {
      const { data } = action.payload! as nod4jActions.Payload.SetVarListJsonData;
      return {
        ...state,
        recentdata: data
      };
    },

    [nod4jActions.Type.SET_PROJECTS]: (state, action) => {
      const { projects } = action.payload! as nod4jActions.Payload.SetProjects;

      return {
        ...state,
        projects
      };
    },
    [nod4jActions.Type.ADD_PROJECT]: (state, action) => {
      const { project } = action.payload! as nod4jActions.Payload.AddProject;

      return {
        ...state,
        projects: [...(state.projects || []), project]
      };
    },
    [nod4jActions.Type.REMOVE_PROJECT]: (state, action) => {
      const { project } = action.payload! as nod4jActions.Payload.RemoveProject;

      let projects = state.projects || [];
      const index = projects.map((x) => x.name).indexOf(project.name);
      if (index >= 0) {
        projects = [...projects.slice(0, index), ...projects.slice(index + 1)];
      }

      return {
        ...state,
        projects
      };
    }
  },
  initialState
);
