import { useDispatch, useSelector } from "react-redux";
import { deletePost, setEditedPostId } from "../features/posts/posts.slice";

const Post = ({ post: { id, title, body } }) => {
  const dispatch = useDispatch();
  const isDeleting = useSelector((state) => state.posts.isDeleting);

  const handleEditButtonClick = (id) => () => {
    dispatch(setEditedPostId(id));
  };

  const handleDeletePost = (id) => async () => {
    try {
      dispatch(deletePost(id));
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong!");
    }
  };

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      {!isDeleting && (
        <button type="button" onClick={handleEditButtonClick(id)}>
          Edit
        </button>
      )}
      <button onClick={handleDeletePost(id)} disabled={isDeleting}>
        {isDeleting ? "Deleting post..." : "Delete"}
      </button>
    </div>
  );
};

export default Post;
