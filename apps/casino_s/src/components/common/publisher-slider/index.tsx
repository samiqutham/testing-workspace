"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";

const Publisher = () => {
  const trendingGamesSwiper = useRef<SwiperType>(null);
  const [isGamesBeginning, setIsGamesBeginning] = useState(true);
  const [isGamesEnd, setIsGamesEnd] = useState(false);
  const handleNext = () => {
    if (trendingGamesSwiper.current) {
      const swiper = trendingGamesSwiper.current;
      const group =
        swiper.currentBreakpoint === "500"
          ? 4
          : swiper.currentBreakpoint === "700"
            ? 5
            : swiper.currentBreakpoint === "911"
              ? 6
              : swiper.currentBreakpoint === "1061"
                ? 8
                : swiper.currentBreakpoint === "1210"
                  ? 8
                  : 3;
      swiper.slideTo(swiper.activeIndex + group, 500);
    }
  };

  const handlePrev = () => {
    if (trendingGamesSwiper.current) {
      const swiper = trendingGamesSwiper.current;
      const group =
        swiper.currentBreakpoint === "500"
          ? 4
          : swiper.currentBreakpoint === "700"
            ? 5
            : swiper.currentBreakpoint === "911"
              ? 6
              : swiper.currentBreakpoint === "1061"
                ? 8
                : swiper.currentBreakpoint === "1210"
                  ? 8
                  : 3;
      swiper.slideTo(swiper.activeIndex - group, 500);
    }
  };
  return (
    <div className="max-w-[1200px] mx-auto w-full cursor-pointer">
      <div className="flex items-center justify-between relative bottom-[0.5px] w-full">
        <Link href={"/game-category/provider"} prefetch={true}>
          <div className="flex items-center gap-2">
            <Icon
              name="publishers"
              className="w-[18px] h-[18px] text-[#b1bad3]"
            />
            {/* <div className="h-[18px] w-[18px] bg-[url('/sprite/casino-sprite.svg')] bg-no-repeat bg-cover bg-[-20px_0px]" /> */}
            <span className="text-[1.125rem] font-[600] text-[#fff]">
              Publishers
            </span>
          </div>
        </Link>
        <div className="flex">
          <button
            // onClick={() => trendingGamesSwiper.current?.slidePrev()}
            onClick={handlePrev}
            disabled={isGamesBeginning}
            className={`    border-[1px] border-r-[0.5px] border-[rgb(47,69,83)]
    h-[37px] w-[50.5px]
    rounded-[calc(.25rem*8)] rounded-tr-[0px]  rounded-br-[0px] flex items-center justify-center transition-colors ${
      isGamesBeginning
        ? "text-slate-600 !cursor-default opacity-50"
        : "text-white hover:bg-transparent cursor-pointer"
    }`}
          >
            <Icon
              name={"rightarrow"}
              className={`w-[14px] h-[14px] ${
                isGamesBeginning ? "opacity-95" : ""
              }`}
              fill="#b1bad3"
            ></Icon>
          </button>
          <button
            // onClick={() => trendingGamesSwiper.current?.slideNext()}
            onClick={handleNext}
            disabled={isGamesEnd}
            className={`border-[1px] border-l-[0px] border-[rgb(47,69,83)] h-[37px] w-[50.5px] rounded-[calc(.25rem*8)] rounded-tl-[0px] rounded-bl-[0px] flex items-center justify-center transition-colors ${
              isGamesEnd
                ? "text-slate-600 !cursor-default opacity-50"
                : "text-white hover:bg-transparent cursor-pointer"
            }`}
          >
            <Icon
              name={"leftarrow"}
              className={`w-[14px] h-[14px] ${isGamesEnd ? "opacity-95" : ""}`}
              fill="#b1bad3"
            ></Icon>
          </button>
        </div>
      </div>
      <Swiper
        modules={[FreeMode, Mousewheel, Navigation]}
        spaceBetween={6}
        slidesPerGroup={1}
        centeredSlides={false}
        centeredSlidesBounds={true}
        watchSlidesProgress={true}
        resistance={false}
        freeMode={{
          enabled: true,
          sticky: true,
          momentum: true,
        }}
        mousewheel={{ forceToAxis: true }}
        speed={400}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 6,
          },
          500: {
            slidesPerView: 4,
            spaceBetween: 6,
          },
          700: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          911: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
          1061: {
            slidesPerView: 7,
            spaceBetween: 16,
          },
          1210: {
            slidesPerView: 8,
            spaceBetween: 11,
          },
        }}
        onSwiper={(swiper) => {
          trendingGamesSwiper.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setIsGamesBeginning(swiper.isBeginning);
          setIsGamesEnd(swiper.isEnd);
        }}
        className="home-swiper !pt-3" // ✅ same as .home-swiper { padding-top: 10px; }
      >
        {Array(18)
          .fill(null)
          .map((_, num) => (
            <SwiperSlide key={num} className="relative">
              <div className="flex flex-col gap-[2px]">
                {/* ✅ image container */}
                <div className="image-carousel-container">
                  <Image
                    src="/publisherSlider/evltion.png"
                    width={1000}
                    height={1000}
                    alt={`Game ${num}`}
                    className="max-w-full rounded-[4px] min-h-full w-[30.388vw] md:h-[51.65px] xl:h-[55px] transition transition-transform duration-300 ease-in-out hover:-translate-y-1"
                  />
                </div>

                {/* ✅ live container */}
                <div className="live-container text-[12px]">
                  <span className="inline-block h-[6.5px] w-[6.5px] bg-[rgb(31,255,32)]  rounded-full"></span>
                  <span className="text-[#B1BAD3] tabular-nums font-semibold relative top-[0.5px]">
                    &nbsp;&nbsp;<span className="text-white ">537</span> playing
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Publisher;
