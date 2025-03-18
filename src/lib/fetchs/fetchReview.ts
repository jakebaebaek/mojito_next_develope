
export const postReview = async (cocktailId: string | string[], reviewText: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/review/memo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cocktailId, reviewText }),
    });

    if (!response.ok) {
      throw new Error('리뷰 저장에 실패했습니다.');
    }
    console.log("리뷰 저장 성공🥗🥗🧀", response.json());
    return response;
  } catch (error) {
    console.error("리뷰 저장 에러:", error);
    throw error;
  }
};
export const getReviews = async (cocktailId: number, rating: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/review/memo?cocktailId=${cocktailId}`, {
      method: 'GET',
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