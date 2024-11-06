import Image from "next/image";
import style from "./page.module.scss";
import Card from "@/components/card/Card";
import MemoCard from "@/components/card/MemoCard";
import Button from "@/components/button/Button";

export default function Home() {
  return (
    <>
      <div className={`${style.card_page}`}>
        <Card
          id="1"
          name="Cocktail"
          img_url="https://mojito-cocktail-img.s3.ap-northeast-2.amazonaws.com/0.png"
        />
        <br></br>
        <MemoCard
          id="2"
          name="Suwan's Cocktail"
          img_url="https://mojito-cocktail-img.s3.ap-northeast-2.amazonaws.com/0.png"
          memo="맛있었당"
          rate={4}
        />
        <br></br>
        <div className={`${style.btn_aria}`}>
          <Button text="검색" color="gray" />
          <Button text="검색" color="orange" />
        </div>
      </div>
    </>
  );
}
