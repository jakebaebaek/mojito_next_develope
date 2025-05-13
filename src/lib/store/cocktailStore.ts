import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCocktail } from "../fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";
type TFilter = { [key: string]: string[] };

// 모든 칵테일을 불러옵니다.
type TCocktailStore = {
  cocktailList: TCocktail[];
  totalCount: number;
  hashtagCocktails: TCocktail[];
  filterdCocktailList: TCocktail[];
  selectedFilter: TFilter;

  fetchAllCocktails: () => Promise<void>;
  setFilter: () => void;
};

export const useCocktailStore = create<TCocktailStore>((set, get) => ({
  cocktailList: [],
  totalCount: 0,
  hashtagCocktails: [],
  filterdCocktailList: [],
  selectedFilter: {},
  totalCount: 0,
  fetchAllCocktails: async () => {
    const { cocktailList } = get();
    if (cocktailList.length > 0) return;
    const response = await getCocktail(0, 0);
    const hashtagCocktailArray = response.cocktails.filter((item) =>
      Array.isArray(item.hashtag) ? item.hashtag.length !== 0 : false
    );
    console.log("이게 hashtagArray", hashtagCocktailArray);
    set({
      cocktailList: response.cocktails,
      totalCount: response.totalCount,
      hashtagCocktails: hashtagCocktailArray,
    });
  },

  setFilter: () => {},
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
