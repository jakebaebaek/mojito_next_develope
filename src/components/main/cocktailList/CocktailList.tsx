"use client";

import { useRef, useEffect } from "react";
import { TCocktail } from "@/lib/types/TCocktail";
import Card from "@/components/common/card/Card";
import style from "./CocktailList.module.scss";

interface CocktailListProps {
  cocktailList: TCocktail[];
  loadMore: () => Promise<void>;
  loading: boolean;
}

export default function CocktailList({
  cocktailList,
  loadMore,
  loading,
}: CocktailListProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`CocktailList 리렌더링 횟수: ${renderCount.current}`);
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
      { threshold: 0.3 }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [loading, loadMore]);
  return (
    <div className={style.cocktailList}>
      {cocktailList.map((cocktail) => (
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
      {loading && <p>Loading more...</p>}
    </div>
  );
}
