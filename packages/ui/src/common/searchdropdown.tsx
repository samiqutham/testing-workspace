"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@workspace/ui/icons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

interface SearchResult {
  id: string;
  title: string;
  type: "event" | "game" | "sport";
}

interface SearchDropdownProps {
  searchResults: {
    trendingEvents: any[];
    trendingGames: any[];
    trendingSports: any[];
  } | null;
  onClose: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  searchResults,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const trendingGamesSwiper = useRef<SwiperType>(null);
  const [isGamesBeginning, setIsGamesBeginning] = useState(true);
  const [isGamesEnd, setIsGamesEnd] = useState(false);

  // Scroll the dropdown into view when it appears
  useEffect(() => {
    if (dropdownRef.current && searchResults) {
      // Small delay to ensure the dropdown is fully rendered
      setTimeout(() => {
        dropdownRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Use "nearest" to avoid unnecessary scrolling
          inline: "nearest",
        });
      }, 100);
    }
  }, [searchResults]);

  if (!searchResults) return null;

  const allResults: SearchResult[] = [
    ...searchResults.trendingEvents.map((event) => ({
      id: event.eventId,
      title: event.eventId,
      type: "event" as const,
    })),
    ...searchResults.trendingGames.map((game) => ({
      id: game.gameId,
      title: game.gameId,
      type: "game" as const,
    })),
    ...searchResults.trendingSports.map((sport) => ({
      id: sport.sportId,
      title: sport.sportId,
      type: "sport" as const,
    })),
  ];

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

  const games = [
    {
      id: 1,
      title: "Game 1",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 2,
      title: "Game 2",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 3,
      title: "Game 3",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 4,
      title: "Game 4",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 5,
      title: "Game 5",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 6,
      title: "Game 6",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 7,
      title: "Game 7",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 8,
      title: "Game 8",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 9,
      title: "Game 9",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
  ];

  if (allResults.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-[rgb(15,33,46)] border border-[#2f4553] rounded-md shadow-lg z-50 max-w-[1200px] mx-auto"
    >
      <div className="max-h-[450px] scrollbar-hide overflow-y-auto overflow-x-hidden">
        <div className="p-4">
          {/* Results Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 md:gap-y-[30px] md:gap-x-[15px] lg:gap-y-5 lg:gap-x-2.5 gap-[10px_5px]">
            {allResults.map((result, index) => (
              <Link
                key={`${result.type}-${result.id}-${index}`}
                href=""
                className="relative min-h-[calc(100%+5px)]"
                onClick={onClose}
              >
                <div className="flex justify-center flex-col h-full">
                  <div className="image-carousel-container group relative transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                    <img
                      src="https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format"
                      alt={result.title}
                      className="max-w-full h-full object-cover rounded-[.5rem] w-full min-h-[calc(100%+4px)]"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[#b1bad3] text-xs capitalize">
                      {result.type}
                    </span>
                  </div>
                  <div className="live-container text-[12px] cursor-default mt-[7.5px] text-center">
                    <span className="inline-block h-[6.5px] w-[6.5px] bg-[rgb(31,255,32)] rounded-full"></span>
                    <span className="text-[#B1BAD3] tabular-nums font-semibold relative top-[0.5px]">
                      &nbsp;&nbsp;<span className="text-white">331</span>{" "}
                      playing
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* New Releases Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between relative bottom-[0.5px] w-full">
              <Link href={""} prefetch={true}>
                <div className="inline-flex items-center gap-2 justify-start font-semibold whitespace-nowrap bg-transparent text-white text-lg leading-none w-full h-[27px]">
                  <span className="mt-0.5">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 64 64"
                      className="w-[18px] h-[18px] text-[#b1bad3] group-hover:text-white"
                    >
                      <title></title>
                      <path d="M57.164 0a6.836 6.836 0 0 1 6.79 7.629l-.798 6.836-.011.133a28.9 28.9 0 0 1-8.266 17.086L44.188 42.367l.93 8.473L31.976 64 30.34 51.078c-8.374-3.028-14.1-8.943-17.438-17.437L0 32.023l13.16-13.14 8.473.93L32.316 9.12c4.491-4.477 10.446-7.494 17.22-8.277l6.8-.793q.408-.05.828-.05M8.637 41.125c2.4 6.9 7.869 12.368 14.937 14.82 0 0-4.697 8.467-20.676 5.649C.07 45.615 8.586 40.957 8.586 40.957zm35.64-30.187a7.995 7.995 0 0 0 0 15.988v.039a7.995 7.995 0 0 0 7.996-7.992v-.04a8 8 0 0 0-7.996-7.995"></path>
                    </svg>
                  </span>
                  <span className="font-semibold text-lg text-white">
                    New Releases
                  </span>
                </div>
              </Link>
              <div className="flex">
                <button
                  onClick={handlePrev}
                  disabled={isGamesBeginning}
                  className={`border-[1px] border-r-[0.5px] border-[rgb(47,69,83)] h-[37px] w-[50.5px] rounded-[calc(.25rem*8)] rounded-tr-[0px] rounded-br-[0px] flex items-center justify-center transition-colors ${
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
                0: { slidesPerView: 3, spaceBetween: 6 },
                500: { slidesPerView: 4, spaceBetween: 6 },
                700: { slidesPerView: 5, spaceBetween: 16 },
                911: { slidesPerView: 6, spaceBetween: 16 },
                1061: { slidesPerView: 7, spaceBetween: 16 },
                1210: { slidesPerView: 8, spaceBetween: 11 },
              }}
              onSwiper={(swiper) => {
                trendingGamesSwiper.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setIsGamesBeginning(swiper.isBeginning);
                setIsGamesEnd(swiper.isEnd);
              }}
              className="home-swiper !pt-3"
            >
              {games.map((game, idx) => (
                <SwiperSlide key={idx} className="relative">
                  <div className="flex flex-col gap-[2px]">
                    <img
                      src={game.img}
                      alt={game.title}
                      width={1000}
                      height={1000}
                      className="object-cover rounded-[.5rem] w-full h-full transition-transform duration-300 ease-in-out hover:-translate-y-1"
                    />
                    <div className="live-container text-[12px]">
                      <span className="inline-block h-[6.5px] w-[6.5px] bg-[rgb(31,255,32)] rounded-full"></span>
                      <span className="text-[#B1BAD3] tabular-nums font-semibold relative top-[0.5px]">
                        &nbsp;&nbsp;<span className="text-white">537</span>{" "}
                        playing
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
