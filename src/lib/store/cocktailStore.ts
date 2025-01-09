import { create } from "zustand";
import { getCocktail } from "../fetchs/fetchCocktail";

type TCocktailStore = {
  cocktailList: [];
  fetchCocktail: () => Promise<void>;
};

export const useCocktailStore = create<TCocktailStore>((set) => ({
  cocktailList: [],

  fetchCocktail: async () => {
    const cocktailList = await getCocktail();
    set({ cocktailList });
  },
}));
