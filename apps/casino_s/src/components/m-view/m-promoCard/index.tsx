"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const MPromoCard = () => {
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
      img: "/casino_S/2.avif",
      badge: "Promotion",
      title: "Weekly Raffle",
      description: "Share in $75,000 each week",
      readMore: "Read More",
      buttonText: "Learn More",
      link: "/casino/home?promotionType=giveaway&modal=promotions",
    },
    {
      img: "/casino_S/3.avif",
      badge: "Promotion",
      title: "Daily Races",
      description: "Play in our $100,000 Daily Race",
      readMore: "Read More",
      buttonText: "Race Now",
      link: "/casino/home?promotionType=race&modal=promotions",
    },
    {
      img: "/casino_S/4.avif",
      badge: "Promotion",
      title: "Conquer the Casino",
      description: "Win a share in $50,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
      link: "/casino/group/conquer-the-casino",
    },
    {
      img: "/casino_S/5.avif",
      badge: "Promotion",
      title: "Stake vs Eddie",
      description: "Win a share in $50,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
      link: "/casino/group/stake-vs-eddie",
    },
    {
      img: "/casino_S/6.avif",
      badge: "Promotion",
      title: "Reel Rumble",
      description: "Win a share in $40,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
      link: "/promotions/promotion/reel-rumble",
    },
    {
      img: "/casino_S/7.avif",
      badge: "Promotion",
      title: "The Level Up",
      description: "Win a share in $40,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
      link: "/casino/group/the-level-up",
    },
    {
      img: "/casino_S/8.avif",
      badge: "Promotion",
      title: "Originals Ascent",
      description: "Win a share in $40,000 every week",
      readMore: "Read More",
      buttonText: "Play Now",
      link: "/promotions/promotion/originals-ascent",
    },
  ];

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={8}
        slidesPerView={1.081}
        centeredSlides={false}
        breakpoints={{
          600: {
            slidesPerView: 2.1,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 8,
          },
          915: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },
        }}
      >
        {slides.map((card, idx) => (
          <SwiperSlide key={idx} className="!h-full">
            <div className="bg-[#213743] rounded-[4px] overflow-hidden mt-2 h-full">
              <div className="flex flex-col relative overflow-hidden text-white bg-[rgb(33,55,67)] rounded-[0.25rem_0.5rem] h-full">
                <a href={card.link} className="block h-full">
                  <div className="grid grid-cols-[50%_50%] min-[394px]:grid-cols-[45%_55%] min-[600px]:grid-cols-[50%_50%] h-[12rem] min-[394px]:h-[13.75rem] min-[600px]:h-[12rem] min-[838px]:h-[13.75rem]">
                    {/* Left Section */}
                    <div className="flex flex-col z-10 p-3 min-[394px]:p-4 min-[600px]:p-3 min-[838px]:p-4 h-full w-full">
                      <div className="flex flex-col h-full gap-1">
                        <div className="mb-2 badge-content flex justify-start">
                          <div className="inline-flex items-center justify-center font-semibold text-[0.75rem] mt-[0.5px] rounded-[2px] px-1 py-0 text-[rgb(7,24,36)] bg-white">
                            {card.badge}
                          </div>
                        </div>
                        <span className="inline-flex items-center font-bold text-[1.125rem] leading-[120%]">
                          {card.title}
                        </span>
                        <div className="mt-1 flex flex-col -translate-y-1">
                          <span className="text-[rgb(177,186,211)] text-sm leading-[18.5px] line-clamp-2">
                            {card.description}{" "}
                            <span className="font-semibold text-white">
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
                </a>

                {/* Button */}
                <div className="absolute bottom-[12px] left-[12px] md:bottom-[16px] md:left-[16px] mt-auto w-fit bg-[rgb(33,55,67)]">
                  <a
                    href={card.link}
                    className="inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap ring-offset-background transition active:scale-[0.98] bg-transparent text-white hover:bg-grey-400 hover:text-white border border-solid border-white text-sm leading-none py-[0.8125rem] px-[1rem] rounded-[0.25rem]"
                    style={{ minWidth: "7.5rem", maxWidth: "10.625rem" }}
                  >
                    {card.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right gradient overlay */}
      <div
        className="pointer-events-none absolute top-0 -right-4 bottom-0 w-7 min-[768px]:-right-8 min-[768px]:w-11 z-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0, rgb(26,44,56) 4px, rgb(26,44,56) calc(100% - 4px), transparent 100%)",
        }}
      />
    </div>
  );
};

export default MPromoCard;
