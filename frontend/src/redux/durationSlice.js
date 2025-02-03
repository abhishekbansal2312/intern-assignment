import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDuration: "",
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
