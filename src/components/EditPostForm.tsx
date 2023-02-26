import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import usePostsStore, { IPost } from "../store/posts.store";

interface EditPostFormProps {
  post: IPost;
}

const EditPostForm = ({ post: { id, title, body } }: EditPostFormProps) => {
  const setEditedPostId = usePostsStore((state) => state.setEditedPostId);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);
  const queryClient = useQueryClient();
  const { mutate: editPost, isLoading } = useMutation({
    mutationFn: async () => {
      await fetch(import.meta.env.VITE_POSTS_API_URL + `/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          body: editedBody,
        }),
      });
      setEditedTitle("");
      setEditedBody("");
      setEditedPostId(null);
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

  const handleEditedTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setEditedTitle(e.target.value);
  };

  const handleEditedBodyChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setEditedBody(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editPost();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={editedTitle}
        onChange={handleEditedTitleChange}
      />
      <input
        type="text"
        placeholder="Body"
        value={editedBody}
        onChange={handleEditedBodyChange}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Updating post..." : "Update"}
      </button>
    </form>
  );
};

export default EditPostForm;
