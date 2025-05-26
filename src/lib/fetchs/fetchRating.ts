
export const postRating = async (cocktailId: string | string[], rating: number) => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/review/rating`, {
      method: 'POST',
      cache : "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cocktailId, rating }),
    });

    if (!response.ok) {
      throw new Error('리뷰 저장에 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("리뷰 저장 에러:", error);
    throw error;
  }
};
export const getRating = async (cocktailId: string | string[]) => {
  try {
    const response = await fetch(`http://localhost:3000/api/review/rating?cocktailId=${cocktailId}`, {
      method: 'GET',
      cache : "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('리뷰 불러오기에 실패했습니다.');
    }
    return response.json(); 
  } catch (error) {
    console.error("리뷰 불러오기 에러:", error);
    throw error;
  }
};