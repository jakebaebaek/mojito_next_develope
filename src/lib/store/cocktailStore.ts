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

type CocktailDetailStore = {
  cocktailDetail: { [id: string]: TCocktail };
  setCocktailDetail: (id: string, data: TCocktail) => void;
};

export const useCocktailDetailStore = create<CocktailDetailStore>()(
  persist(
    (set, get) => ({
      cocktailDetail: {},
      setCocktailDetail: (id, data) =>
        set({
          cocktailDetail: {
            ...get().cocktailDetail,
            [id]: data,
          },
        }),
    }),
    { name: "cocktail-detail-store" }
  )
);