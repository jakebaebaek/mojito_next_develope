"use client";

import style from "./Filter.module.scss";
import Card from "../../common/card/Card";
import ReturnArrow from "@public/ReturnArrow.svg";
import Button from "../../common/button/Button";
import RangeSlider from "@/components/main/slider/RangeSlider";

import { useEmojiStore } from "@/lib/store/emojiStore";
import { filterList } from "@/lib/mokdata/filterList";

export default function Filter() {
  //zustand 상태관리
  const { emojiList } = useEmojiStore();
  console.log(emojiList);

  return (
    <div className={`${style.filter_box}`}>
      {/* 필터 */}
      <div className={`${style.tasting_wrap}`}>
        <h3>테이스팅 노트</h3>
        <div className={`${style.item_wrap}`}>
          {filterList.tasting.map((item) => (
            <label>
              <input type="checkbox" />
              <div className={style.checkbox_content}>
                <img
                  className={`${style.checkbox_emoji}`}
                  src={
                    emojiList.find((emoji) => emoji.name === item.emoji)?.url
                  }
                  alt="Emoji"
                />
                <span className={`${style.checkbox_txt}`}>{item.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className={`${style.base_wrap}`}>
        <h3>베이스</h3>
        <div className={`${style.item_wrap}`}>
          {filterList.base.map((item) => (
            <label>
              <input type="checkbox" />
              <div className={style.checkbox_content}>
                <img
                  src={
                    emojiList.find((emoji) => emoji.name === item.emoji)?.url
                  }
                  alt="Emoji"
                />
                <span>{item.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className={`${style.booziness_wrap}`}>
        <h3>얼마나 취할래?</h3>
        <div className={`${style.slider_wrap}`}>
          <RangeSlider />
        </div>
      </div>

      <div className={`${style.sweet_wrap}`}>
        <h3>Sweet or Dry?</h3>
        <div>
          <div className={`${style.slider_wrap}`}>
            <RangeSlider />
          </div>
        </div>
      </div>

      <div className={`${style.btn_wrap}`}>
        <Button
          className={`${style.search_btn}`}
          text="검색"
          color="orange"
        ></Button>
        <div className={`${style.return_btn}`}>
          <ReturnArrow className={`${style.return_svg}`} />
          <span className={`${style.return_txt}`}>초기화</span>
        </div>
      </div>
    </div>
  );
}
