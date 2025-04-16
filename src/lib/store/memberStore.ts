import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TMemo } from "@/lib/types/TMemo";
import { postHeart } from "@/lib/fetchs/fetchHeart";
import { THeartItem } from "@/lib/types/THeart";

type TMemberStoreStore = {
  heart: THeartItem[];
  memo: TMemo[];
  setHeart: (data: THeartItem[]) => void;
  setMemo: (data: TMemo[] | ((prev: TMemo[]) => TMemo[])) => void;
};
export const useMemberStore = create<TMemberStoreStore>()(
  persist(
    (set) => ({
      heart: [],
      memo: [],
      setHeart: (data) => {
        set({ heart: data });
        postHeart(data);
      },
      setMemo: (data) =>
        set((state) => ({
          memo: typeof data === "function" ? data(state.memo) : data,
        })),
    }),
    { name: "memberStore-storage" }
  )
);
