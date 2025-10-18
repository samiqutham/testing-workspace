"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { useSidebar } from "@workspace/ui/components/sidebar";
import Link from "next/link";

interface GameCarouselProps {
  data: any; // { image: "" } required
  heading: string;
  icon?: string;
  carouselSpace?: number;
  breakpoints?: any;
  spriteIcon?: boolean;
  classNameSpriteIcon?: string;
  link?: string;
}

const GameCarousel = ({
  data,
  heading,
  icon,
  carouselSpace,
  breakpoints,
  spriteIcon,
  classNameSpriteIcon,
  link,
}: GameCarouselProps) => {
  const gameCarousel = useRef<SwiperType>(null);
  const [isSportBeginning, setIsSportBeginning] = useState(true);
  const [isSportEnd, setIsSportEnd] = useState(false);
  const { open } = useSidebar();
  const isMobile = useIsMobile();

  // ✅ Update nav button states
  const updateControls = (swiper: SwiperType) => {
    if (!swiper) return;
    const slidesPerView =
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1;

    if (swiper.slides.length <= slidesPerView) {
      setIsSportBeginning(true);
      setIsSportEnd(true);
    } else {
      setIsSportBeginning(swiper.isBeginning);
      setIsSportEnd(swiper.isEnd);
    }
  };

  const handleNext = () => {
    if (!gameCarousel.current) return;
    const swiper = gameCarousel.current;

    // ✅ Get how many slides fit in the viewport right now
    const visibleSlides = swiper.slidesPerViewDynamic();
    swiper.slideTo(swiper.activeIndex + visibleSlides);
  };

  const handlePrev = () => {
    if (!gameCarousel.current) return;
    const swiper = gameCarousel.current;

    const visibleSlides = swiper.slidesPerViewDynamic();
    swiper.slideTo(swiper.activeIndex - visibleSlides);
  };

  const headerContent = (
    <div
      className={cn(
        "flex items-center gap-2",
        !isMobile && "relative top-[-1px] cursor-pointer"
      )}
    >
      {spriteIcon && (
        <div
          className={cn(
            "h-[18px] w-[18px] bg-[url('@workspace/ui/assets/sprite/casino-sprite.svg')] bg-no-repeat bg-cover bg-[-20px_0px]",
            classNameSpriteIcon
          )}
        />
      )}
      {icon && (
        <Icon
          name={icon}
          className="w-[1.125rem] h-[1.125rem]"
          fill="rgb(177, 186, 211)"
        />
      )}
      <h2 className="text-[1.125rem] font-[600] text-white leading-normal relative">
        {heading}
      </h2>
    </div>
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between",
          isMobile && "relative bottom-[0.5px]"
        )}
      >
        {link ? <Link href={link}>{headerContent}</Link> : headerContent}

        {/* Nav Buttons */}
        <div className="flex">
          <button
            onClick={handlePrev}
            disabled={isSportBeginning}
            className={cn(
              "cursor-pointer border border-r-0 border-[rgb(47,69,83)] h-[37px] w-[51px] rounded-[calc(.25rem*8)] rounded-tr-[0px] rounded-br-[0px] flex items-center justify-center transition-colors",
              isSportBeginning
                ? "text-slate-600 cursor-default opacity-50"
                : "text-[#b1bad3]"
            )}
          >
            <Icon
              name="rightarrow"
              className="w-[14px] h-[14px]"
              fill={isSportBeginning ? "#6b7280" : "#b1bad3"}
            />
          </button>

          <button
            onClick={handleNext}
            disabled={isSportEnd}
            className={cn(
              "cursor-pointer border border-[rgb(47,69,83)] h-[37px] w-[51px] rounded-[calc(.25rem*8)] rounded-tl-[0px] rounded-bl-[0px] flex items-center justify-center transition-colors",
              isSportEnd
                ? "text-slate-600 cursor-default opacity-50"
                : "text-[#b1bad3]"
            )}
          >
            <Icon
              name="leftarrow"
              className="w-[14px] h-[14px]"
              fill={isSportEnd ? "#6b7280" : "#b1bad3"}
            />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        key={open ? "open" : "close"}
        modules={[Navigation]}
        spaceBetween={carouselSpace ?? 10}
        breakpoints={breakpoints}
        slidesPerGroup={1} // ✅ keep swipe = 1 slide
        slidesPerView="auto" // ✅ auto-manage per screen
        centerInsufficientSlides={true}
        onSwiper={(swiper) => {
          gameCarousel.current = swiper;
          updateControls(swiper);
        }}
        onSlideChange={updateControls}
        onResize={updateControls}
        className={cn(
          "trending-sport-swiper",
          isMobile ? "!pt-3" : "!pt-[11px]"
        )}
      >
        {data?.map((item: any, num: number) => (
          <SwiperSlide
            key={num}
            className="!w-[140px] !h-[180px] relative" // ✅ fixed size slide
          >
            <div className="flex justify-center flex-col gap-[5px] h-full">
              <div className="image-carousel-container group relative transition-transform duration-300 hover:-translate-y-2 cursor-pointer h-full">
                <img
                  src={item?.image}
                  alt={`Game ${num + 1}`}
                  className="w-full h-[160] rounded-[4px] object-cover"
                />
                <div className="count-wrapper absolute left-[-1px] top-[17px] shadow-[0_4px_6px_#1a2c38]">
                  <div className="count-text flex justify-center items-center px-[8px] py-2 bg-[#2f4553ff] w-[26px] text-white font-bold leading-[120%] rounded-tr-[4px] rounded-br-[4px]">
                    <span>{num + 1}</span>
                  </div>
                </div>

                {!isMobile && (
                  <Button className="absolute bottom-2 right-2 bg-[#2f4553ff] cursor-pointer hover:bg-[#4a667a] p-3 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Icon name="externalLink" className="w-3 h-3 text-white" />
                  </Button>
                )}
              </div>

              <div className="live-container text-[12px] cursor-default relative bottom-[1.5px]">
                <span className="inline-block h-[6.5px] w-[6.5px] bg-[rgb(31,255,32)] rounded-full"></span>
                <span className="text-[#B1BAD3] tabular-nums font-semibold relative top-[0.5px]">
                  &nbsp;&nbsp;<span className="text-white">331</span> playing
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GameCarousel;
