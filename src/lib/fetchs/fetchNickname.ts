
export const postNickname = async (nickname: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/nickname`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({nickname}),
    });
    return response.json();
  } catch (error) {
    console.error("즐겨찾기 post 에러:", error);
    throw error;
  }
};
