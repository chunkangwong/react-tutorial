import { useContext, useState } from "react";
import PostsContext, { POSTS_API_URL } from "../contexts/posts.context";

const EditPostForm = ({ post: { id, title, body } }) => {
  const { dispatch } = useContext(PostsContext);
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
      const response = await fetch(POSTS_API_URL + `/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          body: editedBody,
        }),
      });
      const editedPost = await response.json();
      dispatch({
        type: "EDIT_POST",
        payload: editedPost,
      });
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
