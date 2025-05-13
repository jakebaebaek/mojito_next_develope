import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCocktail } from "../fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";

// 모든 칵테일을 불러옵니다.
type TCocktailStore = {
  cocktailList: TCocktail[];
  totalCount: number;
  fetchAllCocktails: () => Promise<void>;
};

export const useCocktailStore = create<TCocktailStore>((set, get) => ({
  cocktailList: [],
  totalCount: 0,

  fetchAllCocktails: async () => {
    const { cocktailList } = get();
    if (cocktailList.length > 0) return; 
    const response = await getCocktail(0, 0); 
    set({ cocktailList: response.cocktails, totalCount: response.totalCount });
  },
}));

type TCocktailDetailStore = {
  cocktailDetail: TCocktail | null;
  setCocktailDetail: (cocktail: TCocktail) => void;
};

export const useCocktailDetailStore = create(
  persist<TCocktailDetailStore>(
    (set) => ({
      cocktailDetail: null,
      setCocktailDetail: (cocktail) => set({ cocktailDetail: cocktail }),
    }),
    {
      name: "cocktail-detail-storage", 
    }
  )
);