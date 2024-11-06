import Image from "next/image";
import style from "./page.module.scss";
import Card from "@/components/card/Card";
import MemoCard from "@/components/card/MemoCard";

export default function Home() {
  return (
    <>
      <div className={`${style.card_page}`}>
        <Card
          id="1"
          name="Cocktail"
          img_url="https://mojito-cocktail-img.s3.ap-northeast-2.amazonaws.com/0.png"
        />
        <MemoCard />
      </div>
    </>
  );
}
