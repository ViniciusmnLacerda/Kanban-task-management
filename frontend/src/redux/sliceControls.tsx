import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IControls } from '../interfaces';

const INITIAL_STATE: IControls = {
  isCreatingWorkspace: false,
};

const sliceControls = createSlice({
  name: 'controls',
  initialState: INITIAL_STATE,
  reducers: {
    setCreatingWorkspace(state, { payload }: PayloadAction<boolean>) {
      return { ...state, isCreatingWorkspace: payload };
    },
  },
});

export default sliceControls.reducer;
export const { setCreatingWorkspace } = sliceControls.actions;
export const getControls = (state: any) => state.controls as IControls;
