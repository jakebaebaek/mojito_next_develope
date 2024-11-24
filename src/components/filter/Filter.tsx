import style from "./Filter.module.scss";
import Card from "../card/Card";
import ReturnArrow from "@public/ReturnArrow.svg";
import Button from "../button/Button";

export default function Filter() {
  return (
    <div className={`${style.filter_section}`}>
      <h1>Filter Section</h1>

      <div className={`${style.filter_box}`}>
        {/* 필터 */}
        <div className={`${style.tasting_wrap}`}>
          <h3>테이스팅 노트</h3>
          <div>
            {/* 테이스팅 노트 체크박스 리스트 */}
            <label>
              <input type="checkbox" />
              <i></i>
              <span>테이스팅 노트 이름</span>
              <img src="" alt="Emoji" />
            </label>
          </div>
        </div>
        <div className={`${style.line}`}></div>

        <div className={`${style.base_wrap}`}>
          <h3>베이스</h3>
          <div>
            {/* 베이스 체크박스 리스트 */}
            <label>
              <input type="checkbox" />
              <i></i>
              <span>베이스 이름</span>
              <img src="" alt="Emoji" />
            </label>
          </div>
        </div>
        <div className={`${style.line}`}></div>
        <div className={`${style.booziness_wrap}`}>
          <h3>얼마나 취할래</h3>
          <div>
            {/* 알코올 슬라이더 */}
            <div></div>
          </div>
        </div>
        <div className={`${style.line}`}></div>
        <div className={`${style.sweet_wrap}`}>
          <h3>Sweet or Dry?</h3>
          <div>
            {/* 스위트 슬라이더 */}
            <div></div>
          </div>
        </div>

        <Button text="검색" color="orange"></Button>
        <div className={`${style.return_btn}`}>
          <ReturnArrow />
          <span>초기화</span>
        </div>
      </div>

      <Card />
    </div>
  );
}
