"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Icon from "@workspace/ui/icons/icons";

const MTopSports = () => {
  const trendingSportSwiper = useRef<SwiperType>(null);
  const [isSportBeginning, setIsSportBeginning] = useState(true);
  const [isSportEnd, setIsSportEnd] = useState(false);
  return (
    <div className="w-full mt-[24px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon
            name={"basketball"}
            className="w-[1.125rem] h-[1.125rem]"></Icon>
          <span className="text-[1.125rem] font-[600] relative">
            Top Sports
          </span>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              if (trendingSportSwiper.current) {
                const swiper = trendingSportSwiper.current;
                swiper.slideTo(Math.max(swiper.activeIndex - 3, 0)); // move 3 back
              }
            }}
            disabled={isSportBeginning}
            className={` border-[1px] border-r-[0.5px] border-r-[#304553] border-[rgb(47,69,83)]
            h-[37px] w-[50.5px]
            rounded-[calc(.25rem*8)] rounded-tr-[0px] rounded-br-[0px] flex items-center justify-center transition-colors ${
              isSportBeginning
                ? "text-slate-600 cursor-not-allowed opacity-50"
                : "text-white hover:bg-slate-700"
            }`}>
            <Icon
              name={"rightarrow"}
              className={`w-[14px] h-[14px] ${
                isSportBeginning ? "opacity-95" : ""
              }`}
              fill="#b1bad3"></Icon>
          </button>
          <button
            onClick={() => {
              if (trendingSportSwiper.current) {
                const swiper = trendingSportSwiper.current;
                swiper.slideTo(
                  Math.min(swiper.activeIndex + 3, swiper.slides.length - 1) // move 3 forward
                );
              }
            }}
            disabled={isSportEnd}
            className={`border-[1px] border-l-[0px] border-[rgb(47,69,83)] h-[37px] w-[50.5px] rounded-[calc(.25rem*8)] rounded-tl-[0px] rounded-bl-[0px] flex items-center justify-center transition-colors ${
              isSportEnd
                ? "text-slate-600 cursor-not-allowed opacity-50"
                : "text-white hover:bg-slate-700"
            }`}>
            <Icon
              name={"leftarrow"}
              className={`w-[14px] h-[14px] -mr-[1px] ${isSportEnd ? "opacity-95" : ""}`}
              fill="#b1bad3"></Icon>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={6}
        slidesPerView={3}
        slidesPerGroup={1}
        onSwiper={(swiper) => {
          trendingSportSwiper.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setIsSportBeginning(swiper.isBeginning);
          setIsSportEnd(swiper.isEnd);
        }}
        className="trending-sport-swiper pt-[10px]">
        {Array(18)
          .fill(null)
          .map((_, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="flex flex-col gap-1">
                {/* ✅ image container */}
                <div className="image-carousel-container">
                  <Image
                    src="/carousel/config.png"
                    width={1000}
                    height={1000}
                    alt={`Game ${index + 1}`}
                    className="max-w-full rounded-[4px] min-h-[40.764vw] w-[30.388vw]"
                  />
                </div>
              </div>

              {/* ✅ count wrapper */}
              <div className="count-wrapper absolute left-[-1px] top-[16px]">
                <div
                  className="      count-text
    flex justify-center items-center
    px-[8px] py-2       
    bg-[rgb(47,69,83)] 
    w-[26px]          
    text-white font-bold
    leading-[120%]    
    rounded-tr-[4px] rounded-br-[4px] shadow-[0_1px_2px_0_#1a2c38]">
                  <span className="relative">{index + 1}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MTopSports;
