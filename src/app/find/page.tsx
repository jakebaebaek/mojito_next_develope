"use client";
import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { getHashtags } from "@/lib/fetchs/fetchHashtags";
import { useHashtagStore } from "@/lib/store/hashtagStore";
import { useOffsetStore } from "@/lib/store/offsetStore";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";

import style from "./find.module.scss";
import FindSearchBar from "@/components/find_search_bar/FindSearchBar";
import CocktailList from "@/components/main/cocktailList/CocktailList";
import Navigation from "@/components/common/navigation/Navigation";
import SuspenseSearchParams from "./SuspenseSearchParams";

export const dynamic = "force-dynamic";

export default function FindPage() {
  const { cocktailList, totalCount } = useCocktailStore();
  const { offset, setOffset } = useOffsetStore();
  const isLoading = useRef(false);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("name");
  const { hashtags, setHashtags } = useHashtagStore();
  const [clickedHashtag, setClickedHashtag] = useState("");

  const visibleCocktails = cocktailList.slice(0, offset);
  // 컴포넌트에서
  useEffect(() => {
    if (!hashtags.length) {
      getHashtags().then(setHashtags);
    }
  }, [hashtags.length, setHashtags]);

  useEffect(() => {
    if (offset === 0) {
      setOffset(25); // 초기 로딩
    }
  }, []);
  //스크롤 바가 아래로 내려가면 실행될 loadMore 함수, 이 메서드는 cocktailList 컴포넌트로 넘겨준다.
  const loadMore = useCallback(async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    if (cocktailList.length === 0 || offset >= totalCount) {
      isLoading.current = false;
      return;
    }

    // 필요한 경우 getCocktail로 더 불러오기
    // if (cocktailList.length < offset + 25) {
    //   const newCocktails = await getCocktail(25, offset);
    // }

    setOffset(offset + 25);
    isLoading.current = false;
  }, [offset, totalCount, cocktailList.length]);

  if (isLoading.current) {
    return <div className={`${style.loading}`}>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={`${style.body}`}>
        <Navigation />
        <SuspenseSearchParams setClickedHashtag={setClickedHashtag} />
        <FindSearchBar
          hashtagList={hashtags}
          onInputChange={setInputValue}
          onSelectChange={setSelectValue}
          onClickedHashtag={setClickedHashtag}
          className={`${style.find_search_bar}`}
        />
        <CocktailList
          cocktailList={visibleCocktails}
          loadMore={loadMore}
          loading={isLoading.current}
          inputValue={inputValue}
          selectValue={selectValue}
          clickedHashtag={clickedHashtag}
        />
      </div>
    </Suspense>
  );
}
