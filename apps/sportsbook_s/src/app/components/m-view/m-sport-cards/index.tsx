"use client";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const MSportsCards = () => {
  const slides = [
    {
      img: "/sportsCards/ceac80fdde2047433b6bd9ef411935ecabe5a6b0-1080x1080.png",
      badge: "New releases",
      title: "Le Zeus",
      description: "New Early Access Game!",
      readMore: "Read More",
      buttonText: "View Matches",
    },
    {
      img: "/sportsCards/ceac80fdde2047433b6bd9ef411935ecabe5a6b0-1080x1080.png",
      badge: "Promotion",
      title: "Weekly Raffle",
      description: "Share in $75,000 each week",
      readMore: "Read More",
      buttonText: "Learn More",
    },
    {
      img: "/sportsCards/ceac80fdde2047433b6bd9ef411935ecabe5a6b0-1080x1080.png",
      badge: "Promotion",
      title: "Daily Races",
      description: "Play in our $100,000 Daily Race",
      readMore: "Read More",
      buttonText: "Race Now",
    },
    {
      img: "/sportsCards/ceac80fdde2047433b6bd9ef411935ecabe5a6b0-1080x1080.png",
      badge: "Promotion",
      title: "Conquer the Casino",
      description: "Win a share in $50,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
    },
    {
      img: "/sportsCards/ceac80fdde2047433b6bd9ef411935ecabe5a6b0-1080x1080.png",
      badge: "Promotion",
      title: "Stake vs Eddie",
      description: "Win a share in $50,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
    },
    {
      img: "/sportsCards/ceac80fdde2047433b6bd9ef411935ecabe5a6b0-1080x1080.png",
      badge: "Promotion",
      title: "Reel Rumble",
      description: "Win a share in $40,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
    },
    {
      img: "/sportsCards/ceac80fdde2047433b6bd9ef411935ecabe5a6b0-1080x1080.png",
      badge: "Promotion",
      title: "The Level Up",
      description: "Win a share in $40,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
    },
    {
      img: "/sportsCards/ceac80fdde2047433b6bd9ef411935ecabe5a6b0-1080x1080.png",
      badge: "Promotion",
      title: "Originals Ascent",
      description: "Win a share in $40,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
    },
  ];

  return (
    <Link href="/soccer" prefetch={true}>
      <div className="w-full relative">
        <div className="pb-0.5 min-[600px]:pt-3 max-[768px]:w-[92dvw] no-scrollbar">
          <Swiper
            slidesPerView={1.066}
            slidesPerGroup={1}
            spaceBetween={8}
            breakpoints={{
              340: {
                slidesPerView: 1.058,
              },
            }}
          >
            {slides.map((card, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-[#213743] rounded-[4px] overflow-hidden">
                  <div className="flex flex-col relative overflow-hidden text-white bg-[rgb(33,55,67)] [scroll-snap-align:start] rounded-[0.25rem_0.5rem]">
                    {/* Main grid section */}
                    <div className="grid grid-cols-[50%_50%] min-[394px]:grid-cols-[45%_55%] min-[600px]:grid-cols-[50%_50%] relative h-[12rem] min-[394px]:h-[13.75rem] min-[600px]:h-[12rem] min-[838px]:h-[13.75rem] overflow-hidden max-w-full">
                      {/* Left Section */}
                      <div className="flex flex-col z-10 p-3 min-[394px]:p-4 min-[600px]:p-3 min-[838px]:p-4 h-full w-full">
                        <div className="flex flex-col h-full gap-[calc(.25rem*.5)]">
                          <div className="mb-2 badge-content flex justify-start">
                            <div className="inline-flex items-center justify-center font-semibold text-[0.75rem] leading-[1.5] mt-[0.5px] whitespace-nowrap rounded-[2px] px-1 py-0 text-[rgb(7,24,36)] bg-white">
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

                      {/* Right Section (Image) */}
                      <div className="relative w-full flex items-center justify-end">
                        <div className="relative aspect-square w-[220px] max-w-full overflow-hidden">
                          <Image
                            src={card.img}
                            alt={card.title}
                            fill
                            className="object-contain object-right"
                            sizes="220px"
                            priority={false}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="absolute bottom-[12px] left-[12px] md:bottom-[16px] md:left-[16px] mt-auto w-fit bg-[rgb(33,55,67)]">
                      <button
                        className="inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] bg-transparent text-white hover:bg-grey-400 border border-solid border-white text-sm leading-none py-[0.8125rem] px-[1rem] rounded-[0.25rem]"
                        style={{ minWidth: "7.5rem", maxWidth: "10.625rem" }}
                      >
                        {card.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right fade gradient */}
        <div
          className="pointer-events-none absolute top-0 -right-4 bottom-0 w-7 max-[50rem]:w-[1.75rem] min-[768px]:-right-8 min-[768px]:w-11 z-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 0, rgb(26,44,56) 4px, rgb(26,44,56) calc(100% - 4px), transparent 100%)",
          }}
        />
      </div>
    </Link>
  );
};

export default MSportsCards;
