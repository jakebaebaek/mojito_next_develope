import { create } from "zustand";
import { postProfile } from "@/lib/fetchs/fetchProfile";
import { persist } from "zustand/middleware";

type UserStore = {
  nickname: string;
  profileImage: string | null;
  setProfile: (name: string, Pimage:string) => Promise<void>;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      nickname: "",
      profileImage: null,
      setProfile: async (name, Pimage) => {
        const res = await postProfile(name, Pimage);
        console.log("프로필 저장 결과:", res);
        set({ nickname: res.nickname, profileImage: res.profileImage });
        return res;
      }
    }),
    {
      name: "userStore", 
    }
  )
);