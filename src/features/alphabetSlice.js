import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  letters: [],
  currentLetterId: null,
};

export const alphabetSlice = createSlice({
  name: "alphabet",
  initialState,
  reducers: {
    setLetters: (state, action) => {
      state.letters = action.payload;
    },
    setCurrentLetter: (state, action) => {
      state.currentLetterId = action.payload;
    },
  },
});

export const { setLetters, setCurrentLetter } = alphabetSlice.actions;

export default alphabetSlice.reducer;
