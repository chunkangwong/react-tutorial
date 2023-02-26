import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addPost as addPostSerivce } from "../services/posts.service";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();
  const { mutate: addPost, isLoading } = useMutation({
    mutationFn: addPostSerivce,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      console.log(error);
      window.alert("Something went wrong!");
    },
    onSettled: () => {
      setTitle("");
      setBody("");
    },
  });

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addPost({
      title,
      body,
      user_id: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={handleBodyChange}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding post..." : "Add"}
      </button>
    </form>
  );
};

export default AddPostForm;
