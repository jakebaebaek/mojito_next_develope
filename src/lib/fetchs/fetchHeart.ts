import { THeartItem } from "../types/THeart";

export const postHeart = async (heartList: THeartItem[]) => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/review/heart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(heartList),
    });
    return response.json();
  } catch (error) {
    console.error("즐겨찾기 post 에러:", error);
    throw error;
  }
};
