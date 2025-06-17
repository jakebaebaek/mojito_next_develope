import { create } from "zustand";

type FilterState = {
  base: string[];
  flavor: string[];
  booziness: number[];
  sweetness: number[];
  searchClicked: boolean;

  setFlavor: (value: string) => void;
  setBase: (value: string) => void;
  setBooziness: (value: number[]) => void;
  setSweetness: (value: number[]) => void;

  resetFilter: () => void;
};

export const useFilterValueStore = create<FilterState>((set, get) => ({
  base: [],
  flavor: [],
  booziness: [0, 10],
  sweetness: [0, 10],
  searchClicked: false,

  setFlavor: (value) => {
    const current = get().flavor;

    set({
      flavor: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  },

  setBase: (value) => {
    const current = get().base;

    set({
      base: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  },

  setBooziness: (value) => set({ booziness: value }),
  setSweetness: (value) => set({ sweetness: value }),

  resetFilter: () =>
    set({
      base: [],
      flavor: [],
      searchClicked: false,
      booziness: [0, 10],
      sweetness: [0, 10],
    }),
}));
