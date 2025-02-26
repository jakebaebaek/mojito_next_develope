import { create } from "zustand";
import { getCocktail } from "../fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";


type TCocktailStore = {
  cocktailList: TCocktail[];
  fetchAllCocktails: () => Promise<void>;
};

export const useCocktailStore = create<TCocktailStore>((set, get) => ({
  cocktailList: [],

  fetchAllCocktails: async () => {
    const { cocktailList } = get();
    if (cocktailList.length > 0) return; 
    const response = await getCocktail(0, 0); 
    set({ cocktailList: response.cocktails });
  },
}));