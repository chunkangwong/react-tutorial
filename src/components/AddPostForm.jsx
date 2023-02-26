import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/posts.slice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      dispatch(addPost({ title, body, user_id: 1 }));
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong!");
    } finally {
      setIsLoading(false);
      setTitle("");
      setBody("");
    }
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
