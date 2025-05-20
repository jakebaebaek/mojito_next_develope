"use client";

import style from "./Navigation.module.scss";
import UpArrow from "@public/UpArrow.svg";
import DownArrow from "@public/DownArrow.svg";
import Heart from "@public/Heart.svg";
import Edit from "@public/Edit.svg";
import { useHeartToggle } from "@/lib/hooks/useHeartToggle";

type TNavigation = {
  page?: "desc";
  cocktailId?: string;
};
export default function Navigation({ page, cocktailId, ref }: TNavigation) {
  const { isClicked, onClickHeart } = useHeartToggle(cocktailId || "");

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollEdit = () => {
    const textarea = document.querySelector(
      "#review-textarea"
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <ul className={`${style.navigation}`}>
        <li className={`${style.up}`} onClick={scrollUp}>
          <UpArrow />
        </li>
        {page === "desc" && cocktailId && (
          <>
            <li
              className={`${style.heart_btn}`}
              onClick={() => onClickHeart(cocktailId)}
            >
              <Heart
                className={`${style.heart_svg} ${
                  isClicked ? style.clicked : style.unClicked
                }`}
              />
            </li>
            <li className={`${style.edit_btn}`} onClick={scrollEdit}>
              <Edit className={`${style.edit_svg}`} />
            </li>
          </>
        )}

        <li className={`${style.down_btn}`} onClick={scrollDown}>
          <DownArrow className={`${style.down_svg}`} />
        </li>
      </ul>
    </>
  );
}
