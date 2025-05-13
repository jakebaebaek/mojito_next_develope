"use client";

import { useState, useMemo, useEffect } from "react";
import style from "./Storage.module.scss";
import Card from "@/components/common/card/Card";
import MemoCard from "@/components/common/card/MemoCard";
import DropdownArrow from "@public/DropdownArrow.svg";
import { useMemberStore } from "@/lib/store/memberStore";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { useSearchParams, useRouter } from "next/navigation";

const Storage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "recorded";

  const [filterOption, setFilterOption] = useState<string>("별점순");
  const { heart, memo } = useMemberStore();
  const { cocktailList } = useCocktailStore();
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const handleFilterChange = (value: string) => {
    setFilterOption(value);
  };

  // 필터링한 리뷰한 칵테일 카드들
  const memoCocktailCardList = cocktailList.filter((cocktail) =>
    memo.some((item) => item.cocktail_id === cocktail._id && item.rating)
  );
  // 필터링한 찜한 칵테일 카드들
  const favoriteCocktailCardList = cocktailList.filter((cocktail) =>
    heart.some((item) => item.cocktail_id === cocktail._id.toString())
  );

  const cocktailCardList = useMemo(
    () =>
      activeTab === "recorded"
        ? memoCocktailCardList
        : favoriteCocktailCardList,
    [activeTab, memo, heart, cocktailList]
  );

  // 최신순 칵테일 카드 배열
  const sortedMemoList = useMemo(() => {
    return [...cocktailCardList].sort((a, b) => {
      if (filterOption === "최신순") {
        if (activeTab === "recorded") {
          const memoA = memo.find(
            (m) => m.cocktail_id.toString() === a._id.toString()
          );
          const memoB = memo.find(
            (m) => m.cocktail_id.toString() === b._id.toString()
          );
          return (
            new Date(memoB?.updatedAt || 0).getTime() -
            new Date(memoA?.updatedAt || 0).getTime()
          );
        } else if (activeTab === "favorite") {
          const heartA = heart.find((h) => h.cocktail_id === a._id.toString());
          const heartB = heart.find((h) => h.cocktail_id === b._id.toString());
          return (
            new Date(heartB?.addedAt || 0).getTime() -
            new Date(heartA?.addedAt || 0).getTime()
          );
        }
      }
      if (filterOption === "별점순") {
        const memoA = memo.find(
          (m) => m.cocktail_id.toString() === a._id.toString()
        );
        const memoB = memo.find(
          (m) => m.cocktail_id.toString() === b._id.toString()
        );
        return (memoB?.rating || 0) - (memoA?.rating || 0);
      }
      return 0;
    });
  }, [cocktailCardList, filterOption]);
  return (
    <div className={style.container}>
      {/* 탭 메뉴 */}
      <div className={style.storage_menu}>
        <div
          className={`${style.cocktail_recorded} ${
            activeTab === "recorded" ? style.active : ""
          }`}
          onClick={() => {
            setActiveTab("recorded");
            router.replace("?tab=recorded");
          }} // "칵테일 기록" 클릭
        >
          <h3>칵테일 기록</h3>
        </div>
        <div
          className={`${style.cocktail_favorite} ${
            activeTab === "favorite" ? style.active : ""
          }`}
          onClick={() => {
            setActiveTab("favorite");
            router.replace("?tab=favorite"); // URL에 탭 정보 유지
          }} // "찜한 칵테일" 클릭
        >
          <h3>찜한 칵테일</h3>
        </div>
      </div>

      {/* 드롭다운 필터 */}
      <div className={`${style.filterBox}`}>
        <DropdownArrow className={`${style.dropdownArrow}`} />
        <select
          className={`${style.select}`}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="별점순"> 별점순 </option>
          <option value="최신순"> 최신순 </option>
        </select>
      </div>

      {/* 렌더링 영역 */}
      <div className={style.card_container}>
        {sortedMemoList.length === 0 ? (
          <div className={`${style.empty_message}`}>
            <h3>
              저장된 칵테일이 없습니다. 칵테일마다 리뷰와 별점을 남겨주세요
            </h3>
          </div>
        ) : // 필터링한 칵테일 카드들 렌더
        activeTab === "recorded" && memoCocktailCardList ? (
          sortedMemoList.map((cocktail) => (
            <MemoCard
              key={cocktail._id}
              id={cocktail._id}
              name={cocktail.name.ko}
              img_url={cocktail.img}
              memo={
                memo.find((item) => item.cocktail_id === cocktail._id)?.memo_txt
              }
              rating={
                memo.find((item) => item.cocktail_id === cocktail._id)?.rating
              }
            />
          ))
        ) : (
          sortedMemoList.map((cocktail) => (
            <Card
              key={cocktail._id}
              id={cocktail._id}
              name={cocktail.name}
              img_url={cocktail.img}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Storage;
