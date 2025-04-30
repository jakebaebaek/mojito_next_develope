import Heart from "@public/Heart.svg";
import StarRating from "@public/StarRating.svg";
import style from "./MemoCard.module.scss";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useMemberStore } from "@/lib/store/memberStore";

type TMemoCardProps = {
  id: string;
  name?: string;
  img_url?: string;
  memo?: string;
  rating?: number;
};

export default function MemoCard(props: TMemoCardProps) {
  const { id, name, img_url, memo, rating } = props;
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
        ? heart.filter((item) => item.cocktail_id !== id)
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
          <div className={`${style.info_wrap}`}>
            <div className={`${style.name}`}>{name}</div>
            <img
              className={`${style.img}`}
              src={img_url}
              alt="Cocktail Image"
            />
            <div className={style.star_wrap}>
              <span className={style.rating_number}>
                {rating ? rating : ""}
              </span>
              <StarRating className={`${style.star}`} />
            </div>
          </div>
          <div className={`${style.line}`}></div>
          <div className={`${style.memo_wrap}`}>
            <div className={`${style.memo}`}>{memo}</div>
          </div>
        </Link>
        <div className={`${style.heartAndStar_wrap}`}>
          <Heart
            className={`${style.heart} ${
              isClicked ? style.clicked : style.unClicked
            }`}
            onClick={() => onClickHeart(id)}
          />
        </div>
      </div>
    </>
  );
}
