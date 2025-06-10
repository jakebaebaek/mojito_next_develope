"use client";
import style from "./mypage.module.scss";
import Person from "@public/Person.svg";
import Setting from "@public/Setting.svg";
import Logout from "@public/Logout.svg";
import ProfileSettingModal from "@/components/common/modal/ProfileSettingModal";
import DeleteAccountConfirmModal from "@/components/common/modal/DeleteAccountConfirmModal";

import { signOut } from "next-auth/react";
import { useMemberStore } from "@/lib/store/memberStore";
import { useModalStore } from "@/lib/store/modalStore";
import { useUserStore } from "@/lib/store/userStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useLockButton } from "@/lib/hooks/useLockButton";
import Link from "next/link";
import Navigation from "@/components/common/navigation/Navigation";

export default function MypageClient() {
  const { heart, memo } = useMemberStore();
  const { openProfileModal, openDeleteAccountModal } = useModalStore();
  const { data: session } = useSession();
  const { nicknameState, profileImageState, setProfile } = useUserStore();
  const { locked, run } = useLockButton("logout");

  useEffect(() => {
    if (session?.user?.nickname && nicknameState === "") {
      setProfile(session.user.nickname, session.user.profileImage || "");
    }
    console.log("세션 정보:", session);
  }, [session]);

  const handleLogout = async () => {
    if (locked) return;
    run(async () => {
      try {
        console.log("로그아웃 시도");
        localStorage.removeItem("memberStore-storage");
        localStorage.removeItem("userStore");
        sessionStorage.removeItem("offset-storage");
        signOut({ callbackUrl: "/" });
      } catch (error) {
        alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
        console.error("🚨 로그아웃 실패", error);
      }
    });
  };
  return (
    <div className={`${style.container}`}>
      <Navigation />
      <div>
        {profileImageState ? (
          <p className={`${style.profile_image}`}>{profileImageState}</p>
        ) : (
          <Person className={`${style.profile_image}`} />
        )}
      </div>
      <div className={`${style.nickname}`}>
        <h1>{nicknameState}</h1>
      </div>
      <div className={`${style.mypage_buttons}`}>
        <button className={`${style.button}`} onClick={openProfileModal}>
          <Setting className={`${style.svgIcon}`} />
          <h4> 프로필 수정 </h4>
        </button>
        <button
          disabled={locked}
          className={`${style.button}`}
          onClick={handleLogout}
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
      <div
        className={`${style.delete_account}`}
        onClick={openDeleteAccountModal}
      >
        <h4>회원탈퇴</h4>
      </div>
      <ProfileSettingModal
        nickname={nicknameState}
        profileImage={profileImageState ?? null}
        onSave={setProfile}
      />
      <DeleteAccountConfirmModal />
    </div>
  );
}
