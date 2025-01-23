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