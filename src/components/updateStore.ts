"use client";

import { useMemberStore } from "@/lib/store/memberStore";
import { addAbortListener } from "events";
import { useSession } from "next-auth/react";

export default function UpdateStore() {
  const { data: session, status } = useSession();
  const { setHeart, setMemo } = useMemberStore();

  if (session) {
    const a = session.user;
    console.log("🥶", status);
    // setHeart(.heart);
    // setMemo(session.user.memo);
  }

  return null;
}
