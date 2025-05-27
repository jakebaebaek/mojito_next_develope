export const getEmoji = async () => {
  try {
    const emojis = await fetch(`/api/emoji`);
    return emojis.json();
  } catch (error) {
    console.error("🚨이모지 에러:", error);
    throw error;
  }
};
