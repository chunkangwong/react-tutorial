export const initialState = {
  editedPostId: null,
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case "SET_EDITED_POST_ID":
      return {
        ...state,
        editedPostId: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
