import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePostsStore from "../store/posts.store";

const Post = ({ post: { id, title, body } }) => {
  const setEditedPostId = usePostsStore((state) => state.setEditedPostId);
  const queryClient = useQueryClient();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
      await fetch(import.meta.env.VITE_POSTS_API_URL + `/${id}`, {
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
    setEditedPostId(id);
  };

  const handleDeletePost = () => {
    deletePost();
  };

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      {!isLoading && (
        <button type="button" onClick={handleEditButtonClick}>
          Edit
        </button>
      )}
      <button onClick={handleDeletePost} disabled={isLoading}>
        {isLoading ? "Deleting post..." : "Delete"}
      </button>
    </div>
  );
};

export default Post;
