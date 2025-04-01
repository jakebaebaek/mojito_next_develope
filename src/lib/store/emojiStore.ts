import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getEmoji } from "../fetchs/fetchEmoji";

type TEmojiStore = {
  emojiList: any[];
  fetchEmoji: () => Promise<void>;
};

export const useEmojiStore = create<TEmojiStore>()(
  persist(
    (set, get) => ({
      emojiList: [],

      fetchEmoji: async () => {
        const current = get().emojiList;
        if (current.length > 0) return; 

        const emojiList = await getEmoji();
        set({ emojiList });
      },
    }),
    {
      name: "emoji-storage",
    }
  )
);
function get() {
  throw new Error("Function not implemented.");
}

