export const getHashtags = async () => {
  try {
    const hashtags = await fetch(`/api/hashtags`);
    return hashtags.json();
  } catch (error) {
    console.error("🤑🤑hashtags 에러:", error);
    throw error;
  }
};
