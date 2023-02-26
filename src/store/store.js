import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/posts.slice";

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
