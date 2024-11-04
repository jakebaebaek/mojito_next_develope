export default function Header() {
  return (
    <div>
      <div>
        <ul>
          <li>
            <h1>
              <a href="/">
                <img src="" alt="Emoji" />
                모히또에서 몰디브 한 잔
              </a>
            </h1>
          </li>

          <li>
            <a href="/find:linkTop100">칵테일 검색</a>
          </li>

          <li>
            <a href="/storage">내 칵테일 창고</a>
          </li>

          <li>
            <div>
              <span>로그인 버튼 텍스트</span>
              {/* 로그인 아이콘 */}
            </div>
          </li>
        </ul>
      </div>

      {/* 스크롤업 화살표 */}
      <div>
        <img src="arrow-up-circle.svg" alt="Scroll Up Arrow" />
      </div>
    </div>
  );
}
