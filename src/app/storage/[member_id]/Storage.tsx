"use client";

import { useState, useRef } from "react";
import style from "./Storage.module.scss";
import Card from "@/components/card/Card";
import MemoCard from "@/components//card/MemoCard";
import DropdownArrow from "@public/DropdownArrow.svg";
// import Dropdown from "@/components/dropdown/DropdownBox";

interface DropdownProps {
  options: string[];
  defaultOption: string;
  onChange: (value: string) => void;
}

const Storage = ({ recordedCocktails, favoriteCocktails }: any) => {
  const [activeTab, setActiveTab] = useState<string>("recorded");
  const [filterOption, setFilterOption] = useState<string>("별점순");

  const handleFilterChange = (value: string) => {
    console.log("Selected Filter:", value);
    setFilterOption(value);
  };

  // 활성화된 탭에 따른 데이터 결정
  const cocktails =
    activeTab === "recorded" ? recordedCocktails : favoriteCocktails;

  return (
    <div className={style.container}>
      {/* 탭 메뉴 */}
      <div className={style.storage_menu}>
        <div
          className={`${style.cocktail_recorded} ${
            activeTab === "recorded" ? style.active : ""
          }`}
          onClick={() => setActiveTab("recorded")} // "칵테일 기록" 클릭
        >
          <h3>칵테일 기록</h3>
        </div>
        <div
          className={`${style.cocktail_favorite} ${
            activeTab === "favorite" ? style.active : ""
          }`}
          onClick={() => setActiveTab("favorite")} // "찜한 칵테일" 클릭
        >
          <h3>찜한 칵테일</h3>
        </div>
      </div>

      {/* 드롭다운 필터 */}
      <div className={`${style.filterBox}`}>
        <DropdownArrow className={`${style.dropdownArrow}`} />
        <select className={`${style.select}`}>
          <option> 별점순 </option>
          <option> 최신순 </option>
        </select>
      </div>

      {/* 렌더링 영역 */}
      <div className={style.card_container}>
        {activeTab === "recorded" ? <MemoCard /> : <Card />}
      </div>
    </div>
  );
};

export default Storage;
