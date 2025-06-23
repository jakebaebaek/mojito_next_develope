"use client";
import { useParams } from "next/navigation";
import {
  useCocktailStore,
  useCocktailDetailStore,
} from "@/lib/store/cocktailStore";
import { useMemberStore } from "@/lib/store/memberStore";
import { useEmojiStore } from "@/lib/store/emojiStore";
import { useModalStore } from "@/lib/store/modalStore";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { postReview, deleteReview } from "@/lib/fetchs/fetchReview";
import { postRating } from "@/lib/fetchs/fetchRating";
import { TMemo } from "@/lib/types/TMemo";
import Navigation from "@/components/common/navigation/Navigation";
import Button from "@/components/common/button/Button";
import style from "./Desc.module.scss";
import StarRating from "@public/StarRating.svg";

export default function Desc({}) {
  console.log("🔁 Desc 컴포넌트 렌더링됨");
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { cocktailList } = useCocktailStore();
  const { memo, setMemo } = useMemberStore();
  const { cocktailDetail, setCocktailDetail } = useCocktailDetailStore();
  const { emojiList } = useEmojiStore();
  const { openLoginModal } = useModalStore();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const matchedMemo = Array.isArray(memo)
    ? memo.find((item: TMemo) => item && item.cocktail_id === id)
    : null;

  useEffect(() => {
    if (matchedMemo?.rating) {
      setRating(matchedMemo.rating);
    }
  }, [matchedMemo]);

  useEffect(() => {
    if (cocktailList.length === 0) return;
    const found = cocktailList.find((c) => c._id === id);
    if (found) {
      setCocktailDetail(found);
    }
  }, [id, cocktailList]);

  const handleRating = async (index: number) => {
    if (!session) {
      openLoginModal();
      return;
    }
    const newRating = rating === index + 1 ? 0 : index + 1;
    setRating(newRating);
    try {
      const res = await postRating(id, newRating);
      const { memo } = await res;
      alert("🌟별점이 저장되었습니다🌟");

      setMemo((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return [...safePrev.filter((m) => m && m.cocktail_id !== id), memo];
      });
      const current = useMemberStore.getState().memo;
      console.log("⭐️ 최신 별점:", current);
    } catch (error) {
      console.error("⭐️ 별점 저장 실패:", error);
    }
  };
  /*
    이 부분은 API로 리뷰 저장하는 부분입니다.
    리뷰 저장을 위해서는 로그인이 필요합니다.
    로그인이 안되어있을 경우, alert 로 로그인 필요 메시지가 뜹니다. 
    리뷰 값이 없고 저장 버튼을 누를 경우, alert 로 리뷰를 입력해주세요 메시지가 뜹니다.
    리뷰가 성공적으로 저장되었을 경우, alert 로 리뷰가 저장되었습니다 메시지가 뜹니다.
    리뷰가 저장되면서 동시에 db 에 업데이트가 됩니다. 
    기존 리뷰가 있을 경우, "저장" 버튼 대신 "수정" 버튼이 뜹니다.
    memberStore 에도 역시 db에 저장된 형식과 같은 형식의 데이터가 저장됩니다.
    memberStore 값은 useLayout.tsx 에서 페이지 처음 로딩될때 업데이트 됩니다.
  */
  const handleSaveReview = async () => {
    const reviewText = reviewRef.current?.value;
    if (!reviewText) {
      alert("리뷰를 입력해주세요.");
      return;
    }
    if (!session) {
      openLoginModal();
      return;
    }
    try {
      const res = await postReview(id, reviewText);
      console.log("🔍 저장 응답:", res);
      const { memo } = await res;

      setMemo((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return [...safePrev.filter((m) => m && m.cocktail_id !== id), memo];
      });
      setIsEditing(false); // 다시 읽기 모드로 전환
      console.log("store 최신 리뷰", useMemberStore.getState().memo);
      alert("리뷰가 저장되었습니다.");
    } catch (error) {
      console.error("리뷰 저장 실패:", error);
    }
  };
  /* 
    이 부분은 API로 리뷰 삭제하는 부분입니다.
    리뷰 삭제를 위해서는 로그인이 필요합니다.
    아직 진행중..
 */
  const handleDeleteReview = async () => {
    if (!session) {
      openLoginModal();
    }
    const confirmDelete = confirm("정말 리뷰를 삭제하시겠어요?");
    if (!confirmDelete) return;
    try {
      const res = await deleteReview(id);
      console.log("🔍 삭제 응답 상태 코드:", res.status);
      if (!res.ok) throw new Error("리뷰 삭제 실패");
      setMemo((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return safePrev.map((m) => {
          if (m && m.cocktail_id === id) {
            const { memo_txt, ...rest } = m; // memo_txt를 제외한 나머지 속성만 남김
            return rest;
          }
          return m;
        });
      });
      console.log("store 최신 리뷰", useMemberStore.getState().memo);

      setIsEditing(true);
      alert("🔥⛄🔥리뷰가 삭제되었습니다.");
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
    }
  };
  // 수많은 칵테일 중 id에 해당하는 칵테일을 찾기
  // const cocktail = cocktailList.find((cocktail) => cocktail._id === id);\
  console.log("칵테일 디테일 정보입니다. set 으로 만들어진.", cocktailDetail);
  const cocktail = cocktailDetail;

  // 해당 칵테일의 데이터와 이모지를 매칭하기
  const cocktailBaseEmoji = emojiList.find((emoji) => {
    if (!cocktail?.base) return false;

    if (Array.isArray(cocktail.base)) {
      return cocktail.base.some((b) => emoji.value.includes(b));
    }
  });

  const cocktailFlavorEmoji = emojiList.find((emoji) => {
    if (!cocktail?.flavor) return false;

    return cocktail.flavor.some((f) => emoji.value.includes(f));
  });

  // 데이터가 없는 경우 처리
  if (!cocktail) {
    return <div>칵테일 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div id="desc" className={style.container}>
      <Navigation page="desc" cocktailId={id} />
      <div className={`${style.upper}`}>
        {/* 칵테일 이름 */}
        <div className={style.nametagBox}>
          <h1 className={style.cocktailName}>{cocktail?.name.ko}</h1>
          <h2>{cocktail?.name.en}</h2>
          {/* 해시태그 */}
          <div className={style.tagsBox}>
            {cocktail?.hashtag?.map((tag, index) => {
              const matchedEmoji = emojiList.find((emoji) =>
                emoji.value.includes(tag)
              );

              return (
                <div key={index} className={style.tagItem}>
                  <span>#{tag}</span>
                  <img
                    className={style.hashEmoji}
                    src={matchedEmoji?.url || emojiList[1]?.url}
                    alt="Hashtag Emoji"
                  />
                </div>
              );
            })}
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
                src={cocktailBaseEmoji?.url || emojiList[1].url}
                alt="Base Image"
              />
              <div className={style.baseName}>
                {cocktail?.base.length ? cocktail?.base : "준비 중"}
              </div>
            </div>
            <div className={style.flavor}>
              <span>테이스팅 노트</span>
              <img
                className={style.flavorImg}
                src={cocktailFlavorEmoji?.url || emojiList[1].url}
                alt="Flavor Image"
              />
              <div className={style.flavorName}>
                {cocktail?.flavor || "준비 중"}
              </div>
            </div>
          </div>

          {/* 알콜세기 및 당도 */}
          <div className={style.slider}>
            <span>SWEET</span>
            <input
              readOnly
              className={`${style.input}`}
              type="range"
              min="1"
              max="10"
              value={cocktail?.sweetness}
            />
            <span>DRY</span>
            <span>GENTLE</span>
            <input
              readOnly
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
              <div
                key={`star-wrapper-${index}`}
                onClick={() => {
                  handleRating(index);
                }}
              >
                <StarRating
                  key={{ index }}
                  className={`${style.star} ${
                    index < rating ? style.filled : ""
                  } ${index < hover ? style.hovered : ""}`}
                  onMouseEnter={() => setHover(index + 1)}
                  onMouseLeave={() => setHover(0)}
                />
              </div>
            ))}
          </div>
          <div className={`${style.divider}`} />
          <div className={`${style.reviewText}`} id="review-textarea">
            <div className={style.reviewText}>
              {matchedMemo?.memo_txt && !isEditing ? (
                <div>{matchedMemo.memo_txt}</div>
              ) : (
                <textarea
                  ref={reviewRef}
                  defaultValue={matchedMemo?.memo_txt || ""}
                  placeholder="칵테일 맛이 어땠나요? 리뷰를 남겨보세요."
                />
              )}
            </div>
          </div>
        </div>
        {matchedMemo?.memo_txt ? (
          isEditing ? (
            <Button
              text="저장"
              color="orange"
              className={`${style.saveButton}`}
              onClick={handleSaveReview}
            />
          ) : (
            <div className={`${style.buttonBox}`}>
              <Button
                text="수정"
                color="orange"
                className={`${style.saveButton}`}
                onClick={() => setIsEditing(true)}
              />
              <Button
                text="삭제"
                color="red"
                className={`${style.deleteButton}`}
                onClick={handleDeleteReview}
              />
            </div>
          )
        ) : (
          <Button
            text="저장"
            color="orange"
            className={`${style.saveButton}`}
            onClick={handleSaveReview}
          />
        )}
      </div>
    </div>
  );
}
