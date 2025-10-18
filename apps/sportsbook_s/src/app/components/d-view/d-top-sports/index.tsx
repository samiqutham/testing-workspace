import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Icon from "@workspace/ui/icons/icons";
import { Button } from "@workspace/ui/components/button";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
const DTopSports = () => {
  const trendingGamesSwiper = useRef<SwiperType>(null);
  const [isGamesBeginning, setIsGamesBeginning] = useState(true);
  const [isGamesEnd, setIsGamesEnd] = useState(false);
  const { open } = useSidebar();
  const breakpoints = open
    ? {
        1200: { slidesPerView: 6 },
        1240: { slidesPerView: 7 },
        1390: { slidesPerView: 8 },
      }
    : {
        768: { slidesPerView: 4 },
        820: { slidesPerView: 5 },
        970: { slidesPerView: 6 },
        1120: { slidesPerView: 7 },
        1210: { slidesPerView: 8 },
      };
  return (
    <div className="w-full max-w-[1200] mx-auto mt-[24px] max-[1025px]:mt-[26px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <Icon
            name={"basketball"}
            className="w-[18px] h-[18px]"
            fill="rgb(177, 186, 211)"
          ></Icon>
          <h2 className="text-[1.125rem] font-[600] text-white relative">
            Top Sports
          </h2>
        </div>
        <div className="flex">
          <button
            onClick={() => trendingGamesSwiper.current?.slidePrev()}
            disabled={isGamesBeginning}
            className={cn(
              "cursor-pointer border border-[#304553] h-[37px] w-[51px] rounded-[calc(.25rem*8)] rounded-tr-[0px] rounded-br-[0px] flex items-center justify-center transition-colors",
              isGamesBeginning
                ? "text-slate-600 cursor-default border-[#253945]"
                : "text-[#b1bad3]"
            )}
          >
            <Icon
              name={"rightarrow"}
              className="w-[14px] h-[14px]"
              fill={isGamesBeginning ? "#677286" : "#b1bad3"}
            ></Icon>{" "}
          </button>

          <button
            onClick={() => trendingGamesSwiper.current?.slideNext()}
            disabled={isGamesEnd}
            className={cn(
              "cursor-pointer border border-l-0  border-[#304553] h-[37px] w-[50px] rounded-[calc(.25rem*8)] rounded-tl-[0px] rounded-bl-[0px] flex items-center justify-center transition-colors",
              isGamesEnd
                ? "text-slate-600 cursor-default border-[#253945]"
                : "text-[#b1bad3]"
            )}
          >
            <Icon
              name={"leftarrow"}
              className="w-[14px] h-[14px] "
              fill={isGamesEnd ? "#677286" : "#b1bad3"}
            ></Icon>{" "}
          </button>
        </div>
      </div>
      <Swiper
        key={open ? "open" : "close"}
        modules={[Navigation]}
        spaceBetween={11}
        breakpoints={{
          768: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          910: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
          1061: {
            slidesPerView: 7,
            spaceBetween: 16,
          },
          1200: {
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
        className="home-swiper !pt-[11.5px]"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15].map((num) => (
          <SwiperSlide key={num} className="relative">
            <div className="flex justify-center flex-col gap-[5px]">
              <div className="image-carousel-container group relative transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                <Image
                  src="/carousel/config.png"
                  alt={`Game ${num}`}
                  width={1000}
                  height={174}
                  className={cn(
                    "w-full max-w-full rounded-[4px] object-cover",
                    "h-[160.43px]",
                    "md:h-[160.92px]",
                    open ? "lg:h-[174.31px]" : "lg:h-[188.81px]"
                  )}
                />

                <div className="count-wrapper absolute left-[-1px] top-[17px] shadow-[0_4px_6px_#1a2c38]">
                  <div className="count-text flex justify-center items-center px-[8px] py-2 bg-[#2f4553ff] w-[26px] text-white font-bold leading-[120%] rounded-tr-[4px] rounded-br-[4px]">
                    <span className="">{num}</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DTopSports;
