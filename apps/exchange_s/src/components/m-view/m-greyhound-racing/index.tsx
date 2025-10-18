"use client";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { CONFIG } from "@workspace/ui/config/config";
import Icon from "@workspace/ui/icons/icons";
import { cn, getTimeDifference, shortNumber } from "@workspace/ui/lib/utils";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { useAppStore } from "@workspace/ui/store/store";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import MBetSlip from "../m-betslip";

export default function MGreyhoundRacing({ sportName }: { sportName: string }) {
  const allRacingEvents = useAppStore((state) => state.allRacingEvents);
  const [racingEventList, setRacingEventList] = useState<any>();
  const [marketData, setMarketData] = useState<any>();
  const [eventsTournment, setEventsTournment] = useState<any>();
  const [eventListCardToday, setEventListCardToday] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [activeNextRaceTab, setNextRaceTab] = useState<string>("0");
  const [activeTab, setActiveTab] = useState("Next Races");
  const [activeTabDays, setActiveTabDays] = useState(1);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [country, setCountry] = useState<any>();
  const [dayNames, setDayNames] = useState<any>();
  const [dropdown, setDropdown] = useState(false)
  const router = useRouter();

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
        const offset = window.innerHeight / 2 - betslipElement.offsetHeight / 2;
        let position = elementPosition - offset;
        if (position < 0) position = 0;
        window.scrollTo({ top: position, behavior: "smooth" });
      });
    }
  }, [isBetsSlipOpened, marketId, marketName]);

  const handleCloseBetSlip = () => {
    setIsBetsSlipOpened(null);
  };

  useEffect(() => {
    if (!allRacingEvents) {
      setLoading(true);
    }
    if (allRacingEvents?.events) {
      setLoading(false);

      const currentTime = new Date();
      calculateDayNames();
      onChangeMeetingTab(currentTime, 1);

      // Flatten and normalize event data from parent.eventData
      const flatEvents = allRacingEvents?.events
        .filter(
          (parent: any) =>
            parent?.eventType?.id ===
            (sportName === "horse-racing" ? "7" : "4339")
        )
        .flatMap((parent: any) =>
          (parent?.eventData ?? []).map((item: any) => ({
            ...item,
            eventName: parent?.event?.name, // venue
            eventId: item?.event?.id,
            competitionName: parent?.competition?.name,
            tournamentName: parent?.competition?.name,
            eventTime: item?.marketStartTime,
          }))
        );

      // Filter upcoming or inPlay events
      const filteredEvents = flatEvents?.filter((event: any) => {
        const eventTime = new Date(event?.eventTime);
        return event?.inPlay || eventTime > currentTime;
      });

      // Sort by closest event time
      const sortedEvents = filteredEvents?.sort(
        (a: any, b: any) =>
          new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime()
      );

      // Pick top 10 with unique eventId
      const uniqueEventMap = new Map<string, any>();
      for (const event of sortedEvents) {
        if (!uniqueEventMap.has(event?.eventId)) {
          uniqueEventMap.set(event?.eventId, event);
        }
        if (uniqueEventMap.size >= 10) break;
      }
      const nextRaces = Array.from(uniqueEventMap.values());
      setRacingEventList(nextRaces);

      // Default selection & market call
      const firstEventId = nextRaces[0]?.eventId;
      if (firstEventId) {
        setNextRaceTab(firstEventId);
        getMarketList(firstEventId);
      }

      // Today’s card (same day as now)
      let eventsListTodayCard = flatEvents.filter((event: any) => {
        const eventTime = new Date(event.eventTime);
        return eventTime.getDate() === currentTime.getDate();
      });
      eventsListTodayCard.sort(
        (a: any, b: any) =>
          new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime()
      );
      setEventListCardToday(eventsListTodayCard);
    }
  }, [allRacingEvents]);

  const nextRaceTabHandler = (tabId: string) => {
    setNextRaceTab(tabId);
    getMarketList(tabId);
  };

  const getMarketList = (event_id: any) => {
    setLoading(true);
    const req = {
      eventId: event_id,
      sportId: sportName === "horse-racing" ? "7" : "4339",
      key: CONFIG.siteKey2,
    };
    runtimeApiService.marketList(req).then((record) => {
      if (record) {
        const md = record?.data?.matchOddsData?.filter(
          (event: any) => event?.marketType === "WIN"
        );
        setMarketData(md);
      }
      setLoading(false);
    });
  };

  const calculateDayNames = (): void => {
    const dn = [];
    for (let i = 2; i <= 3; i++) {
      const offsetDate = getDateOffset(i);
      dn.push(getDayName(offsetDate.getDay()));
    }
    setDayNames(dn);
  };

  const getDateOffset = (offset: number): Date => {
    const currentDate = new Date();
    const date = new Date(currentDate);
    date.setDate(date.getDate() + offset);
    return date;
  };

  const getDayName = (dayIndex: number): string => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[dayIndex];
  };

  // Local date compare helper
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  // Group events by venue name and build ordered time slots
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

  // Meetings tab builder (uses parent.eventData items for the selected day)
  const onChangeMeetingTab = (tab: Date, activeTabNum: number): void => {
    setActiveTabDays(activeTabNum);

    const sportIdWanted = sportName?.includes("horse") ? "7" : "4339";

    // Country list (tournaments)
    const rawTournaments = allRacingEvents?.tournaments ?? [];
    const tournaments = rawTournaments?.filter(
      (e: any) =>
        e?.eventType?.name?.toLowerCase() === sportName?.replace("-", " ")
    );
    const filteredTournaments = tournaments?.filter(
      (ele: any) => ele?.competition?.id != null
    );
    setCountry(filteredTournaments);

    // Build meetings by reading parent.eventData rows
    const rawParents = allRacingEvents?.events ?? [];
    const parentsForSport = rawParents.filter(
      (p: any) => p?.eventType?.id === sportIdWanted
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
        isSameDay(new Date(it?.marketStartTime), tab)
      );
      if (todays.length === 0) return;

      if (!groupedByCompetition[competitionId]) {
        groupedByCompetition[competitionId] = {
          competition: parent.competition,
          sportId: sportIdWanted,
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
        groupedEvents: groupByVenue(comp.eventsData), // [{ eventName, slots: [...] }]
      })
    );

    setEventsTournment(eventTournaments);
  };

  const [tabs, setTabs] = useState([
    "Next Races",
    "Meetings",
    "Today's Card",
    "Specials",
  ]);

  const icons = [
    { name: "horse-racing", sprite: "bg-[-862px_-22px]" },
    { name: "greyhound-racing", sprite: "bg-[-622px_-22px]" },
  ];

  const latestResults = [
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
    " 15:05 Fairview (South Africa) (RSA)",
  ];

  const racecourses = [
    "Mahoning Valley Racecourse",
    "Gulfstream Park",
    "Fair Grounds",
    "Sunland Park",
    "Aqueduct",
    "Turfway Park",
    "Penn National",
    "Delta Downs",
    "Charles Town Races & Slots",
  ];

  const setTabsValue = (tabName: string) => {
    setActiveTab(tabName);
    setTabs((prevTabs) => {
      if (prevTabs.length >= 5) {
        return prevTabs.slice(0, -1);
      }
      return prevTabs;
    });
  };

  const toggleCountryAccordion = (countryName: string) => {
    setExpandedCountry(expandedCountry === countryName ? null : countryName);
  };

  return (
    <>
      <header>
        <div className="flex items-center h-[32px] px-3 bg-[#071824]">
          <div
            className={cn(
              "h-[21px] w-[21px] mr-1 bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat ",
              icons.find((icon) => icon.name === sportName)?.sprite ||
              "bg-[-862px_-22px]"
            )}
          />
          <div className="ml-1 font-bold text-white text-[14px] scale-[1.07]  relative left-[15px] overflow-hidden text-ellipsis whitespace-nowrap capitalize w-full">
            {sportName?.replace("-", " ")}
          </div>
        </div>
      </header>

      {/* tabs */}
      <div className="mt-[5px]">
        <div className="overflow-x-auto">
          <ul className="flex">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`flex-1 ${activeTab === tab
                  ? "bg-[#304553] border-t-2 border-[#fff]"
                  : "bg-[#0E212E] border-t-2 border-[#0E212E] pt-[1px]"
                  }`}
              >
                <button
                  onClick={() => setTabsValue(tab)}
                  className="w-full p-[9px_10px]"
                >
                  <div
                    className={`leading-[14px] text-[12px] text-nowrap relative ${activeTab === tab
                      ? "text-[#FFFFFF] top-[1px]"
                      : "text-[#FFFFFF] top-0"
                      }`}
                  >
                    {tab}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* next races */}
      {activeTab === "Next Races" && (
        <>
          <div className="w-full h-full overflow-x-scroll scrollbar-hidden">
            <div className="flex ">
              {racingEventList?.map((raceEvent: any, idx: number) => (
                <div
                  key={idx}
                  className={`border-b-2 ${activeNextRaceTab === raceEvent?.eventId
                    ? "border-white"
                    : "border-transparent"
                    }`}
                >
                  <button
                    onClick={() => nextRaceTabHandler(raceEvent?.eventId)}
                  >
                    <div className="px-3 pt-[6px] pb-1">
                      <div className="font-bold text-[12px]">
                        {moment(raceEvent?.eventTime).format("HH:mm")}
                      </div>
                      <div className="font-bold whitespace-nowrap text-[12px]">
                        {raceEvent?.eventName?.slice(0, 5)}
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            {loading ? (
              <div className="flex justify-between items-center pl-[10px] min-h-[56px]">
                <div className="flex flex-col gap-2">
                  <Skeleton
                    className="w-[200] h-4"
                    style={{ background: "#213843" }}
                  />
                  <Skeleton
                    className="w-[120] h-3"
                    style={{ background: "#213843" }}
                  />
                </div>
                <div className="flex gap-2.5 items-center">
                  <Skeleton
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#213843" }}
                  />
                  <Skeleton
                    className="w-14 h-4"
                    style={{ background: "#213843" }}
                  />
                  <Skeleton
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#213843" }}
                  />
                </div>
              </div>
            ) : (
              marketData?.length > 0 && (
                <div className="flex justify-between items-center text-[11px] relative w-full pl-[10px] min-h-[56px]">
                  <Link
                    prefetch={true}
                    href={`/exchange/horse-racing-details/${marketData[0]?.event?.id}/${sportName === "horse-racing" ? "7" : "4339"}`}
                    className="min-w-0 flex flex-col"
                  >
                    <span className="font-bold text-[13px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {moment(marketData[0]?.marketStartTime).format("h:mm")}{" "}
                      {marketData[0]?.event?.name}
                    </span>
                    <span className="text-[12px] text-[#7f7f7f]">
                      {marketData[0]?.marketName},{" "}
                      {marketData[0]?.runners?.length} Runners
                    </span>
                  </Link>
                  <div className="absolute h-full top-0 right-[10px] text-right">
                    <div className="flex items-center h-full">
                      <div className="flex flex-col justify-center gap-1 pl-[10px]">
                        <div className="stackfair-c6mfy flex items-center">
                          <div
                            className={cn(
                              "h-[12px] w-[12px] mr-1 bg-[url('@workspace/ui/assets/sprite/icons.svg')] bg-[length:708px_672px] bg-no-repeat ",
                              "bg-[-686px_-188px]"
                            )}
                          />
                          <span className="font-bold text--[10px] text-[#ef853f]">
                            Live Video
                          </span>
                        </div>
                        {marketData[0]?.inplay && (
                          <div className="stackfair-c6mfy flex items-center">
                            <div
                              className={cn(
                                "h-[12px] w-[12px] mr-1 bg-[url('@workspace/ui/assets/sprite/icons.svg')] bg-[length:708px_672px] bg-no-repeat ",
                                "bg-[-686px_-102px]"
                              )}
                            />
                            <span className="font-bold text--[10px] text-white bg-green-700 px-2 rounded-xs">
                              Inplay
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="pl-[10px] h-[56px] w-[6px] relative">
                        <div
                          className={cn(
                            "h-[10px] w-[6px] mr-1 bg-[url('@workspace/ui/assets/sprite/icons.svg')] bg-[length:708px_672px] bg-no-repeat ",
                            "bg-[-686px_-496px] absolute top-[23.5px]"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            <div className="flex justify-end pt-[10px] pb-[5px] items-center h-[27px] bg-[#304553]">
              <h3 className="pl-[10px] flex-1 font-bold text-[11px] flex">
                <span>Matched</span>:
                {loading ? (
                  <Skeleton
                    className="ml-1 w-10 h-4 rounded-full"
                    style={{ background: "#213843" }}
                  />
                ) : (
                  marketData?.length > 0 &&
                  shortNumber(marketData[0]?.totalMatched)
                )}
              </h3>
              <h3 className="pr-[10px] float-right font-bold text-[11px]">
                <span className="w-[53px] inline-block text-center">
                  {" "}
                  Back{" "}
                </span>
                <span className="w-[53px] inline-block text-center"> Lay </span>
              </h3>
            </div>

            {loading
              ? [...Array(3)]?.map((_, idx) => (
                <div className="flex justify-between p-2" key={idx}>
                  <div className="flex gap-2 items-center">
                    <Skeleton
                      className="w-5 h-5 rounded-full"
                      style={{ background: "#213843" }}
                    />
                    <Skeleton
                      className="w-[120] h-3"
                      style={{ background: "#213843" }}
                    />
                  </div>
                  <div className="flex gap-[5] items-center">
                    <Skeleton
                      className="w-[53] h-10"
                      style={{ background: "#213843" }}
                    />
                    <Skeleton
                      className="w-[53] h-10"
                      style={{ background: "#213843" }}
                    />
                  </div>
                </div>
              ))
              : marketData?.length &&
              marketData[0]?.runnersName?.map((item: any, idx: number) => {
                return (
                  <Fragment key={idx}>
                    <div className="flex min-h-[50px] border-b border-[#213743] justify-between bg-transparent p-[2px_10px]">
                      <Link
                        prefetch={true}
                        href={`/exchange/horse-racing-details/${marketData[0]?.event?.id}/${sportName === "horse-racing" ? "7" : "4339"}`}
                        className="flex items-center mr-[3px] gap-2 w-full"
                      >
                        <div className="text-sm flex flex-col justify-center items-center">
                          <span className="leading-none">
                            {item?.metadata?.CLOTH_NUMBER}
                          </span>
                          {item?.metadata?.STALL_DRAW && (
                            <span className="text-[#7f7f7f]">
                              ({item?.metadata?.STALL_DRAW})
                            </span>
                          )}
                        </div>
                        <div className="text-white text-[12px] truncate font-bold leading-[16px]">
                          {item?.runnerName}
                        </div>
                      </Link>
                      <div className="w-full flex gap-[5px] items-center justify-end max-w-fit">
                        <div>
                          <button
                            className="bg-[#A6D8FF] w-[53px] text-[#303030] rounded-[2px] h-[40px] overflow-hidden"
                            onClick={() =>
                              openBetslip({
                                marketId: marketData[0]?.marketId,
                                selectionId: item?.selectionId,
                                betType: "back",
                                price:
                                  marketData[0]?.runners?.[idx]?.ex
                                    ?.availableToBack?.[0]?.price,
                                min:
                                  marketData[0]?.min ??
                                  marketData[0]?.minValue,
                                max:
                                  marketData[0]?.max ??
                                  marketData[0]?.maxValue,
                                marketType:
                                  marketData[0]?.description?.bettingType,
                                eventName: item?.runnerName,
                                size: marketData[0]?.runners?.[idx]?.ex
                                  ?.availableToBack?.[0]?.size,
                                index: 0,
                                marketName: marketData[0]?.marketName,
                              })
                            }
                          >
                            <div className="leading-[16.5px] font-bold text-[15px]">
                              {marketData?.length > 0 &&
                                shortNumber(
                                  marketData[0]?.runners?.[idx]?.ex
                                    ?.availableToBack?.[0]?.price
                                )}
                            </div>
                            <div className="leading-[11.5px] text-[10px]">
                              {
                                marketData[0]?.runners?.[idx]?.ex
                                  ?.availableToBack?.[0]?.size
                              }
                            </div>
                          </button>
                        </div>
                        <div>
                          <button
                            className="bg-[#fac9d1] w-[53px] text-[#303030] rounded-[2px] h-[40px] overflow-hidden"
                            onClick={() =>
                              openBetslip({
                                marketId: marketData[0]?.marketId,
                                selectionId: item?.selectionId,
                                betType: "lay",
                                price:
                                  marketData[0]?.runners?.[idx]?.ex
                                    ?.availableToLay?.[0]?.price,
                                min:
                                  marketData[0]?.min ??
                                  marketData[0]?.minValue,
                                max:
                                  marketData[0]?.max ??
                                  marketData[0]?.maxValue,
                                marketType:
                                  marketData[0]?.description?.bettingType,
                                eventName: item?.runnerName,
                                size: marketData[0]?.runners?.[idx]?.ex
                                  ?.availableToLay?.[0]?.size,
                                index: 0,
                                marketName: marketData[0]?.marketName,
                              })
                            }
                          >
                            <div className="leading-[16.5px] font-bold text-[15px]">
                              {marketData?.length > 0 &&
                                shortNumber(
                                  marketData[0]?.runners?.[idx]?.ex
                                    ?.availableToLay?.[0]?.price
                                )}
                            </div>
                            <div className="leading-[11.5px] text-[10px]">
                              {
                                marketData[0]?.runners?.[idx]?.ex
                                  ?.availableToLay?.[0]?.size
                              }
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      id={`betslip-${item?.selectionId}-${marketId}-${marketData[0]?.marketName}`}
                    >
                      {isBetsSlipOpened == item?.selectionId &&
                        marketId == marketData[0]?.marketId &&
                        (marketData[0]?.status === "OPEN" ||
                          marketData[0]?.status === "ONLINE") && (
                          <MBetSlip
                            runner={item?.runnerName}
                            type={type}
                            odd={oddsValue}
                            onClose={handleCloseBetSlip}
                          />
                        )}
                    </div>
                  </Fragment>
                );
              })}
          </div>

          {/* Latest results */}
          <div>
            <ul>
              <div className="h-[32px] flex items-center px-3 bg-[#071824]">
                <span className="text-[14px] font-bold">Latest Results</span>
              </div>
              {latestResults.map((result, index) => (
                <li
                  key={index}
                  className={`pt-[1px] ${index === 0 ? "" : "border-t-2 border-[#2f4553]"}`}
                >
                  <div>
                    <a className="flex items-center px-[10px] w-full text-[11px] min-h-[38px] relative">
                      <div className="grow min-w-0 ">
                        <span className="stackfair-oogrl stackfair-f3hmf stackfair-3kls6">
                          {result}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "h-[16px] w-[16px] bg-[url('@workspace/ui/assets/sprite/icons.svg')] bg-[length:708px_672px] bg-no-repeat ",
                          "bg-[-398px_-646px] "
                        )}
                      />
                    </a>
                  </div>
                </li>
              ))}
             <div className={`focus:outline-none mb-[10px]`}>
            <a  className={`h-[38px] flex items-center  border-t pl-[10px] pr-[7px] border-[#1A2C38] 
      ${dropdown ? "bg-[#304553]" : "bg-[#213743]"}
    `} onClick={()=>{setDropdown(!dropdown)}}>
              <div className="flex flex-col flex-grow overflow-hidden">
                <span className="mb-0 font-bold text-white text-[12px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                  Horse Racing Betting Explained
                </span>
              </div>
              <div>
                <Icon name="rightSlide" className={`h-[14px] w-[14px]`} />
              </div>
            </a>
            {dropdown ?

              <p className="text-[13px] bg-[#001824] p-[10px]"> Betting on Soccer is simple on the StakeFair Exchange. You can bet for or against an outcome – e.g. if you're betting on Brisbane Roar v Macarthur FC, you can place a lay bet if you think Brisbane Roar will lose, or you can place a back bet if you think Brisbane Roar will win.</p> : ''
            }
          </div>
            </ul>
          </div>
        </>
      )}

      {/* meetings */}
      {activeTab === "Meetings" && (
        <>
          <div>
            <div className="overflow-x-auto">
              <ul className="flex">
                {[1, 2, 3, 4]?.map((tab) => {
                  const currentDate = new Date();
                  return (
                    <li
                      key={tab}
                      className={`flex-1 ${activeTabDays === tab ? " border-b-2 border-[#fff]" : " pt-[1px]"}`}
                    >
                      <button
                        onClick={() =>
                          onChangeMeetingTab(
                            tab === 1 ? currentDate : getDateOffset(tab - 1),
                            tab
                          )
                        }
                        className="w-full p-[9px_10px]"
                      >
                        <div
                          className={`leading-[14px] text-[12px] text-nowrap relative ${activeTabDays === tab
                            ? "text-[#FFFFFF] top-[1px]"
                            : "text-[#FFFFFF] top-0"
                            }`}
                        >
                          {tab === 1
                            ? "Today"
                            : tab === 2
                              ? "Tomorrow"
                              : tab === 3
                                ? dayNames?.[0]
                                : dayNames?.[1]}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {country?.map((item: any, index: number) => (
            <div key={index}>
              <div
                className={`mt-[5px] focus:outline-none ${index === country?.length - 1 ? "mb-[5px]" : "mb-[0px]"
                  }`}
              >
                <button
                  onClick={() => toggleCountryAccordion(item?.competition?.id)}
                  className="bg-[#213743] h-[32px] flex items-center pl-[12px] pr-[9px] w-full"
                >
                  <div className="mr-[4px] w-[16px] h-[16px]">
                    <Image
                      fill
                      alt=""
                      src={"/flags/" + item?.competition?.name + ".svg"}
                      className="block !relative !w-[16px] !h-[16px]"
                    />
                  </div>
                  <div className="ml-[4px] flex flex-col flex-grow overflow-hidden">
                    <span className="mb-0 font-bold text-white text-[14px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap text-left">
                      {item?.competition?.name}
                    </span>
                  </div>
                  <div>
                    <Icon
                      name="rightSlide"
                      className={`h-[21px] w-[16px] transition-transform ${expandedCountry === item?.competition?.id
                        ? "rotate-[270deg]"
                        : "rotate-[90deg]"
                        }`}
                    />
                  </div>
                </button>
              </div>

              {/* Accordion Content */}
              {expandedCountry === item?.competition?.id &&
                (eventsTournment?.length > 0 ? (
                  <>
                    {eventsTournment?.filter(
                      (eve: any) =>
                        eve?.competition?.id === item?.competition?.id
                    )?.length > 0 ? (
                      eventsTournment
                        ?.filter(
                          (eve: any) =>
                            eve?.competition?.id === item?.competition?.id
                        )
                        ?.map((event: any, eventIdx: number) => (
                          <Fragment key={eventIdx}>
                            {event?.groupedEvents?.map(
                              (group: any, groupIdx: number) => (
                                <div
                                  className="border-b border-[#001824] bg-[#001824]"
                                  key={groupIdx}
                                >
                                  {/* Header section with venue name and Live Video */}
                                  <div className="w-full relative bg-[#001824] pr-[26px] pl-[10px] min-h-[38px] flex items-center font-[11px]">
                                    <Link
                                      prefetch={true}
                                      href={`/exchange/horse-racing-details/${group?.slots[0]?.eventId}/${sportName === "horse-racing" ? "7" : "4339"}`}
                                      className="flex-grow min-w-0"
                                    >
                                      <span className="block pr-[16px] text-[#fff] text-[12px] font-[Arial,sans-serif]">
                                        {group?.eventName}
                                      </span>
                                    </Link>
                                    <div className="absolute h-full right-[10px] top-0 text-right">
                                      <div className="table h-full">
                                        <div className="table-cell pl-[10px] h-full align-middle">
                                          <div className="overflow-hidden text-[9px] uppercase text-[#ef853f] font-[Arial,sans-serif] float-right pt-[1px]">
                                            <span>Live Video</span>
                                          </div>
                                        </div>
                                        <div className="table-cell pl-[10px] h-full align-middle">
                                          <Icon
                                            name="rightSlide"
                                            className="h-[12px] w-[12px] float-left"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Time slots navigation */}
                                  <div>
                                    <nav className="overflow-x-auto scroll-width-none">
                                      <ul className="flex m-0 pl-[5px] pb-[5px] list-none">
                                        {group?.slots?.map(
                                          (slot: any, timeIdx: number) => (
                                            <li
                                              key={timeIdx}
                                              className="w-auto h-[34px] border-0 border-r-[5px] border-[#001824] bg-[#122D38] flex-grow-0 relative"
                                            >
                                              <Link
                                                prefetch={true}
                                                href={`/exchange/horse-racing-details/${slot.eventId}/${sportName === "horse-racing" ? "7" : "4339"}`}
                                                className="w-full bg-none border-none p-0 outline-none touch-manipulation"
                                              >
                                                <div className="w-[50px] h-[34px] py-[10px] px-[2px] whitespace-nowrap text-center">
                                                  <div className="text-white text-[12px]">
                                                    {moment(
                                                      slot?.marketStartTime
                                                    ).format("HH:mm")}
                                                  </div>
                                                </div>
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </nav>
                                  </div>
                                </div>
                              )
                            )}
                          </Fragment>
                        ))
                    ) : (
                      <div className="text-white h-[128] flex justify-center items-center bg-[#213743]">
                        There are no events available
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-white h-[128] flex justify-center items-center bg-[#213743]">
                    There are no events available
                  </div>
                ))}
            </div>
          ))}

          {/* Static list below (unchanged) */}
          {racecourses.map((item, index) => (
            <div
              className={`focus:outline-none ${index === 0 || index === racecourses.length - 1
                ? "pt-[1px]"
                : "pt-[1px]"
                }`}
              key={index}
            >
              <a className="bg-[#213743] flex items-center pl-[10px] pr-[7px] h-[38px]">
                <div className="flex flex-col flex-grow overflow-hidden">
                  <span className="mb-0 text-white text-[12px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {item}
                  </span>
                </div>
                <div>
                  <Icon name="rightSlide" className={`h-[14px] w-[14px]`} />
                </div>
              </a>
            </div>
          ))}
           <div className={`focus:outline-none mb-[10px]`}>
            <a  className={`h-[38px] flex items-center  border-t pl-[10px] pr-[7px] border-[#1A2C38] 
      ${dropdown ? "bg-[#304553]" : "bg-[#213743]"}
    `} onClick={()=>{setDropdown(!dropdown)}}>
              <div className="flex flex-col flex-grow overflow-hidden">
                <span className="mb-0 font-bold text-white text-[12px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                  Horse Racing Betting Explained
                </span>
              </div>
              <div>
                <Icon name="rightSlide" className={`h-[14px] w-[14px]`} />
              </div>
            </a>
            {dropdown ?

              <p className="text-[13px] bg-[#001824]  p-[10px]"> Betting on Soccer is simple on the StakeFair Exchange. You can bet for or against an outcome – e.g. if you're betting on Brisbane Roar v Macarthur FC, you can place a lay bet if you think Brisbane Roar will lose, or you can place a back bet if you think Brisbane Roar will win.</p> : ''
            }
          </div>
        </>
    
    
     )}

      {/* today's card */}
      {activeTab === "Today's Card" && (
        <>
          {eventListCardToday?.map((event: any, index: number) => (
            <Link
              href={`/exchange/horse-racing-details/${event?.eventId}/${sportName === "horse-racing" ? "7" : "4339"}`}
              prefetch
              key={index}
              className="flex items-center w-full text-[11px] pl-[10px] pr-[26px] min-h-[38px] relative cursor-pointer"
            >
              <div>
                <span>
                  {moment(event?.eventTime).format("HH:mm")} {event?.eventName}{" "}
                  {event?.competitionName}
                </span>
              </div>
              <div className="absolute h-full right-[10px] top-0">
                <div className="flex items-center h-full">
                  <div className="pl-[10px] flex justify-center items-center align-middle">
                    {!event?.inPlay ? (
                      <div className="flex items-center text-[#7f7f7f] text-[9px]">
                        <div
                          className={cn(
                            "h-[18px] w-[16px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat ",
                            "bg-[-149px_-765px] mr-[5px]"
                          )}
                        />
                        <span className="lowercase">
                          GOING TO BE LIVE IN{" "}
                          {getTimeDifference(event?.marketStartTime)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-[#7f7f7f] text-[9px]">
                        <div
                          className={cn(
                            "h-[18px] w-[16px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat ",
                            "bg-[-250px_-765px] mr-[5px]"
                          )}
                        />
                        <span className="uppercase font-bold bg-[#20a052] text-white px-1 pt-[3px] pb-[2px] rounded-[2px] text-[8px]">
                          in-play
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pl-[10px]">
                    <div
                      className={cn(
                        "h-[10px] w-[6px] bg-[url('@workspace/ui/assets/sprite/icons.svg')] bg-[length:708px_672px] bg-no-repeat ",
                        "bg-[-686px_-496px] "
                      )}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
           <div className={`focus:outline-none mb-[10px]`}>
            <a  className={`h-[38px] flex items-center  border-t pl-[10px] pr-[7px] border-[#1A2C38] 
      ${dropdown ? "bg-[#304553]" : "bg-[#213743]"}
    `} onClick={()=>{setDropdown(!dropdown)}}>
              <div className="flex flex-col flex-grow overflow-hidden">
                <span className="mb-0 font-bold text-white text-[12px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                  Horse Racing Betting Explained
                </span>
              </div>
              <div>
                <Icon name="rightSlide" className={`h-[14px] w-[14px]`} />
              </div>
            </a>
            {dropdown ?

              <p className="text-[13px] bg-[#001824] p-[10px]"> Betting on Soccer is simple on the StakeFair Exchange. You can bet for or against an outcome – e.g. if you're betting on Brisbane Roar v Macarthur FC, you can place a lay bet if you think Brisbane Roar will lose, or you can place a back bet if you think Brisbane Roar will win.</p> : ''
            }
          </div>
        </>
      
        )}

      {/* specials (unchanged layout) */}
      {activeTab === "Specials" && (
        <>
          <div>
            <div className="overflow-x-auto">
              <ul className="flex">
                {[1, 2, 3, 4]?.map((tab) => {
                  const currentDate = new Date();
                  return (
                    <li
                      key={tab}
                      className={`flex-1 ${activeTabDays === tab ? " border-b-2 border-[#fff]" : " pt-[1px]"}`}
                    >
                      <button
                        onClick={() =>
                          onChangeMeetingTab(
                            tab === 1 ? currentDate : getDateOffset(tab - 1),
                            tab
                          )
                        }
                        className="w-full p-[9px_10px]"
                      >
                        <div
                          className={`leading-[14px] text-[12px] text-nowrap relative ${activeTabDays === tab
                            ? "text-[#FFFFFF] top-[1px]"
                            : "text-[#FFFFFF] top-0"
                            }`}
                        >
                          {tab === 1
                            ? "Today"
                            : tab === 2
                              ? "Tomorrow"
                              : tab === 3
                                ? dayNames?.[0]
                                : dayNames?.[1]}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={`focus:outline-none mb-[10px]`}>
            <a  className={`h-[38px] flex items-center  border-t pl-[10px] pr-[7px] border-[#1A2C38] 
      ${dropdown ? "bg-[#304553]" : "bg-[#213743]"}
    `} onClick={()=>{setDropdown(!dropdown)}}>
              <div className="flex flex-col flex-grow overflow-hidden">
                <span className="mb-0 font-bold text-white text-[12px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                  Horse Racing Betting Explained
                </span>
              </div>
              <div>
                <Icon name="rightSlide" className={`h-[14px] w-[14px]`} />
              </div>
            </a>
            {dropdown ?

              <p className="text-[13px] bg-[#001824] p-[10px]"> Betting on Soccer is simple on the StakeFair Exchange. You can bet for or against an outcome – e.g. if you're betting on Brisbane Roar v Macarthur FC, you can place a lay bet if you think Brisbane Roar will lose, or you can place a back bet if you think Brisbane Roar will win.</p> : ''
            }
          </div>
        </>
      )}
    </>
  );
}
