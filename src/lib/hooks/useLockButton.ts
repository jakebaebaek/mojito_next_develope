import { useButtonLockStore } from "@/lib/store/buttonLockStore";
import { useCallback } from "react";

export const useLockButton = (key: string) => {
  // ✅ 상태를 반응형으로 가져오게 변경
  const locked = useButtonLockStore((state) => state.isLocked(key));
  const lock = useButtonLockStore((state) => state.lock);
  const unlock = useButtonLockStore((state) => state.unlock);

  const run = useCallback(
    async (fn: () => Promise<void>) => {
      if (locked) return;
      lock(key);
      try {
        await fn();
      } finally {
        // 1초 대기
        await new Promise((resolve) => setTimeout(resolve, 1000));
        unlock(key);
      }
    },
    [locked, lock, unlock, key]
  );

  return { locked, run };
};
