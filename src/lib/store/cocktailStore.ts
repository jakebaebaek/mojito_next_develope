import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCocktail } from "../fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";

// 모든 칵테일을 불러옵니다.
type TCocktailStore = {
  cocktailList: TCocktail[];
  fetchAllCocktails: () => Promise<void>;
};

//모든 칵테일 저장 코드
export const useCocktailStore = create<TCocktailStore>((set, get) => ({
  cocktailList: [],

  fetchAllCocktails: async () => {
    const { cocktailList } = get();
    if (cocktailList.length > 0) return; 
    const response = await getCocktail(0, 0); 
    set({ cocktailList: response.cocktails });
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