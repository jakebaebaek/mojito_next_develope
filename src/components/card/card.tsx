export default function Card() {
  return (
    <div>
      <div>
        {/* 마우스가 카드에 들어올 때 실행되는 함수 */}
        {/* 마우스가 카드에서 나갈 때 실행되는 함수 */}

        {/* 별 아이콘 렌더링 조건 */}
        <img src="star.png" />
        {/* 별 클릭 함수 */}
        {/* 마우스가 별에 들어올 때 실행되는 함수 */}
        {/* 마우스가 별에서 나갈 때 실행되는 함수 */}

        {/* 별 아이콘 렌더링 조건 */}
        <img src="star.png" />
        {/* 별 클릭 함수 */}
        {/* 마우스가 별에 들어올 때 실행되는 함수 */}
        {/* 마우스가 별에서 나갈 때 실행되는 함수 */}

        <a href="/desc:id">
          <div>
            <img src="칵테일 이미지" alt="Cocktail Image" />
            <h3>칵테일 이름</h3>
          </div>
        </a>

        {/* 하드코딩된 이미지와 칵테일 이름 예시 */}
        <div>
          <img
            src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png"
            alt="Cocktail Image"
          />
          <h3>Cocktail</h3>
        </div>
      </div>
    </div>
  );
}
