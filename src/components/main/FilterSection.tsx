import style from "./FilterSection.module.scss";
import Card from "../common/card/Card";
import ReturnArrow from "@public/ReturnArrow.svg";
import Button from "../common/button/Button";
import Filter from "./filter/Filter";
import CocktailList from "@/components/main/cocktailList/CocktailList";

export default async function FilterSection() {
  return (
    <div className={`${style.filter_section}`}>
      <h1>Filter Section</h1>
      <div className={`${style.filter_card_wrap}`}>
        <div className={`${style.fitler_wrap}`}>
          <Filter />
        </div>
        <div className={`${style.card_wrap}`}>
          <CocktailList />
        </div>
      </div>
    </div>
  );
}
