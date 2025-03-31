import style from "./LoginModal.module.scss";
import Close from "@public/Close.svg";
import KakaoLoginButton from "@public/kakao_login.png";
import { signIn } from "next-auth/react";
import Image from "next/image";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div className={style.overlay} onClick={onClose}>
      <div
        className={style.modal}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않게
      >
        <div>로그인이 필요한 서비스 입니다</div>

        <Image
          src={KakaoLoginButton.src}
          alt="Kakao Login"
          onClick={() => signIn("kakao")}
          width={200} // Replace with the actual width of your image
          height={50} // Replace with the actual height of your image
        />
      </div>
      <div onClick={onClose} className={style.close_button}>
        <Close className={style.close} />
      </div>
    </div>
  );
}
