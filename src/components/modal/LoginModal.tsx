import style from "./LoginModal.module.scss";
import Close from "@public/Close.svg";

export default function LoginModal() {
  return (
    <>
      <div className={`${style.modal}`}>
        <div>로그인이 필요한 서비스 입니다</div>
        <img src="kakao_login.png" />
        <Close className={`${style.close}`} />
      </div>
    </>
  );
}
