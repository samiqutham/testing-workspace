"use client";
import React, { useState, useRef, useEffect } from "react";
import style from "./style.module.css";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import Icon from "@workspace/ui/icons/icons";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Input } from "@workspace/ui/components/input";
import { useAppStore } from "@workspace/ui/store/store";
import SearchDropdown from "@workspace/ui/common/searchdropdown"; // Import the dropdown

const DSearch = ({
  className,
  hideDropDown,
  classNameIcon,
  classNameInput,
  classButton,
  hideOverLay,
  onSearchChange,
  searchResults, // Add this prop
}: {
  className?: string;
  hideDropDown?: boolean;
  classNameIcon?: string;
  classNameInput?: string;
  classButton?: string;
  hideOverLay?: boolean;
  onSearchChange?: (query: string) => void;
  searchResults?: any; // Add this prop
}) => {
  const [searchCategory, setSearchCategory] = useState("Exchange");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const setIsOverlayOpen = useAppStore((state) => state.setIsOverlayOpen);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);

  const inputRef = useRef<HTMLInputElement>(null);

  // Console log search results when they change
  useEffect(() => {
    if (searchResults) {
      console.log("DSearch - Received Search Results:", searchResults);
      console.log("DSearch - Total matches found:", {
        events: searchResults.trendingEvents?.length || 0,
        games: searchResults.trendingGames?.length || 0,
        sports: searchResults.trendingSports?.length || 0,
      });

      // Show results dropdown if we have results
      const hasResults =
        searchResults.trendingEvents?.length > 0 ||
        searchResults.trendingGames?.length > 0 ||
        searchResults.trendingSports?.length > 0;

      setShowResults(hasResults);
    } else {
      setShowResults(false);
    }
  }, [searchResults]);

  const selectCategory = (category: string) => {
    setSearchCategory(category);
    setIsDropdownOpen(false);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setShowResults(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    // Call the parent's onSearchChange if provided
    if (onSearchChange) {
      onSearchChange(query);
    }

    // Hide results if query is empty
    if (!query.trim()) {
      setShowResults(false);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  useEffect(() => {
    if (!isOverlayOpen) {
      setShowCross(false);
      setShowResults(false);
    }
  }, [isOverlayOpen]);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        (!dropdownRef.current ||
          !dropdownRef.current.contains(event.target as Node))
      ) {
        setShowCross(false);
        setShowResults(false);
        setIsOverlayOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  const { open, isTablet } = useSidebar();

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "px-[3vw] relative z-50",
          open ? "mt-[23px]" : "mt-[24px]",
          isTablet && "!mt-[22.5px]",
          className
        )}
      >
        <div className="relative">
          <div
            className={cn(
              "border-2 hover:border-[#557086] max-w-[1200px] mx-auto rounded-[4px] bg-[#0f212e] flex items-center w-full shadow-[0_1px_3px_0_rgba(0,0,0,.2),_0_1px_2px_0_rgba(0,0,0,.12)]",
              isOverlayOpen ? "border-[#557086]" : "border-[#2f4553]",
              open ? "relative top-[1.5px] " : "relative top-[0.5px] "
            )}
          >
            {/* Category Dropdown */}
            {!hideDropDown && (
              <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
                  ref={dropdownRef}
                  className="w-[85] p-0 py-1 overflow-hidden rounded-[4px] border-none !top-[-10px]"
                >
                  <PopoverPrimitive.Arrow className="fill-white" />
                  <button
                    onClick={() => selectCategory("Exchange")}
                    className="w-full text-left px-3 py-2 cursor-pointer text-slate-800 hover:bg-[#b1bad3] text-sm font-medium hover:text-black"
                  >
                    Exchange
                  </button>
                  <button
                    onClick={() => selectCategory("Casino")}
                    className="w-full text-left px-3 py-2 cursor-pointer text-slate-800 hover:bg-[#b1bad3] text-sm font-medium hover:text-black"
                  >
                    Casino
                  </button>
                  {/* <button
                    onClick={() => selectCategory("Fantasy")}
                    className="w-full text-left cursor-pointer px-3 py-2 text-slate-800 hover:bg-[#b1bad3] text-sm font-medium hover:text-black"
                  >
                    Fantasy
                  </button>
                  <button
                    onClick={() => selectCategory("Sports")}
                    className={cn(
                      "w-full text-left cursor-pointer px-3 py-2 text-slate-800 hover:bg-[#b1bad3] text-sm font-medium hover:text-black",
                      classButton
                    )}
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
                className={cn(
                  "ml-[8px] mt-[0.5px] absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400",
                  classNameIcon
                )}
              />
              <Input
                ref={inputRef}
                placeholder="Search your game"
                onChange={handleInputChange}
                onFocus={() => {
                  setShowCross(true);
                  setIsOverlayOpen(true);
                }}
                className={cn(
                  "bg-transparent placeholder:text-sm border-0 text-white placeholder:text-[#566671] placeholder:font-semibold pl-11 pr-12 py-2.5 text-sm focus:ring-0 focus-visible:ring-0 focus:outline-none",
                  classNameInput
                )}
              />
              {showCross && (
                <button
                  type="button"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                    if (onSearchChange) {
                      onSearchChange("");
                    }
                    closeOverlay();
                    setShowCross(false);
                  }}
                  className="absolute right-[8px] top-[17px] cursor-pointer transform -translate-y-1/2 text-[#b1bad3] hover:text-white"
                >
                  <Icon
                    name={"searchcross"}
                    width={14}
                    height={14}
                    className="transition-transform duration-300"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchResults && (
            <SearchDropdown
              searchResults={searchResults}
              onClose={handleCloseResults}
            />
          )}
        </div>
      </div>

      {isOverlayOpen && (
        <div
          onClick={closeOverlay}
          className={cn(
            "fixed inset-0 top-[60px] bg-[#1a2e38b3] z-40 opacity-0 ",
            style.animateFadeIn
          )}
        />
      )}
    </>
  );
};

export default DSearch;
