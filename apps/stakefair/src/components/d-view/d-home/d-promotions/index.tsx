"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "@workspace/ui/icons/icons";

const DPromotions = () => {
  const promotionsSwiper = useRef<SwiperType>(null);
  const [isPromotionsBeginning, setIsPromotionsBeginning] = useState(true);
  const [isPromotionsEnd, setIsPromotionsEnd] = useState(false);
  return (
    <div className="w-full max-w-[1200] mx-auto mt-[2px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[6px] cursor-pointer group relative top-[2.5px]">
          {/* <Icon name={"promotion"} className="w-[16px] h-[16px] group-hover:fill-white transition-colors duration-300"
            fill="rgb(177, 186, 211)"></Icon> */}
          <div className="h-[14px] w-[14px] relative bottom-[1.5px] bg-[url('/sprite/casino-sprite.svg')] bg-no-repeat bg-cover bg-[-47px_0px]" />
          <h2 className="text-[1.125rem] font-[600] text-white">Promotions</h2>
        </div>

        {/* Navigation */}
        <div className="flex">
          <button
            onClick={() => promotionsSwiper.current?.slidePrev()}
            disabled={isPromotionsBeginning}
            className={`border  border-[rgb(47,69,83)] h-[37px] w-[51px]
  rounded-[calc(.25rem*8)] rounded-tr-[0px] rounded-br-[0px]
  flex items-center justify-center transition-colors cursor-pointer
  ${
    isPromotionsBeginning
      ? "!border-[#2f45536b] pointer-events-none"
      : "text-white"
  }`}
          >
            <Icon
              name={"rightarrow"}
              className="w-[14px] h-[14px]"
              fill={isPromotionsBeginning ? "#6b7280" : "#b1bad3"}
            ></Icon>{" "}
          </button>

          <button
            onClick={() => promotionsSwiper.current?.slideNext()}
            disabled={isPromotionsEnd}
            className={`border border-l-0 border-[rgb(47,69,83)] h-[37px] w-[51px]
  rounded-[calc(.25rem*8)] rounded-tl-[0px] rounded-bl-[0px] cursor-pointer
  flex items-center justify-center transition-colors -ml-[1px]
  ${
    isPromotionsEnd ? "!border-[#2f45536b] pointer-events-none" : "text-white"
  }`}
          >
            <Icon
              name={"leftarrow"}
              className="w-[14px] h-[14px] "
              fill={isPromotionsEnd ? "#6b7280" : "#b1bad3"}
            ></Icon>{" "}
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 9 },
          1060: { slidesPerView: 3, spaceBetween: 12 },
        }}
        onSwiper={(swiper) => (promotionsSwiper.current = swiper)}
        onSlideChange={(swiper) => {
          setIsPromotionsBeginning(swiper.isBeginning);
          setIsPromotionsEnd(swiper.isEnd);
        }}
        className="!pt-[5px]" // same as .swiper-container { padding-top:10px }
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <SwiperSlide key={num}>
            <div className="bg-[#213743] rounded-[4px] overflow-hidden  mt-2">
              <div className="flex justify-between max-[805px]:!h-[118.4px]" style={{ height: "150px" }}>
                {/* LEFT CONTENT */}
                <div className="flex flex-col justify-between p-[16px] max-[860px]:!p-[12px]">
                  <div>
                    <div className="flex flex-col gap-[calc(.25rem*.5)] w-fit mt-[1px]">
                      <div className="px-1 mb-2 leading-[1.5] bg-white text-[#071824] text-[0.75rem] font-semibold rounded-[3px] inline-flex items-center justify-center">
                        <span className="relative ">Promotion</span>
                      </div>
                    </div>
                    <div className="text-[18px] font-bold text-white leading-[120%] relative top-[1.5px]">
                      Tennis
                    </div>
                    <div className="flex flex-col mt-[8.5px] leading-[120%] ">
                      <div className="text-[14px] text-[#b1bad3] relative bottom-[2px] ">
                        Final Set Tiebreaker Payout{" "}
                      </div>
                      <div className="   text-[14px] font-semibold text-white leading-[1.1]  ">
                        Read More
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative ">
                  <img
                    src="/carousel/tennisPromotion.jpg"
                    alt="slide"
                    className="w-full h-full  object-cover"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DPromotions;
