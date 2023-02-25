import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";
import PostsContext, { POSTS_API_URL } from "./contexts/posts.context";
import postsReducer, { initialState } from "./reducers/posts.reducer";

function App() {
  const [{ posts, editedPostId }, dispatch] = useReducer(
    postsReducer,
    initialState
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(POSTS_API_URL)
      .then(async (response) => {
        const data = await response.json();
        dispatch({
          type: "SET_POSTS",
          payload: data,
        });
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
      <PostsContext.Provider value={{ dispatch }}>
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
      </PostsContext.Provider>
    </div>
  );
}

export default App;
