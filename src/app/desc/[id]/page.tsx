"use client";
import { useParams } from "next/navigation";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { useMemberStore } from "@/lib/store/memberStore";
import { useRef, useState, useEffect } from "react";

import { postReview, getReviews } from "@/lib/fetchs/fetchReview";
import Navigation from "@/components/common/navigation/Navigation";
import style from "./Desc.module.scss";
import StarRating from "@public/StarRating.svg";

export default function Desc({}) {
  const { id } = useParams();
  const { cocktailList } = useCocktailStore();
  const { memo, setMemo } = useMemberStore();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const reviewRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log("리뷰 정보", memo);
  }, [memo]);

  const handleRating = (index: number) => {
    setRating(rating === index + 1 ? 0 : index + 1);
  };

  const handleSaveReview = async () => {
    const reviewText = reviewRef.current?.value;
    const newReview = {
      cocktail_id: id,
      memo_txt: reviewText,
    };
    console.log("리뷰 저장", newReview);
    console.log("멤버의 정보를 가져오세요", useMemberStore.getState());
    if (!reviewText) {
      alert("리뷰를 입력해주세요!");
      return;
    }
    if (!useMemberStore.getState().memo) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      postReview(id, reviewText);
      setMemo({ ...memo, newReview });
      alert("리뷰가 저장되었습니다.");
    } catch (error) {
      console.error("리뷰 저장 실패:", error);
    }
  };

  const cocktail = cocktailList.find((cocktail) => cocktail._id === id);

  // 데이터가 없는 경우 처리
  if (!cocktailList) {
    return <div>칵테일 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div id="desc" className={style.container}>
      <Navigation />
      <div className={`${style.upper}`}>
        {/* 칵테일 이름 */}
        <div className={style.nametagBox}>
          <h1 className={style.cocktailName}>{cocktail?.name.ko}</h1>
          <h2>{cocktail?.name.en}</h2>
          {/* 해시태그 */}
          <div className={style.tagsBox}>
            <div className={style.tagItem}>
              <span>#{cocktail?.flavor}</span>
              <img
                className={style.hashEmoji}
                src={"맞는 이미지 넣기"}
                alt="Hashtag Emoji"
              />
            </div>
          </div>
        </div>
        {/* 칵테일 정보 */}
        <div className={style.cocktailInfo}>
          <div className={style.imgBox}>
            <img src={cocktail?.img} alt="Cocktail Image" />
          </div>
          {/* 베이스 맛 */}
          <div className={style.bf}>
            <div className={style.base}>
              <span>베이스</span>
              <img
                className={style.baseImg}
                src="맞는 이미지 넣기"
                alt="Base Image"
              />
              <div className={style.baseName}>{cocktail?.base}</div>
            </div>
            <div className={style.flavor}>
              <span>테이스팅 노트</span>
              <img
                className={style.flavorImg}
                src="맞는 이미지 넣기"
                alt="Flavor Image"
              />
              <div className={style.flavorName}>{cocktail?.flavor}</div>
            </div>
          </div>

          {/* 알콜세기 및 당도 */}
          <div className={style.slider}>
            <span>SWEET</span>
            <input
              className={`${style.input}`}
              type="range"
              min="1"
              max="10"
              value={cocktail?.sweetness}
            />
            <span>DRY</span>
            <span>GENTLE</span>
            <input
              className={`${style.input}`}
              type="range"
              min="1"
              max="10"
              value={cocktail?.booziness}
            />
            <span>BOOZY</span>
          </div>
        </div>
      </div>

      {/* 레시피 */}
      <div className={style.textBox}>
        {/* 재료 */}
        <div className={style.recipe}>
          <div className={style.recipeTitle}>레시피</div>
          <h2>재료</h2>
          <ul className={style.ingredients}>
            {cocktail?.recipe.ingredients.map((item, index) => (
              <li className={`${style.ingredient}`} key={index}>
                {item.ingredient.ko}
                <br />
                <p className={`${style.subtitle_eng}`}>{item.ingredient.en}</p>
                <div className={`${style.divider}`}></div>
                {item.amount}
              </li>
            ))}
          </ul>
          <div className={style.mix}>
            <h2>믹스방법</h2>
            <ol className={`${style.instructions}`} type="1">
              {cocktail?.recipe.instructions.map((item, index) => (
                <li key={index}>
                  {item.ko}
                  <br />
                  <p className={`${style.subtitle_eng}`}>{item.en}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      {/* 칵테일 리뷰 */}
      <div className={`${style.reviewarea}`}>
        <div className={`${style.reviewTitle}`}> 칵테일 리뷰 </div>
        <div className={`${style.reviewBox}`}>
          <div className={`${style.stars}`}>
            {[...Array(5)].map((_, index) => (
              <StarRating
                key={index}
                className={`${style.star} ${
                  index < rating ? style.filled : ""
                } ${index < hover ? style.hovered : ""}`}
                onClick={() => handleRating(index)}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
          <div className={`${style.divider}`} />
          <div className={`${style.reviewText}`}>
            <textarea
              // value={memo. ? memo : ""}
              ref={reviewRef}
              placeholder="칵테일 맛이 어땠나요? 리뷰를 남겨보세요."
            />
          </div>
        </div>
        <button className={style.saveButton} onClick={handleSaveReview}>
          저장
        </button>
      </div>
    </div>
  );
}
