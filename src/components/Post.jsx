import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, setEditedPostId } from "../features/posts/posts.slice";

const Post = ({ post: { id, title, body } }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditButtonClick = (id) => () => {
    dispatch(setEditedPostId(id));
  };

  const handleDeletePost = (id) => async () => {
    setIsLoading(true);
    try {
      dispatch(deletePost(id));
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
