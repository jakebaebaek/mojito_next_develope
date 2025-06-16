import { create } from "zustand";

type FilterState = {
  base: string[] | []; 
  flavor: string[] | []; 
  booziness: number[];
  sweetness: number[];
  searchClicked: boolean;

  toggleBase: (value: string) => void;
  toggleFlavor: (value: string) => void;
  setBooziness: (value: number[]) => void;
  setSweetness: (value: number[]) => void;
  setSearchClicked: (val: boolean) => void;
  resetFilter: () => void;
};

export const useFilterValueStore = create<FilterState>((set, get) => ({
  base: [],
  flavor: [],  
  booziness: [0, 10],
  sweetness: [0, 10],
  searchClicked: false,

  toggleBase: (val) => {
    const current = get().base;
    set({
      base: current.map((e) => e.includes(val))
        ? current.filter((v) => v !== val)
        : [...current, val],
    });
  },
  toggleFlavor: (val) => {
    const current = get().flavor;
    set({
      flavor: current.map((e) => e.includes(val))
        ? current.filter((v) => v !== val)
        : [...current, val],
    });
  },  
  setBooziness: (value) => set({ booziness: value }),
  setSweetness: (value) => set({ sweetness: value }),
  setSearchClicked: (val) => set({ searchClicked: val }),
  resetFilter: () =>
    set({
      base: [],
      flavor: [],
      searchClicked: false,
      booziness: [0, 10],
      sweetness: [0, 10],
    }),
}));
