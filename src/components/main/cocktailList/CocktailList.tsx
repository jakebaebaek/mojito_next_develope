"use client";

import { useRef, useEffect, useState } from "react";
import { TCocktail } from "@/lib/types/TCocktail";
import Card from "@/components/common/card/Card";
import style from "./CocktailList.module.scss";

interface CocktailListProps {
  cocktailList: TCocktail[];
  loadMore: () => Promise<void>;
  loading: boolean;
  inputValue: string;
  selectValue: string;
  clickedHashtag: string;
}

export default function CocktailList({
  cocktailList,
  loadMore,
  loading,
  inputValue,
  selectValue,
  clickedHashtag,
}: CocktailListProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const renderCount = useRef(0);
  const [hashtagCocktails, setHashtagCocktails] = useState(cocktailList);

  useEffect(() => {
    renderCount.current += 1;
    // console.log(`CocktailList 리렌더링 횟수: ${renderCount.current}`);
  });

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { root: null, threshold: 0.3 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadMore, loading]);

  // 해쉬태그 필터링된 칵테일
  useEffect(() => {
    if (clickedHashtag.length !== 0) {
      const hashtagFiltered = cocktailList.filter((item) =>
        item.hashtag?.some((tag) => tag === clickedHashtag)
      );
      setHashtagCocktails(hashtagFiltered);
    } else {
      setHashtagCocktails(cocktailList);
    }
  }, [clickedHashtag, cocktailList]);

  // 필터링 로직
  const normalizedInput = inputValue.toLowerCase().replace(/\s+/g, "");
  // console.log("필터링된 입력값:", normalizedInput);
  const filteredCocktails = hashtagCocktails.filter((item) => {
    const nameKo = item.name?.ko?.toLowerCase().replace(/\s+/g, "") ?? "";
    const nameEn = item.name?.en?.toLowerCase().replace(/\s+/g, "") ?? "";
    const nameMatch =
      nameKo.includes(normalizedInput) || nameEn.includes(normalizedInput);
    const ingredientMatch = item.recipe?.ingredients.some((ingre) => {
      const ingKo = ingre.ingredient.ko.toLowerCase().replace(/\s+/g, "");
      const ingEn = ingre.ingredient.en.toLowerCase().replace(/\s+/g, "");
      return ingKo.includes(normalizedInput) || ingEn.includes(normalizedInput);
    });
    return selectValue === "name" ? nameMatch : ingredientMatch;
  });
  const cardCount = filteredCocktails.length;
  // console.log(cardCount);

  return (
    <div>
      <div className={`${style.cocktail_length}`}>
        {cardCount}개의 칵테일이 있습니다🍹
      </div>
      <div className={style.cocktailList}>
        {filteredCocktails.map((cocktail) => (
          <Card
            key={cocktail._id}
            id={cocktail._id}
            name={cocktail.name}
            img_url={cocktail.img}
          />
        ))}
        {/* 마지막 카드 뒤에 감지용 div 배치 */}
        <div
          ref={observerRef}
          style={{ height: "50px", background: "transparent" }}
        />
      </div>
    </div>
  );
}
