import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  editedPostId: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setEditedPostId: (state, action) => {
      state.editedPostId = action.payload;
    },
    addPost: (state, action) => {
      const newPost = action.payload;
      state.posts = [...state.posts, newPost];
    },
    editPost: (state, action) => {
      const editedPost = action.payload;
      state.editedPostId = null;
      state.posts = state.posts.map((post) => {
        if (post.id === editedPost.id) {
          return editedPost;
        }
        return post;
      });
    },
    deletePost: (state, action) => {
      const deletdPostId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== deletdPostId);
    },
  },
});

export const { setPosts, setEditedPostId, addPost, editPost, deletePost } =
  postsSlice.actions;

export default postsSlice.reducer;
