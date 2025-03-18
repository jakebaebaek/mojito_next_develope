import { create } from "zustand";
import { persist } from "zustand/middleware";

type Tmemo = {
  cocktail_id: string;
  memo_txt: string;
  rating: number;
};

type TMemberStoreStore = {
  heart: string[];
  memo: Tmemo[];
  setHeart: (data: any) => void;
  setMemo: (data: any) => void;
};

export const useMemberStore = create<TMemberStoreStore>()(
  persist(
    (set) => ({
      heart: [],
      memo: [],
      setHeart: (data) => set({ heart: data }),
      setMemo: (data) => set({ memo: data }),
    }),
    { name: "mamberStore-strage" }
  )
);
