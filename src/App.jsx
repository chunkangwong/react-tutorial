import React, { useState } from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
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
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

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
    const post = posts.find((post) => post.id === id);
    setEditedTitle(post.title);
    setEditedBody(post.body);
    setEditedPostId(id);
  };

  const handleDeletePost = (id) => () => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  const handleEditedTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditedBodyChange = (e) => {
    setEditedBody(e.target.value);
  };

  const handleEdit = (id) => (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="App">
      <AddPostForm onAddPost={handleAddPost} />
      {posts.map((post) => {
        return (
          <React.Fragment key={post.id}>
            {editedPostId === post.id ? (
              <div className="edit-post">
                <form onSubmit={handleEdit(post.id)}>
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
              </div>
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
