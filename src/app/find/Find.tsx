"use client";
import style from "./Find.module.scss";
import SearchIcon from "@public/Search.svg";
import CocktailList from "@/components/main/cocktailList/CocktailList";
import { TCocktail } from "@/lib/types/TCocktail";
import { THashtag } from "@/lib/types/THashtag";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useEmojiStore } from "@/lib/store/emojiStore";
import { useCocktailStore } from "@/lib/store/cocktailStore";

type FindProps = {
  hashtagList: THashtag[];
};

const Find = (hashtagList: FindProps) => {
  const searchParams = useSearchParams();
  const linkTop100 = searchParams.get("linkTop100");
  const { emojiList } = useEmojiStore();
  const { cocktailList, hashtagCocktails } = useCocktailStore();
  const [hashArray, setHashArray] = useState(hashtagList.hashtagList);
  const getHashElements =
    typeof document !== "undefined" ? document.getElementsByName("check") : [];

  console.log(hashArray);
  function top100Check() {
    if (linkTop100 === "1") {
      getHashElements[0]?.click();
    }
  }

  useEffect(() => {
    top100Check();
  }, [linkTop100]);
  console.log("😉😉😉😉", emojiList);
  const getHash = Array.from(getHashElements) as HTMLInputElement[];
  const hashTagTrueFalseArray = getHash.map((val) => val.checked);

  const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const hashValue = event.target.value;
    for (let tag of getHash) {
      if (tag.value !== hashValue) {
        tag.checked = false;
      }
    }
  };

  const [searchText, setSearchText] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log("onsubmit event");
  };

  const [selectValue, setSelectValue] = useState("name");
  const selectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  return (
    <div className={style.Find}>
      {/* 상단 */}
      <div>
        {/* 검색창 */}
        <div className={style.search_space}>
          <h3>칵테일 이름 또는 재료를 검색해보세요</h3>
          <form onSubmit={onSubmit} className={style.search_box}>
            <div className={style.inputSearchBox}>
              <div className="select">
                <select
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option value="name">이름검색</option>
                  <option value="ingredient">재료검색</option>
                </select>
              </div>
              <input
                className={style.search_input}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                value={searchText}
              />
              <div className={style.search_icon}>
                <SearchIcon />
              </div>
            </div>
          </form>
        </div>

        {/* 해시태그 */}
        <div className={style.tags_box}>
          {hashArray.map((hashtag) => (
            <label key={hashtag._id}>
              <input
                type="checkbox"
                name="check"
                onChange={onChangeCheckbox}
                value={hashtag.value}
                className={style.cBox}
              />
              <span
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
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 하단 */}
      <div className={style.cardContainer}></div>
    </div>
  );
};

export default Find;
