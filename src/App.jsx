import { useState } from "react";
import "./App.css";

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
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: 1,
      id: posts.length + 1,
      title,
      body,
    };
    setPosts([...posts, newPost]);
  };

  const handleDeletePost = (id) => () => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={handleBodyChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {posts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <button>Edit Title</button>
            <p>{post.body}</p>
            <button>Edit Body</button>
            <button onClick={handleDeletePost(post.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
