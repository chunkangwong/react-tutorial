import { createContext } from "react";

export const POSTS_API_URL = import.meta.env.VITE_POSTS_API_URL;

const PostsContext = createContext();

export default PostsContext;
