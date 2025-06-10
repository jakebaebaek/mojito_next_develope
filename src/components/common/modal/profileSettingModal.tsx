"use client";

import style from "./ProfileSettingModal.module.scss";
import Button from "../button/Button";
import Person from "@public/Person.svg";
import EmojiPickerUI from "@/components/emoji_picker/EmojiPicker";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useModalStore } from "@/lib/store/modalStore";
import { useUserStore } from "@/lib/store/userStore";

type ProfileSettingModalProps = {
  nickname: string;
  profileImage: string | null;
  onSave: (name: string, profileImage: string) => Promise<void>;
};

export default function ProfileSettingModal({
  nickname,
  profileImage,
  onSave,
}: ProfileSettingModalProps) {
  const { profileModalOpen, closeProfileModal } = useModalStore();
  const { profileImageState, nicknameState } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nicknameLocal, setNicknameLocal] = useState("");

  const [profileImageLocal, setProfileImageLocal] = useState<string>();

  useEffect(() => {
    if (nickname && nickname.trim() !== "") {
      setNicknameLocal(nickname);
    }
  }, [nickname]);

  const handleModifyNickname = (name: string) => {
    if (name.length < 1 || name.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    setNicknameLocal(name);
    setIsEditing(false);
  };
  const handlesaveProfile = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string,
    profileImage: string
  ) => {
    if (profileImageState === profileImage && nicknameState === name) {
      event.preventDefault();
      alert("변경된 내용이 없습니다.");
      return;
    }
    onSave(name, profileImage)
      .then(() => {
        alert("✨프로필이 저장되었습니다.✨");
        console.log("프로필 저장 성공:", { name, profileImage });
        closeProfileModal();
      })
      .catch((error: unknown) => {
        console.error("프로필 저장 실패:", error);
        alert("프로필 저장에 실패했습니다. 다시 시도해주세요.");
      });
  };
  if (!profileModalOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${style.modal_inner}`}>
          <div className={`${style.modal_upper}`}>
            <Button
              text="완료"
              color="orange"
              className={`${style.confirm_button}`}
              onClick={(event: any) =>
                handlesaveProfile(event, nicknameLocal, profileImageLocal || "")
              }
            ></Button>
            <Button
              text="취소"
              color="red"
              className={`${style.close_button}`}
              onClick={closeProfileModal}
            ></Button>
            <h1 className={`${style.profile_title}`}>프로필 설정</h1>
            <div className={style.profile_image}>
              {profileImageLocal ? (
                <p>{profileImageLocal}</p>
              ) : profileImage ? (
                <p>{profileImage}</p>
              ) : (
                <Person />
              )}
            </div>

            <div className={`${style.nickname_container}`}>
              <h5>닉네임</h5>
              {!isEditing ? (
                <button
                  className={`${style.nickname_button}`}
                  onClick={() => setIsEditing(true)}
                >
                  {nickname.length < 1 ? (
                    <p className={`${style.empty_nickname}`}>
                      닉네임을 설정해주세요
                    </p>
                  ) : (
                    nicknameLocal
                  )}
                </button>
              ) : (
                <div className={`${style.nickname_edit}`}>
                  <div className={`${style.nickname_input_container}`}>
                    <input
                      type="text"
                      value={nicknameLocal}
                      onChange={(e) => setNicknameLocal(e.target.value)}
                      maxLength={15}
                      className={`${style.nickname_input}`}
                    />
                    <button
                      className={`${style.nickname_edit_button}`}
                      onClick={() => handleModifyNickname(nicknameLocal)}
                    >
                      수정
                    </button>
                  </div>
                  <p
                    className={`${
                      nicknameLocal.length >= 20
                        ? style.nickname_warning
                        : style.nickname_none
                    }`}
                  >
                    닉네임은 최대 15자까지 입력 가능합니다.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={`${style.modal_bottom}`}>
            <EmojiPickerUI setProfileImageLocal={setProfileImageLocal} />
          </div>
        </div>
      </div>
    </div>
  );
}
