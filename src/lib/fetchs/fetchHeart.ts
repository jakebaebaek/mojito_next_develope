export const postHeart = async (heartList: string[]) => {
  try {
    const response = await fetch(`http://localhost:3000/api/member`, {
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
