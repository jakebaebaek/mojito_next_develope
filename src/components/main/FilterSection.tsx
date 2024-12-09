"use server";

import style from "./FilterSection.module.scss";
import Card from "../common/card/Card";
import ReturnArrow from "@public/ReturnArrow.svg";
import Button from "../common/button/Button";
import Filter from "./filter/Filter";
import { getEmoji } from "@/lib/fetchs/fetchEmoji";

export default async function FilterSection() {
  const emojis = await getEmoji();
  console.log("✅", emojis);

  return (
    <div className={`${style.filter_section}`}>
      <h1>Filter Section</h1>

      <div className={`${style.filter_wrap}`}>
        <Filter emojis={emojis} />
        <div className={`${style.card_wrap}`}>
          <Card />
        </div>
      </div>
    </div>
  );
}
