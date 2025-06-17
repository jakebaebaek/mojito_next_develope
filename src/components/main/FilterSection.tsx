"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";
import { useOffsetStore } from "@/lib/store/offsetStore";
import { useCocktailStore } from "@/lib/store/cocktailStore";

import style from "./FilterSection.module.scss";
import Filter from "./filter/Filter";
import CocktailList from "@/components/main/cocktailList/CocktailList";
import { useFilterValueStore } from "@/lib/store/filterValueStore";
import { TCocktail } from "@/lib/types/TCocktail";

export default function FilterSection() {
  const { cocktailList, totalCount } = useCocktailStore();
  const {
    flavor,
    base,
    booziness,
    sweetness,
    resetFilter,
    filterClicked,
    setFilterClicked,
  } = useFilterValueStore();
  const { offset, setOffset } = useOffsetStore();
  const isLoading = useRef(false);

  const [visibleCocktails, setVisibleCocktails] = useState<TCocktail[]>([]);

  //필터링
  const handleFilter = () => {
    const filterdCocktailList = cocktailList.filter((cocktail) => {
      const matchFlavor =
        flavor.length === 0 || flavor.some((f) => cocktail.flavor?.includes(f));
      const matchBase =
        base.length === 0 || base.some((b) => cocktail.base?.includes(b));
      const matchBooziness =
        cocktail.booziness >= booziness[0] &&
        cocktail.booziness <= booziness[1];
      const matchSweetness =
        cocktail.sweetness >= sweetness[0] &&
        cocktail.sweetness <= sweetness[1];

      return matchFlavor && matchBase && matchBooziness && matchSweetness;
    });
    setVisibleCocktails(filterdCocktailList);
    setFilterClicked(true);
  };

  const handelReset = () => {
    setFilterClicked(false);
    setVisibleCocktails(cocktailList.slice(0, offset));
    resetFilter();
  };

  useEffect(() => {
    if (!filterClicked) setVisibleCocktails(cocktailList.slice(0, offset));
  }, [cocktailList, offset, filterClicked]);

  // 무한 스크롤
  const loadMore = useCallback(async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    if (cocktailList.length === 0 || offset >= totalCount) {
      isLoading.current = false;
      return;
    }

    if (cocktailList.length < offset + 25) {
      const newCocktails = await getCocktail(25, offset);
      // Zustand에서 처리된다고 가정
    }

    setOffset(offset + 25);
    isLoading.current = false;
  }, [offset, totalCount, cocktailList.length, setOffset]);

  // 세션 저장
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("scrollY", String(window.scrollY));
      sessionStorage.setItem("offset", JSON.stringify(offset));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  // 복원
  useEffect(() => {
    const savedOffset = sessionStorage.getItem("offset");
    const savedScrollY = sessionStorage.getItem("scrollY");

    if (savedOffset) {
      setOffset(JSON.parse(savedOffset));

      requestAnimationFrame(() => {
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY));
        }
      });
    } else {
      setOffset(25);
      window.scrollTo(0, 0);
    }
  }, [setOffset]);

  return (
    <div className={`${style.filter_section}`}>
      <h1>Filter Section</h1>
      <div className={`${style.filter_card_wrap}`}>
        <div className={`${style.fitler_wrap}`}>
          <Filter onSearch={handleFilter} onReset={handelReset} />
        </div>
        <div className={`${style.card_wrap}`}>
          <CocktailList
            cocktailList={visibleCocktails}
            loadMore={loadMore}
            loading={isLoading.current}
            inputValue=""
            selectValue=""
            clickedHashtag=""
          />
          {visibleCocktails.length === 0 ? (
            <p className={style.nomore_data}>🍹잠시만 기다려주세요.🍹</p>
          ) : (
            visibleCocktails.length >= totalCount && (
              <p className={style.nomore_data}>
                🍹모든 칵테일을 불러왔습니다🍹
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
