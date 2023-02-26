import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";
import { fetchPosts } from "./features/posts/posts.slice";

function App() {
  const { posts, editedPostId, isFetching } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts()).catch((error) => {
      console.log(error);
      window.alert("Something went wrong!");
    });
  }, []);

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
