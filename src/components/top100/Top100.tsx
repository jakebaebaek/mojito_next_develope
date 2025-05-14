// ✅ 핵심 로직: 랜덤 칵테일을 고정하고, 순환 슬라이드 구성 + 가운데 카드 강조

"use client";

import style from "./Top100.module.scss";
import LeftSlide from "@public/LeftSlide.svg";
import RightSlide from "@public/LeftSlide.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { TCocktail } from "@/lib/types/TCocktail";

export default function Top100() {
  const { cocktailList } = useCocktailStore();
  const visibleCount = 5;
  const cardWidthRem = 20; // 카드 하나의 너비 (rem 단위)

  // ✅ 한 번만 실행되는 랜덤 칵테일 저장
  const randomCocktailsRef = useRef<TCocktail[]>([]);
  if (randomCocktailsRef.current.length === 0 && cocktailList.length > 0) {
    const indexes = Array.from(
      new Set(
        Array.from({ length: 20 }, () =>
          Math.floor(Math.random() * cocktailList.length)
        )
      )
    )
      .filter((i) => i < cocktailList.length)
      .slice(0, 10);

    randomCocktailsRef.current = indexes.map((i) => cocktailList[i]);
  }

  const [startIndex, setStartIndex] = useState(0);
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % randomCocktailsRef.current.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prev) =>
        (prev - 1 + randomCocktailsRef.current.length) %
        randomCocktailsRef.current.length
    );
  };

  // 슬라이드 순환 배열 만들기
  const visibleSlides = Array.from({ length: visibleCount }, (_, i) => {
    const index = (startIndex + i) % randomCocktailsRef.current.length;
    return { ...randomCocktailsRef.current[index], index };
  });

  return (
    <div className={style.top100_section}>
      <h1 className={style.title}>
        World’s Top 100 <br /> Cocktails
      </h1>
      <div className={style.slide_area}>
        {/* 슬라이드 버튼 */}
        <div
          className={style.slide_btn + " " + style.left}
          onClick={handlePrev}
        >
          <LeftSlide className={style.left_svg} />
        </div>

        <div className={style.slide_viewport}>
          <div className={style.slide_inner}>
            {visibleSlides.map((cocktail, i) => (
              <div
                key={cocktail._id || i}
                className={`${style.card} ${
                  i === Math.floor(visibleCount / 2) ? style.active : ""
                }`}
              >
                <Image
                  src={cocktail.img}
                  alt="cocktail"
                  width={200}
                  height={300}
                  className={style.card_image}
                />
                {i === Math.floor(visibleCount / 2) && (
                  <div>
                    <p className={style.center_name_ko}>{cocktail.name?.ko}</p>
                    <p className={style.center_name_en}>{cocktail.name?.en}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className={style.slide_btn + " " + style.right}
          onClick={handleNext}
        >
          <RightSlide className={style.right_svg} />
        </div>
      </div>
    </div>
  );
}
