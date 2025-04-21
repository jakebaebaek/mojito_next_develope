import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getEmoji } from "../fetchs/fetchEmoji";
import { TEmoji } from "@/lib/types/Temoji";

type TEmojiStore = {
  emojiList: TEmoji[];
  setEmoji: (data: TEmoji[]) => void;
  fetchEmoji: () => Promise<void>;
};

export const useEmojiStore = create<TEmojiStore>()(
  persist(
    (set, get) => ({
      emojiList: [],
      setEmoji: (data) => {
        set({ emojiList: data });
      },
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
