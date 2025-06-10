import { create } from "zustand";
import { postProfile } from "@/lib/fetchs/fetchProfile";
import { persist } from "zustand/middleware";

type UserStore = {
  nicknameState: string;
  profileImageState: string | null;
  setProfile: (name: string, Pimage:string) => Promise<void>;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      nicknameState: "",
      profileImageState: null,
      setProfile: async (name, Pimage) => {
        const res = await postProfile(name, Pimage);
        console.log("프로필 저장 결과:", res);
        set({ nicknameState: res.nickname, profileImageState: res.profileImage });
        return res;
      },
    }),
    {
      name: "userStore", 
    }
  )
);