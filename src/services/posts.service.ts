import { IPost } from "../store/posts.store";

const POSTS_API_URL = import.meta.env.VITE_POSTS_API_URL;

export const fetchPosts = async (): Promise<IPost[]> => {
  const response = await fetch(POSTS_API_URL);
  const data = await response.json();
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`${POSTS_API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const addPost = async (post: {
  title: string;
  body: string;
  user_id: number;
}): Promise<void> => {
  await fetch(POSTS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const editPost = async (post: {
  title: string;
  body: string;
  id: number;
}): Promise<void> => {
  await fetch(`${POSTS_API_URL}/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: post.title,
      body: post.body,
    }),
  });
};
