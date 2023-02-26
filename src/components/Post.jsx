import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import PostsContext, { POSTS_API_URL } from "../contexts/posts.context";

const Post = ({ post: { id, title, body } }) => {
  const { dispatch } = useContext(PostsContext);
  const queryClient = useQueryClient();
  const { mutate: deletePost, isFetching } = useMutation({
    mutationFn: async () => {
      await fetch(POSTS_API_URL + `/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      console.log(error);
      window.alert("Something went wrong!");
    },
  });

  const handleEditButtonClick = () => {
    dispatch({ type: "SET_EDITED_POST_ID", payload: id });
  };

  const handleDeletePost = () => {
    deletePost();
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
