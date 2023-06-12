
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchCount } from "../../api/counter";
import { AppDispatch } from "..";

/**
 * namespace, initialState and common reducers.
 */
const NAME = 'counter';
const counterSlice = createSlice({
  name: NAME,
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state, { payload }) => {
      const { step } = payload;
      state.count += step;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    save: (state, { payload }: PayloadAction<number>) => {
      state.count += payload;
    },
  },
});


/**
 * actions
 */
const incrementAsync = (delay: number) => (dispatch: AppDispatch) => {
  fetchCount(delay)
  .then((({data}) => {
    dispatch(save(data));
  }))
  .catch(() => {

  });
 };

// common actions generated according to common reducers
const {increment, decrement, save} = counterSlice.actions;

/**
 * export
 */
export { increment, decrement, save, incrementAsync };
export default counterSlice.reducer;

