import { useState } from "react";
import { editPost, TPost } from "../features/posts/posts.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface EditPostFormProps {
  post: TPost;
}

const EditPostForm = ({ post: { id, title, body } }: EditPostFormProps) => {
  const dispatch = useAppDispatch();
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);
  const isEditing = useAppSelector((state) => state.posts.isEditing);

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        editPost({
          id,
          title: editedTitle,
          body: editedBody,
        })
      );
    } finally {
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
      <button type="submit" disabled={isEditing}>
        {isEditing ? "Updating post..." : "Update"}
      </button>
    </form>
  );
};

export default EditPostForm;
