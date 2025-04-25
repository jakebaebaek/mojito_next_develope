"use client";

import style from "./LoginModal.module.scss";
import Close from "@public/Close.svg";
import KakaoLoginButton from "@public/kakao_login.png";
import { useModalStore } from "@/lib/store/modalStore";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginModal() {
  const { isOpen, close } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={close}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div>로그인이 필요한 서비스입니다</div>

        <Image
          src={KakaoLoginButton.src}
          alt="Kakao Login"
          onClick={() => signIn("kakao")}
          width={200}
          height={50}
        />
      </div>
      <div onClick={close} className={style.close_button}>
        <Close className={style.close} />
      </div>
    </div>
  );
}
