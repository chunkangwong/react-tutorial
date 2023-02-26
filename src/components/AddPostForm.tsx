import { useState } from "react";
import { addPost } from "../features/posts/posts.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const isAdding = useAppSelector((state) => state.posts.isAdding);

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      dispatch(addPost({ title, body, user_id: 1 }));
    } finally {
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
      <button type="submit" disabled={isAdding}>
        {isAdding ? "Adding post..." : "Add"}
      </button>
    </form>
  );
};

export default AddPostForm;
