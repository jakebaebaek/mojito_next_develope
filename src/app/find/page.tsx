"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { getHashtags } from "@/lib/fetchs/fetchHashtags";
import { THashtag } from "@/lib/types/THashtag";
import { TCocktail } from "@/lib/types/TCocktail";
import { useOffsetStore } from "@/lib/store/offsetStore";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";

import style from "./Find.module.scss";
import FindSearchBar from "@/components/find_search_bar/FindSearchBar";
import CocktailList from "@/components/main/cocktailList/CocktailList";
import Navigation from "@/components/common/navigation/Navigation";

type FindProps = {
  hashtagList: THashtag[];
  onInputChange: (value: string) => void;
};

export default function FilterWrapper() {
  const { cocktailList, totalCount } = useCocktailStore();
  const [localCocktailList, setLocalCocktailList] = useState<TCocktail[]>([]);
  const { offset, setOffset } = useOffsetStore();
  const isLoading = useRef(false);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("name");
  const [hashtags, setHashtags] = useState<THashtag[]>([]);

  useEffect(() => {
    const fetchHashtags = async () => {
      const response = await getHashtags();
      console.log("😎😋해쉬태그 가져왔다", response);
      setHashtags(response);
    };
    fetchHashtags();
  }, []);

  //스크롤 바가 아래로 내려가면 실행될 loadMore 함수, 이 메서드는 cocktailList 컴포넌트로 넘겨준다.
  const loadMore = useCallback(async () => {
    //isLoading.current가 true면 return
    if (isLoading.current) return;
    isLoading.current = true;

    //칵테일이 모두 렌더링 된다면 isLoading.current를 false로 바꿔주어 loadMore가 실행되지 않도록 한다.
    if (cocktailList.length === 0 || localCocktailList.length >= totalCount) {
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

  if (isLoading.current) {
    return <div className={`${style.loading}`}>Loading...</div>;
  }

  return (
    <div className={`${style.body}`}>
      <Navigation />
      <FindSearchBar
        hashtagList={hashtags}
        onInputChange={setInputValue}
        onSelectChange={setSelectValue}
        className={`${style.find_search_bar}`}
      />
      <CocktailList
        cocktailList={localCocktailList}
        loadMore={loadMore}
        loading={isLoading.current}
        inputValue={inputValue}
        selectValue={selectValue}
      />
    </div>
  );
}
