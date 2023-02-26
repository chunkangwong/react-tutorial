import {
  deletePost,
  TPost,
  setEditedPostId,
} from "../features/posts/posts.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface PostProps {
  post: TPost;
}

const Post = ({ post: { id, title, body } }: PostProps) => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector((state) => state.posts.isDeleting);

  const handleEditButtonClick =
    (id: number): React.MouseEventHandler<HTMLButtonElement> =>
    () => {
      dispatch(setEditedPostId(id));
    };

  const handleDeletePost =
    (id: number): React.MouseEventHandler<HTMLButtonElement> =>
    () => {
      dispatch(deletePost(id));
    };

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      {!isDeleting && (
        <button type="button" onClick={handleEditButtonClick(id)}>
          Edit
        </button>
      )}
      <button onClick={handleDeletePost(id)} disabled={isDeleting}>
        {isDeleting ? "Deleting post..." : "Delete"}
      </button>
    </div>
  );
};

export default Post;
