"use client";

import { useEffect, useState, useRef } from "react";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import Card from "@/components/common/card/Card";
import style from "./CocktailList.module.scss";

export default function CocktailList() {
  const { fetchCocktail, cocktailList } = useCocktailStore();

  useEffect(() => {
    fetchCocktail();
  }, []);

  // 데이터가 없을 때 빈 배열로 처리
  if (!cocktailList || cocktailList.length === 0) {
    return <h1 className={style.nulldata}>칵테일 정보 가져오는 중...🍸</h1>;
  }

  // 카드 리스트 렌더링
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
    </div>
  );
}
