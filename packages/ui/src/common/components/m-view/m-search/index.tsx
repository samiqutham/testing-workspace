"use client";
import React from "react";
import { Input } from "@workspace/ui/components/input";
import { useAppStore } from "@workspace/ui/store/store";
import { cn } from "@workspace/ui/lib/utils";
import Icon from "@workspace/ui/icons/icons";
import SearchDrawer from "@workspace/ui/common/components/m-view/m-search/search-drawer";

const MSearch = ({
  className,
  hideDropDown,
  inputSpacing,
  onSearchChange,
  searchResults,
}: {
  className?: string;
  hideDropDown?: boolean;
  inputSpacing?: string;
  onSearchChange?: (query: string) => void;
  searchResults?: any;
}) => {
  const { closeDrawer, toggleSearch } = useAppStore();

  const openSearch = () => {
    toggleSearch(true);
    closeDrawer();
  };

  // Console log search results when they change
  React.useEffect(() => {
    if (searchResults) {
      console.log("MSearch - Received Search Results:", searchResults);
      console.log("MSearch - Total matches found:", {
        events: searchResults.trendingEvents?.length || 0,
        games: searchResults.trendingGames?.length || 0,
        sports: searchResults.trendingSports?.length || 0,
      });
    }
  }, [searchResults]);

  return (
    <>
      <div className={cn("w-full px-[3vw] mt-0", className)}>
        <div
          onClick={openSearch}
          className="border-2 border-[#2f4553] rounded-[8px] px-3 bg-[#0f212e] flex items-center w-full h-[51px] cursor-pointer"
        >
          <div className="flex-1 relative">
            <Icon
              name="broweSearch"
              width={20}
              height={20}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#557086]"
            />
            <Input
              placeholder="Search your game or event"
              readOnly
              className="bg-transparent border-0 inputFocused text-white placeholder:text-[#566671] placeholder:font-medium text-[16px] pl-10 pr-12 py-2.5 text-sm focus:ring-0 focus-visible:ring-0 focus:outline-none cursor-pointer"
            />
          </div>
        </div>
      </div>
      <SearchDrawer
        hideDropDown={hideDropDown}
        onSearchChange={onSearchChange}
        searchResults={searchResults}
      />
    </>
  );
};

export default MSearch;
