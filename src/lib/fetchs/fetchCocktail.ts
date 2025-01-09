export const getCocktail = async () => {
  try {
    const cocktails = await fetch('/api/cocktails');
    return cocktails.json();
  } catch (error) {
    console.error("api로 칵테일 데이터 못 가져오고 있어요~~🚑🚑🚑🚑🚑",error);
    throw error;
  }
};