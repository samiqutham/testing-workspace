"use client";

import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import Icon from "@workspace/ui/icons/icons";
import { useEffect, useState, useRef } from "react";
import style from "@workspace/ui/common/components/m-view/m-search/style.module.css";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import Link from "next/link";
import { useAppStore } from "@workspace/ui/store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const MBroweSearch = ({ className }: { className?: string }) => {
  const [searchCategory, setSearchCategory] = useState("Exchange");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [query, setQuery] = useState("");
  const suggestedSwiper = useRef<SwiperType>(null);
  const [isSuggestedBeginning, setIsSuggestedBeginning] = useState(true);
  const [isSuggestedEnd, setIsSuggestedEnd] = useState(false);

  const trendingList = useAppStore((state) => state.trendingList);
  const emptyResults = {
    trendingEvents: [],
    trendingGames: [],
    trendingSports: [],
  };
  const [searchResults, setSearchResults] = useState<any>(emptyResults);
  const categories = ["Exchange", "Casino", "Fantasy", "Sports"];

  useEffect(() => {
    if (trendingList && Object.keys(trendingList).length > 0) {
      console.log("check list", trendingList);
    } else {
      console.log("waiting for API...");
    }
  }, [trendingList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { hostname, port } = window.location;
      //  Localhost ports mapping
      const portMap: Record<string, string> = {
        "3002": "Casino",
        "3003": "Exchange",
        "3004": "Fantasy",
        "3005": "Sports",
      };
      //  Live domain mapping
      const domainMap: Record<string, string> = {
        "stakefair-casino.vercel.app": "Casino",
        "stakefair-exchange.vercel.app": "Exchange",
        "stakefair-fantasy.vercel.app": "Fantasy",
        "stakefair-sportsbook.vercel.app": "Sports",
      };

      if (port && portMap[port]) {
        setSearchCategory(portMap[port]);
      } else if (domainMap[hostname]) {
        setSearchCategory(domainMap[hostname]);
      } else {
        setSearchCategory("Exchange");
      }
    }
  }, []);

  const handleSelectCategory = (category: string) => {
    setSearchCategory(category);
    setIsDropdownOpen(false);
  };

  const handleOverlay = () => {
    setIsOverlayOpen(false);
  };
  // Search handler function
  const handleInputChange = (query: string) => {
    if (!query.trim()) {
      setSearchResults(emptyResults); // reset to empty
      return;
    }
    setQuery(query);

    const searchQuery = query.toLowerCase();

    const results = {
      trendingEvents:
        trendingList?.trendingEvents?.filter((event: any) =>
          event.eventId?.toLowerCase().includes(searchQuery)
        ) || [],
      trendingGames:
        trendingList?.trendingGames?.filter((game: any) =>
          game.gameId?.toLowerCase().includes(searchQuery)
        ) || [],
      trendingSports:
        trendingList?.trendingSports?.filter((sport: any) =>
          sport.sportId?.toLowerCase().includes(searchQuery)
        ) || [],
    };

    const hasResults =
      results.trendingEvents.length > 0 ||
      results.trendingGames.length > 0 ||
      results.trendingSports.length > 0;

    if (hasResults) {
      console.log("Search Results Found:", results);
      setSearchResults(results);
    } else {
      console.log("No matching search results found for:", query);
      setSearchResults(emptyResults);
    }
  };

  const handleNext = () => {
    if (suggestedSwiper.current) {
      const swiper = suggestedSwiper.current;
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
    if (suggestedSwiper.current) {
      const swiper = suggestedSwiper.current;
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

  const allResults = [
    ...searchResults.trendingEvents.map((event: any) => ({
      id: event.eventId,
      title: event.eventId,
      type: "event" as const,
    })),
    ...searchResults.trendingGames.map((game: any) => ({
      id: game.gameId,
      title: game.gameId,
      type: "game" as const,
    })),
    ...searchResults.trendingSports.map((sport: any) => ({
      id: sport.sportId,
      title: sport.sportId,
      type: "sport" as const,
    })),
  ];

  // Suggested games data
  const suggestedGames = [
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

  // Suggested sports data
  const suggestedSports = [
    {
      id: 1,
      title: "Football",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 2,
      title: "Basketball",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 3,
      title: "Tennis",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 4,
      title: "Cricket",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 5,
      title: "Baseball",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 6,
      title: "Hockey",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
  ];

  return (
    <>
      <div
        onClick={(e) => e.preventDefault()}
        className={cn(
          "border-2 rounded-[8px] px-3 bg-[#0f212e] flex items-center w-full h-[51px]",
          isOverlayOpen ? "border-[#557086]" : "border-[#2f4553]",
          className
        )}
      >
        <Popover open={isDropdownOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              onClick={(e) => {
                setIsDropdownOpen(!isDropdownOpen);
                e.preventDefault();
              }}
              className={cn("flex items-center cursor-pointer gap-2 px-2 pl-0 py-[8.5px] h-[3rem] mr-2 text-white text-sm border-r-2 border-[#2f4553]  rounded-l-lg",className)}
            >
              <span className="text-sm font-semibold">{searchCategory}</span>
              <Icon
                name="arrow"
                width={14}
                height={14}
                className={`transition-transform duration-300 !h-[14px] ${
                  isDropdownOpen
                    ? "rotate-180 text-[#b1bad3]"
                    : "rotate-0 text-[#b1bad3]"
                }`}
              />
            </button>
          </PopoverTrigger>

          <PopoverContent
            className="p-0 py-1 overflow-hidden rounded-[4px] border-none !top-[-10px] z-[9999]"
            style={{ width: "86px" }}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <PopoverPrimitive.Arrow className="fill-white" />

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleSelectCategory(category)}
                className="w-full text-left px-3 py-2 cursor-pointer text-[#2f4553] hover:bg-[#b1bad3] text-sm font-semibold hover:text-black"
              >
                {category}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        <div className="flex-1 relative" onClick={() => setIsOverlayOpen(true)}>
          <Icon
            name="broweSearch"
            width={20}
            height={20}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#557086]"
          />
          <Input
            placeholder={
              searchCategory === "Sports"
                ? "Search your event"
                : "Search your game"
            }
            onChange={(e) => handleInputChange(e.target.value)}
            // autoFocus
            className="bg-transparent border-0 inputFocused text-white placeholder:text-[#566671] placeholder:font-medium text-[16px] pl-10 pr-12 py-2.5 text-sm focus:ring-0 focus-visible:ring-0 focus:outline-none"
          />

          {isOverlayOpen && (
            <button
              type="button"
              onClick={(e) => {
                setIsOverlayOpen(false);
                e.stopPropagation();
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <Icon
                name={"closeIcon"}
                width={20}
                height={20}
                fill="#b1bad3"
                className="transition-transform duration-300"
              />
            </button>
          )}
        </div>
      </div>

      {isOverlayOpen && (
        <div
          className={cn(
            "fixed inset-0 top-[70px] bg-[#0f212e] z-20 overflow-y-auto p-4 pt-[4px]",
            style.animateFadeIn
          )}
        >
          {allResults.length > 0 ? (
            <div className="h-full mt-2 rounded-[10px] flex flex-col">
              <div className="flex-1 rounded-md scrollbar-hide overflow-y-auto">
                <div className="flex items-center justify-between"></div>

                {/* Results Grid */}
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 md:gap-y-[30px] md:gap-x-[15px] lg:gap-y-5 lg:gap-x-2.5 gap-[10px_5px]">
                  {allResults.map((result, index) => (
                    <Link
                      key={`${result.type}-${result.id}-${index}`}
                      href="#"
                      className="relative min-h-[calc(100%+5px)]"
                      onClick={handleOverlay}
                    >
                      <div className="flex justify-center flex-col h-full">
                        <div className="image-carousel-container group relative transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                          <img
                            src={
                              result.image ||
                              "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format"
                            }
                            alt={result.title || "Result"}
                            className="max-w-full h-full object-cover rounded-[.5rem] w-full min-h-[calc(100%+4px)]"
                          />
                        </div>

                        <div className="pt-1 flex items-center justify-start">
                          <span className="inline-block h-[6px] w-[6px] bg-[rgb(31,255,32)] rounded-full"></span>
                          <span className="text-[12px] px-2 pl-[4px] py-1">
                            <span className="pr-1">2,444</span>
                            playing
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Suggested Games Section */}
                <div className="mt-8">
                  <div className="flex items-center justify-between relative bottom-[0.5px] w-full mb-3">
                    <Link href="" prefetch={true}>
                      <div className="inline-flex items-center gap-2 justify-start font-semibold whitespace-nowrap bg-transparent text-white text-lg leading-none w-full h-[27px]">
                        <span className="mt-0.5">
                          <svg
                            fill="currentColor"
                            viewBox="0 0 64 64"
                            className="w-[18px] h-[18px] text-[#b1bad3]"
                          >
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
                        disabled={isSuggestedBeginning}
                        className={`border-[1px] border-r-[0.5px] border-[rgb(47,69,83)] h-[37px] w-[50.5px] rounded-[calc(.25rem*8)] rounded-tr-[0px] rounded-br-[0px] flex items-center justify-center transition-colors ${
                          isSuggestedBeginning
                            ? "text-slate-600 !cursor-default opacity-50"
                            : "text-white hover:bg-transparent cursor-pointer"
                        }`}
                      >
                        <Icon
                          name="rightarrow"
                          className={`w-[14px] h-[14px] ${
                            isSuggestedBeginning ? "opacity-95" : ""
                          }`}
                          fill="#b1bad3"
                        />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={isSuggestedEnd}
                        className={`border-[1px] border-l-[0px] border-[rgb(47,69,83)] h-[37px] w-[50.5px] rounded-[calc(.25rem*8)] rounded-tl-[0px] rounded-bl-[0px] flex items-center justify-center transition-colors ${
                          isSuggestedEnd
                            ? "text-slate-600 !cursor-default opacity-50"
                            : "text-white hover:bg-transparent cursor-pointer"
                        }`}
                      >
                        <Icon
                          name="leftarrow"
                          className={`w-[14px] h-[14px] ${isSuggestedEnd ? "opacity-95" : ""}`}
                          fill="#b1bad3"
                        />
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
                      suggestedSwiper.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                      setIsSuggestedBeginning(swiper.isBeginning);
                      setIsSuggestedEnd(swiper.isEnd);
                    }}
                    className="home-swiper !pt-3"
                  >
                    {suggestedGames.map((game, idx) => (
                      <SwiperSlide key={idx} className="relative">
                        <Link href="#" onClick={handleOverlay}>
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
                                &nbsp;&nbsp;
                                <span className="text-white">537</span> playing
                              </span>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Suggested Sports Section */}
                <div className="mt-8">
                  <div className="flex items-center justify-between relative bottom-[0.5px] w-full mb-3">
                    <Link href="" prefetch={true}>
                      <div className="inline-flex items-center gap-2 justify-start font-semibold whitespace-nowrap bg-transparent text-white text-lg leading-none w-full h-[27px]">
                        <span className="mt-0.5">
                          <svg
                            fill="currentColor"
                            viewBox="0 0 64 64"
                            className="w-[18px] h-[18px] text-[#b1bad3]"
                          >
                            <path d="M57.164 0a6.836 6.836 0 0 1 6.79 7.629l-.798 6.836-.011.133a28.9 28.9 0 0 1-8.266 17.086L44.188 42.367l.93 8.473L31.976 64 30.34 51.078c-8.374-3.028-14.1-8.943-17.438-17.437L0 32.023l13.16-13.14 8.473.93L32.316 9.12c4.491-4.477 10.446-7.494 17.22-8.277l6.8-.793q.408-.05.828-.05M8.637 41.125c2.4 6.9 7.869 12.368 14.937 14.82 0 0-4.697 8.467-20.676 5.649C.07 45.615 8.586 40.957 8.586 40.957zm35.64-30.187a7.995 7.995 0 0 0 0 15.988v.039a7.995 7.995 0 0 0 7.996-7.992v-.04a8 8 0 0 0-7.996-7.995"></path>
                          </svg>
                        </span>
                        <span className="font-semibold text-lg text-white">
                          Suggested sports
                        </span>
                      </div>
                    </Link>
                    <div className="flex">
                      <button
                        onClick={handlePrev}
                        disabled={isSuggestedBeginning}
                        className={`border-[1px] border-r-[0.5px] border-[rgb(47,69,83)] h-[37px] w-[50.5px] rounded-[calc(.25rem*8)] rounded-tr-[0px] rounded-br-[0px] flex items-center justify-center transition-colors ${
                          isSuggestedBeginning
                            ? "text-slate-600 !cursor-default opacity-50"
                            : "text-white hover:bg-transparent cursor-pointer"
                        }`}
                      >
                        <Icon
                          name="rightarrow"
                          className={`w-[14px] h-[14px] ${
                            isSuggestedBeginning ? "opacity-95" : ""
                          }`}
                          fill="#b1bad3"
                        />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={isSuggestedEnd}
                        className={`border-[1px] border-l-[0px] border-[rgb(47,69,83)] h-[37px] w-[50.5px] rounded-[calc(.25rem*8)] rounded-tl-[0px] rounded-bl-[0px] flex items-center justify-center transition-colors ${
                          isSuggestedEnd
                            ? "text-slate-600 !cursor-default opacity-50"
                            : "text-white hover:bg-transparent cursor-pointer"
                        }`}
                      >
                        <Icon
                          name="leftarrow"
                          className={`w-[14px] h-[14px] ${isSuggestedEnd ? "opacity-95" : ""}`}
                          fill="#b1bad3"
                        />
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
                    className="home-swiper !pt-3"
                  >
                    {suggestedSports.map((sport, idx) => (
                      <SwiperSlide key={idx} className="relative mb-[50px]">
                        <Link href="#" onClick={handleOverlay}>
                          <div className="flex flex-col gap-[2px]">
                            <img
                              src={sport.img}
                              alt={sport.title}
                              width={1000}
                              height={1000}
                              className="object-cover rounded-[.5rem] w-full h-full transition-transform duration-300 ease-in-out hover:-translate-y-1"
                            />
                            <div className="mt-2 text-center"></div>
                            <div className="live-container text-[12px]">
                              <span className="inline-block h-[6.5px] w-[6.5px] bg-[rgb(31,255,32)] rounded-full"></span>
                              <span className="text-[#B1BAD3] tabular-nums font-semibold relative top-[0.5px]">
                                &nbsp;&nbsp;
                                <span className="text-white">248</span> playing
                              </span>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          ) : query.trim() !== "" ? (
            <p className="text-[#b1bad3] text-center mt-10">
              No matching search results
            </p>
          ) : null}
        </div>
      )}
    </>
  );
};

export default MBroweSearch;
