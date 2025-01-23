import { create } from "zustand";
import { persist } from "zustand/middleware";

type OffsetStore = {
  offset: number;
  setOffset: (offset: number) => void;
};

export const useOffsetStore = create<OffsetStore>()(
  persist(
    (set) => ({
      offset: 25,
      setOffset: (offset) => set({ offset }),
    }),
    {
      name: "offset-storage",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);