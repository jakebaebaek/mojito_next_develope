export default function Filter() {
  return (
    <div>
      <h2>Filter Section</h2>
      {/* 필터+검색결과 */}
      <div>
        {/* 필터 */}
        <div>
          <div>
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

          <div>
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

          <div>
            <h3>얼마나 취할래</h3>
            <div>
              {/* 알코올 슬라이더 */}
              <div></div>
            </div>
          </div>

          <div>
            <h3>Sweet or Dry?</h3>
            <div>
              {/* 스위트 슬라이더 */}
              <div></div>
            </div>
          </div>

          <button>검색</button>
        </div>

        {/* 결과 칵테일 카드 */}
        <div>
          {/* 클릭함 여부에 따른 조건 */}
          <div>데이터가 없어요</div>

          {/* API 배열 데이터로 카드 렌더링 */}
          <div>
            <img src="" alt="Cocktail Image" />
            <h3>칵테일 이름</h3>
          </div>
        </div>

        {/* View Element 상태 */}
        <div>Element true/false 상태</div>
      </div>
    </div>
  );
}
