import Link from "next/link";
import style from "./card.module.scss";
import Heart from "../../../public/Heart.svg";
export default function Card() {
  // 별 클릭 함수
  // 마우스가 별에 들어올 때 실행되는 함수
  // 마우스가 별에서 나갈 때 실행되는 함수

  // 별 아이콘 렌더링 조건

  return (
    <>
      <div className={`${style.card}`}>
        <Link href="/desc:id">
          <div className={`${style.text}`}>Cocktail</div>
          <div>
            <img
              className={`${style.img}`}
              src="https://mojito-cocktail-img.s3.ap-northeast-2.amazonaws.com/0.png"
              alt="Cocktail Image"
            />
            {/* <svg className={`${style.heart}`} src="heart.svg" /></svg> */}
          </div>
        </Link>
        <Heart className={`${style.heart}`} />
      </div>
    </>
  );
}
