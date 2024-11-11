import style from "./Desc.module.scss";
import Star from "@public/Star.svg";

export default function page() {
  return (
    <div id="desc" className={style.container}>
      <div className={`${style.upper}`}>
        {/* 칵테일 이름 */}
        <div className={style.nametagBox}>
          <h1 className={style.cocktailName}>Tommys Margarita</h1>
          {/* 해시태그 */}
          <div className={style.tagsBox}>
            <div className={style.tagItem}>
              <span>#상큼한맛</span>
              <img
                className={style.hashEmoji}
                src="맞는 이미지 넣기"
                alt="Hashtag Emoji"
              />
            </div>
          </div>
        </div>
        {/* 칵테일 정보 */}
        <div className={style.cocktailInfo}>
          <div className={style.imgBox}>
            <img
              src="https://mojito-cocktail-img.s3.ap-northeast-2.amazonaws.com/0.png"
              alt="Cocktail Image"
            />
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
              <div className={style.baseName}>화이트 럼</div>
            </div>
            <div className={style.flavor}>
              <span>테이스팅 노트</span>
              <img
                className={style.flavorImg}
                src="맞는 이미지 넣기"
                alt="Flavor Image"
              />
              <div className={style.flavorName}>시트러스</div>
            </div>
          </div>

          {/* 알콜세기 및 당도 */}
          <div className={style.slider}>
            <span>SWEET</span>
            <input type="range" min="1" max="10" value="7" disabled />
            <span>DRY</span>
            <span>GENTLE</span>
            <input type="range" min="1" max="10" value="5" disabled />
            <span>BOOZY</span>
          </div>
        </div>
      </div>

      {/* 레시피 */}
      <div className={style.textBox}>
        {/* 재료 */}
        <div className={style.recipe}>
          <div className={style.recipeTitle}>레시피</div>
          <ul className={style.ingredients}>
            <li>화이트 럼(White Rum) 60ml</li>
            <li>신선한 라임 주스 30ml</li>
            <li>설탕 시럽 15ml (또는 꿀 + 1 티스푼)</li>
          </ul>
          <div className={style.mix}>
            <h4>믹스방법</h4>
            <ol>
              <li>쉐이커 준비: 모든 재료를 넣고 칠링된 쉐이커를 준비합니다.</li>
              <li>
                잘 섞기: 얼음과 함께 흔들고, 텀블러 스타일의 잔에 부어줍니다.
              </li>
              <li>
                장식: 라임 웨지 또는 꿀을 조금 뿌려서 마무리 장식을 해줍니다.
              </li>
            </ol>
          </div>
        </div>
      </div>
      {/* 칵테일 리뷰 */}
      <div className={`${style.reviewarea}`}>
        <div className={`${style.reviewTitle}`}> 칵테일 리뷰 </div>
        <div className={`${style.reviewBox}`}>
          <div className={`${style.star}`}>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <div className={`${style.divider}`} /> {/* 구분선 */}
          <div className={`${style.reviewText}`}>
            <textarea placeholder="칵테일 맛이 어땠나요? 리뷰를 남겨보세요."></textarea>
          </div>
        </div>
        <button className={`${style.saveButton}`}>저장</button>
      </div>
    </div>
  );
}
