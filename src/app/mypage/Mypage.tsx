"use client";
import style from "./Mypage.module.scss";
import Person from "@public/Person.svg";
import Setting from "@public/Setting.svg";
import Logout from "@public/Logout.svg";
import ProfileSettingModal from "@/components/common/modal/profileSettingModal";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemberStore } from "@/lib/store/memberStore";
import { useModalStore } from "@/lib/store/modalStore";
import { useUserStore } from "@/lib/store/userStore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { set } from "mongoose";

export default function Mypage() {
  const router = useRouter();
  const { heart, memo } = useMemberStore();
  const { openProfileModal } = useModalStore();
  const { data: session } = useSession();
  const { nickname, setNickname } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.nickname && nickname === "") {
      setNickname(session.user.nickname);
    }
  }, [session]);

  return (
    <div className={`${style.container}`}>
      <div>
        <Person className={`${style.profile_image}`} />
      </div>
      <div className={`${style.nickname}`}>
        <h1>{nickname}</h1>
      </div>
      <div className={`${style.mypage_buttons}`}>
        <button className={`${style.button}`} onClick={openProfileModal}>
          <Setting className={`${style.svgIcon}`} />
          <h4> 프로필 수정 </h4>
        </button>
        <button
          disabled={isLoading}
          className={`${style.button}`}
          onClick={() => {
            if (isLoading) return;
            try {
              console.log("로그아웃 클릭");
              setIsLoading(true);
              isLoading && alert("잠시만 기다려주세요.");
              localStorage.removeItem("memberStore-storage");
              localStorage.removeItem("userStore");
              sessionStorage.removeItem("offset-storage");
              signOut({ callbackUrl: "/" });
              router.replace("/");
            } catch (error) {
              console.error("🚨 로그아웃 실패", error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <Logout className={`${style.svgIcon}`} />
          <h4> 로그아웃 </h4>
        </button>
      </div>

      <div className={`${style.cocktail_menu}`}>
        <Link href="/storage?tab=recorded">
          <div className={`${style.recorded_cocktail}`}>
            <h3> {memo.length ? memo.length : 0} </h3>
            <h3> 칵테일 기록 </h3>
          </div>
        </Link>
        <Link href="/storage?tab=favorite">
          <div className={`${style.favorite_cocktail}`}>
            <h3> {heart.length ? heart.length : 0} </h3>
            <h3> 찜한 칵테일 </h3>
          </div>
        </Link>
      </div>
      <div className={`${style.delete_account}`}>
        <h4>회원탈퇴</h4>
      </div>
      <ProfileSettingModal />
    </div>
  );
}
