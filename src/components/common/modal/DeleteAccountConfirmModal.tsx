"use client";

import style from "./DeleteAccountConfirmModal.module.scss";
import Button from "../button/Button";

import { signOut } from "next-auth/react";
import { deleteAccount } from "@/lib/fetchs/fetchDeleteAccount";
import { useModalStore } from "@/lib/store/modalStore";

export default function DeleteAccountConfirmModal() {
  const { deleteAccountModalOpen, closeDeleteAccountModal } = useModalStore();

  const handleDeleteAccount = () => {
    deleteAccount()
      .then((res) => {
        console.log("계정 삭제 성공", res);
        localStorage.removeItem("memberStore-storage");
        localStorage.removeItem("userStore");
        sessionStorage.removeItem("offset-storage");
        alert("계정이 삭제되었습니다.");
        signOut({ callbackUrl: "/" });
        closeDeleteAccountModal();
      })
      .catch((err) => {
        alert("계정 삭제에 실패했습니다. 다시 시도해주세요.");
        console.error("계정 삭제 실패", err);
      });
  };

  if (!deleteAccountModalOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1>😥</h1>
        <div>정말로 계정을 삭제하시겠어요?</div>
        <div className={style.buttons}>
          <Button
            text="삭제"
            color="red"
            className={style.button}
            onClick={handleDeleteAccount}
          />
          <Button
            text="취소"
            color="gray"
            className={style.button}
            onClick={closeDeleteAccountModal}
          />
        </div>
      </div>
    </div>
  );
}
