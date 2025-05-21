import { useMemberStore } from "@/lib/store/memberStore";
import { useModalStore } from "@/lib/store/modalStore";
import { useSession } from "next-auth/react";
import { useLockButton } from "@/lib/hooks/useLockButton";
import { useMemo } from "react";

export function useHeartToggle(id: string) {
  const { heart, setHeart } = useMemberStore();
  const { data: session } = useSession();
  const { openLoginModal } = useModalStore();
  const { run } = useLockButton("heart");
  const isClicked = useMemo(
    () => heart.some((item) => item.cocktail_id === id),
    [heart, id]
  );
  const onClickHeart = (id: string) => {
    if (!session) {
      openLoginModal();
      return;
    }
    run(async () => {
      try {
        const updateHeart = isClicked
          ? heart.filter((item) => item.cocktail_id != id)
          : [...heart, { cocktail_id: id, addedAt: new Date().toISOString() }];
        setHeart(updateHeart);
      } catch (error) {
        console.error("🚨 즐겨찾기 저장 실패", error);
      }
    });
  };

  return { isClicked, onClickHeart };
}
