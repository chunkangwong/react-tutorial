import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import PostsContext, { POSTS_API_URL } from "../contexts/posts.context";

const Post = ({ post: { id, title, body } }) => {
  const { dispatch } = useContext(PostsContext);
  const { isFetching, refetch: deletePost } = useQuery(
    ["posts"],
    async () => {
      const response = await fetch(POSTS_API_URL + `/${id}`, {
        method: "DELETE",
      });
      const deletedPost = await response.json();
      dispatch({ type: "DELETE_POST", payload: id });
      return deletedPost;
    },
    {
      onError: (error) => {
        console.log(error);
        window.alert("Something went wrong!");
      },
      enabled: false,
    }
  );

  const handleEditButtonClick = () => {
    dispatch({ type: "SET_EDITED_POST_ID", payload: id });
  };

  const handleDeletePost = async () => {
    await deletePost();
  };

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      {!isFetching && (
        <button type="button" onClick={handleEditButtonClick}>
          Edit
        </button>
      )}
      <button onClick={handleDeletePost} disabled={isFetching}>
        {isFetching ? "Deleting post..." : "Delete"}
      </button>
    </div>
  );
};

export default Post;
