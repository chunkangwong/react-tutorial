import React, { useEffect, useState } from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";

const POSTS_API_URL = import.meta.env.VITE_POSTS_API_URL;

function App() {
  const [posts, setPosts] = useState([]);
  const [editedPostId, setEditedPostId] = useState(null);

  useEffect(() => {
    fetch(POSTS_API_URL).then((response) => {
      response.json().then((data) => {
        setPosts(data);
      });
    });
  }, []);

  const handleAddPost = async ({ title, body }) => {
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
    setPosts([...posts, newPost]);
  };

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

  const handleEdit = ({ id, title, body }) => {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          title: title,
          body: body,
        };
      }
      return post;
    });
    setPosts(newPosts);
    setEditedPostId(null);
  };

  return (
    <div className="App">
      <AddPostForm onAddPost={handleAddPost} />
      {posts.map((post) => {
        return (
          <React.Fragment key={post.id}>
            {editedPostId === post.id ? (
              <EditPostForm post={post} onEditPost={handleEdit} />
            ) : (
              <Post
                post={post}
                onEditButtonClick={handleEditButtonClick}
                onDeletPost={handleDeletePost}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default App;
