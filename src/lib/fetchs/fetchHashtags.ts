export const getHashtags = async () => {
  try {
    const hashtags = await fetch(`${process.env.SERVER_URL}/api/hashtags`);
    return hashtags.json();
  } catch (error) {
    console.error("🤑🤑hashtags 에러:", error);
    throw error;
  }
};
