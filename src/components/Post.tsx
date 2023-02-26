import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostService } from "../services/posts.service";
import usePostsStore, { IPost } from "../store/posts.store";

interface PostProps {
  post: IPost;
}

const Post = ({ post: { id, title, body } }: PostProps) => {
  const setEditedPostId = usePostsStore((state) => state.setEditedPostId);
  const queryClient = useQueryClient();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: deletePostService,
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
    deletePost(id);
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
