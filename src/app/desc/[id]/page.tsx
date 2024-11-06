import styles from "./desc.module.scss";

export default function page() {
  return (
    <>
      <div id="desc">
        <div>Hi desc</div>
        <div>
          <img alt="Cocktail" />
        </div>
        <div>
          <div id="info">
            <div>
              <div>
                <div>
                  <div>해시태그</div>
                </div>
                <h1>칵테일 이름</h1>
                <div>
                  <div>베이스</div>
                  <img alt="Base" />
                  <div>베이스 이름</div>
                </div>
                <div>테이스팅 노트</div>
                <img alt="Flavor" />
                <div>테이스팅 이름</div>
                <div>
                  <div>
                    <div>GENTLE</div>
                    <div>BOOZY</div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>SWEET</div>
                    <div>DRY</div>
                  </div>
                </div>
              </div>
              <div>
                <div>Recipe</div>
                <ul>
                  <li>재료와 양</li>
                </ul>
                <div>
                  <h4>믹스방법</h4>
                  <p>방법 설명</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
