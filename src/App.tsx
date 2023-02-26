import { useQuery } from "@tanstack/react-query";
import React from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";
import usePostsStore, { IPost } from "./store/posts.store";

function App() {
  const editedPostId = usePostsStore((state) => state.editedPostId);
  const { isFetching, data: posts } = useQuery(
    ["posts"],
    async () => {
      const response = await fetch(import.meta.env.VITE_POSTS_API_URL);
      const posts = await response.json();
      return posts as IPost[];
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
      <AddPostForm />
      {isFetching || !posts ? (
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
