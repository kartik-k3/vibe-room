import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./reduxSlice/ThemeSlice";
import UserSlice from "./reduxSlice/UserSlice";

const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    user: UserSlice,
  },
});

export { store };
