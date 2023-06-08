import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";

export const rootReducer = combineReducers({
  counter: counterSlice,
});
