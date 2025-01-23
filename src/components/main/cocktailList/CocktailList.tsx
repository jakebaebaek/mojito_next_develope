"use client";

import { useEffect, useRef, useState } from "react";
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
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading, loadMore]);

  return (
    <div className={`${style.cocktailList}`}>
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
