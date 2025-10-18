"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "@workspace/ui/icons/icons";

const MRacesRaffles = () => {
  const promotionsSwiper = useRef<SwiperType>(null);
  const [isPromotionsBeginning, setIsPromotionsBeginning] = useState(true);
  const [isPromotionsEnd, setIsPromotionsEnd] = useState(false);

  return (
    <div className="w-full">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-[0.35rem]">
        <div className="flex items-center gap-[5px] pl-[1px] pt-[.4rem]">
          <Icon
            name={"RacesRaffles"}
            className="w-[18px] h-[18px]"
            fill="#b1bad3"
          />
          <h2 className="text-[1.125rem] font-[600]">Races & Raffles</h2>
        </div>
        <div className="flex relative top-[0.5px]">
          {/* Left button */}
          <button
            onClick={() => promotionsSwiper.current?.slidePrev()}
            disabled={isPromotionsBeginning}
            className={`border-[1px] border-[rgb(47,69,83)]
              h-[37px] w-[50.5px]
              rounded-[calc(.25rem*8)] rounded-tr-[0px] rounded-br-[0px] flex items-center justify-center transition-colors
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
            />
          </button>

          {/* Right button */}
          <button
            onClick={() => promotionsSwiper.current?.slideNext()}
            disabled={isPromotionsEnd}
            className={`border-[1px] border-l-[0px] border-[rgb(47,69,83)]
              h-[37px] w-[50.5px]
              rounded-[calc(.25rem*8)] rounded-tl-[0px] rounded-bl-[0px] flex items-center justify-center transition-colors
              ${
                isPromotionsEnd
                  ? "!border-[#2f45536b] pointer-events-none"
                  : "text-white"
              }`}
          >
            <Icon
              name={"leftarrow"}
              className="w-[14px] h-[14px]"
              fill={isPromotionsEnd ? "#6b7280" : "#b1bad3"}
            />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={1}
        onSwiper={(swiper) => (promotionsSwiper.current = swiper)}
        onSlideChange={(swiper) => {
          setIsPromotionsBeginning(swiper.isBeginning);
          setIsPromotionsEnd(swiper.isEnd);
        }}
        className="pt-[10px]"
      >
        {/* Card 1 */}
        <SwiperSlide>
          <div className="bg-[#213743] w-full rounded flex flex-col justify-between">
            <div className="p-[16px] flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold text-lg">$100k Race</h3>
                <p className="text-[#b1bad3] text-sm mb-4">
                  Ready to race to the top?
                </p>
                <div className="flex items-center gap-3">
                  <button className="bg-[#2f4553] text-white px-[15px] py-[12px] rounded font-semibold text-sm">
                    Leaderboard
                  </button>
                  <Icon
                    name={"questions"}
                    className="w-[14px] h-[14px]"
                    fill="#fff"
                  />
                </div>
              </div>
              <div className="relative w-[112px] h-[112px] flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="57"
                    cy="57"
                    r="50"
                    stroke="#2a3f4e"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="57"
                    cy="57"
                    r="50"
                    stroke="#1475e1"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * 0.7}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center text-white text-sm">
                  <p className="text-xs text-[#b1bad3] font-bold">Ends in</p>
                  <p className="font-bold text-[20px]">
                    <span>6</span>
                    <span className="text-[14px] font-bold mr-[2px]">h</span>
                    <span className="ml-[2px]">56</span>
                    <span className="text-[14px] font-bold">m</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-flow-col auto-cols-auto h-12 py-3 pr-2 pl-4 bg-[#213743] rounded-b border-t-[2px] border-[#2f4553]">
              <span className="font-semibold leading-normal text-sm flex items-center gap-2 text-white">
                <Icon
                  name={"cup"}
                  className="w-[14px] h-[14px]"
                  fill="#b1bad3"
                />
                Not entered yet
              </span>
            </div>
          </div>
        </SwiperSlide>

        {/* Card 2 */}
        <SwiperSlide>
          <div className="bg-[#213743] w-full rounded flex flex-col justify-between">
            <div className="p-[16px] flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold text-lg">
                  $75k Weekly Raffle
                </h3>
                <p className="text-[#b1bad3] text-sm mb-4">
                  Finish week with a win!
                </p>
                <div className="flex items-center gap-3">
                  <button className="bg-[#2f4553] text-white px-[15px] py-[12px] rounded font-semibold text-sm opacity-50">
                    0 Tickets
                  </button>
                  <Icon
                    name={"questions"}
                    className="w-[14px] h-[14px]"
                    fill="#fff"
                  />
                </div>
              </div>
              <div className="relative w-[112px] h-[112px] flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="57"
                    cy="57"
                    r="50"
                    stroke="#2a3f4e"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="57"
                    cy="57"
                    r="50"
                    stroke="#1475e1"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * 0.7}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center text-white text-sm">
                  <p className="text-xs text-[#b1bad3] font-bold">Ends in</p>
                  <p className="font-bold text-[20px]">
                    <span>6</span>
                    <span className="text-[14px] font-bold mr-[2px]">h</span>
                    <span className="ml-[2px]">56</span>
                    <span className="text-[14px] font-bold">m</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center h-12 py-3 px-4 bg-[#213743] rounded-b border-t-[2px] border-[#2f4553] gap-2">
              <Icon
                name={"Raffles"}
                className="w-[14px] h-[14px]"
                fill="#b1bad3"
              />
              <progress
                max={100}
                value={0}
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={0}
                className="custom-progress h-[12px] flex-1 rounded-[10px]"
              />
              <span className="font-semibold leading-normal text-sm text-white text-right">
                0%
              </span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MRacesRaffles;
