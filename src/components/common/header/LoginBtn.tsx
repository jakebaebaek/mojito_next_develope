"use client";

import style from "./Login.module.scss";
import Person from "@public/Person.svg";
import Link from "next/link";
import Image from "next/image";

import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { useLockButton } from "@/lib/hooks/useLockButton";
import { getProfile } from "@/lib/fetchs/fetchProfile";

export default function LoginBtn() {
  const { data: session, status } = useSession();
  const { profileImageState, setProfile } = useUserStore();
  const { locked, run } = useLockButton("login");
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      setProfile(res.nickname, res.profileImage);
    };
    if (session) {
      fetchProfile();
    }
  }, [session]);

  const handleLogin = () => {
    run(async () => {
      try {
        console.log("🚀 카카오 로그인 시도");
        await signIn("kakao");
      } catch (error) {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        console.error("🚨 로그인 실패", error);
      }
    });
  };

  // 1. 로딩 중이면 스피너
  if (status === "loading") {
    return (
      <button className={style.before_login_btn} disabled>
        <div className={style.spinner}></div>
      </button>
    );
  }

  // 2. 로그인된 상태 (프로필 이미지 or 아이콘)
  if (session) {
    return (
      <Link
        href="/mypage"
        className={`${style.after_login_btn} ${
          pathname === "/mypage" ? style.active : ""
        }`}
      >
        {profileImageState ? (
          <Image
            src={profileImageState}
            alt="profile Image"
            width={33}
            height={33}
            className={`${style.login_svg}`}
          />
        ) : (
          <Person width={50} height={50} />
        )}
      </Link>
    );
  }
  // 3. 미로그인 상태(버튼만)
  return (
    <button
      className={style.before_login_btn}
      disabled={locked}
      onClick={() => {
        handleLogin();
      }}
    >
      <Person className={style.login_svg} />
      <div className={style.login_txt}>login</div>
    </button>
  );
}
