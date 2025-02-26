"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";
import { useOffsetStore } from "@/lib/store/offsetStore";
import { useCocktailStore } from "@/lib/store/cocktailStore";

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
  const { cocktailList, fetchAllCocktails } = useCocktailStore();
  const [localCocktailList, setLocalCocktailList] =
    useState<TCocktail[]>(initialCocktails);
  const { offset, setOffset } = useOffsetStore();
  const isLoading = useRef(false);
  const totalCount = totalCocktailCount;

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCocktails();
    };

    if (cocktailList.length === 0) {
      fetchData();
    }
  }, [fetchAllCocktails, cocktailList.length]);

  useEffect(() => {
    console.log("모든 칵테일 데이터 들어왔다잉", cocktailList.length);
  }, [cocktailList]);
  const loadMore = useCallback(async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    if (localCocktailList.length >= totalCount) {
      isLoading.current = false;
      return;
    }

    if (cocktailList.length != 0) {
      setLocalCocktailList((prev) => {
        return [...prev, ...cocktailList.slice(prev.length, prev.length + 25)];
      });
      setOffset(offset + 25);
      console.log("이건 모든 칵테일 데이터로부터 옴😍😍😎😎😋");
    } else {
      const newCocktails = await getCocktail(25, offset);
      setLocalCocktailList((prev) => {
        return [...prev, ...newCocktails.cocktails];
      });
      setOffset(offset + 25);
      console.log("이건 25개 호출 데이터💥💥💥💢");
    }

    isLoading.current = false;
  }, [offset, localCocktailList.length, totalCount, setOffset, cocktailList]);

  useEffect(() => {
    const storedOffset = sessionStorage.getItem("offset-storage");

    const fetchInitialCocktails = async (offsetValue: number) => {
      const newCocktails = await getCocktail(offsetValue, 0);
      console.log(
        "가져온 칵테일 카드 개수 : ",
        newCocktails.cocktails.length,
        "토탈카운트 :",
        newCocktails.totalCount
      );
      setLocalCocktailList(newCocktails.cocktails);
      isLoading.current = false;
    };

    if (storedOffset) {
      try {
        const parsedOffset = JSON.parse(storedOffset);
        const offsetValue = parsedOffset?.state?.offset || 0;
        console.log("파스드 오프셋", parsedOffset, "오프셋 값", offsetValue);
        fetchInitialCocktails(offsetValue);
      } catch (error) {
        console.error(
          "SessionStorage에서 offset 값을 가져오는 중 오류 발생 🚑",
          error
        );
        isLoading.current = false;
      }
    } else {
      setLocalCocktailList(initialCocktails);
      isLoading.current = false;
    }
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
            cocktailList={localCocktailList}
            loadMore={loadMore}
            loading={isLoading.current}
          />
          {localCocktailList.length >= totalCount && (
            <p className={`${style.nomore_data}`}>
              🍹모든 칵테일을 불러왔습니다🍹
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
