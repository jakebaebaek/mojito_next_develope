import { create } from "zustand";
import { getCocktail } from "../fetchs/fetchCocktail";

export type TCocktail = {
  _id: string;
  name: {
    ko: string;
    en: string;
  };
  base: string[];
  flavor: string[];
  booziness: number;
  sweetness: number;
  img: string;
  recipe: {
    ingredients: {
      ingredient: {
        ko: string;
        en: string;
      };
      amount: string;
    }[];
    instructions: {
      ko: string;
      en: string;
    }[];
    garnish: {
      ko: string;
      en: string;
    };
  };
};

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
