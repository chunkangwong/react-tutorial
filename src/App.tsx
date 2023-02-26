import React, { useEffect } from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";
import { fetchPosts } from "./features/posts/posts.slice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function App() {
  const { posts, editedPostId, isFetching, error } = useAppSelector(
    (state) => state.posts
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
      window.alert(error.message || "Something went wrong!");
    }
  }, [error]);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
