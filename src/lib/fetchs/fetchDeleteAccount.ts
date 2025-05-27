
export const deleteAccount = async () => {
  try { 
    const response = await fetch(`/api/deleteAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("계정삭제 fetch post 에러:", error);
    throw error;
  }
};
