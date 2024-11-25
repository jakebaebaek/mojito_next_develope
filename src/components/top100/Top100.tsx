import style from "./Top100.module.scss";
import UpArrow from "@public/UpArrow.svg";
import LeftSlide from "@public/LeftSlide.svg";
import RightSlide from "@public/LeftSlide.svg";

export default function Top100() {
  const cocktailName = "Tommy's Margarita";

  return (
    <div className={`${style.top100_section}`}>
      <h1 className={`${style.title}`}>
        World’s Top 100
        <br></br>
        Cocktails
      </h1>
      <div className={`${style.slide_area}`}>
        <h3 className={`${style.cocktail_name}`}>{cocktailName}</h3>

        <div className={`${style.slide_wrap}`}>
          <div className={`${style.slide_btn} ${style.left}`}>
            <LeftSlide className={`${style.left_svg}`} />
          </div>

          <li className={`${style.randomCocktails}`}>{/* 랜덤칵테일 */}</li>
          <div className={`${style.slide_btn} ${style.right}`}>
            <RightSlide className={`${style.right_svg}`} />
          </div>
        </div>
      </div>

      <div className={`${style.find_top100_btn}`}>
        + Top 100 Cocktails 더보기
      </div>
    </div>
  );
}
