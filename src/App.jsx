import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";
import { setPosts } from "./features/posts/posts.slice";

function App() {
  const { posts, editedPostId } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(import.meta.env.VITE_POSTS_API_URL)
      .then(async (response) => {
        const data = await response.json();
        dispatch(setPosts(data));
      })
      .catch((error) => {
        console.log(error);
        window.alert("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <AddPostForm />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        posts.map((post) => {
          return (
            <React.Fragment key={post.id}>
              {editedPostId === post.id ? (
                <EditPostForm post={post} />
              ) : (
                <Post post={post} />
              )}
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

export default App;
