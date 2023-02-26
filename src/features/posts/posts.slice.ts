import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TPost = {
  id: number;
  title: string;
  body: string;
  user_id: number;
};

const initialState = {
  posts: [] as TPost[],
  editedPostId: null as number | null,
  isFetching: false,
  isAdding: false,
  isEditing: false,
  isDeleting: false,
  error: null as Error | null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    const response = await fetch(import.meta.env.VITE_POSTS_API_URL);
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (
    {
      title,
      body,
      user_id,
    }: {
      title: string;
      body: string;
      user_id: number;
    },
    { rejectWithValue }
  ) => {
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
    if (!response.ok) {
      return rejectWithValue(newPost);
    }
    return newPost;
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (
    {
      id,
      title,
      body,
    }: {
      id: number;
      title: string;
      body: string;
    },
    { rejectWithValue }
  ) => {
    const response = await fetch(
      import.meta.env.VITE_POSTS_API_URL + `/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
        }),
      }
    );
    const editedPost = await response.json();
    if (!response.ok) {
      return rejectWithValue(editedPost);
    }
    return editedPost;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number, { rejectWithValue }) => {
    const response = await fetch(
      import.meta.env.VITE_POSTS_API_URL + `/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data);
    }
    return id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setEditedPostId: (state, action) => {
      state.editedPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as Error;
      })
      .addCase(addPost.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.isAdding = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload as Error;
      })
      .addCase(editPost.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const editedPost = action.payload;
        state.editedPostId = null;
        state.posts = state.posts.map((post) => {
          if (post.id === editedPost.id) {
            return editedPost;
          }
          return post;
        });
        state.isEditing = false;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isEditing = false;
        state.error = action.payload as Error;
      })
      .addCase(deletePost.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletdPostId = action.payload;
        state.posts = state.posts.filter((post) => post.id !== deletdPostId);
        state.isDeleting = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as Error;
      });
  },
});

export const { setEditedPostId } = postsSlice.actions;

export default postsSlice.reducer;
