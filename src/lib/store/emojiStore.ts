import { create } from "zustand";
import { getEmoji } from "../fetchs/fetchEmoji";

type TEmojiStore = {
  emojiList: any[];
  fetchEmoji: () => Promise<void>;
};

export const useEmojiStore = create<TEmojiStore>((set) => ({
  emojiList: [],

  fetchEmoji: async () => {
    const emojiList = await getEmoji();
    // console.log("😈", emojiList);
    set({ emojiList });
  },
}));
