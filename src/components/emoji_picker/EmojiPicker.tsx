"use client";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";

type EmojiPickerProps = {
  setProfileImageLocal: (emoji: string) => void;
};

export default function EmojiPickerUI({
  setProfileImageLocal,
}: EmojiPickerProps) {
  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData.emoji, "이모지 클릭됨");
    setProfileImageLocal(emojiData.emoji);
  };
  return (
    <div>
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        emojiStyle={EmojiStyle.APPLE} // 이모지 스타일 설정
        width={700}
        height={400} // 이모지 피커의 너비 설정
        previewConfig={{ showPreview: false }} // 이모지 미리보기 비활성화
      />
    </div>
  );
}
