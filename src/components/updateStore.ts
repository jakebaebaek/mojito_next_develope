"use client";

import { useMemberStore } from "@/lib/store/memberStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCocktailStore } from "@/lib/store/cocktailStore";

export default function UpdateStore() {
  const { data: session, update } = useSession();
  const { setHeart, setMemo } = useMemberStore();
  const { cocktailList, fetchAllCocktails } = useCocktailStore();

  useEffect(() => {
    if (!session?.user || session.user.firstLogin) return; //세션이 없거나 firstLogin이 true면 실행 안함
    const sessionHeart = session.user.memberStore.heart;
    const sessionMemo = session.user.memberStore.memo;

    setHeart(sessionHeart);
    setMemo(sessionMemo);
    update({ ...session, user: { ...session.user, firstLogin: true } });
  }, [session?.user?.firstLogin]);

  // 모든 칵테일을 불러옵니다.
  useEffect(() => {
    if (cocktailList.length === 0) {
        fetchAllCocktails();
    }
  }, [cocktailList, fetchAllCocktails]);

  return null;
}
