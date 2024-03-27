import { configureStore } from "@reduxjs/toolkit";
import slice from "./Components/slice";

export const store = configureStore({
  reducer: {
    slice: slice,
  },
});
export default store;
