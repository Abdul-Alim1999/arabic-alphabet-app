import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  learnedLetters: [],
  points: 0,
  completedQuizzes: 0,
};

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    markLetterAsLearned: (state, action) => {
      if (!state.learnedLetters.includes(action.payload)) {
        state.learnedLetters.push(action.payload);
      }
    },
    addPoints: (state, action) => {
      state.points += action.payload;
    },
  },
});

export const { markLetterAsLearned, addPoints } = progressSlice.actions;

export default progressSlice.reducer;
