"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";


const DPromoCard = () => {
    const swiperRef = useRef<SwiperType>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
      const handleResize = () => setIsTablet(window.innerWidth < 1079);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slides = [
        {
            img: "/casino_S/1.avif",
            badge: "New releases",
            title: "Le Zeus",
            description: "New Early Access Game!",
            readMore: "Read More",
            buttonText: "Play Now",
            link: "/casino/games/hacksaw-le-zeus",
        },
        {
            img: "/casino_S/1.avif",
            badge: "Promotion",
            title: "Weekly Raffle",
            description: "Share in $75,000 each week",
            readMore: "Read More",
            buttonText: "Learn More",
            link: "/casino/home?promotionType=giveaway&modal=promotions",
        },
        {
            img: "/casino_S/1.avif",
            badge: "Promotion",
            title: "Daily Races",
            description: "Play in our $100,000 Daily Race",
            readMore: "Read More",
            buttonText: "Race Now",
            link: "/casino/home?promotionType=race&modal=promotions",
        },
        {
            img: "/casino_S/1.avif",
            badge: "Promotion",
            title: "Conquer the Casino",
            description: "Win a share in $50,000 every week",
            readMore: "Read More",
            buttonText: "Play Now",
            link: "/casino/group/conquer-the-casino",
        },
        {
            img: "/casino_S/1.avif",
            badge: "Promotion",
            title: "Stake vs Eddie",
            description: "Win a share in $50,000 every week",
            readMore: "Read More",
            buttonText: "Play Now",
            link: "/casino/group/stake-vs-eddie",
        },
        {
            img: "/casino_S/1.avif",
            badge: "Promotion",
            title: "Reel Rumble",
            description: "Win a share in $40,000 every week",
            readMore: "Read More",
            buttonText: "Play Now",
            link: "/promotions/promotion/reel-rumble",
        },
        {
            img: "/casino_S/1.avif",
            badge: "Promotion",
            title: "The Level Up",
            description: "Win a share in $40,000 every week",
            readMore: "Read More",
            buttonText: "Play Now",
            link: "/casino/group/the-level-up",
        },
        {
            img: "/casino_S/1.avif",
            badge: "Promotion",
            title: "Originals Ascent",
            description: "Win a share in $40,000 every week",
            readMore: "Read More",
            buttonText: "Play Now",
            link: "/promotions/promotion/originals-ascent",
        },
    ];

    const breakpoints = {
        768: {
            slidesPerView: 2.1,
            spaceBetween: 16,
            slidesPerGroup: 2,
        },
        1145: {
            slidesPerView: 3,
            spaceBetween: 16,
            slidesPerGroup: 3,
        },
    };

  return (
    <>
      {isTablet ? (
        <div>
          <div className="w-full relative bottom-[0.5px] ">
            <div className="pb-[3px]">
              <Swiper
                spaceBetween={8}
                slidesPerGroup={2}
                slidesPerView={2 + 0.1}
                breakpoints={{
                  915: {
                    spaceBetween: 16,
                    slidesPerView: 2 + 0.086,
                  },
                }}
              >
                {slides.map((card, idx) => (
                  <SwiperSlide>
                    <div
                      key={idx}
                      className="bg-[#213743] rounded-[4px] overflow-hidden "
                    >
                      <div className="flex flex-col relative overflow-hidden text-white bg-[rgb(33,55,67)] [scroll-snap-align:start] rounded-[0.25rem_0.5rem] [container-type:inline-size] [container-name:card-size]">
                        {/* Make the whole card (top grid) clickable */}
                        <div className="block h-full">
                          <div
                            className="grid grid-cols-[50%_50%]  relative h-[12rem] min-[838px]:h-[13.75rem] scale-100   "
                            style={{ transform: "scale(1)" }}
                          >
                            {/* Left Section */}
                            <div className="flex flex-col z-10 p-3  min-[838px]:p-4 h-full w-full">
                              <div className="flex flex-col h-full gap-[calc(.25rem*.5)]">
                                <div className="mb-2 badge-content flex justify-start">
                                  <div className="inline-flex items-center justify-center font-semibold text-[0.75rem] leading-[1.5] mt-[0.5px] whitespace-nowrap rounded-[2px] !px-1 !py-0 text-[rgb(7,24,36)] bg-white">
                                    {card.badge}
                                  </div>
                                </div>
                                <span className="inline-flex items-center justify-start text-white text-left font-bold text-[1.125rem] leading-[120%]">
                                  {card.title}
                                </span>
                                <div className="mt-[3px] flex flex-col">
                                  <span className="items-center text-[rgb(177,186,211)] text-sm font-normal leading-[19px] text-left overflow-hidden line-clamp-2">
                                    {card.description}{" "}
                                    <span className="inline-flex items-center font-semibold text-left justify-start text-white">
                                      {card.readMore}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Image */}
                            <div className="relative w-full">
                              <div className="absolute flex items-center justify-end h-full w-full">
                                <img
                                  className="w-full h-full max-w-[220px] max-h-[220px] aspect-[1/1] object-contain object-right"
                                  alt={card.title}
                                  src={`${card.img}?w=220&h=220&fit=min&auto=format`}
                                  loading="lazy"
                                  decoding="async"
                                  srcSet={`${card.img}?w=220&h=220&fit=min&auto=format 220w, ${card.img}?w=330&h=330&fit=min&auto=format 330w`}
                                  sizes="(min-width: 220px) 220px, 100vw"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-[12px] left-[12px] md:bottom-[16px] md:left-[16px] mt-auto w-fit bg-[rgb(33,55,67)]">
                          <div
                            className="inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] bg-transparent text-white hover:bg-grey-400 border border-solid border-white text-sm leading-none py-[0.8125rem] px-[1rem] rounded-[0.25rem]"
                            style={{
                              minWidth: "7.5rem",
                              maxWidth: "10.625rem",
                            }}
                          >
                            {card.buttonText}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div
              className="pointer-events-none absolute top-0 -right-4 bottom-0 w-7 max-[50rem]:w-[1.75rem] min-[768px]:-right-8 min-[768px]:w-11 z-10"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0, rgb(26,44,56) 4px, rgb(26,44,56) calc(100% - 4px), transparent 100%)",
              }}
            />
          </div>
        </div>
      ) : (
        <div className=" relative w-full max-w-[1200px] mx-auto group lg:pr-[1px]">
          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={3}
            slidesPerGroup={3}
            speed={500}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            className="!pb-6"
          >
            {slides.map((card, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-[#213743] rounded-[4px] overflow-hidden flex flex-col relative text-white">
                  <div className="block">
                    <Link href={"/"} prefetch={true}>
                      <div className="grid grid-cols-[45%_55%] h-[13.75rem] min-[1144px]:h-[12rem] min-[1200px]:h-[13.75rem] overflow-hidden">
                        {/* Left Side */}
                        <div className="flex flex-col p-4">
                          <div className="inline-flex items-center justify-start font-semibold text-xs mt-[1px] mb-2 leading-[18px] whitespace-nowrap rounded-[2px] px-1 py-0 text-[rgb(7,24,36)] bg-white w-fit">
                            {card.badge}
                          </div>
                          <span className="font-bold text-lg leading-[21.6px] mt-[2.5px]">
                            {card.title}
                          </span>
                          <span className="text-[rgb(177,186,211)] text-sm leading-[18.5px] mr-0.5 mt-1 max-[1199px]:line-clamp-2">
                            {card.description}{" "}
                            <span className="font-semibold text-white">
                              {card.readMore}
                            </span>
                          </span>
                        </div>
                        {/* Right Side Image */}
                        <div className="flex items-center justify-end">
                          <img
                            className="w-full h-full max-w-[220px] max-h-[220px]   aspect-[1/1] object-contain object-right"
                            src={`${card.img}?w=220&h=220&fit=min&auto=format`}
                            alt={card.title}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* Button */}
                  <div className="absolute bottom-[16px] left-[16px]">
                    <button className="cursor-pointer inline-flex items-center justify-center font-semibold border border-white px-4 py-[13px] min-w-[7.5rem] max-w-[10.625rem] leading-[14px] rounded text-sm text-white hover:bg-[#2f4553] transition">
                      {card.buttonText}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons Wrapper */}
          <div className="absolute inset-y-0 -left-[37.5px] -right-[37px] flex items-center justify-between pointer-events-none ">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className={`p-2 pointer-events-auto transition cursor-pointer top-[44.2%] -translate-y-1/2 absolute ${
                isBeginning
                  ? "opacity-0 cursor-default"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <Icon
                name="backArrow"
                className="w-[19px] h-[19px] text-[#b1bad3]"
              />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className={`p-2 pointer-events-auto transition cursor-pointer top-[44.4%] -translate-y-1/2 absolute right-0 ${
                isEnd
                  ? "opacity-0 cursor-default"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <Icon
                name="backArrow"
                className="w-[19px] h-[19px] text-[#b1bad3] -rotate-180"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DPromoCard;
