"use client";

import { useEmojiStore } from "@/lib/store/emojiStore";
import { TEmoji } from "@/lib/types/Temoji";
import { useEffect } from "react";
import { getEmoji } from "@/lib/fetchs/fetchEmoji";

export default function EmojiClient() {
  const { emojiList, setEmoji } = useEmojiStore();

  useEffect(() => {
    getEmoji().then((emojis) => {
      setEmoji(emojis);
    });
  }, []);

  // console.log("👽", emojiList);

  return null;
}
