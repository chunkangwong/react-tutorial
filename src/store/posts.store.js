import { create } from "zustand";

const usePostsStore = create((set) => ({
  editedPostId: null,
  setEditedPostId: (id) => set({ editedPostId: id }),
}));

export default usePostsStore;
