import { create } from "zustand";

type ButtonLockStore = {
  locks: Record<string, boolean>;
  lock: (key: string) => void;
  unlock: (key: string) => void;
  isLocked: (key: string) => boolean;
};

export const useButtonLockStore = create<ButtonLockStore>((set, get) => ({
  locks: {},
  lock: (key) => {
    const locks = get().locks;
    set({ locks: { ...locks, [key]: true } });
  },
  unlock: (key) => {
    const locks = get().locks;
    set({ locks: { ...locks, [key]: false } });
  },
  isLocked: (key) => !!get().locks[key],
}));
