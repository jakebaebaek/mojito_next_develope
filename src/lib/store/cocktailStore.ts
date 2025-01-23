import { create } from "zustand";
import { getCocktail } from "../fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";


type TCocktailStore = {
  cocktailList: TCocktail[];
  fetchCocktail: () => Promise<void>;
};

export const useCocktailStore = create<TCocktailStore>((set) => ({
  cocktailList: [],

  fetchCocktail: async () => {
    const cocktailList = await getCocktail();
    set({ cocktailList });
  },
}));
