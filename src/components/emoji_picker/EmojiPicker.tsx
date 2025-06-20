"use client";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import style from "./EmojiPicker.module.scss";

type EmojiPickerProps = {
  setProfileImageLocal: (emoji: string) => void;
};

export default function EmojiPickerUI({
  setProfileImageLocal,
}: EmojiPickerProps) {
  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setProfileImageLocal(emojiData.imageUrl);
  };
  return (
    <div
      className={`${style.emojiPicker_wrapper}`}
      style={{ width: "100%", minWidth: "400px", maxWidth: "490px" }}
    >
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        emojiStyle={EmojiStyle.APPLE} // 이모지 스타일 설정
        width={480}
        height={370}
        previewConfig={{ showPreview: false }} // 이모지 미리보기 비활성화
      />
    </div>
  );
}
