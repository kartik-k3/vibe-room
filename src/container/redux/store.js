import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./reduxSlice/ThemeSlice";

const store = configureStore({
  reducer: {
    theme: ThemeSlice,
  },
});

export { store };
