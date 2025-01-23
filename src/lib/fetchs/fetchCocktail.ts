import { TCocktail } from "@/lib/types/TCocktail";

export const getCocktail = async (limit: number = 25,offset: number = 0): Promise<TCocktail[]> => {
  try {
    const query = `?limit=${limit}&offset=${offset}`;
    const response = await fetch(`http://localhost:3000/api/cocktails${query}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("api로 칵테일 데이터를 가져오지 못했습니다. 🚑🚑🚑🚑🚑", error);
     throw error;
  }
};