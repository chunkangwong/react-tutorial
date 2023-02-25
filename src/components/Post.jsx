import { useContext, useState } from "react";
import PostsContext, { POSTS_API_URL } from "../contexts/posts.context";

const Post = ({ post: { id, title, body } }) => {
  const { dispatch } = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditButtonClick = (id) => () => {
    dispatch({ type: "SET_EDITED_POST_ID", payload: id });
  };

  const handleDeletePost = (id) => async () => {
    setIsLoading(true);
    try {
      await fetch(POSTS_API_URL + `/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_POST", payload: id });
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      {!isLoading && (
        <button type="button" onClick={handleEditButtonClick(id)}>
          Edit
        </button>
      )}
      <button onClick={handleDeletePost(id)} disabled={isLoading}>
        {isLoading ? "Deleting post..." : "Delete"}
      </button>
    </div>
  );
};

export default Post;
