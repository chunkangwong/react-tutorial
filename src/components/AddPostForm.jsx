import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import PostsContext, { POSTS_API_URL } from "../contexts/posts.context";

const AddPostForm = () => {
  const { dispatch } = useContext(PostsContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { isFetching, refetch: addPost } = useQuery(
    ["posts"],
    async () => {
      const response = await fetch(POSTS_API_URL, {
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
      const newPost = await response.json();
      dispatch({ type: "ADD_POST", payload: newPost });
      setTitle("");
      setBody("");
      return newPost;
    },
    {
      onError: (error) => {
        console.log(error);
        window.alert("Something went wrong!");
      },
      enabled: false,
    }
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost();
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
      <button type="submit" disabled={isFetching}>
        {isFetching ? "Adding post..." : "Add"}
      </button>
    </form>
  );
};

export default AddPostForm;
