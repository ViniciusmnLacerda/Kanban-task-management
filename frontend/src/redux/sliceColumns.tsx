import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../interfaces';

const INITIAL_STATE: IColumn[] = [];

const sliceColumns = createSlice({
  name: 'columns',
  initialState: INITIAL_STATE,
  reducers: {
    setColumns(state, { payload }: PayloadAction<IColumn[]>) {
      return { ...payload, payload };
    },
  },
});

export default sliceColumns.reducer;
export const { setColumns } = sliceColumns.actions;
export const getColumns = (state: any) => state.workspaces as IColumn[];
