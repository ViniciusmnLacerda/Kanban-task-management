import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from './interfaces';

const INITIAL_STATE: IPeople[] = [];

const slicePeople = createSlice({
  name: 'people',
  initialState: INITIAL_STATE,
  reducers: {
    setPeople(_state, { payload }: PayloadAction<IPeople[]>) {
      return payload;
    },
  },
});

export default slicePeople.reducer;
export const { setPeople } = slicePeople.actions;
export const getPeople = (state: any) => state.people as IPeople[];
