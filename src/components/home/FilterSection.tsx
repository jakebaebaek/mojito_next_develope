import style from "./FilterSection.module.scss";
import Card from "../card/Card";
import ReturnArrow from "@public/ReturnArrow.svg";
import Button from "../button/Button";
import Filter from "../filter/Filter";

export default function FilterSection() {
  return (
    <div className={`${style.filter_section}`}>
      <h1>Filter Section</h1>

      <div className={`${style.filter_wrap}`}>
        <Filter />
        <div className={`${style.card_wrap}`}>
          <Card />
        </div>
      </div>
    </div>
  );
}
