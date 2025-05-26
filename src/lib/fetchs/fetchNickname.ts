
export const postNickname = async (nickname: string) => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/nickname`, {
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
