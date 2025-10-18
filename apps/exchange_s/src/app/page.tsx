"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import DSportNav from "@exchange_s/components/d-view/d-sport-nav";
import { DSportsMarket } from "@exchange_s/components/d-view/d-sports-market";
import { DPromoCards } from "@exchange_s/components/d-view/d-promo-cards";
import { DNextRace } from "@exchange_s/components/d-view/d-next-race";
import DSportsHighlights from "@exchange_s/components/d-view/d-sport-highlights";
import DMarketHighlights from "@exchange_s/components/d-view/d-market-highlights";
import { DHorseRacing } from "@exchange_s/components/d-view/d-horse-racing";
import { DInplay } from "@exchange_s/components/d-view/d-inplay";
import { useAppStore } from "@workspace/ui/store/store";
import MSportsList from "@exchange_s/components/m-view/m-sportslist";
import MBanner from "@exchange_s/components/m-view/m-banners/m-banner";
import MPopularBets from "@exchange_s/components/m-view/m-popular-bets";
import MHorseRacing from "@exchange_s/components/m-view/m-horse-racing";
import MQuickLink from "@exchange_s/components/m-view/m-quick-link";
import TRightSidebar from "@exchange_s/components/t-view/right-sidebar";
import { DQuickLinks } from "@exchange_s/components/d-view/d-quick-links";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [inplayFilterSport, setInplayFilterSport] = useState<string>("All");
  const racingEvents = useAppStore((state) => state.allRacingEvents) || {};

  const allEventsList = useAppStore((state) => state.allEventsList) || {};
  const setTop21Events = useAppStore((state) => state.setTop21Events) || {};
  const setSideBarTabs = useAppStore((state) => state.setSideBarTabs) || {};
  const sideBarTabs = useAppStore((state) => state.sideBarTabs) || "";
  const mergedEvents = Object.values(allEventsList).flat();
  const allSportList = useAppStore((state) => state.AllSportList);
  const allRaceEvents = racingEvents?.events || [];

  const horseRacingEvents = allRaceEvents.filter(
    (ev: any) => ev.eventType?.id?.toString() === "7"
  );

  // refs for scrolling
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const topAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const itemId = localStorage.getItem("itemId");
    setSideBarTabs(String(itemId));
    console.log("check from home comp", itemId);
  }, []);

  const menuItems = useMemo(() => {
    const sports = Array.isArray(allSportList?.eventTypes)
      ? allSportList.eventTypes.map((s: any, index: number) => {
          const ev = s.eventType;
          return {
            id:
              ev?.id?.toString() ||
              ev?.lSportId?.toString() ||
              `sport-${index}`,
            name: ev?.name || `Sport ${index}`,
          };
        })
      : [];
    return [{ id: "inplay", name: "In-Play" }, ...sports];
  }, [allSportList]);

  const activeItem = menuItems.find((item) => item.id === sideBarTabs);

  const isToday = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  const isTomorrow = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    return (
      d.getDate() === tomorrow.getDate() &&
      d.getMonth() === tomorrow.getMonth() &&
      d.getFullYear() === tomorrow.getFullYear()
    );
  };

  const filteredEvents = activeItem
    ? mergedEvents
        .filter((ev: any) => {
          const eventTypeId = ev.eventType?.id?.toString();

          if (activeItem.id !== "inplay" && eventTypeId !== activeItem.id)
            return false;

          if (selectedFilter === "In-Play") return ev.inplay === true;
          if (selectedFilter === "Today") return isToday(ev.marketStartTime);
          if (selectedFilter === "Tommorrow")
            return isTomorrow(ev.marketStartTime);
          if (selectedFilter === "Future") {
            const d = new Date(ev.marketStartTime);
            const now = new Date();
            return (
              d > now &&
              !isToday(ev.marketStartTime) &&
              !isTomorrow(ev.marketStartTime)
            );
          }
          return true;
        })
        .sort((a: any, b: any) => b.totalMatched - a.totalMatched)
    : [];

  useEffect(() => {
    // console.log("allEventsList changed:", quickLinks);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTab(window.innerWidth >= 768 && window.innerWidth < 1023);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const eventsList: any = Object.values(allEventsList).flat();
    const top21Items = eventsList
      .sort((a: any, b: any) => b.totalMatched - a.totalMatched)
      .slice(0, 21);
    setTop21Events(top21Items);
    console.log(top21Items);
  }, [allEventsList]);

  const renderContent = () => {
    if (!activeItem || activeItem.id === "home") {
      return (
        <>
          {/* <DPromoCards /> */}
          {/* <DNextRace events={horseRacingEvents} /> */}
          <DSportsHighlights events={mergedEvents} />
          {/* <DMarketHighlights events={mergedEvents} /> */}
          {/* <DPopularBet />
          <DQuickLinks /> */}
          <DHorseRacing currentSportId={"7"} />
        </>
      );
    }

    if (activeItem.id === "inplay") {
      const inplayEvents = mergedEvents.filter((ev: any) => {
        const d = new Date(ev.marketStartTime);
        const now = new Date();
        const isTodayEvent =
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear();
        return ev.inplay === true || isTodayEvent;
      });

      const displayedEvents = inplayEvents.filter((ev: any) => {
        if (inplayFilterSport === "All") return true;
        return ev.eventType?.name === inplayFilterSport;
      });

      return (
        <DSportsMarket
          sportId={activeItem.id}
          title={activeItem.name}
          buttons={[
            "All",
            "Football",
            "Tennis",
            "Cricket",
            "Australian Rules",
            "E-Sports",
            "Rugby Union",
            "Snooker",
            "Darts",
          ]}
          events={displayedEvents.sort(
            (a: any, b: any) => b.totalMatched - a.totalMatched
          )}
          onFilterChange={setInplayFilterSport}
          customRender={(events, filter) => (
            <DInplay events={events} filter={filter} />
          )}
        />
      );
    }

    if (activeItem?.id == "7") {
      return (
        <>
          {/* <DPromoCards /> */}
          <DHorseRacing currentSportId={activeItem.id} />
        </>
      );
    }

    if (activeItem?.id == "4339") {
      return (
        <>
          {/* <DPromoCards /> */}
          <DHorseRacing currentSportId={activeItem.id} />
        </>
      );
    }

    return (
      <DSportsMarket
        sportId={activeItem.id}
        title={activeItem.name}
        buttons={["All", "In-Play", "Today", "Tommorrow", "Future"]}
        events={filteredEvents}
        onFilterChange={setSelectedFilter}
      />
    );
  };

  //  scroll to top
  useLayoutEffect(() => {
    if (!sideBarTabs) return;
    setTimeout(() => {
      if (topAnchorRef.current) {
        topAnchorRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  }, [sideBarTabs]);

  return (
    <div>
      {isMobile ? (
        <div className="flex flex-col pb-[32px]">
          <MSportsList />
          <div className="flex flex-col">
            <MBanner />
            <div className="py-[4px]">
              <MPopularBets />
            </div>
            <div className="pb-[4px]">
              <MHorseRacing />
            </div>
            <MQuickLink />
          </div>
        </div>
      ) : isTab ? (
        <div className="flex w-full gap-[10px] max-w-full pb-8">
          <div className="flex flex-col flex-1 min-w-0">
            <MSportsList />
            <div className="flex flex-col">
              <MBanner />
              <div className="py-1">
                <MPopularBets />
              </div>
              <div className="pb-1">
                <MHorseRacing />
              </div>
              <MQuickLink />
            </div>
          </div>
          <div className="w-64 shrink-0">
            <TRightSidebar />
          </div>
        </div>
      ) : (
        <div className="pb-8">
          <DSportNav onSelect={setSideBarTabs} />
          <div ref={scrollRef} className="flex flex-col gap-6 px-[3vw]">
            <div
              ref={topAnchorRef}
              className="w-full flex justify-end scroll-mt-8"></div>
            <div className="max-[767px]:hidden flex flex-row w-full gap-2.5 overflow-x-hidden">
              <div className="flex-1">{renderContent()}</div>

              <div className="w-[212px] min-[1149px]:w-[270px]">
                <DQuickLinks active={sideBarTabs} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
