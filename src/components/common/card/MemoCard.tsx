import Star from "@public/Star.svg";
import style from "./MemoCard.module.scss";
import Link from "next/link";

type TMemoCardProps = {
  id?: string;
  name?: string;
  img_url?: string;
  memo?: string;
  rate?: number;
};

export default function MemoCard(props: TMemoCardProps) {
  const { id, name, img_url, memo, rate } = props;

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
          </div>
          <div className={`${style.line}`}></div>
          <div className={`${style.memo_wrap}`}>
            <Star className={`${style.star}`} />
            <div className={`${style.memo}`}>{memo}</div>
          </div>
        </Link>
      </div>
    </>
  );
}
