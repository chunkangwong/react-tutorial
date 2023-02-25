import { useState } from "react";

const EditPostForm = ({ post, onEditPost }) => {
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const handleEditedTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditedBodyChange = (e) => {
    setEditedBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditPost({ id: post.id, title: editedTitle, body: editedBody });
    setEditedTitle("");
    setEditedBody("");
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
      <button type="submit">Update</button>
    </form>
  );
};

export default EditPostForm;
