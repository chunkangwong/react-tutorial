const Post = ({ post, onEditButtonClick, onDeletPost }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button type="button" onClick={onEditButtonClick(post.id)}>
        Edit
      </button>
      <button onClick={onDeletPost(post.id)}>Delete</button>
    </div>
  );
};

export default Post;
