import Storage from "./Storage";

export default async function StoragePage() {
  // DB에서 칵테일 기록과 찜한 칵테일 데이터를 가져옴
  const recordedCocktails = "recorded"; // 예: API 호출
  const favoriteCocktails = "favorite"; // 서버 컴포넌트에서는 현재 데이터를 가져오지 않고, 클라이언트 컴포넌트를 호출
  return (
    <>
      <Storage
        recordedCocktails={[]} // 빈 데이터 전달
        favoriteCocktails={[]} // 빈 데이터 전달
      />
    </>
  );
}
