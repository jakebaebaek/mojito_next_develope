"use client";

import { useEmojiStore } from "@/lib/store/emojiStore";
import { TEmoji } from "@/lib/types/Temoji";
import { useEffect } from "react";

export default function EmojiClient({ emoji }: { emoji: TEmoji[] }) {
  const { setEmoji, emojiList } = useEmojiStore();

  useEffect(() => {
    setEmoji(emoji);
  }, [emoji]);

  // console.log("👽", emojiList);

  return null;
}
