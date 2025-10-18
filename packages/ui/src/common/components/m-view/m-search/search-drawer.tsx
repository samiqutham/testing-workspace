"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.css";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useAppStore } from "@workspace/ui/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import Icon from "@workspace/ui/icons/icons";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const SearchDrawer = ({
  hideDropDown,
  onSearchChange,
  searchResults,
}: {
  hideDropDown?: boolean;
  onSearchChange?: (query: string) => void;
  searchResults?: any;
}) => {
  const [searchCategory, setSearchCategory] = useState("Exchange");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpenSearch, toggleSearch } = useAppStore();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestedSwiper = useRef<SwiperType>(null);
  const [isSuggestedBeginning, setIsSuggestedBeginning] = useState(true);
  const [isSuggestedEnd, setIsSuggestedEnd] = useState(false);

  useEffect(() => {
    if (isOpenSearch) {
      setIsOverlayOpen(true);
    }
  }, [isOpenSearch]);

  useEffect(() => {
    if (searchResults) {
      console.log("SearchDrawer - Received Search Results:", searchResults);
      console.log("SearchDrawer - Total matches found:", {
        events: searchResults.trendingEvents?.length || 0,
        games: searchResults.trendingGames?.length || 0,
        sports: searchResults.trendingSports?.length || 0,
      });

      const hasResults =
        searchResults.trendingEvents?.length > 0 ||
        searchResults.trendingGames?.length > 0 ||
        searchResults.trendingSports?.length > 0;

      setShowResults(hasResults);
    } else {
      setShowResults(false);
    }
  }, [searchResults]);

  const closeSearch = () => {
    setIsOverlayOpen(false);
    setShowResults(false);
    setTimeout(() => {
      toggleSearch(false);
      setIsDropdownOpen(false);
    }, 20);
  };

  const selectCategory = (category: string) => {
    setSearchCategory(category);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (onSearchChange) {
      onSearchChange(query);
    }

    if (!query.trim()) {
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (onSearchChange) {
      onSearchChange("");
    }
    setShowResults(false);
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

  // Merge all results from searchResults
  const allResults = searchResults
    ? [
        ...(searchResults.trendingEvents || []).map((event: any) => ({
          id: event.eventId || event.id,
          title: event.name || event.eventId || "Event",
          type: "event" as const,
        })),
        ...(searchResults.trendingGames || []).map((game: any) => ({
          id: game.gameId || game.id,
          title: game.name || game.gameId || "Game",
          type: "game" as const,
        })),
        ...(searchResults.trendingSports || []).map((sport: any) => ({
          id: sport.sportId || sport.id,
          title: sport.name || sport.sportId || "Sport",
          type: "sport" as const,
        })),
      ]
    : [];

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
      {isOpenSearch && (
        <div className="fixed top-15 left-0 right-0 z-30 mx-auto">
          <div className="relative z-40 p-[12px_19px_12px_14px]">
            <div className="relative mb-4">
              {/* Unified Search Field Container */}
              <div className="border-2 border-[#557086] rounded-[4px] bg-[#0f212e] flex items-center w-full">
                {/* Category Selector */}
                {!hideDropDown && (
                  <Popover
                    open={isDropdownOpen}
                    onOpenChange={setIsDropdownOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center cursor-pointer gap-2 px-2 py-[8.5px] text-white text-sm border-r-2 border-[#2f4553] bg-[#0f212e] rounded-l-lg"
                      >
                        <span className="text-sm font-semibold">
                          {searchCategory}
                        </span>
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
                      className="p-0 py-1 overflow-hidden rounded-[4px] border-none !top-[-10px]"
                      style={{ width: "86px" }}
                    >
                      <PopoverPrimitive.Arrow className="fill-white" />
                      <button
                        onClick={() => selectCategory("Exchange")}
                        className="w-full text-left px-3 py-2 cursor-pointer text-[#2f4553] hover:bg-[#b1bad3] text-sm font-semibold hover:text-black"
                      >
                        Exchange
                      </button>
                      <button
                        onClick={() => selectCategory("Casino")}
                        className="w-full text-left px-3 py-2 cursor-pointer text-[#2f4553] hover:bg-[#b1bad3] text-sm font-semibold hover:text-black"
                      >
                        Casino
                      </button>
                      {/* <button
                        onClick={() => selectCategory("Fantasy")}
                        className="w-full text-left px-3 py-2 cursor-pointer text-[#2f4553] hover:bg-[#b1bad3] text-sm font-semibold hover:text-black"
                      >
                        Fantasy
                      </button>
                      <button
                        onClick={() => selectCategory("Sports")}
                        className="w-full text-left cursor-pointer px-3 py-2 text-[#2f4553] hover:bg-[#b1bad3] text-sm font-semibold hover:text-black"
                      >
                        Sports
                      </button> */}
                    </PopoverContent>
                  </Popover>
                )}

                {/* Search Input */}
                <div className="flex-1 relative">
                  <Icon
                    name="search"
                    width={20}
                    height={23}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    ref={inputRef}
                    placeholder={
                      searchCategory === "Sports"
                        ? "Search your event"
                        : "Search your game"
                    }
                    autoFocus
                    onChange={handleInputChange}
                    className="bg-transparent border-0 inputFocused text-white placeholder:text-[#566671] placeholder:font-medium pl-10 pr-12 py-2.5 text-sm focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  />
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <Icon
                      name={"searchcross"}
                      width={14}
                      height={14}
                      className="transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOverlayOpen && (
        <div
          className={cn(
            "fixed inset-0 top-[60px] bg-[#0f212e] z-20 overflow-hidden py-6 px-[18px]",
            style.animateFadeIn
          )}
        >
          {showResults && allResults.length > 0 ? (
            <div className="h-full  mt-10 rounded-[10px] flex flex-col">
              {/* Search Results Container with Internal Scroll */}
              <div className="flex-1 rounded-md scrollbar-hide overflow-y-auto">
                {/* Header */}
                <div className="flex  items-center justify-between">
                  {/* <h3 className="text-white font-semibold text-lg">
                    Search Results ({allResults.length})
                  </h3> */}
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 md:gap-y-[30px] md:gap-x-[15px] lg:gap-y-5 lg:gap-x-2.5 gap-[10px_5px]">
                  {allResults.map((result, index) => (
                    <Link
                      key={`${result.type}-${result.id}-${index}`}
                      href="#"
                      className="relative min-h-[calc(100%+5px)]"
                      onClick={closeSearch}
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
                      <SwiperSlide key={idx} className="relative ">
                        <Link href="#" onClick={closeSearch}>
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
                        <Link href="#" onClick={closeSearch}>
                          <div className="flex flex-col gap-[2px]">
                            <img
                              src={sport.img}
                              alt={sport.title}
                              width={1000}
                              height={1000}
                              className="object-cover rounded-[.5rem] w-full h-full transition-transform duration-300 ease-in-out hover:-translate-y-1"
                            />
                            <div className="mt-2 text-center">
                              <span className="text-[#b1bad3] text-xs capitalize">
                                {sport.title}
                              </span>
                            </div>
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
          ) : (
            <div onClick={closeSearch} className="w-full h-full" />
          )}
        </div>
      )}
    </>
  );
};

export default SearchDrawer;
