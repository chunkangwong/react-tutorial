import { useQuery } from "@tanstack/react-query";
import React from "react";
import "./App.css";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Post from "./components/Post";
import { fetchPosts } from "./services/posts.service";
import usePostsStore from "./store/posts.store";

function App() {
  const editedPostId = usePostsStore((state) => state.editedPostId);
  const { isFetching, data: posts } = useQuery(
    ["posts"],
    async () => {
      const posts = await fetchPosts();
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
