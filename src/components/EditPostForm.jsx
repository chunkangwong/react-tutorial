import { useContext, useState } from "react";
import PostsContext, { POSTS_API_URL } from "../contexts/posts.context";

const EditPostForm = ({ post: { id, title, body } }) => {
  const { posts, setPosts, setEditedPostId } = useContext(PostsContext);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  const handleEditedTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditedBodyChange = (e) => {
    setEditedBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(POSTS_API_URL + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editedTitle,
        body: editedBody,
      }),
    });
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          title: editedTitle,
          body: editedBody,
        };
      }
      return post;
    });
    setPosts(newPosts);
    setEditedPostId(null);
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
