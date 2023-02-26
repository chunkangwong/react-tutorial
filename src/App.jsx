import { useQuery } from "@tanstack/react-query";
import React, { useReducer } from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";
import PostsContext, { POSTS_API_URL } from "./contexts/posts.context";
import postsReducer, { initialState } from "./reducers/posts.reducer";

function App() {
  const [{ editedPostId }, dispatch] = useReducer(postsReducer, initialState);
  const { isFetching, data: posts } = useQuery(
    ["posts"],
    async () => {
      const response = await fetch(POSTS_API_URL);
      const posts = await response.json();
      return posts;
    },
    {
      onError: (error) => {
        console.log(error);
        window.alert("Something went wrong!");
      },
    }
  );

  return (
    <div className="App">
      <PostsContext.Provider value={{ dispatch }}>
        <AddPostForm />
        {isFetching ? (
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
