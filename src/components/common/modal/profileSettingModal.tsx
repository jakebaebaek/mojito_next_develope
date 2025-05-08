"use client";

import style from "./profileSettingModal.module.scss";
import Button from "../button/Button";
import Person from "@public/Person.svg";

import { useState } from "react";
import { useModalStore } from "@/lib/store/modalStore";
import { useUserStore } from "@/lib/store/userStore";
import { useSession } from "next-auth/react";

export default function ProfileSettingModal() {
  const { profileModalOpen, closeProfileModal } = useModalStore();
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const [nicknameLocal, setNicknameLocal] = useState(
    session?.user?.nickname || "닉네임을 설정해주세요"
  );
  const { nickname, setNickname } = useUserStore();

  const buttonsaveNickname = (name: string) => {
    if (name.length < 1 || name.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    setNickname(name)
      .then((res) => {
        console.log("닉네임 변경 성공", res);
        setNicknameLocal(name);
        setIsEditing(false);
        alert("✨닉네임이 변경되었습니다.");
      })
      .catch((err) => {
        alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
        console.error("닉네임 변경 실패", err);
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
              onClick={closeProfileModal}
            ></Button>

            <h1 className={`${style.profile_title}`}>프로필 설정</h1>
            <div className={style.profile_image}>
              <Person />
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
                    nickname
                  )}
                </button>
              ) : (
                <div className={`${style.nickname_edit}`}>
                  <div className={`${style.nickname_input_container}`}>
                    <input
                      type="text"
                      value={nicknameLocal}
                      onChange={(e) => setNicknameLocal(e.target.value)}
                      maxLength={20}
                      className={`${style.nickname_input}`}
                    />
                    <button
                      className={`${style.nickname_edit_button}`}
                      onClick={() => buttonsaveNickname(nicknameLocal)}
                    >
                      수정
                    </button>
                  </div>
                  {nickname.length >= 20 && (
                    <p className={style.nickname_warning}>
                      닉네임은 최대 20자까지 입력 가능합니다.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={`${style.modal_bottom}`}></div>
        </div>
      </div>
    </div>
  );
}
