"use client";

import { useMemberStore } from "@/lib/store/memberStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UpdateStore() {
  const { data: session, status } = useSession();
  const { setHeart, setMemo, heart, memo } = useMemberStore();
  console.log("👽", status);
  useEffect(() => {
    if (session) {
      const memberId = session.user.id;
      const memberStore = session.user.memberStore;
      const sessionHeart = session.user.memberStore.heart;
      const sessionMemo = session.user.memberStore.memo;

      setHeart(sessionHeart);
      setMemo(sessionMemo);
      console.log("🥸", session.user);
      console.log("🥶", memberStore);
      console.log("😍", heart);
    }
  }, [session]);

  return null;
}
