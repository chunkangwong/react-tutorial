import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  editedPostId: null,
};

export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ title, body, user_id }) => {
    const response = await fetch(import.meta.env.VITE_POSTS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        user_id,
      }),
    });
    const newPost = await response.json();
    return newPost;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
  },
});

export const { setPosts, setEditedPostId, editPost, deletePost } =
  postsSlice.actions;

export default postsSlice.reducer;
