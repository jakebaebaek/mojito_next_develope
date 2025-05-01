"use client";

import style from "./profileSetting.module.scss";
import Close from "@public/Close.svg";

import { useModalStore } from "@/lib/store/modalStore";
import Image from "next/image";

export default function ProfileSettingModal() {
  const { openProfileModal, profileModalOpen, closeProfileModal } =
    useModalStore();

  if (!profileModalOpen) return null;

  return (
    <div className={style.overlay} onClick={closeProfileModal}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>프로필 수정</h1>
          <div className={style.profile_image}>
            <Image
              src="/images/profile.png"
              alt="Profile Image"
              width={100}
              height={100}
            />
            <button>이미지 변경</button>
          </div>
          <div className={style.profile_info}>
            <h2>닉네임</h2>
            <input type="text" placeholder="닉네임을 입력하세요" />
          </div>
        </div>

        {/* <Image/> */}
        <div onClick={closeProfileModal} className={style.close_button}>
          <Close className={style.close} />
        </div>
      </div>
    </div>
  );
}
