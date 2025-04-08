import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tmemo } from "@/lib/types/TMemo";
import { postHeart } from "@/lib/fetchs/fetchHeart";

type TMemberStoreStore = {
  heart: string[];
  memo: Tmemo[];
  setHeart: (data: string[]) => void;
  setMemo: (data: Tmemo[] | ((prev: Tmemo[]) => Tmemo[])) => void;
};
export const useMemberStore = create<TMemberStoreStore>()(
  persist(
    (set) => ({
      heart: [],
      memo: [],
      setHeart: (data) => {
        set((state) => ({
          heart: data,
        }));
        postHeart(data);
      },
      setMemo: (data) =>
        set((state) => ({
          memo: typeof data === "function" ? data(state.memo) : data,
        })),
    }),
    { name: "mamberStore-strage" }
  )
);
