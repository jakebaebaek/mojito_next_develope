import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCocktail } from "../fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";

// 모든 칵테일을 불러옵니다.
type TCocktailStore = {
  cocktailList: TCocktail[];
  totalCount: number;
  hashtagCocktails:TCocktail[];
  fetchAllCocktails: () => Promise<void>;
};

export const useCocktailStore = create<TCocktailStore>((set, get) => ({
  cocktailList: [],
  totalCount: 0,
  hashtagCocktails: [],

  fetchAllCocktails: async () => {
    const { cocktailList } = get();
    if (cocktailList.length > 0) return; 
    const response = await getCocktail(0, 0);
    const hashtagCocktailArray = response.cocktails.filter((item) => Array.isArray((item.hashtag)) ? item.hashtag.length !== 0 : false )
    console.log("이게 hashtagArray", hashtagCocktailArray)
    set({ cocktailList: response.cocktails, totalCount: response.totalCount, hashtagCocktails : hashtagCocktailArray});
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