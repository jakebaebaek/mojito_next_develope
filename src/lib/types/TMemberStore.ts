export type TMemberStore = {
  userId: string;
  heart : string[];
  memo: {
    cocktail_id: string;
    rating: number;
    reviewText: string;
  }[];
};