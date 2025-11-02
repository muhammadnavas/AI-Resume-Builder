import { configureStore } from "@reduxjs/toolkit";
import resumeReducers from "../features/resume/resumeFeatures";

export const resumeStore = configureStore({
  reducer: {
    editResume: resumeReducers,
  },
});
