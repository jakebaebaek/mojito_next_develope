"use client";
import Link from "next/link";
import style from "./card.module.scss";
import Heart from "@public/Heart.svg";
import { useMemberStore } from "@/lib/store/memberStore";
import { useMemo, useState } from "react";
import { postHeart } from "@/lib/fetchs/fetchHeart";

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

  const isClicked = useMemo(() => heart.includes(id), [heart, id]);

  const onClickHeart = (id: string) => {
    if (isClicked) {
      const removeHeart = heart.filter((item) => item != id);
      setHeart(removeHeart);
      postHeart(removeHeart);
    } else {
      const addHeartList = [...heart, id];
      setHeart(addHeartList);
      postHeart(addHeartList);
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
