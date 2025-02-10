"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";
import { useOffsetStore } from "@/lib/store/offsetStore";

import style from "./FilterSection.module.scss";
import Filter from "./filter/Filter";
import CocktailList from "@/components/main/cocktailList/CocktailList";

interface FilterSectionProps {
  initialCocktails: TCocktail[];
  totalCocktailCount: number;
}

export default function FilterSection({
  initialCocktails,
  totalCocktailCount,
}: FilterSectionProps) {
  const [cocktailList, setCocktailList] =
    useState<TCocktail[]>(initialCocktails);
  const { offset, setOffset } = useOffsetStore();
  const isLoading = useRef(false);
  const totalCount = totalCocktailCount;

  const loadMore = useCallback(async () => {
    if (isLoading.current) return;
    if (cocktailList.length >= totalCount) return;

    const newCocktails = await getCocktail(25, offset);
    setCocktailList((prev) => {
      return [...prev, ...newCocktails.cocktails];
    });
    setOffset(offset + 25);
    isLoading.current = false;
  }, [offset, cocktailList.length, totalCount, setOffset]);

  useEffect(() => {
    const storedOffset = sessionStorage.getItem("offset-storage");
    const storedScrollPosition = sessionStorage.getItem("scroll-position");

    const fetchInitialCocktails = async (offsetValue: number) => {
      const newCocktails = await getCocktail(offsetValue, 0);
      console.log(
        "가져온 칵테일 카드 개수 : ",
        newCocktails.cocktails.length,
        "토탈카운트 :",
        newCocktails.totalCount
      );
      setCocktailList(newCocktails.cocktails);
      isLoading.current = false;
    };

    if (storedOffset && storedScrollPosition) {
      try {
        const parsedOffset = JSON.parse(storedOffset);
        const offsetValue = parsedOffset?.state?.offset || 0;
        console.log("파스드 오프셋", parsedOffset, "오프셋 값", offsetValue);
        fetchInitialCocktails(offsetValue);
        setTimeout(() => {
          window.scrollTo(0, parseInt(storedScrollPosition, 10));
        }, 100); // 약간의 지연을 주어 렌더링 완료를 보장
      } catch (error) {
        console.error(
          "SessionStorage에서 offset 값을 가져오는 중 오류 발생 🚑",
          error
        );
        isLoading.current = false;
      }
    } else {
      setCocktailList(initialCocktails);
      isLoading.current = false;
    }
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("scroll-position", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading.current) {
    return <div className={`${style.loading}`}>Loading...</div>;
  }

  return (
    <div className={`${style.filter_section}`}>
      <h1>Filter Section</h1>
      <div className={`${style.filter_card_wrap}`}>
        <div className={`${style.fitler_wrap}`}>
          <Filter />
        </div>
        <div className={`${style.card_wrap}`}>
          <CocktailList
            cocktailList={cocktailList}
            loadMore={loadMore}
            loading={isLoading.current}
          />
          {cocktailList.length >= totalCount && (
            <p className={`${style.nomore_data}`}>
              🍹모든 칵테일을 불러왔습니다🍹
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
