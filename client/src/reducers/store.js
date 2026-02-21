import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userReducer";
import postsReducer from "./features/postsReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});
