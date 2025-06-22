"use client";

import style from "./Login.module.scss";
import Person from "@public/Person.svg";
import Link from "next/link";
import Image from "next/image";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { getProfile } from "@/lib/fetchs/fetchProfile";

export default function LoginBtn() {
  const { data: session, status } = useSession();
  const [isClicked, setIsClicked] = useState(false);
  const { profileImageState, setProfile } = useUserStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile(); // ✅ 여기서 결과값 받아옴
      setProfile(res.nickname, res.profileImage);
      // 여기서 res.nickname 등으로 직접 접근 가능
    };

    fetchProfile();
  }, []);

  const handleLogin = async () => {
    try {
      console.log("🚀 카카오 로그인 시도");
      setIsClicked(true);
      console.log(session);
      await signIn("kakao");
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error("🚨 로그인 실패", error);
      setIsClicked(false);
    } finally {
      setIsClicked(false);
    }
  };

  if (status === "loading") {
    return (
      <button className={style.before_login_btn} disabled>
        <div className={style.spinner}></div>
      </button>
    );
  }

  if (session) {
    return (
      <Link href="/mypage" className={style.after_login_btn}>
        {profileImageState ? (
          <Image
            src={profileImageState}
            alt="profile Image"
            width={33}
            height={33}
            className={`${style.login_svg}`}
          />
        ) : (
          <Person />
        )}
      </Link>
    );
  }

  return (
    <>
      {!isClicked ? (
        <button className={style.before_login_btn} onClick={handleLogin}>
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
