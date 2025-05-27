"use client";

import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";

type EmojiPickerProps = {
  setProfileImage: (emojiData: EmojiClickData) => void;
};

export default function EmojiPickerUI(setProfileImage: any) {
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setProfileImage(emojiData.emoji); // 선택한 이모지만 저장e
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
