import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();
  const { mutate: addPost, isLoading } = useMutation({
    mutationFn: async () => {
      await fetch(import.meta.env.VITE_POSTS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          user_id: 1,
        }),
      });
      setTitle("");
      setBody("");
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost();
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
