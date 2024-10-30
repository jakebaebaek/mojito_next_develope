export default function Top100() {
  return (
    <div>
      <h1>
        World&apos;s Top 100
        <p>Cocktails</p>
      </h1>

      {/* 슬라이더 */}
      <div>
        <div>
          {/* 슬라이드가 있는 경우 */}
          <div>
            <a href="/desc:id">
              <img src="이미지 URL" alt="Cocktail Image" />
            </a>
          </div>

          {/* 슬라이드가 없는 경우 */}
          <div>
            <h2>WERE GOING TO SHOW</h2>
          </div>
        </div>
      </div>

      <a href="/find:linkTop100">
        <div>
          <span>+ Top 100 Cocktails 더보기</span>
        </div>
      </a>
    </div>
  );
}
