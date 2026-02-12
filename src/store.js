import { configureStore } from "@reduxjs/toolkit";
import alphabetReducer from "./features/alphabetSlice";
import progressReducer from "./features/progressSlice";
import uiReducer from "./features/uiSlice";

export const store = configureStore({
  reducer: {
    alphabet: alphabetReducer,
    progress: progressReducer,
    ui: uiReducer,
  },
});

export default store;
