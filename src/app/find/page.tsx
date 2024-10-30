"use client";

import appStyles from "../App.module.css";
import Styles from "./find.module.scss";
// import SearchIcon from '@mui/icons-material/Search';
// import Card from './Card';

import { useEffect, useState, useContext, ChangeEvent, FormEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import axios from "axios";
// import { APIContext } from '../context/APIContext';

// TypeScript 인터페이스 정의
interface HashTag {
  name: string;
  value: string;
  key: number;
}

interface Cocktail {
  _id: { $oid: string };
  img: string;
  name: string;
  hashtag: string[];
  ingredients: { [key: string]: string }[];
}

const Find = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const linkTop100 = searchParams.get("linkTop100");

  // Redux에서 이모지 상태 가져오기
  const emoji = "이모지 데이터 값";

  // Context API 데이터 가져오기
  // const API = useContext(APIContext);

  const [hashArray, setHashArray] = useState<Cocktail[]>([]);
  const getHashElements =
    typeof document !== "undefined" ? document.getElementsByName("check") : [];

  function top100Check() {
    if (linkTop100 === "1") {
      getHashElements[0]?.click();
    }
  }
  useEffect(() => {
    top100Check();
  }, [linkTop100]);

  const getHash = Array.from(getHashElements) as HTMLInputElement[];
  const hashTagTrueFalseArray = getHash.map((val) => val.checked);

  const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const hashValue = event.target.value;
    for (let tag of getHash) {
      if (tag.value !== hashValue) {
        tag.checked = false;
      }
    }

    // const allHash = [
    //     ...API.filter((item: Cocktail) => item.hashtag[0] === hashValue),
    //     ...API.filter((item: Cocktail) => item.hashtag[1] === hashValue),
    //     ...API.filter((item: Cocktail) => item.hashtag[2] === hashValue),
    //     ...API.filter((item: Cocktail) => item.hashtag[3] === hashValue),
    // ];

    // setHashArray(allHash);
  };

  const [searchText, setSearchText] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log("onsubmit event");
  };

  const hashTagArray: HashTag[] = [
    { name: "#TOP 100", value: "top100", key: 1 },
    { name: "#홈파티", value: "house-party", key: 2 },
    { name: "#데일리", value: "allseason-classics", key: 3 },
    { name: "#산타랑_건배", value: "christmas", key: 4 },
    { name: "#무비나잇", value: "movie-nights", key: 5 },
    { name: "#해피뉴이어", value: "new-years-eve", key: 6 },
    { name: "#불금", value: "downtown", key: 7 },
    { name: "#HBD", value: "birthday", key: 8 },
    { name: "#나를위한시️간", value: "time-for-you", key: 9 },
    { name: "#발렌타인데이", value: "valentines-day", key: 10 },
    { name: "#뜨밤", value: "anniversary", key: 11 },
  ];

  const [selectValue, setSelectValue] = useState("name");
  const selectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const [render, setRender] = useState(0);
  function INemoji() {
    setRender(1);
  }
  useEffect(() => INemoji(), [emoji]);

  return (
    <div className={Styles.Find}>
      {/* 상단 */}
      <div>
        {/* 검색창 */}
        <div className={Styles.search_space}>
          <h3>칵테일 이름 또는 재료를 검색해보세요</h3>
          <form onSubmit={onSubmit} className={Styles.search_box}>
            <div className={Styles.inputSearchBox}>
              <div className="select">
                <select onChange={selectOnChange}>
                  <option value="name">이름검색</option>
                  <option value="ingredient">재료검색</option>
                </select>
              </div>
              <input
                className={Styles.search_input}
                onChange={onChange}
                type="text"
                value={searchText}
              />
              <i>{/* 서치 아이콘이 들어갈 자리입니다 */}</i>
            </div>
          </form>
        </div>

        {/* 해시태그 */}
        <div className={Styles.tags_box}>
          {hashTagArray.map((val) => (
            <label key={val.name}>
              <input
                type="checkbox"
                name="check"
                onChange={onChangeCheckbox}
                value={val.value}
                className={Styles.cBox}
              />
              <span
                className={
                  val.value === "top100"
                    ? `${Styles.TOP} ${Styles.hashtag}`
                    : Styles.hashtag
                }
              >
                {val.name}
                <img className={Styles.hash_emoji} />
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 하단 */}
      <div className={Styles.cardContainer}></div>
    </div>
  );
};

export default Find;
