import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TEmoji } from "@/lib/types/Temoji";

type TEmojiStore = {
  emojiList: TEmoji[];
  setEmoji: (data: TEmoji[]) => void;
};

export const useEmojiStore = create<TEmojiStore>()(
  persist(
    (set, get) => ({
      emojiList: [],
      setEmoji: (data) => {
        set({ emojiList: data });
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
