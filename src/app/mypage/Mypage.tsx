"use client";
import style from "./Mypage.module.scss";
import Person from "@public/Person.svg";
import Setting from "@public/Setting.svg";
import Logout from "@public/Logout.svg";
import ProfileSettingModal from "@/components/common/modal/profileSetting";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemberStore } from "@/lib/store/memberStore";
import { useModalStore } from "@/lib/store/modalStore";
import Link from "next/link";

export default function Mypage() {
  const router = useRouter();
  const { heart, memo } = useMemberStore();
  const { openProfileModal, closeProfileModal } = useModalStore();

  return (
    <div className={`${style.container}`}>
      <div>
        <Person className={`${style.profile_image}`} />
      </div>
      <div className={`${style.nickname}`}>
        <h1>Zl존일짱경호</h1>
      </div>
      <div className={`${style.mypage_buttons}`}>
        <button className={`${style.button}`} onClick={openProfileModal}>
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
