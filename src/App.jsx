import React, { useState } from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";

const staticPosts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
];

function App() {
  const [posts, setPosts] = useState(staticPosts);
  const [editedPostId, setEditedPostId] = useState(null);

  const handleAddPost = ({ title, body }) => {
    const newPost = {
      userId: 1,
      id: posts.length + 1,
      title,
      body,
    };
    setPosts([...posts, newPost]);
  };

  const handleEditButtonClick = (id) => () => {
    setEditedPostId(id);
  };

  const handleDeletePost = (id) => () => {
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
