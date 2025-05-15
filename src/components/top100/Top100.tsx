// ✅ 핵심 로직: 랜덤 칵테일을 고정하고, 순환 슬라이드 구성 + 가운데 카드 강조

"use client";

import style from "./Top100.module.scss";
import LeftSlide from "@public/LeftSlide.svg";
import RightSlide from "@public/LeftSlide.svg";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { TCocktail } from "@/lib/types/TCocktail";

export default function Top100() {
  const { cocktailList } = useCocktailStore();
  const visibleCount = 5;
  const router = useRouter();
  const cardWidthRem = 20; // 카드 하나의 너비 (rem 단위)
  const [realIndex, setRealIndex] = useState(0);

  // ✅ 한 번만 실행되는 랜덤 칵테일 저장
  const randomCocktailsRef = useRef<TCocktail[]>([]);

  if (randomCocktailsRef.current.length === 0 && cocktailList.length > 0) {
    const top100Cocktails = cocktailList.filter(
      (item) => item.hashtag?.length !== 0
    );
    console.log("해시태그 있는거", top100Cocktails);
    const indexes = Array.from(
      new Set(
        Array.from({ length: 15 }, () =>
          Math.floor(Math.random() * top100Cocktails.length)
        )
      )
    )
      .filter((i) => i < top100Cocktails.length)
      .slice(0, 10);
    randomCocktailsRef.current = indexes.map((i) => top100Cocktails[i]);
  }

  // const [startIndex, setStartIndex] = useState(0);
  // const handleNext = () => {
  //   setStartIndex((prev) => (prev + 1) % randomCocktailsRef.current.length);
  // };

  // const handlePrev = () => {
  //   setStartIndex(
  //     (prev) =>
  //       (prev - 1 + randomCocktailsRef.current.length) %
  //       randomCocktailsRef.current.length
  //   );
  // };
  const handleToTop100 = () => {
    router.push("/find");
  };
  function LeftSlideControl() {
    const swiper = useSwiper();
    return (
      <div className={style.slide_btn} onClick={() => swiper.slidePrev()}>
        <LeftSlide className={style.left_svg} />
      </div>
    );
  }
  function RightSlideControl() {
    const swiper = useSwiper();
    return (
      <div className={style.slide_btn} onClick={() => swiper.slideNext()}>
        <RightSlide className={style.left_svg} />
      </div>
    );
  }
  // 슬라이드 순환 배열 만들기
  // const visibleSlides = Array.from({ length: visibleCount }, (_, i) => {
  //   const index = (startIndex + i) % randomCocktailsRef.current.length;
  //   return { ...randomCocktailsRef.current[index], index };
  // });

  return (
    <div className={style.top100_section}>
      <h1 className={style.title}>
        World’s Top 100 <br /> Cocktails
      </h1>
      <div className={style.slide_area}>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={`${style.top100_swiper}`}
          onSlideChange={(e) => (
            setRealIndex(
              e.realIndex + 2 > randomCocktailsRef.current.length - 1
                ? e.realIndex - (randomCocktailsRef.current.length - 2)
                : e.realIndex + 2
            ),
            console.log(e.realIndex, randomCocktailsRef.current.length)
          )}
        >
          <div className={style.slide_btn}>
            <LeftSlideControl />
          </div>
          <div className={`${style.slider_wrap}`}>
            {randomCocktailsRef.current ? (
              randomCocktailsRef.current.map((cocktail, i) => (
                <SwiperSlide
                  key={i}
                  className={`${i === realIndex ? style.active : ""}`}
                >
                  <div className={`${style.cocktailBox}`}>
                    <Image
                      src={cocktail.img}
                      alt="cocktail"
                      width={200}
                      height={300}
                      className={`${style.cocktailImage}`}
                    />
                    <p className={style.center_name_ko}>{cocktail.name?.ko}</p>
                    <p className={style.center_name_en}>{cocktail.name?.en}</p>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <h1>잠시만 기다려주세요</h1>
            )}
          </div>
        </Swiper>
        <div className={style.slide_btn}>
          <RightSlideControl />
        </div>
      </div>
      <div onClick={handleToTop100} className={`${style.find_top100_btn}`}>
        + Top100 더보기
      </div>
    </div>
  );
}
