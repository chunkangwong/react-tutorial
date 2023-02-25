import { useContext } from "react";
import PostsContext, { POSTS_API_URL } from "../contexts/posts.context";

const Post = ({ post: { id, title, body } }) => {
  const { setEditedPostId, posts, setPosts } = useContext(PostsContext);

  const handleEditButtonClick = (id) => () => {
    setEditedPostId(id);
  };

  const handleDeletePost = (id) => async () => {
    await fetch(POSTS_API_URL + `/${id}`, {
      method: "DELETE",
    });
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      <button type="button" onClick={handleEditButtonClick(id)}>
        Edit
      </button>
      <button onClick={handleDeletePost(id)}>Delete</button>
    </div>
  );
};

export default Post;
