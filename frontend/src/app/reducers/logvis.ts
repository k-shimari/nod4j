import { nod3vActions } from 'app/actions';
import { VarValueData } from 'app/models/varValueData';
import { handleActions } from 'redux-actions';
import { RootState } from './index';

const initialState: RootState.nod3vState = {
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
  sourceCodeTokens: undefined
};

export const nod3vReducer = handleActions<RootState.nod3vState, any>(
  {
    [nod3vActions.Type.SET_VALUE_LIST_FILTER]: (state, action) => {
      const { context, kind } = action.payload! as nod3vActions.Payload.SetValueListFilter;

      const left = kind === 'left' ? context : state.filter.range.left;
      const right = kind === 'right' ? context : state.filter.range.right;

      return {
        ...state,
        filter: { range: { left, right } }
      };
    },
    [nod3vActions.Type.CLEAR_ALL_FILTERS]: (state) => {
      return {
        ...state,
        filter: { range: { left: undefined, right: undefined } }
      };
    },
    [nod3vActions.Type.SET_ORIGINAL_VALUE_LIST_DATA]: (state, action) => {
      const { data } = action.payload! as nod3vActions.Payload.SetOriginalValueListData;

      return {
        ...state,
        originalValueListData: data
      };
    },
    [nod3vActions.Type.SET_FILTERED_VALUE_LIST_DATA]: (state, action) => {
      const { data } = action.payload! as nod3vActions.Payload.SetFilteredValueListData;

      return {
        ...state,
        filteredValueListData: data
      };
    },
    [nod3vActions.Type.REQUEST_FILES]: (state) => {
      return {
        ...state,
        files: {
          ...state.files,
          loading: true
        }
      };
    },
    [nod3vActions.Type.SET_FILES_DATA]: (state, action) => {
      const { dirs, items } = action.payload! as nod3vActions.Payload.SetFilesDataPayload;

      return {
        ...state,
        files: { dirs, items, loading: false }
      };
    },
    [nod3vActions.Type.SET_SOURCE_CODE_DATA]: (state, action) => {
      const { tokens } = action.payload! as nod3vActions.Payload.SetSourceCodeData;

      return {
        ...state,
        sourceCodeTokens: tokens
      };
    },
    [nod3vActions.Type.SET_PROJECTS]: (state, action) => {
      const { projects } = action.payload! as nod3vActions.Payload.SetProjects;

      return {
        ...state,
        projects
      };
    },
    [nod3vActions.Type.ADD_PROJECT]: (state, action) => {
      const { project } = action.payload! as nod3vActions.Payload.AddProject;

      return {
        ...state,
        projects: [...(state.projects || []), project]
      };
    },
    [nod3vActions.Type.REMOVE_PROJECT]: (state, action) => {
      const { project } = action.payload! as nod3vActions.Payload.RemoveProject;

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
