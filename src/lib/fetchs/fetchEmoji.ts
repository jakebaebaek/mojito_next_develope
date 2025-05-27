export const getEmoji = async () => {
  try {
    const emojis = await fetch(`${process.env.SERVER_URL}/api/emoji`);
    
    return emojis.json();
  } catch (error) {
    console.error("🚨이모지 에러:", error);
    throw error;
  }
};
const isServer = typeof window === "undefined";
console.log(isServer ? "서버에서 실행 중" : "클라이언트에서 실행 중");