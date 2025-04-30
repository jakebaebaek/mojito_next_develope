"use client";
import style from "./Mypage.module.scss";
import Person from "@public/Person.svg";
import Setting from "@public/Setting.svg";
import Logout from "@public/Logout.svg";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemberStore } from "@/lib/store/memberStore";

export default function Mypage() {
  const router = useRouter();
  const { heart, memo } = useMemberStore();

  return (
    <div className={`${style.container}`}>
      <div>
        <Person className={`${style.profile_image}`} />
      </div>
      <div className={`${style.nickname}`}>
        <h1>Zl존일짱경호</h1>
      </div>
      <div className={`${style.mypage_buttons}`}>
        <button className={`${style.button}`}>
          <Setting className={`${style.svgIcon}`} />
          <h4> 프로필 수정 </h4>
        </button>
        <button
          className={`${style.button}`}
          onClick={() => {
            localStorage.removeItem("memberStore-storage");
            sessionStorage.removeItem("offset-storage");

            signOut({ callbackUrl: "/" });
            router.replace("/");
          }}
        >
          <Logout className={`${style.svgIcon}`} />
          <h4> 로그아웃 </h4>
        </button>
      </div>
      <div className={`${style.cocktail_menu}`}>
        <div className={`${style.favorite_cocktail}`}>
          <h3> {heart.length ? heart.length : 0} </h3>
          <h3> 찜한 칵테일 </h3>
        </div>
        <div className={`${style.recorded_cocktail}`}>
          <h3> {memo.length ? memo.length : 0} </h3>
          <h3> 칵테일 기록 </h3>
        </div>
      </div>
      <div className={`${style.delete_account}`}>
        <h4>회원탈퇴</h4>
      </div>
    </div>
  );
}
