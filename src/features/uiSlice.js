import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: "alphabet", // alphabet, letter-detail, quiz, writing
  isLoading: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeView: (state, action) => {
      state.currentView = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeView, setLoading } = uiSlice.actions;

export default uiSlice.reducer;
