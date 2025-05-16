"use client";

import style from "./Top100.module.scss";
import LeftSlide from "@public/LeftSlide.svg";
import RightSlide from "@public/LeftSlide.svg";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCocktailStore } from "@/lib/store/cocktailStore";
import { TCocktail } from "@/lib/types/TCocktail";
import swiper from "swiper";

export default function Top100() {
  const { cocktailList } = useCocktailStore();
  const router = useRouter();
  const [realIndex, setRealIndex] = useState(0);
  const randomCocktailsRef = useRef<TCocktail[]>([]);
  const [swiper, setSwiper] = useState<swiper>();
  if (randomCocktailsRef.current.length === 0 && cocktailList.length > 0) {
    const top100Cocktails = cocktailList.filter(
      (item) => item.hashtag?.length !== 0
    );
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
  const handleToTop100 = () => {
    router.push("/find");
  };
  return (
    <div className={style.top100_section}>
      <h1 className={style.title}>
        World’s Top 100 <br /> Cocktails
      </h1>
      <div className={style.slide_area}>
        <div className={style.slide_btn}>
          <LeftSlide
            onClick={() => swiper?.slidePrev()}
            className={style.left_svg}
          />
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={`${style.top100_swiper}`}
          onSlideChange={(e) =>
            setRealIndex(
              e.realIndex + 2 > randomCocktailsRef.current.length - 1
                ? e.realIndex - (randomCocktailsRef.current.length - 2)
                : e.realIndex + 2
            )
          }
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          <div className={`${style.slider_wrap}`}>
            {randomCocktailsRef.current ? (
              randomCocktailsRef.current.map((cocktail, i) => (
                <SwiperSlide
                  key={i}
                  className={`${
                    i === realIndex ? style.active : style.non_active
                  }`}
                  onClick={() => router.push(`/desc/${cocktail._id}`)}
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
          <RightSlide
            onClick={() => swiper?.slideNext()}
            className={style.right_svg}
          />
        </div>
      </div>
      <div onClick={handleToTop100} className={`${style.find_top100_btn}`}>
        + Top100 더보기
      </div>
    </div>
  );
}
