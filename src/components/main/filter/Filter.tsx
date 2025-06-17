"use client";

import style from "./Filter.module.scss";
import ReturnArrow from "@public/ReturnArrow.svg";
import Button from "../../common/button/Button";
import RangeSlider from "@/components/main/slider/RangeSlider";

import { useEmojiStore } from "@/lib/store/emojiStore";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { useFilterValueStore } from "@/lib/store/filterValueStore";
import { filterList } from "@/lib/mokdata/filterList";

type TFilter = {
  onSearch: () => void;
  onReset: () => void;
};

export default function Filter({ onSearch, onReset }: TFilter) {
  //zustand 상태관리
  const { emojiList } = useEmojiStore();
  const { flavor, base, setFlavor, setBase } = useFilterValueStore();
  const { uniqueBases, uniqueFlavors } = useCocktailStore();

  return (
    <div className={`${style.filter_box}`}>
      {/* 필터 */}
      <div className={`${style.tasting_wrap}`}>
        <h3>테이스팅 노트</h3>
        <div className={`${style.item_wrap}`}>
          {uniqueFlavors?.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                onChange={() => setFlavor(item)}
                checked={flavor.includes(item)}
              />
              <div className={style.checkbox_content}>
                <img
                  className={`${style.checkbox_emoji}`}
                  src={emojiList.find((emoji) => emoji.value === item)?.url}
                  alt="Emoji"
                />
                <span className={`${style.checkbox_txt}`}>{item}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className={`${style.base_wrap}`}>
        <h3>베이스</h3>
        <div className={`${style.item_wrap}`}>
          {uniqueBases?.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                onChange={() => setBase(item)}
                checked={base.includes(item)}
              />
              <div className={style.checkbox_content}>
                <img
                  src={emojiList.find((emoji) => emoji.value === item)?.url}
                  alt="Emoji"
                />
                <span>{item}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className={`${style.booziness_wrap}`}>
        <h3>얼마나 취할래?</h3>
        <div className={`${style.slider_wrap}`}>
          <RangeSlider whatSliderIsIt="booziness" />
        </div>
      </div>

      <div className={`${style.sweet_wrap}`}>
        <h3>Sweet or Dry?</h3>
        <div>
          <div className={`${style.slider_wrap}`}>
            <RangeSlider whatSliderIsIt="sweetness" />
          </div>
        </div>
      </div>

      <div className={`${style.btn_wrap}`}>
        <Button
          className={`${style.search_btn}`}
          text="검색"
          color="orange"
          onClick={onSearch}
        ></Button>
        <div className={`${style.return_btn}`} onClick={onReset}>
          <ReturnArrow className={`${style.return_svg}`} />
          <span className={`${style.return_txt}`}>초기화</span>
        </div>
      </div>
    </div>
  );
}
