import { create } from "zustand";

export type IPost = {
  id: number;
  title: string;
  body: string;
  user_id: number;
};

interface IPostsStore {
  editedPostId: number | null;
  setEditedPostId: (id: number | null) => void;
}

const usePostsStore = create<IPostsStore>((set) => ({
  editedPostId: null,
  setEditedPostId: (id) => set({ editedPostId: id }),
}));

export default usePostsStore;
