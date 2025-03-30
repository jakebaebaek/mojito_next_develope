import style from "./LoginModal.module.scss";
import Close from "@public/Close.svg";

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
        <img src="kakao_login.png" />
        <div onClick={onClose} className={style.close_button}>
          <Close className={style.close} />
        </div>
      </div>
    </div>
  );
}
