"use client";

import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { CONFIG } from "@workspace/ui/config/config";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn, shortNumber } from "@workspace/ui/lib/utils";
import MPickMeeting from "@exchange_s/modals/m-pick-meeting";
import { useParams } from "next/navigation";
import { useAppStore } from "@workspace/ui/store/store";
import MarketTabs from "./market-tabs";

import MBetSlip from "../m-betslip";
import MCashOut from "@exchange_s/modals/m-cash-out";
// Format a countdown for the header
const formatCountdown = (target?: string | Date) => {
  if (!target) return "";
  const now = Date.now();
  const t = new Date(target).getTime();
  const diff = Math.max(0, t - now);
  const sec = Math.floor(diff / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
};

type Market = any;
type Runner = any;

export default function RacingEventDetail({
  eventId,
  sportId,
}: {
  eventId: string;
  sportId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [allMarkets, setAllMarkets] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<any>();
  const params = useParams();
  const [meetingData, setMeetingData] = useState<any>();
  const [timeData, setTimeData] = useState<any>();
  const allRacingEvents = useAppStore((state) => state.allRacingEvents);
  const betPrice = useAppStore((state) => state.setBetPrice);
  const [isBetsSlipOpened, setIsBetsSlipOpened] = useState<any>(null);
  const [marketId, setIsMarketId] = useState<any>(null);
  const [oddsValue, setOddsValue] = useState<any>(null);
  const [type, setType] = useState<any>(null); // "back" | "lay"
  const [marketName, setMarketName] = useState<any>(null);

  function openBetslip({
    marketId,
    selectionId,
    betType,
    price,
    min,
    max,
    marketType,
    eventName,
    size,
    index,
    oddsType,
    marketName,
  }: {
    marketId: any;
    selectionId: any;
    betType: any;
    price: any;
    min?: any;
    max?: any;
    marketType?: any;
    eventName?: any;
    size?: any;
    index?: any;
    oddsType?: any;
    marketName?: any;
  }) {
    if (!price || price === 0) {
      return;
    }

    setOddsValue(price);
    setType(betType);
    setMarketName(marketName);
    setIsBetsSlipOpened(selectionId);
    setIsMarketId(marketId);

    // keep global price in store so MBetSlip picks it up if needed
    betPrice(price);
  }

  // ADDED previously: auto-center scroll to betslip
  useEffect(() => {
    const betslipElement = document.getElementById(
      `betslip-${isBetsSlipOpened}-${marketId}-${marketName}`
    );
    if (betslipElement) {
      requestAnimationFrame(() => {
        const elementPosition =
          betslipElement.getBoundingClientRect().top + window.scrollY;
        const offset =
          window.innerHeight / 2 - betslipElement.offsetHeight / 2;
        let position = elementPosition - offset;
        if (position < 0) position = 0;
        window.scrollTo({ top: position, behavior: "smooth" });
      });
    }
  }, [isBetsSlipOpened, marketId, marketName]);

  const handleCloseBetSlip = () => {
    setIsBetsSlipOpened(null);
  };

  const currentDate = new Date();

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const groupByVenue = (eventsData: any[]) => {
    const byVenue = new Map<string, { eventName: string; slots: any[] }>();

    for (const e of eventsData) {
      const eventName = e?.event?.name || e?.eventName;
      const slot = {
        eventId: e?.event?.id || e?.eventId,
        marketStartTime: e?.marketStartTime || e?.eventTime,
        inPlay: e?.inPlay,
      };

      if (!byVenue.has(eventName)) {
        byVenue.set(eventName, { eventName, slots: [slot] });
      } else {
        byVenue.get(eventName)!.slots.push(slot);
      }
    }

    return Array.from(byVenue.values()).map((g) => ({
      ...g,
      slots: g.slots.sort(
        (a, b) =>
          new Date(a.marketStartTime).getTime() -
          new Date(b.marketStartTime).getTime()
      ),
    }));
  };
  useEffect(() => {
    const rawParents = allRacingEvents?.events ?? [];
    const parentsForSport = rawParents.filter(
      (p: any) => p?.eventType?.id === params.sportId
    );

    const groupedByCompetition: Record<
      string,
      { competition: any; sportId: string; eventsData: any[] }
    > = {};

    parentsForSport.forEach((parent: any) => {
      const competitionId = parent?.competition?.id;
      if (!competitionId) return;

      const items = parent?.eventData ?? [];
      const todays = items.filter((it: any) =>
        isSameDay(new Date(it?.marketStartTime), currentDate)
      );
      if (todays.length === 0) return;

      if (!groupedByCompetition[competitionId]) {
        groupedByCompetition[competitionId] = {
          competition: parent.competition,
          sportId: `${params.sportId}`,
          eventsData: [],
        };
      }

      todays.forEach((it: any) => {
        groupedByCompetition[competitionId].eventsData.push({
          eventId: it?.event?.id,
          eventName: parent?.event?.name, // venue/meeting name
          eventTime: it?.marketStartTime,
          marketStartTime: it?.marketStartTime,
          inPlay: it?.inPlay,
          event: it?.event,
        });
      });
    });

    const eventTournaments = Object.values(groupedByCompetition).map(
      (comp: any) => ({
        ...comp,
        groupedEvents: groupByVenue(comp?.eventsData), // [{ eventName, slots: [...] }]
      })
    );
    setMeetingData(eventTournaments);

    const flatEvents = allRacingEvents?.events
      ?.filter((parent: any) => parent?.eventType?.id === params.sportId)
      ?.flatMap((parent: any) =>
        (parent?.eventData ?? []).map((item: any) => ({
          ...item,
          eventName: parent?.event?.name, // venue
          eventId: item?.event?.id,
          competitionName: parent?.competition?.name,
          tournamentName: parent?.competition?.name,
          eventTime: item?.marketStartTime,
        }))
      );
    let eventsListTodayCard = flatEvents?.filter((event: any) => {
      const eventTime = new Date(event?.eventTime);
      const now = new Date();

      // ✅ same day + time greater than now
      return (
        eventTime.getFullYear() === now.getFullYear() &&
        eventTime.getMonth() === now.getMonth() &&
        eventTime.getDate() === now.getDate() &&
        eventTime.getTime() >= now.getTime()
      );
    });

    // sort by eventTime ascending
    eventsListTodayCard?.sort(
      (a: any, b: any) =>
        new Date(a?.eventTime).getTime() - new Date(b?.eventTime).getTime()
    );
    setTimeData(eventsListTodayCard);
  }, [allMarkets]);

  // Fetch markets
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const req = { eventId, sportId, key: CONFIG.siteKey2 };
    runtimeApiService
      .marketList(req)
      .then((record: any) => {
        if (!mounted) return;
        const matchOdds = record?.data?.matchOddsData ?? [];
        const bookmakers = record?.data?.bookmakersData ?? [];
        const merged = [...matchOdds, ...bookmakers].sort(
          (a: any, b: any) => (a.sequence ?? 9999) - (b.sequence ?? 9999)
        );
        setAllMarkets(merged);
        // Default tab: Popular if exists, else All
        const hasPopular = merged.some((m: any) => m?.popular);
        setSelectedMarket(hasPopular ? "Popular" : "All");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [eventId, sportId]);

  // Header data
  const firstMarket = allMarkets?.[0];
  const marketStatus =
    firstMarket?.oddsData?.status ?? firstMarket?.status ?? "ONLINE";
  const eventTime =
    firstMarket?.eventTime ||
    firstMarket?.marketStartTime ||
    allMarkets
      .map((m: any) => m?.marketStartTime || m?.eventTime)
      .filter(Boolean)
      .sort((a: any, b: any) => +new Date(a) - +new Date(b))?.[0];

  const hasStarted = eventTime
    ? new Date(eventTime).getTime() <= Date.now()
    : false;

  // Tabs list
  const tabList = useMemo(
    () => [
      ...allMarkets?.map((m: any) => ({
        id: m?.marketId,
        label: m?.marketName,
        time: moment(m?.marketStartTime).format("H:mm"),
      })),
    ],
    [allMarkets]
  );

  // Keep selected pill centered when it changes
  const tabsContainerId = "market-tabs-scroll";
  useEffect(() => {
    const el = document.getElementById(`market-tab-${selectedMarket}`);
    const container = document.getElementById(tabsContainerId);
    if (el && container) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedMarket]);

  // Active markets list
  const marketsFiltered = useMemo(() => {
    if (selectedMarket === "All") return allMarkets;
    if (selectedMarket === "Popular")
      return allMarkets.filter((m: any) => m?.popular);
    return allMarkets.filter((m: any) => m?.marketId === selectedMarket);
  }, [selectedMarket, allMarkets]);

  // Helpers per market
  const getMarketName = (m: any) => m?.marketName ?? m?.name ?? "";
  const getMatched = (m: any) =>
    m?.oddsData?.totalMatched ?? m?.totalMatched ?? 0;
  const getMin = (m: any) => m?.min ?? m?.minValue ?? "-";
  const getMax = (m: any) => m?.max ?? m?.maxValue ?? "-";

  // Normalize runners
  const getRunners = (m: any): Runner[] => {
    if (Array.isArray(m?.oddsData?.runners)) return m.oddsData.runners; // angular-like
    if (Array.isArray(m?.runners)) return m.runners; // marketList-like
    return [];
  };
  const getRunnerName = (m: any, idx: number, r: any) =>
    m?.runnersName?.[idx]?.runnerName ??
    m?.runnersName?.[idx]?.name ??
    r?.runnerName ??
    r?.name ??
    "";
  const getRunnerMeta = (m: any, idx: number) =>
    m?.runnersName?.[idx]?.metadata ?? {};
  const getRacingInfoFor = (m: any, selectionId: string | number) =>
    m?.racingInfo?.[selectionId] ?? null;

  // Top-of-book only (1 Back + 1 Lay)
  const getBestBack = (r: any) =>
    r?.price?.back?.[0] ?? r?.ex?.availableToBack?.[0] ?? null;
  const getBestLay = (r: any) =>
    r?.price?.lay?.[0] ?? r?.ex?.availableToLay?.[0] ?? null;
  const tagBase =
    "inline-flex items-center rounded-md bg-[#cfe0e3] text-[#0b1c25] text-[11px] font-semibold px-2 py-[2px]";

  const cellBase =
    "w-[86px] h-[44px] rounded-[3px] overflow-hidden text-[#303030] flex flex-col items-center justify-center";
  const backCell = "bg-[#A6D8FF]";
  const layCell = "bg-[#fac9d1]";

  return (
    <div className="min-h-screen bg-[#001824] text-white">
      {/* UPDATED: Header with Skeleton while loading, event name otherwise */}
      <div className="flex border-b border-[#304553] p-2">
        <button className="bg-[#2F4553] px-[10px] rounded-[2px] text-[#303030] font-bold text-[12px] font-sans min-w-0 w-full h-[26px] touch-manipulation appearance-button normal-case overflow-visible m-0 border-0">
          <span className="flex justify-between items-center">
            <MPickMeeting meetingData={meetingData} timeData={timeData}>
              <div className="flex justify-between w-full items-center">
                {loading ? (
                  <Skeleton
                    className="h-3 w-[120px]"
                    style={{ background: "#213843" }}
                  />
                ) : (
                  <span className="truncate text-white">
                    {firstMarket?.event?.name}
                  </span>
                )}
                <span className="ml-[5px] bg-no-repeat w-[10px] h-[10px] bg-[url('@workspace/ui/assets/sprite/hamburger.png')] bg-[-95px_-36px] invert brightness-0"></span>
              </div>
            </MPickMeeting>
          </span>
        </button>
      </div>

      {/* MarketTabs */}
      <MarketTabs
        selectedMarket={selectedMarket}
        setSelectedMarket={setSelectedMarket}
        tabList={tabList}
        loading={loading}
      />

      {/* Grey bar with Skeleton when loading; else Inplay/Going In-Play + icon + Back/Lay labels */}
      <div className="flex items-center justify-between px-3 h-[34px] bg-[#e0eaed1a]">
        {loading ? (
          <>
            <Skeleton
              className="h-4 w-16 rounded-sm"
              style={{ background: "#213843" }}
            />
            <div className="flex gap-2">
              <Skeleton
                className="h-4 w-[86px]"
                style={{ background: "#213843" }}
              />
              <Skeleton
                className="h-4 w-[86px]"
                style={{ background: "#213843" }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              {firstMarket?.inplay ? (
                <div className="stackfair-c6mfy flex items-center">
                  <div
                    className={cn(
                      "h-[12px] w-[12px] mr-1 bg-[url('@workspace/ui/assets/sprite/icons.svg')] bg-[length:708px_672px] bg-no-repeat",
                      "bg-[-686px_-102px]" // inplay icon
                    )}
                  />
                  <span className="font-bold text-xs text-green-600 rounded-xs">
                    Inplay
                  </span>
                </div>
              ) : (
                <div className="stackfair-c6mfy flex items-center">
                  <div
                    className={cn(
                      "h-[12px] w-[12px] mr-1 bg-[url('@workspace/ui/assets/sprite/icons.svg')] bg-[length:708px_672px] bg-no-repeat",
                      "bg-[-686px_-134px]" // going in-play icon
                    )}
                  />
                  <span className="font-bold text-xs rounded-xs">
                    Going In-Play
                  </span>
                </div>
              )}
              {/* cashout/info sprite */}
              {/* <div className="ml-1 w-[16px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-35px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div> */}
              <MCashOut>
                <div className="ml-1 w-[16px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-35px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
              </MCashOut>
            </div>
            <div className="text-[12px] font-bold">
              <span className="inline-block w-[86px] text-center">Back</span>
              <span className="inline-block w-[86px] text-center ml-2">
                Lay
              </span>
            </div>
          </>
        )}
      </div>

      {/* Markets and runners */}
      {loading ? (
        <div className="p-3">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-40" style={{ background: "#213843" }} />
            <Skeleton
              className="ml-1 w-20 h-4"
              style={{ background: "#213843" }}
            />
          </div>
          <div className="mt-2 space-y-2">
            <Skeleton
              className="h-10 w-full"
              style={{ background: "#213843" }}
            />
            <Skeleton
              className="h-10 w-full"
              style={{ background: "#213843" }}
            />
            <Skeleton
              className="h-10 w-full"
              style={{ background: "#213843" }}
            />
          </div>
        </div>
      ) : marketsFiltered.length === 0 ? (
        <div className="p-3 text-[12px]">No active markets</div>
      ) : (
        marketsFiltered?.map((m: any, idx: number) => (
          <div key={idx} className="mb-3">
            {/* Market title row */}
            <div className="px-3 py-[8px] bg-[#001f2a] border-y border-[#213743] flex items-center justify-between">
              <div className="text-[13px] font-bold">
                {getMarketName(m)}
                <span className="ml-2 text-[12px] text-[#c2d2d7]">
                  {/* show per-market Min/Max */}
                  {getMin(m)}-{getMax(m)}
                </span>
              </div>
              <div className="text-[11px]">
                Matched <strong>€ {shortNumber(getMatched(m))}</strong>
              </div>
            </div>

            {/* Runner rows */}
            {(getRunners(m) ?? []).map((r: any, idx: number) => {
              const bestBack = getBestBack(r);
              const bestLay = getBestLay(r);
              const meta = getRunnerMeta(m, idx);
              const cloth = meta?.CLOTH_NUMBER;
              const draw = meta?.STALL_DRAW;
              const racingInfo = getRacingInfoFor(m, r?.selectionId);

              return (
                // Keep row + inline betslip together
                <React.Fragment key={r?.selectionId ?? idx}>
                  <div className="flex min-h-[50px] border-b border-[#213743] justify-between bg-transparent p-[2px_10px]">
                    {/* left side */}
                    <div className="flex justify-center flex-col w-full">
                      <div className="flex items-center gap-2">
                        <div className="text-sm flex flex-col justify-center items-center min-w-[22px]">
                          {cloth && (
                            <span className="leading-none font-bold">
                              {cloth}
                            </span>
                          )}
                          {draw && (
                            <span className="text-[#7f7f7f]">({draw})</span>
                          )}
                        </div>

                        {racingInfo?.COLOURS_FILENAME && (
                          <img
                            className="w-[22px] h-[22px] object-contain"
                            src={
                              racingInfo.COLOURS_FILENAME.startsWith("http")
                                ? racingInfo.COLOURS_FILENAME
                                : `https://content-cache.cdnbf.net/feeds_images/Horses/SilkColours/${racingInfo.COLOURS_FILENAME}`
                            }
                            alt=""
                          />
                        )}

                        <div className="flex-1">
                          <div className="text-white text-[12px] truncate font-bold leading-[16px]">
                            {getRunnerName(m, idx, r)}
                          </div>
                        </div>
                      </div>

                      {(racingInfo?.JOCKEY_NAME ||
                        racingInfo?.TRAINER_NAME ||
                        racingInfo?.AGE ||
                        racingInfo?.WEIGHT_VALUE) && (
                        <div className="mt-[6px] flex flex-wrap gap-2">
                          {racingInfo?.JOCKEY_NAME && (
                            <span className={tagBase}>
                              <span className="font-extrabold mr-1">
                                Jockey :
                              </span>
                              {racingInfo.JOCKEY_NAME}
                            </span>
                          )}
                          {racingInfo?.TRAINER_NAME && (
                            <span className={tagBase}>
                              <span className="font-extrabold mr-1">
                                Trainer :
                              </span>
                              {racingInfo.TRAINER_NAME}
                            </span>
                          )}
                          {racingInfo?.AGE && (
                            <span className={tagBase}>
                              <span className="font-extrabold mr-1">Age :</span>
                              {racingInfo.AGE}
                            </span>
                          )}
                          {racingInfo?.WEIGHT_VALUE && (
                            <span className={tagBase}>
                              <span className="font-extrabold mr-1">
                                Weight :
                              </span>
                              {racingInfo.WEIGHT_VALUE}{" "}
                              {racingInfo.WEIGHT_UNITS}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* right side: one Back + one Lay */}
                    <div className="flex items-center gap-[5px] relative">
                      {m?.status === "SUSPENDED" && (
                        <div className="absolute inset-0 bg-[hsla(0,0%,100%,.65)] flex items-center justify-center z-10 w-[177px] border-2 border-[#b30000]">
                          <span className="text-sm leading-[39px] text-[#b30000] text-center font-bold px-3 py-1 rounded">
                            Suspended
                          </span>
                        </div>
                      )}
                      {/* Back button opens betslip */}
                      <button
                        className={cn(cellBase, backCell)}
                        disabled={!bestBack}
                        onClick={() =>
                          openBetslip({
                            marketId: m?.marketId,
                            selectionId: r?.selectionId,
                            betType: "back",
                            price: bestBack?.price,
                            min: m?.min ?? m?.minValue,
                            max: m?.max ?? m?.maxValue,
                            marketType: m?.description?.bettingType,
                            eventName: getRunnerName(m, idx, r),
                            size: bestBack?.size,
                            index: 0,
                            marketName: getMarketName(m),
                          })
                        }
                      >
                        <div className="leading-[16.5px] font-bold text-[15px]">
                          {bestBack?.price ?? "-"}
                        </div>
                        <div className="leading-[11.5px] text-[10px]">
                          {bestBack?.size ?? "-"}
                        </div>
                      </button>
                      {/* Lay button opens betslip */}
                      <button
                        className={cn(cellBase, layCell)}
                        disabled={!bestLay}
                        onClick={() =>
                          openBetslip({
                            marketId: m?.marketId,
                            selectionId: r?.selectionId,
                            betType: "lay",
                            price: bestLay?.price,
                            min: m?.min ?? m?.minValue,
                            max: m?.max ?? m?.maxValue,
                            marketType: m?.description?.bettingType,
                            eventName: getRunnerName(m, idx, r),
                            size: bestLay?.size,
                            index: 0,
                            marketName: getMarketName(m),
                          })
                        }
                      >
                        <div className="leading-[16.5px] font-bold text-[15px]">
                          {bestLay?.price ?? "-"}
                        </div>
                        <div className="leading-[11.5px] text-[10px]">
                          {bestLay?.size ?? "-"}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Inline betslip under this runner row (same id scheme for smooth scroll) */}
                  <div
                    id={`betslip-${r?.selectionId}-${marketId}-${getMarketName(
                      m
                    )}`}
                  >
                    {isBetsSlipOpened == r?.selectionId &&
                      marketId == m?.marketId &&
                      (m?.status === "OPEN" || m?.status === "ONLINE") && (
                        <MBetSlip
                          runner={getRunnerName(m, idx, r)}
                          type={type}
                          odd={oddsValue}
                          onClose={handleCloseBetSlip}
                        />
                      )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
