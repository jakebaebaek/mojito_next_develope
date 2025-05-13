"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";
import { useOffsetStore } from "@/lib/store/offsetStore";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { useSmartScrollRestore } from "@/lib/hooks/useScrollRestoration";

import style from "./FilterSection.module.scss";
import Filter from "./filter/Filter";
import CocktailList from "@/components/main/cocktailList/CocktailList";

export default function FilterSection() {
  const { cocktailList, totalCount } = useCocktailStore();
  const [localCocktailList, setLocalCocktailList] = useState<TCocktail[]>([]);
  const { offset, setOffset } = useOffsetStore();
  const isLoading = useRef(false);

  //스크롤 바가 아래로 내려가면 실행될 loadMore 함수, 이 메서드는 cocktailList 컴포넌트로 넘겨준다.
  const loadMore = useCallback(async () => {
    //isLoading.current가 true면 return
    if (isLoading.current) return;
    isLoading.current = true;

    //칵테일이 모두 렌더링 된다면 isLoading.current를 false로 바꿔주어 loadMore가 실행되지 않도록 한다.
    if (localCocktailList.length >= totalCount) {
      isLoading.current = false;
      return;
    }
    // 모든 칵테일 데이터가 들어왔다면 zustand 칵테일 데이터 기반으로 렌더링한다.
    if (cocktailList.length != 0) {
      setLocalCocktailList((prev) => {
        return [...prev, ...cocktailList.slice(prev.length, prev.length + 25)];
      });
      setOffset(offset + 25);
      console.log("이건 모든 칵테일 데이터로부터 옴😍😍😎😎😋");
    } else {
      //칵테일 데이터가 없을 때 db에서 25개씩 불러온다.
      const newCocktails = await getCocktail(25, offset);
      setLocalCocktailList((prev) => {
        return [...prev, ...newCocktails.cocktails];
      });
      setOffset(offset + 25);
      console.log("이건 25개 호출 데이터💥💥💥💢");
    }

    isLoading.current = false;
  }, [offset, localCocktailList.length, totalCount, setOffset, cocktailList]);

  // 이미 렌더링된 칵테일 카드가 있다면, sessionStorage에서 offset 값을 가져와서 그 값만큼 칵테일을 불러온다.
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("scrollY", String(window.scrollY));
      sessionStorage.setItem("offset", JSON.stringify(offset));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  useEffect(() => {
    const savedOffset = sessionStorage.getItem("offset");
    const savedScrollY = sessionStorage.getItem("scrollY");

    if (savedOffset) {
      const parsedOffset = JSON.parse(savedOffset);
      const restoredCocktails = cocktailList.slice(0, parsedOffset);
      setLocalCocktailList(restoredCocktails);
      setOffset(parsedOffset);

      requestAnimationFrame(() => {
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY));
        }
      });
    } else {
      const initial = cocktailList.slice(0, 25);
      setLocalCocktailList(initial);
      setOffset(25);
      window.scrollTo(0, 0);
    }

    isLoading.current = false;
  }, []);
  useEffect(() => {
    if (performance.navigation.type !== 2) {
      sessionStorage.removeItem("offset");
      sessionStorage.removeItem("scrollY");
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
            inputValue=""
            selectValue=""
          />
          {localCocktailList.length === 0 ? (
            <p className={`${style.nomore_data}`}>🍹잠시만 기다려주세요.🍹</p>
          ) : (
            localCocktailList.length >= totalCount && (
              <p className={`${style.nomore_data}`}>
                🍹모든 칵테일을 불러왔습니다🍹
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
