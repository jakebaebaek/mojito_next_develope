
export const postProfile = async (nickname: string, profileImage: string) => {
  try {
    const response = await fetch(`/api/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({nickname, profileImage}),
    });
    return response.json();
  } catch (error) {
    console.error("닉네임 post 에러:", error);
    throw error;
  }
};
