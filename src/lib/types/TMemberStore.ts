export type TMemberStore = {
  userId: string;
  heart : {
    cocktail_id: string;
    updatedAt: Date;
  }[];
  memo: {
    cocktail_id: string;
    rating: number;
    reviewText: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};