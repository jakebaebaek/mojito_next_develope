"use client";
import style from "./FindSearchBar.module.scss";
import SearchIcon from "@public/Search.svg";
import { THashtag } from "@/lib/types/THashtag";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useEmojiStore } from "@/lib/store/emojiStore";

type FindProps = {
  hashtagList: THashtag[];
  onInputChange: (value: string) => void;
  onSelectChange: (value: string) => void;
  onClickedHashtag: (value: string) => void;
  className: string;
};

const FindSearchBar = ({
  hashtagList,
  onInputChange,
  onSelectChange,
  onClickedHashtag,
  className,
}: FindProps) => {
  const searchParams = useSearchParams();
  const linkTop100 = searchParams.get("linkTop100");
  const { emojiList } = useEmojiStore();
  const [currentHashtag, setCurrentHashtag] = useState("");
  const [searchText, setSearchText] = useState("");

  const getHashElements =
    typeof document !== "undefined" ? document.getElementsByName("check") : [];

  useEffect(() => {
    if (linkTop100 === "1" && hashtagList.length > 0) {
      const hashElements = document.getElementsByName("check");
      const top100Checkbox = Array.from(hashElements).find(
        (el) => (el as HTMLInputElement).value === "top100"
      );
      if (top100Checkbox) {
        (top100Checkbox as HTMLInputElement).click();
      }
    }
  }, [linkTop100, hashtagList]);
  const getHash = Array.from(getHashElements) as HTMLInputElement[];
  const hashTagTrueFalseArray = getHash.map((val) => val.checked);

  const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const hashValue = event.target.value;
    const isAlreadySelected = currentHashtag === hashValue;

    if (isAlreadySelected) {
      // 같은 해시태그 다시 클릭했을 때 → 해제 처리
      event.target.checked = false; // 체크박스도 수동 해제
      setCurrentHashtag("");
      onClickedHashtag("");
    } else {
      // 새로운 해시태그 선택
      setCurrentHashtag(hashValue);
      onClickedHashtag(hashValue);

      // 다른 체크박스는 해제
      for (let tag of getHash) {
        if (tag.value !== hashValue) {
          tag.checked = false;
        }
      }
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onInputChange(searchText);
  };

  return (
    <div className={`${style.Find} ${className}`}>
      {/* 검색창 */}
      <div className={style.search_space}>
        <h3 className={`${style.hashtagSearchGuide}`}>
          {currentHashtag.length > 1
            ? `${
                hashtagList.find((tag) => currentHashtag === tag.value)?.name ??
                "😄"
              } 카테고리 안에서 검색 중입니다🍸`
            : "칵테일 이름 또는 재료를 검색해보세요"}
        </h3>

        <form onSubmit={onSubmit} className={style.search_box}>
          <div className={`${style.selectBox}`}>
            <select
              onChange={(e) => {
                onSelectChange(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="name">이름검색</option>
              <option value="ingredient">재료검색</option>
            </select>
          </div>
          <input
            className={style.search_input}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            maxLength={20}
            spellCheck={false}
            type="text"
            value={searchText}
          />
          <div className={style.search_icon}>
            <SearchIcon />
          </div>
        </form>
      </div>

      {/* 해시태그 */}
      <div className={style.tags_box}>
        {hashtagList.map((hashtag) => (
          <label key={hashtag._id}>
            <input
              type="checkbox"
              name="check"
              onChange={onChangeCheckbox}
              value={hashtag.value}
              className={style.cBox}
            />

            <div
              className={
                hashtag.value === "top100"
                  ? `${style.TOP} ${style.hashtag}`
                  : style.hashtag
              }
            >
              {hashtag.name}
              <img
                alt="hashtagEmoji"
                src={
                  emojiList.find((emoji) => hashtag.emoji === emoji.name)
                    ?.url ?? "😄"
                }
                className={style.hash_emoji}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FindSearchBar;
