import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../interfaces';

const INITIAL_STATE: ICard[] = [];

const sliceCards = createSlice({
  name: 'cards',
  initialState: INITIAL_STATE,
  reducers: {
    setCards(state, { payload }: PayloadAction<ICard[]>) {
      return { ...state, payload };
    },
  },
});

export default sliceCards.reducer;
export const { setCards } = sliceCards.actions;
export const getCards = (state: any) => state.cards as ICard[];
