"use client";
import Link from "next/link";
import style from "./card.module.scss";
import Heart from "@public/Heart.svg";
import { useMemberStore } from "@/lib/store/memberStore";
import { useEffect, useState } from "react";

type TCardProps = {
  id: string;
  name?: {
    ko: string;
    en: string;
  };
  img_url?: string;
};
export default function Card({ id, name, img_url }: TCardProps) {
  // const { id, name, img_url } = props;
  // 별 클릭 함수
  // 마우스가 별에 들어올 때 실행되는 함수
  // 마우스가 별에서 나갈 때 실행되는 함수

  // 별 아이콘 렌더링 조건

  const { heart, setHeart } = useMemberStore();

  console.log("🫀");
  const onClickHeart = (id: string) => {
    setHeart([...heart, id]);
    console.log("😍", heart);
  };

  const [isClicked, setIsClicked] = useState(false);

  const clicked_heart = () => {
    heart.map((item) => {
      item === id ? setIsClicked(true) : null;
    });
  };

  useEffect(() => {
    clicked_heart();
  }, [heart]);

  return (
    <>
      <div className={`${style.card}`}>
        <Link className={`${style.desc_link}`} href={`/desc/${id}`}>
          <div className={`${style.name}`}>{name?.ko}</div>
          <div className={`${style.name}`}>{name?.en}</div>
          <img className={`${style.img}`} src={img_url} alt="Cocktail Image" />
        </Link>
        <Heart
          className={`${isClicked ? style.clicked_heart : style.heart}`}
          onClick={() => onClickHeart(id)}
        />
      </div>
    </>
  );
}
