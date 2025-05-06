// lib/store/userStore.ts
import { create } from "zustand";
import { postNickname } from "@/lib/fetchs/fetchNickname";
import { persist } from "zustand/middleware";

type UserStore = {
  nickname: string;
  setNickname: (name: string) => Promise<void>;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      nickname: "",
      setNickname: async (name) => {
        const res = await postNickname(name);
        set({ nickname: res.nickname });
        return res;
      }
    }),
    {
      name: "userStore", 
    }
  )
);