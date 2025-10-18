"use client";
import MPromoCard from "../components/m-view/m-promoCard";
import MSearch from "@workspace/ui/common/components/m-view/m-search";
import DSearch from "@workspace/ui/common/components/d-view/d-search";
import TabSlider from "../components/common/tab-slider";
import { useEffect, useState } from "react";
import DPromoCard from "../components/d-view/d-promoCard";
import SeeMore from "../components/common/see-more";
import BetBoards from "../components/common/bet-board";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { useAppStore } from "@workspace/ui/store/store";
import Loading from "./loading";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const trendingList = useAppStore((state) => state.trendingList);
  const [searchResults, setSearchResults] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Search handler function
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

  const { open, isTablet } = useSidebar();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const runPromise = async () => {
      // Fake async work (2 sec)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Jab promise resolve ho jaye
      setReady(true);
    };

    runPromise();
  }, []);

  if (!ready) {
    return <Loading />;
  }

  return (
    <div>
      {isMobile ? (
        <>
          <div className="w-full mt-1 flex flex-col gap-6 px-[3vw]">
            <MPromoCard />
          </div>
          <div className="mt-[26px]">
            <MSearch
              onSearchChange={handleSearchChange}
              searchResults={searchResults}
            />
          </div>
          <div className="w-full mt-6 flex flex-col gap-6 px-[3vw]">
            <TabSlider></TabSlider>
            <BetBoards />
            <SeeMore />
          </div>
        </>
      ) : (
        <>
          <div>
            <div className=" mt-6 px-[3vw]">
              <DPromoCard />
            </div>
            <div className="flex flex-col gap-6 px-[3vw]">
              <DSearch
                className={cn(
                  open ? "mt-[0.5px] px-[0vw]" : "mt-[1.5px] px-[0vw]",
                  isTablet && "mt-[1px] px-[0vw]"
                )}
                hideDropDown
                classNameIcon="ml-[0px] mt-[0.5px] "
                classNameInput="pl-9 relative bottom-[1px]  h-[37px] !pt-[11px]"
                onSearchChange={handleSearchChange}
                searchResults={searchResults}
              />
            </div>
            <div className="mt-[25px] flex flex-col gap-6 px-[3vw]">
              <TabSlider></TabSlider>
              <BetBoards />
              <SeeMore />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
