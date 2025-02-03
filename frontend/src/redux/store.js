import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stockSlice";
import durationReducer from "./durationSlice";

const store = configureStore({
  reducer: {
    stock: stockReducer,
    duration: durationReducer,
  },
});

export default store;
