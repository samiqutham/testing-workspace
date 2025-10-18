"use client";

import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useRef, useState } from "react";
import MEventLive from "../m-event-live";
import MBetSlip from "../m-betslip";
import MRules from "@exchange_s/modals/m-rules";
import MCashOut from "@exchange_s/modals/m-cash-out";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { CONFIG } from "@workspace/ui/config/config";
import { useAppStore } from "@workspace/ui/store/store";
import MarketSkeleton from "./MarketSkeleton";

type Runner = {
  selectionId: number;
  runnerName: string;
};

const MEvent = ({
  eventId,
  sportName,
}: {
  eventId: string;
  sportName: string;
}) => {
  console.log(eventId, sportName);
  const [showBet, setShowBet] = useState(false);
  const [activeTab, setActiveTab] = useState("Popular");
  const [showLivePanel, setShowLivePanel] = useState(false);
  const [tabs, setTabs] = useState(["Popular", "Match Odds", "All Markets"]);
  const [activeBet, setActiveBet] = useState<{
    runner: string;
    type: "back" | "lay";
    odd: string;
  } | null>(null);
  const [marketData, setMarketData] = useState<any>({});
  const [isScore, setIsScore] = useState(false);
  const [loader, setLoader] = useState(true);
  const [matchOddsData, setMatchOddsData] = useState<any[]>([]);
  const [bookmakersData, setBookmakersData] = useState<any[]>([]);
  const [allMarketList, setAllMarketList] = useState<any[]>([]);
  const [marketTabsList, setMarketTabsList] = useState<any[]>([]);
  const [market, setMarket] = useState<any[]>([]);
  const [oddsValue, setOddsValue] = useState<any>(null);
  const [isBetsSlipOpened, setIsBetsSlipOpened] = useState<any>(null);
  const [marketId, setIsMarketId] = useState<any>(null);
  const [sortedMarkets, setSortedMarkets] = useState<any[]>([]);

  const [colorVal, setColorVal] = useState<any>(null);
  const [betplaceObj, setBetplaceObj] = useState<any>(null);
  const [betType, setBetType] = useState<any>(null);
  const [runnerPrice, setRunnerPrice] = useState<any>(null);
  const [index, setIndex] = useState<any>(null);

  const [oddsType, setOddsType] = useState<any>(null);
  const [marketName, setMarketName] = useState<any>(null);
  const betPrice = useAppStore((state) => state.setBetPrice);
  const eventNameFromStore = useAppStore((state) => state.eventName);
  const [isLoading, setIsLoading] = useState(true);
  const eventName =
    typeof window !== "undefined" ? localStorage.getItem("eventName") : "";

  const [homeTeam, awayTeam] = eventName?.split(" v ") || ["", ""];
  const [type, setType] = useState<any>(null);

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
    min: any;
    max: any;
    marketType: any;
    eventName?: any;
    size?: any;
    index?: any;
    oddsType?: any;
    marketName?: any;
  }) {
    // debugger
    if (price == 0) {
      return;
    }

    setOddsValue(price);
    setType(betType);
    // this.backendService.setBetslipOpened('MT');
    // if (price == 0) {
    //   this.isBetsSlipOpened = '';
    //   this.marketId = '';
    //   return
    // }
    setMarketName(marketName);
    setIsBetsSlipOpened(selectionId);
    setIsMarketId(marketId);

    // this.colorVal = this.colorVal;
    // setColorVal(colorVal);
    setBetType(marketType);
    // this.isValueBetsSlip = 0;
    setRunnerPrice(price);
    setIndex(index);
    setOddsType(oddsType);
    betPrice(price);
    console.log(marketType, "eventName");

    setBetplaceObj({
      marketId: marketId,
      selectionId: selectionId,
      betType: betType,
      price: price,
      // eventId: this.event_id,
      eventName: eventName,
      minValue: min,
      maxValue: max,
      // sportId: this.sportId,
      type: marketType,
      size: size,
      index: index,
      oddsType: oddsType,
    });
  }
  function formatDateTime(dateString: string | null) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfTomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    let dayLabel = "";
    if (date >= startOfToday && date < startOfTomorrow) {
      dayLabel = "Today";
    } else if (
      date >= startOfTomorrow &&
      date < new Date(startOfTomorrow.getTime() + 24 * 60 * 60 * 1000)
    ) {
      dayLabel = "Tomorrow";
    } else {
      dayLabel = date.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
      });
    }

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${dayLabel} ${time}`;
  }

  useEffect(() => {
    const betslipElement = document.getElementById(
      `betslip-${isBetsSlipOpened}-${marketId}-${marketName}`
    );

    if (betslipElement) {
      const scrollToElement = () => {
        const elementPosition =
          betslipElement.getBoundingClientRect().top + window.scrollY;
        const offset = window.innerHeight / 2 - betslipElement.offsetHeight / 2;

        let position = elementPosition - offset;
        if (position < 0) position = 0;

        console.log({
          elementPosition,
          offset,
          position,
          marketId,
          isBetsSlipOpened,
        });

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      };

      // DOM update ke baad chalane ke liye
      requestAnimationFrame(scrollToElement);
    }
  }, [isBetsSlipOpened, marketId]);

  const handleCloseBetSlip = () => {
    setIsBetsSlipOpened(null);
  };

  const handleToggleBet = (
    runner: string,
    type: "back" | "lay",
    odd: string
  ) => {
    setShowBet(true);
    setActiveBet({ runner, type, odd });
  };

  function shortNumber(value: number): string | null {
    if (isNaN(value) || value === null) return null;
    if (value === 0) return "0";

    let abs = Math.abs(value);
    const rounder = Math.pow(10, 1);
    const isNegative = value < 0;
    let key = "";

    const powers = [
      { key: "Q", value: Math.pow(10, 15) },
      { key: "T", value: Math.pow(10, 12) },
      { key: "B", value: Math.pow(10, 9) },
      { key: "M", value: Math.pow(10, 6) },
      { key: "K", value: 1000 },
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }

    let formattedNumber: string;
    if (Number.isInteger(abs)) {
      formattedNumber = abs.toFixed(0);
    } else {
      formattedNumber = abs.toFixed(2);
    }

    return (isNegative ? "-" : "") + formattedNumber + key;
  }

  function getRunnerName(runners: Runner[], selectionId: number): string {
    const runner = runners.find((r) => r.selectionId === selectionId);
    return runner ? runner?.runnerName : "";
  }

  const addMatchOdd = () => {
    setActiveTab("Match Odds Draw No Bet");

    setTabs((prevTabs) => {
      if (prevTabs.includes("Match Odds Draw No Bet")) {
        return prevTabs.slice(0, -1);
      } else {
        return [...prevTabs, "Match Odds Draw No Bet"];
      }
    });
  };

  const setTabsValue = (tabName: string) => {
    setActiveTab(tabName);

    setTabs((prevTabs) => {
      if (prevTabs.length >= 4) {
        return prevTabs.slice(0, -1);
      }
      return prevTabs;
    });
  };

  const sportIds = { cricket: 4, soccer: 1, tennis: 2 } as any;

  useEffect(() => {
    console.log(activeTab);
    console.log("marketTabsList", marketTabsList);
  }, [activeTab]);

  useEffect(() => {
    runtimeApiService
      .marketList({
        key: CONFIG.siteKey2,
        eventId: eventId,
        sportId: sportIds[sportName],
      })
      .then((data) => {
        const record = data?.data ?? {};
        const marketTimes =
          record?.matchOddsData?.map((m: any) => m.marketStartTime) || [];

        console.log("record", record?.matchOddsData);
        setIsLoading(record?.matchOddsData > 0);
        setMarket(record?.matchOddsData);
        setMarketData(record);
        setIsScore(record.isScore ?? false);

        let odds = record.matchOddsData ?? [];
        if (sportIds[sportName] === 1) {
          odds = odds.sort(customSortByMarketType);
        }
        setMatchOddsData(odds);

        const bookmakers = record.bookmakersData ?? [];
        setBookmakersData(bookmakers);

        const combined = [
          ...odds,
          ...(record.bookmakersData ?? []),
          ...(record.fancyData ?? []),
          ...(record.sportsbookData ?? []),
        ].flat();

        setAllMarketList(combined);
        // setMarketTabsList(combined.slice(0, 10));
        setMarketTabsList(combined);

        // ✅ same call like Angular ka changeOddsMarket
        // changeOddsMarket("", "Popular", "");
      });
  }, [eventId, sportName]);
  useEffect(() => {
    if (!market || market.length === 0) return;

    const processed = market
      .sort((a: any, b: any) => {
        if (a.name === "Match Odds") return -1;
        if (b.name === "Match Odds") return 1;
        return a.sequence - b.sequence;
      })
      .filter((market: any) => market?.status !== "CLOSED")
      .map((market: any) => [market]);

    setSortedMarkets(processed);
  }, [market]);

  const customSortByMarketType = (a: any, b: any) => {
    const marketTypeA = a?.createdAt?.toUpperCase();
    const marketTypeB = b?.createdAt?.toUpperCase();

    if (marketTypeA < marketTypeB) {
      return -1;
    }
    if (marketTypeA > marketTypeB) {
      return 1;
    }
    return 0;
  };

  if (isLoading) {
    return <MarketSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center  bg-[#0E212E]">
        <div
          className="h-[46px] p-[10px_7px]"
          onClick={() => setShowLivePanel(!showLivePanel)}
        >
          <div className="w-[16px] h-[18px] bg-no-repeat bg-[length:1280px_1024px] bg-[-176px_-732px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
          <div className="inline-flex items-center relative top-[-3px] left-[1px]">
            <Icon name="ChevronDown" className="h-[12px] fill-white" />
          </div>
        </div>
        <div className="p-[8px_10px_8px_0] flex justify-between w-full">
          <div className="pl-2.5 truncate relative text-[12px] font-bold text-white">
            <div className="leading-[17px]"> {homeTeam} </div>
            <div className="leading-[17px]"> {awayTeam} </div>
          </div>
          <div className="font-bold text-[12px] leading-[13.5px] content-center">
            {formatDateTime(matchOddsData[0]?.description?.marketTime)}
          </div>
        </div>
      </div>
      {showLivePanel && <MEventLive />}

      {activeTab !== "allMarkets" ? (
        <>
          <div className="mt-[5px]">
            <div
              className="overflow-x-auto "
              style={{ scrollbarWidth: "none" }}
            >
              <ul className="flex">
                <li
                  className={`flex-1 ${activeTab === "Popular"
                    ? "bg-[#304553] border-t-2 border-[#fff]"
                    : "bg-[#0E212E] border-t-2 border-[#0E212E] pt-[1px]"
                    }`}
                >
                  <button
                    onClick={() => setTabsValue("Popular")}
                    className="w-full p-[9px_10px]"
                  >
                    <div
                      className={`leading-[14px] text-[12px] text-nowrap ${activeTab === "Popular"
                        ? "text-[#FFFFFF] font-bold"
                        : "text-[#FFFFFF]"
                        }`}
                    >
                      Popular
                    </div>
                  </button>
                </li>

                {marketTabsList.map((tab: any, index: number) => (
                  <li
                    key={tab?.id ?? tab?.marketName ?? index}
                    className={`flex-1 ${activeTab === tab?.marketType
                      ? "bg-[#304553] border-t-2 border-[#fff]"
                      : "bg-[#0E212E] border-t-2 border-[#0E212E] pt-[1px]"
                      }`}
                  >
                    <button
                      onClick={() => setTabsValue(tab?.marketType)}
                      className="w-full p-[9px_10px]"
                    >
                      <div
                        className={`leading-[14px] text-[12px] text-nowrap ${activeTab === tab
                          ? "text-[#FFFFFF] font-bold"
                          : "text-[#FFFFFF]"
                          }`}
                      >
                        {tab?.marketName}
                      </div>
                    </button>
                  </li>
                ))}

                <li
                  className={`flex-1 ${activeTab === "allMarkets"
                    ? "bg-[#304553] border-t-2 border-[#fff]"
                    : "bg-[#0E212E] border-t-2 border-[#0E212E] pt-[1px]"
                    }`}
                >
                  <button
                    onClick={() => setTabsValue("allMarkets")}
                    className="w-full p-[9px_10px]"
                  >
                    <div
                      className={`leading-[14px] text-[12px] text-nowrap ${activeTab === "allMarkets"
                        ? "text-[#FFFFFF] font-bold"
                        : "text-[#FFFFFF]"
                        }`}
                    >
                      All Markets
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className="p-[0_10px] flex h-[38px] justify-between relative bg-[#213743] items-center">
              <MRules
                market={
                  activeTab !== "Popular"
                    ? market?.filter(
                      (data: any) => data?.marketType === activeTab
                    )
                    : market?.filter((data: any) => data?.popular == true)
                }
              >
                <div className="w-[17px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-64px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')] [filter:brightness(0)_invert(1)]"></div>
              </MRules>
              <button className="text-[#fff] max-w-[160px] inline-block p-[7px_10px] text-[12px] leading-[14px] cursor-pointer rounded-[2px] bg-[#0E212E]">
                <span className="leading-[16px]"> P&L Tables </span>
              </button>
            </div>
          </div>

          {activeTab !== "Popular" ? (
            <>
              {market?.map((marketData: any, i: number) =>
                activeTab === marketData?.marketType ? (
                  <React.Fragment key={marketData?.marketId ?? i}>
                    <div className="w-full mb-[5px]">
                      <div className="h-[32px] bg-[#0E212E] flex items-center p-[0_12px]">
                        <div className="font-bold text-white text-[14px] leading-[16px] w-full">
                          {marketData?.marketName}
                        </div>
                        <div className="flex items-center">
                          <MCashOut>
                            <div className="ml-1 w-[16px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-35px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
                          </MCashOut>
                          <div className="ml-1 w-[16px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-119px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
                        </div>
                      </div>

                      <div className="w-full mb-[5px]">
                        <div className="h-[27px] bg-[#213743] text-white flex items-center justify-end">
                          <div className="flex-1 pl-[10px] font-bold text-[11px]">
                            <span>Matched :</span>
                            <span className="font-[400]">
                              {shortNumber(marketData?.totalMatched)}
                            </span>
                          </div>
                          <div className="flex-1 font-bold text-[11px]">
                            <span>Min :</span>
                            <span className="font-[400]">
                              {shortNumber(marketData?.min)}
                            </span>
                            &nbsp;
                            <span>Max :</span>
                            <span className="font-[400]">
                              {shortNumber(marketData?.max)}
                            </span>
                          </div>
                          {activeTab !== "1_INNINGS_RUNS_LINE" && (
                            <div className="pr-[10px] md:w-[337px] md:text-center font-bold text-[11px]">
                              <span className="w-[56px] inline-block text-center">
                                Back
                              </span>
                              <span className="w-[56px] inline-block text-center">
                                Lay
                              </span>
                            </div>
                          )}
                          <>
                            {activeTab === "1_INNINGS_RUNS_LINE" && (
                              <div className="pr-[10px] md:w-[337px] md:text-center font-bold text-[11px]">
                                <span className="w-[56px] inline-block text-center">
                                  No
                                </span>
                                <span className="w-[56px] inline-block text-center">
                                  Yes
                                </span>
                              </div>
                            )}
                          </>
                        </div>

                        <div className="w-full">
                          {marketData?.runners.map((runner: any) => (
                            <React.Fragment key={runner?.selectionId}>
                              <div className="flex min-h-[50px] border-b border-[#213743] justify-between bg-transparent p-[2px_10px]">
                                <div className="flex items-center mr-[3px] w-full">
                                  <div className="me-2 [filter:brightness(0)_invert(1)] w-[17px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-92px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
                                  <div className="text-white text-[12px] truncate font-bold leading-[16px]">
                                    {getRunnerName(
                                      marketData?.runnersName,
                                      runner?.selectionId
                                    )}
                                  </div>
                                </div>

                                <div className="w-full flex gap-[5px] items-center justify-end max-w-fit">
                                  <div>
                                    {[2, 1, 0].map((idx) => (
                                      <button
                                        key={`back-${runner?.selectionId}-${idx}`}
                                        onClick={() =>
                                          openBetslip({
                                            marketId: marketData?.marketId,
                                            selectionId: runner?.selectionId,
                                            betType: "back",
                                            price:
                                              runner?.ex?.availableToBack[idx]
                                                ?.price,
                                            min: marketData?.min,
                                            max: marketData?.max,
                                            marketType:
                                              marketData?.description
                                                ?.bettingType,
                                            eventName: getRunnerName(
                                              marketData?.runnersName,
                                              runner?.selectionId
                                            ),
                                            size: runner?.ex?.availableToBack[
                                              idx
                                            ]?.size,
                                            index: idx,
                                            marketName: marketData?.marketName,
                                          })
                                        }
                                        className={`${idx === 0
                                          ? "bg-[#A6D8FF]"
                                          : "bg-[#DBEFFF] hidden md:inline-block"
                                          } w-[53px] text-[#303030] rounded-[2px] h-[40px] overflow-hidden`}
                                      >
                                        <div className="leading-[16.5px] font-bold text-[15px]">
                                          {runner?.ex?.availableToBack[idx]
                                            ?.price || "0"}
                                        </div>
                                        <div className="leading-[11.5px] text-[10px]">
                                          {shortNumber(
                                            runner?.ex?.availableToBack[idx]
                                              ?.size
                                          ) || 0}
                                        </div>
                                      </button>
                                    ))}
                                  </div>

                                  <div>
                                    {[0, 1, 2].map((idx) => (
                                      <button
                                        key={`lay-${runner?.selectionId}-${idx}`}
                                        onClick={() =>
                                          openBetslip({
                                            marketId: marketData?.marketId,
                                            selectionId: runner?.selectionId,
                                            betType: "lay",
                                            price:
                                              runner?.ex?.availableToLay[idx]
                                                ?.price,
                                            min: marketData?.min,
                                            max: marketData?.max,
                                            marketType:
                                              marketData?.description
                                                ?.bettingType,
                                            eventName: getRunnerName(
                                              marketData?.runnersName,
                                              runner?.selectionId
                                            ),
                                            size: runner?.ex?.availableToLay[
                                              idx
                                            ]?.size,
                                            index: idx,
                                            marketName: marketData?.marketName,
                                          })
                                        }
                                        className={`${idx === 0
                                          ? "bg-[#fac9d1]"
                                          : "bg-[#FDE9ED] hidden md:inline-block"
                                          } w-[53px] text-[#303030] rounded-[2px] h-[40px] overflow-hidden`}
                                      >
                                        <div className="leading-[16.5px] font-bold text-[15px]">
                                          {runner?.ex?.availableToLay[idx]
                                            ?.price || "0"}
                                        </div>
                                        <div className="leading-[11.5px] text-[10px]">
                                          {shortNumber(
                                            runner?.ex?.availableToLay[idx]
                                              ?.size
                                          ) || 0}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div
                                id={`betslip-${runner.selectionId}-${marketId}-${marketData?.marketName}`}
                              >
                                {isBetsSlipOpened == runner.selectionId &&
                                  marketId == marketData.marketId &&
                                  (marketData?.status == "OPEN" ||
                                    marketData?.status == "ONLINE") && (
                                    <MBetSlip
                                      runner={getRunnerName(
                                        marketData?.runnersName,
                                        runner?.selectionId
                                      )}
                                      type={type}
                                      onClose={handleCloseBetSlip}
                                      odd={oddsValue}
                                    />
                                  )}
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ) : null
              )}
            </>
          ) : (
            <>
              {market.map((marketData: any, i: number) =>
                marketData.popular == true ? (
                  <React.Fragment key={marketData?.marketId ?? i}>
                    <div className="w-full mb-[5px]">
                      <div className="h-[32px] bg-[#0E212E] flex items-center p-[0_12px]">
                        <div className="font-bold text-white text-[14px] leading-[16px] w-full">
                          {marketData?.marketName}
                        </div>
                        <div className="flex items-center">
                          {/* <MCashOut>
                            <div className="ml-1 w-[16px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-35px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
                          </MCashOut> */}
                          {(marketData?.marketType === "Bookmakers" || marketData?.marketType === "BOOKMAKERS" ||
                            marketData?.marketType === "MATCH_ODDS" || marketData?.marketType === "Match_Odds") && (
                              <MCashOut>
                                <div
                                  className="ml-1 w-[16px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] 
                 bg-[-35px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"
                                ></div>
                              </MCashOut>
                            )}

                          <div className="ml-1 w-[16px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-119px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
                        </div>
                      </div>

                      <div className="w-full mb-[5px]">
                        <div className="h-[27px] bg-[#213743] text-white flex items-center justify-end">
                          <div className="flex-1 pl-[10px] font-bold text-[11px]">
                            <span>Matched&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                            <span className="font-[400]">
                              {shortNumber(marketData?.totalMatched)}
                            </span>
                          </div>
                          <div className="flex-1 font-bold text-[11px]">
                            <span>Min&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                            <span className="font-[400]">
                              {shortNumber(marketData?.min)}
                            </span>
                            &nbsp;
                            <span>Max&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                            <span className="font-[400]">
                              {shortNumber(marketData?.max)}
                            </span>
                          </div>
                          <div className="pr-[10px] md:w-[337px] md:text-center font-bold text-[11px]">
                            <span className="w-[56px] inline-block text-center">
                              Back
                            </span>
                            <span className="w-[56px] inline-block text-center">
                              Lay
                            </span>
                          </div>
                        </div>

                        <div className="w-full">
                          {marketData?.runners.map((runner: any) => (
                            <React.Fragment key={runner?.selectionId}>
                              <div className="flex min-h-[50px] border-b border-[#213743] justify-between bg-transparent p-[2px_10px]">
                                <div className="flex items-center mr-[3px] w-full">
                                  <div className="me-2 [filter:brightness(0)_invert(1)] w-[17px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-92px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
                                  <div className="text-white text-[12px] truncate font-bold leading-[16px]">
                                    {getRunnerName(
                                      marketData?.runnersName,
                                      runner?.selectionId
                                    )}
                                  </div>
                                </div>

                                <div className="w-full flex gap-[5px] items-center justify-end max-w-fit">
                                  {/* Back Buttons */}
                                  <div>
                                    {[2, 1, 0].map((idx) => (
                                      <button
                                        key={`back-${runner?.selectionId}-${idx}`}
                                        onClick={() =>
                                          openBetslip({
                                            marketId: marketData?.marketId,
                                            selectionId: runner?.selectionId,
                                            betType: "back",
                                            price:
                                              runner?.ex?.availableToBack[idx]
                                                ?.price,
                                            min: marketData?.min,
                                            max: marketData?.max,
                                            marketType:
                                              marketData?.description
                                                ?.bettingType,
                                            eventName: getRunnerName(
                                              marketData?.runnersName,
                                              runner?.selectionId
                                            ),
                                            size: runner?.ex?.availableToBack[
                                              idx
                                            ]?.size,
                                            index: idx,
                                            marketName: marketData?.marketName,
                                          })
                                        }
                                        className={`${idx === 0
                                          ? "bg-[#A6D8FF]"
                                          : "bg-[#DBEFFF] hidden md:inline-block"
                                          } w-[53px] text-[#303030] rounded-[2px] h-[40px] overflow-hidden`}
                                      >
                                        <div className="leading-[16.5px] font-bold text-[15px]">
                                          {runner?.ex?.availableToBack[idx]
                                            ?.price || "0"}
                                        </div>
                                        <div className="leading-[11.5px] text-[10px]">
                                          {shortNumber(
                                            runner?.ex?.availableToBack[idx]
                                              ?.size
                                          ) || 0}
                                        </div>
                                      </button>
                                    ))}
                                  </div>

                                  {/* Lay Buttons */}
                                  <div>
                                    {[0, 1, 2].map((idx) => (
                                      <button
                                        key={`lay-${runner?.selectionId}-${idx}`}
                                        onClick={() =>
                                          openBetslip({
                                            marketId: marketData?.marketId,
                                            selectionId: runner?.selectionId,
                                            betType: "lay",
                                            price:
                                              runner?.ex?.availableToLay[idx]
                                                ?.price,
                                            min: marketData?.min,
                                            max: marketData?.max,
                                            marketType:
                                              marketData?.description
                                                ?.bettingType,
                                            eventName: getRunnerName(
                                              marketData?.runnersName,
                                              runner?.selectionId
                                            ),
                                            size: runner?.ex?.availableToLay[
                                              idx
                                            ]?.size,
                                            index: idx,
                                            marketName: marketData?.marketName,
                                          })
                                        }
                                        className={`${idx === 0
                                          ? "bg-[#fac9d1]"
                                          : "bg-[#FDE9ED] hidden md:inline-block"
                                          } w-[53px] text-[#303030] rounded-[2px] h-[40px] overflow-hidden`}
                                      >
                                        <div className="leading-[16.5px] font-bold text-[15px]">
                                          {runner?.ex?.availableToLay[idx]
                                            ?.price || "0"}
                                        </div>
                                        <div className="leading-[11.5px] text-[10px]">
                                          {shortNumber(
                                            runner?.ex?.availableToLay[idx]
                                              ?.size
                                          ) || 0}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div
                                id={`betslip-${runner.selectionId}-${marketId}-${marketData?.marketName}`}
                              >
                                {isBetsSlipOpened == runner.selectionId &&
                                  marketId == marketData.marketId &&
                                  (marketData?.status == "OPEN" ||
                                    marketData?.status == "ONLINE") && (
                                    <MBetSlip
                                      runner={getRunnerName(
                                        marketData?.runnersName,
                                        runner?.selectionId
                                      )}
                                      type={type}
                                      odd={oddsValue}
                                      onClose={handleCloseBetSlip}
                                    />
                                  )}
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ) : null
              )}
            </>
          )}
        </>
      ) : (
        <div className="mb-[5px]">
          {marketTabsList.map((tab: any, index: number) => (
            <div
              key={"market" + index}
              className="pl-[20px] h-[38px] items-center flex bg-[#213843] border-[#1A2C38] border-b text-white justify-between"
              onClick={() => setTabsValue(tab?.marketType)}
            >
              <span className="text-[12px] leading-[14px] truncate">
                {tab?.marketName}
              </span>
              <Icon name="rightSlide" className="h-[18px] w-[18px]" />
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => setTabsValue("allMarkets")}
        className="p-[0_14px_0_12px] h-[38px] items-center flex bg-[#213843] text-white justify-between"
      >
        <span className="text-[12px] leading-[14px] truncate">All Markets</span>
        <Icon name="rightSlide" className="h-[18px] w-[18px]" />
      </div>

      <div className="p-[0_14px_0_12px] h-[38px] items-center flex bg-[#213843] border-t border-[#1A2C38] text-white justify-between">
        <span className="text-[12px] leading-[14px] truncate">
          Rotate screen to see market depth
        </span>
        <div className="ml-1 [filter:brightness(0)_invert(1)] w-[26px] h-[26px] bg-no-repeat bg-[length:1280px_1024px] bg-[-90px_-547px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
      </div>
    </div>
  );
};

export default MEvent;
