import Card from "@/components/card/Card";

export default function storage() {
  return (
    <div>
      <div>
        {/* 즐겨찾기된 칵테일 카드 리스트 */}
        <div>
          {/* 각 칵테일 카드 */}
          <div>
            <img src="칵테일 이미지" alt="Cocktail Image" />
            <p>칵테일 이름</p>
          </div>
        </div>
        <Card></Card>
      </div>
    </div>
  );
}
