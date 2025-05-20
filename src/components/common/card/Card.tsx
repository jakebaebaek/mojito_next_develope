"use client";
import Link from "next/link";
import style from "./card.module.scss";
import Heart from "@public/Heart.svg";
import { useHeartToggle } from "@/lib/hooks/useHeartToggle";

type TCardProps = {
  id: string;
  name?: {
    ko: string;
    en: string;
  };
  img_url?: string;
  className?: string;
};
export default function Card({ id, name, img_url }: TCardProps) {
  const { isClicked, onClickHeart } = useHeartToggle(id);
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
