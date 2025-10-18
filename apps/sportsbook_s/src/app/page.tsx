"use client";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@workspace/ui/store/store";
import MSearch from "@workspace/ui/common/components/m-view/m-search";
import DSearch from "@workspace/ui/common/components/d-view/d-search";
import DBetBoard from "./components/d-view/d-bet-board";
import MBetBoard from "./components/m-view/m-bet-board";
import MExpandableCard from "./components/m-view/m-expandableCard";
import MLiveEvents from "./components/m-view/m-live-events";
import MLiveMarket from "./components/m-view/m-live-market";
import MSportsCards from "./components/m-view/m-sport-cards";
import MSportsTabs from "./components/m-view/m-sports-tabs";
import MTopSports from "./components/m-view/m-topsports";
import DSportsCard from "./components/d-view/d-sports-card";
import DSportsTabs from "./components/d-view/d-sports-tabs";
import DLiveMarket from "./components/d-view/d-live-market";
import DLiveEvents from "./components/d-view/d-live-events";
import DExpandableCard from "./components/d-view/d-expandableCard";
import DTopSports from "./components/d-view/d-top-sports";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { Skeleton } from "@workspace/ui/components/skeleton";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const isAuthUser = useAppStore((state) => state.isAuthUser);
  const trendingList = useAppStore((state) => state.trendingList);
  const [searchResults, setSearchResults] = useState<any>(null);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNoticeClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setNoticeVisible(false);
    }, 300);
  };
  const { open, isTablet } = useSidebar();
  const handleSearchChange = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const searchQuery = query.toLowerCase();
    const results: any = {
      trendingEvents: [],
      trendingGames: [],
      trendingSports: [],
    };

    // Search in trendingEvents by eventId
    if (trendingList.trendingEvents) {
      const matchedEvents = trendingList.trendingEvents.filter((event: any) =>
        event.eventId?.toLowerCase().includes(searchQuery)
      );
      if (matchedEvents.length > 0) {
        results.trendingEvents = matchedEvents;
      }
    }

    // Search in trendingGames by gameId
    if (trendingList.trendingGames) {
      const matchedGames = trendingList.trendingGames.filter((game: any) =>
        game.gameId?.toLowerCase().includes(searchQuery)
      );
      if (matchedGames.length > 0) {
        results.trendingGames = matchedGames;
      }
    }

    // Search in trendingSports by sportId
    if (trendingList.trendingSports) {
      const matchedSports = trendingList.trendingSports.filter((sport: any) =>
        sport.sportId?.toLowerCase().includes(searchQuery)
      );
      if (matchedSports.length > 0) {
        results.trendingSports = matchedSports;
      }
    }

    // Check if any results found
    const hasResults =
      results.trendingEvents.length > 0 ||
      results.trendingGames.length > 0 ||
      results.trendingSports.length > 0;

    if (hasResults) {
      console.log("Search Results Found:", results);
      setSearchResults(results);
    } else {
      console.log("No matching search results found for:", query);
      setSearchResults(null);
    }
  };
  return (
    <>
      <div>
        {isMobile ? (
          <>
            <div className="px-[3vw] pt-[12px] pb-[32px]">
              <MSportsCards />
              <div className="mt-6">
                <MSearch
                  className="px-[0vw]"
                  inputSpacing="!pt-[11px]"
                  onSearchChange={handleSearchChange}
                  searchResults={searchResults}
                />
              </div>
              <div className="mt-[24px]">
                <MSportsTabs />
              </div>
              <MTopSports />
              <MLiveEvents />
              <MLiveMarket />
              <MBetBoard />
              <MExpandableCard />
            </div>
          </>
        ) : (
          <>
            <div className="pb-8">
              <div className="lg:mt-6 md:mt-[24.5px]  flex flex-col gap-6 px-[3vw]">
                <div className="max-[767px]:hidden block">
                  <DSportsCard />
                  <DSearch
                    className={cn(
                      open ? "mt-[0.5px] px-[0vw]" : "mt-[1.5px] px-[0vw]  ",
                      isTablet &&
                        "mt-[1px] px-[0vw] [&_button[type='button']]:top-[19px]"
                    )}
                    hideDropDown
                    classNameIcon="ml-[0px] mt-[0.5px] "
                    classNameInput="pl-9 relative bottom-[1px]  h-[37px] !pt-[11px] focus:!text-sm"
                    onSearchChange={handleSearchChange}
                    searchResults={searchResults}
                  />
                  <div
                    className={cn(
                      open ? "mt-[25.5px]" : "mt-[24.5px]",
                      isTablet && "!mt-[22.5px]"
                    )}
                  >
                    <DSportsTabs />
                  </div>
                  <DTopSports />
                  <div className="mt-[12.7px]">
                    <DLiveEvents />
                  </div>
                  <DLiveMarket />
                  <DBetBoard />
                  <DExpandableCard />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
