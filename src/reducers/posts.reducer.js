export const initialState = {
  posts: [],
  editedPostId: null,
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "SET_EDITED_POST_ID":
      return {
        ...state,
        editedPostId: action.payload,
      };
    case "EDIT_POST":
      const editedPost = action.payload;
      return {
        editedPostId: null,
        posts: state.posts.map((post) => {
          if (post.id === editedPost.id) {
            return editedPost;
          }
          return post;
        }),
      };
    case "DELETE_POST":
      const deletdPostId = action.payload;
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== deletdPostId),
      };
    default:
      return state;
  }
};

export default postsReducer;
