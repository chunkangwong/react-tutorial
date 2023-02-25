import React, { useEffect, useState } from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";
import PostsContext, { POSTS_API_URL } from "./contexts/posts.context";

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

  return (
    <div className="App">
      <PostsContext.Provider
        value={{ posts, setPosts, editedPostId, setEditedPostId }}
      >
        <AddPostForm />
        {posts.map((post) => {
          return (
            <React.Fragment key={post.id}>
              {editedPostId === post.id ? (
                <EditPostForm post={post} />
              ) : (
                <Post post={post} />
              )}
            </React.Fragment>
          );
        })}
      </PostsContext.Provider>
    </div>
  );
}

export default App;
