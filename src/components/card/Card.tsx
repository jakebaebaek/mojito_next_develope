import Link from "next/link";
import style from "./card.module.scss";
import Heart from "@public/Heart.svg";

type TCardProps = {
  id?: string;
  name?: string;
  img_url?: string;
};
export default function Card(props: TCardProps) {
  const { id, name, img_url } = props;
  // 별 클릭 함수
  // 마우스가 별에 들어올 때 실행되는 함수
  // 마우스가 별에서 나갈 때 실행되는 함수

  // 별 아이콘 렌더링 조건

  return (
    <>
      <div className={`${style.card}`}>
        <Link className={`${style.desc_link}`} href={`/desc/${id}`}>
          <div className={`${style.name}`}>{name}</div>
          <img className={`${style.img}`} src={img_url} alt="Cocktail Image" />
        </Link>
        <Heart className={`${style.heart}`} />
      </div>
    </>
  );
}
