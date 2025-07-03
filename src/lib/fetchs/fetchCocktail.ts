import { TCocktail } from "@/lib/types/TCocktail";

interface CocktailResponse {
  cocktails: TCocktail[];
  totalCount: number;
  uniqueBases: { uniqueBases: string[] };
  uniqueFlavors: { uniqueFlavors: string[] };
}

export const getCocktail = async (
  limit: number = 0,
  offset: number = 0
): Promise<CocktailResponse> => {
  try {
    const query = `?limit=${limit}&offset=${offset}`;
    const response = await fetch(
      `${process.env.SERVER_URL}/api/cocktails${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      "api로 칵테일 데이터를 가져오지 못했습니다. 🚑🚑🚑🚑🚑",
      error
    );
    throw error;
  }
};
