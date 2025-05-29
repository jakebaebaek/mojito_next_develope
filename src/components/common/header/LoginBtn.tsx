import style from "./Login.module.scss";
import Person from "@public/Person.svg";
import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function LoginBtn() {
  const { data: session, status } = useSession();
  const [isClicked, setIsClicked] = useState(false);

  const handleLogin = async () => {
    try {
      console.log("🚀 카카오 로그인 시도");
      setIsClicked(true);
      await signIn("kakao", { redirect: true, callbackUrl: "/" });
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error("🚨 로그인 실패", error);
      setIsClicked(false);
    } finally {
      setTimeout(() => {
        setIsClicked(false);
      }, 2000);
    }
  };

  if (status === "loading") {
    return (
      <button className={style.login_btn} disabled>
        <div className={style.spinner}></div>
      </button>
    );
  }

  if (session) {
    return (
      <Link href="/mypage" className={style.login_btn}>
        my page
      </Link>
    );
  }

  return (
    <>
      {!isClicked ? (
        <button className={style.login_btn} onClick={handleLogin}>
          <Person className={style.login_svg} />
          <div className={style.login_txt}>login</div>
        </button>
      ) : (
        <button className={style.login_btn} disabled>
          <div className={style.spinner}></div>
        </button>
      )}
    </>
  );
}
