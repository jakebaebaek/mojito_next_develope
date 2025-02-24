"use client";

import { useMemberStore } from "@/lib/store/memberStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UpdateStore() {
  const { data: session, status, update } = useSession();
  const { setHeart, setMemo, heart, memo } = useMemberStore();

  useEffect(() => {
    if (!session?.user || session.user.firstLogin) return; //세션이 없거나 firstLogin이 true면 실행 안함
    console.log(session?.user?.firstLogin);
    const sessionHeart = session.user.memberStore.heart;
    const sessionMemo = session.user.memberStore.memo;

    setHeart(sessionHeart);
    setMemo(sessionMemo);
    update({ ...session, user: { ...session.user, firstLogin: true } });
  }, [session?.user?.firstLogin]);

  return null;
}
