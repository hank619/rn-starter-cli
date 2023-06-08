
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "../../api/counter";

/**
 * namespace, initlaState and common reducers.
 */
const counterSlice = createSlice({
  name: 'counter',
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
  },
  extraReducers: {
    'counter/incrementAsync/fulfilled': (state, { payload }) => {
      state.count += payload;
    },
  },
});


/**
 * actions
 */
// side effects actions, like API request
 export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (s: number) => {
    const response = await fetchCount(s);
    return response.data;
  }
);

// common actions generated according to common reducers
export const {increment, decrement} = counterSlice.actions;


/**
 * deault export
 */
export default counterSlice.reducer;
