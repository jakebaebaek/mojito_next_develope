"use client";
import Link from "next/link";
import style from "./card.module.scss";
import Heart from "@public/Heart.svg";
import { useMemberStore } from "@/lib/store/memberStore";
import { useMemo, useState } from "react";

type TCardProps = {
  id: string;
  name?: {
    ko: string;
    en: string;
  };
  img_url?: string;
};
export default function Card({ id, name, img_url }: TCardProps) {
  const { heart, setHeart } = useMemberStore();
  const [isLoading, setIsLoading] = useState(false);

  const isClicked = useMemo(
    () => heart.some((item) => item.cocktail_id === id),
    [heart, id]
  );
  const onClickHeart = (id: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const updateHeart = isClicked
        ? heart.filter((item) => item.cocktail_id != id)
        : [...heart, { cocktail_id: id, addedAt: new Date().toISOString() }];
      setHeart(updateHeart);
    } catch (error) {
      console.error("🚨 즐겨찾기 저장 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`${style.card}`}>
        <Link className={`${style.desc_link}`} href={`/desc/${id}`}>
          <div className={`${style.name}`}>{name?.ko}</div>
          <img className={`${style.img}`} src={img_url} alt="Cocktail Image" />
        </Link>
        <Heart
          className={`${style.heart} ${
            isClicked ? style.clicked : style.unClicked
          }`}
          onClick={() => onClickHeart(id)}
        />
      </div>
    </>
  );
}
