import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IControls, ICreatingCard, IEditingCard } from '../interfaces';

const INITIAL_STATE: IControls = {
  isCreatingWorkspace: false,
  isCreatingColumn: false,
  isCreatingTask: false,
  workspaceId: '',
  card: {
    isCreating: false,
    isEditing: false,
    columnId: '',
  },
  column: {
    isEditing: false,
    columnId: '',
  },
};

const sliceControls = createSlice({
  name: 'controls',
  initialState: INITIAL_STATE,
  reducers: {
    setCreatingWorkspace(state, { payload }: PayloadAction<boolean>) {
      return { ...state, isCreatingWorkspace: payload };
    },
    setWorkspaceId(state, { payload }: PayloadAction<string>) {
      return { ...state, workspaceId: payload };
    },
    setCreatingColumn(state, { payload }: PayloadAction<boolean>) {
      return { ...state, isCreatingColumn: payload };
    },
    setCreatingTask(state, { payload }: PayloadAction<ICreatingCard>) {
      return { ...state, card: payload };
    },
    setEditingColumn(state, { payload }: PayloadAction<IEditingCard>) {
      return { ...state, column: payload };
    },
  },
});

export default sliceControls.reducer;
export const {
  setCreatingWorkspace, setEditingColumn,
  setWorkspaceId, setCreatingColumn, setCreatingTask,
} = sliceControls.actions;
export const getControls = (state: any) => state.controls as IControls;
