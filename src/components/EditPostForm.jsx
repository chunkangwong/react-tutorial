import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../features/posts/posts.slice";

const EditPostForm = ({ post: { id, title, body } }) => {
  const dispatch = useDispatch();
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditedTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditedBodyChange = (e) => {
    setEditedBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      dispatch(
        editPost({
          id,
          title: editedTitle,
          body: editedBody,
        })
      );
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong!");
    } finally {
      setIsLoading(false);
      setEditedTitle("");
      setEditedBody("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={editedTitle}
        onChange={handleEditedTitleChange}
        required
      />
      <input
        type="text"
        placeholder="Body"
        value={editedBody}
        onChange={handleEditedBodyChange}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Updating post..." : "Update"}
      </button>
    </form>
  );
};

export default EditPostForm;
