// src/redux/durationSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  selectedDuration: "1D", // Default duration (1 day)
};

const durationSlice = createSlice({
  name: "duration",
  initialState,
  reducers: {
    setDuration: (state, action) => {
      state.selectedDuration = action.payload;
    },
  },
});

export const { setDuration } = durationSlice.actions;

export default durationSlice.reducer;
