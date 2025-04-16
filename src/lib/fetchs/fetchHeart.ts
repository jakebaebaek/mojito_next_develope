import { THeartItem } from "../types/THeart";

export const postHeart = async (heartList: THeartItem[]) => {
  try {
    const response = await fetch(`http://localhost:3000/api/member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(heartList),
    });
    console.log("😍😎이게바로 heart",response);
    return response.json();
  } catch (error) {
    console.error("즐겨찾기 post 에러:", error);
    throw error;
  }
};
