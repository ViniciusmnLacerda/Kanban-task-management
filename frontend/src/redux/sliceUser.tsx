import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces';

const INITIAL_STATE: IUser = {
  id: 0,
  accountId: 0,
  name: '',
  lastName: '',
  image: '',
  token: '',
};

const sliceUser = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(_state, { payload }: PayloadAction<IUser>) {
      return { ...payload };
    },
  },
});

export default sliceUser.reducer;
export const { setUser } = sliceUser.actions;
export const getUser = (state: any) => state.user as IUser;
