import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IWorkspace from '../interfaces/IWorkspaces';

const INITIAL_STATE: IWorkspace[] = [];

const sliceWorkspaces = createSlice({
  name: 'workspaces',
  initialState: INITIAL_STATE,
  reducers: {
    setWorkspaces(_state, { payload }: PayloadAction<IWorkspace[]>) {
      return payload;
    },
  },
});

export default sliceWorkspaces.reducer;
export const { setWorkspaces } = sliceWorkspaces.actions;
export const getWorkspaces = (state: any) => state.workspaces as IWorkspace[];
