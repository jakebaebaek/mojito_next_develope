import style from "./card.module.scss";

export default function Card() {
  // 별 클릭 함수
  // 마우스가 별에 들어올 때 실행되는 함수
  // 마우스가 별에서 나갈 때 실행되는 함수

  // 별 아이콘 렌더링 조건

  return (
    <>
      <div className={`${style.card}`}>
        <img src="star.png" />
        <img src="star.png" />
        <a href="/desc:id">
          <div>
            <img src="칵테일 이미지" alt="Cocktail Image" />
            <h3>칵테일 이름</h3>
          </div>
        </a>

        <div>
          <img
            className={`${style.img}`}
            src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png"
            alt="Cocktail Image"
          />
          <h3 className={`${style.text}`}>Cocktail</h3>
        </div>
      </div>
    </>
  );
}
