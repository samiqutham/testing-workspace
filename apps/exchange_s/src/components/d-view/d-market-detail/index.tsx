"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DMarketRightPanel } from "../d-market-rightpanel";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { CONFIG } from "@workspace/ui/config/config";
import { Skeleton } from "@workspace/ui/components/skeleton";
import DSportNav from "../d-sport-nav";
import { useRouter } from "next/navigation";

interface MarketDetailProps {
  sportId: any;
  eventId: string;
}
interface HeaderData {
  label?: string;
  type?: "button" | "text";
  align?: "left" | "right" | "center";
  bg?: string;
}
interface OddsCell {
  odd: string;
  amount: string;
  bg?: string; // optional background for back/lay buttons
}

interface RowData {
  team: string;
  odds: OddsCell[];
}
const outcomes = [
  {
    name: "Yes",
    back: { price: "", size: "" },
    lay: { price: "1.01", size: "333" },
  },
  {
    name: "No",
    back: { price: "1.01", size: "34.59" },
    lay: { price: "", size: "" },
  },
];

const headerData: HeaderData[] = [
  { label: "2 selections", type: "text", align: "left" },
  { label: "100.8%", type: "text", align: "left" },
  { label: "Back all", type: "button", align: "right", bg: "#a6d8ff" },
  { label: "Lay all", type: "button", align: "left", bg: "#fac9d4" },
  { label: "99.4%", type: "text", align: "right" },
];

function DMarketDetail({ sportId, eventId }: MarketDetailProps) {
  const [activeTab, setActiveTab] = useState("popular");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRules, setSelectedRules] = useState<any>(null); // NEW

  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const [displayedMarkets, setDisplayedMarkets] = useState<any[]>([]);

  const [selectedOdds, setSelectedOdds] = useState<
    { price: string; size: string; name: string }[]
  >([]);
  const [selectedLayOdds, setSelectedLayOdds] = useState<
    { price: string; size: string; name: string }[]
  >([]);
  const [profitLossData, setProfitLossData] = useState<{
    [key: string]: number;
  }>({});

  const handleProfitLossUpdate = (data: { [key: string]: number }) => {
    setProfitLossData(data);
  };

  //console.log("Sport Name:", sportId, "Event ID:", eventId);

  const handleOddsClick = (
    price: string,
    size: string,
    type: number,
    name: string
  ) => {
    const newOdd = { price, size, name };

    if (type <= 2) {
      setSelectedOdds((prev) => {
        const exists = prev.some(
          (o) => o.price === price && o.size === size && o.name === name
        );
        return exists
          ? prev.filter(
              (o) => !(o.price === price && o.size === size && o.name === name)
            )
          : [...prev, newOdd];
      });
    } else {
      setSelectedLayOdds((prev) => {
        const exists = prev.some(
          (o) => o.price === price && o.size === size && o.name === name
        );
        return exists
          ? prev.filter(
              (o) => !(o.price === price && o.size === size && o.name === name)
            )
          : [...prev, newOdd];
      });
    }
  };

  const handleDeleteBackBet = (index: number) => {
    setSelectedOdds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteLayBet = (index: number) => {
    setSelectedLayOdds((prev) => prev.filter((_, i) => i !== index));
  };

  // function to handle market selection
  const handleMarketSelection = (market: any) => {
    setSelectedMarket(market);
    // Re-render the page by updating displayed markets
    updateDisplayedMarkets(market);
  };

  // Function to update displayed markets based on selection
  const updateDisplayedMarkets = (selectedMarket: any) => {
    if (selectedMarket) {
      // Show the selected market as main market
      setDisplayedMarkets([selectedMarket]);

      // Only remove the currently selected market from popular markets
      setSelectedMarket(selectedMarket);
    } else {
      // Show default Match Odds on initial load
      const matchOddsMarket = matchOddsData.find(
        (market) => market.marketName === "Match Odds"
      );

      if (matchOddsMarket) {
        setDisplayedMarkets([matchOddsMarket]);
        setSelectedMarket(matchOddsMarket);
      } else {
        setDisplayedMarkets([]);
        setSelectedMarket(null);
      }
    }
  };

  const tabs = [
    { key: "popular", label: "Popular" },
    { key: "setMarkets", label: "Set Markets" },
  ];

  const [matchOddsData, setMatchOddsData] = useState<any[]>([]);
  const [market, setMarket] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<any>({});
  const [isScore, setIsScore] = useState(false);
  const [allMarketList, setAllMarketList] = useState<any[]>([]);
  const [bookmakersData, setBookmakersData] = useState<any[]>([]);
  const [popularMarkets, setPopularMarkets] = useState<any[]>([]);
  const [eventName, setEventName] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");

  useEffect(() => {
    // console.log(activeTab);
    // console.log("marketTabsList", marketTabsList);
  }, [activeTab]);

  useEffect(() => {
    setLoading(true);

    runtimeApiService
      .marketList({
        key: CONFIG.siteKey2,
        eventId: eventId,
        sportId: sportId,
      })
      .then((data) => {
        const record = data?.data ?? {};

        let odds = record.matchOddsData ?? [];
        setMatchOddsData(odds);
        setMarketData(record);
        setEventName(record?.matchOddsData?.[0]?.event?.name ?? "");
        setIsScore(record.isScore ?? false);

        const bookmakers = record.bookmakersData ?? [];
        setBookmakersData(bookmakers);

        const combined = [
          ...odds,
          ...bookmakers,
          ...(record.fancyData ?? []),
          ...(record.sportsbookData ?? []),
        ].flat();

        // popular markets
        const allPopularMarkets = combined; // Show all markets

        // Match Odds on top
        const sortedPopularMarkets = allPopularMarkets.sort((a, b) => {
          if (a.marketName === "Match Odds") return -1;
          if (b.marketName === "Match Odds") return 1;
          return 0;
        });
        if (sportId === 1) {
          const sorted = [...sortedPopularMarkets].sort(customSortByMarketType);
          setPopularMarkets(sorted);
          // console.log("Sorting popular sorted for---",sorted);
        } else {
          setPopularMarkets(sortedPopularMarkets);
          //console.log("Sorting popular sortedPopularMarkets for---",sortedPopularMarkets);
        }

        setAllMarketList(combined);

        // default initialize with Match Odds
        const matchOddsMarket = (odds || []).find(
          (market: { marketName?: string }) =>
            market?.marketName === "Match Odds"
        );

        if (matchOddsMarket) {
          setDisplayedMarkets([matchOddsMarket]);
          setSelectedMarket(matchOddsMarket);
        } else {
          setDisplayedMarkets([]);
          setSelectedMarket(null);
        }

        const openDate = record?.matchOddsData?.[0]?.event?.openDate ?? "";
        if (openDate) {
          const dateObj = new Date(openDate);

          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);

          const onlyDate = (d: Date) =>
            new Date(d.getFullYear(), d.getMonth(), d.getDate());

          let formatted = "";
          const eventDay = onlyDate(dateObj);
          const todayDay = onlyDate(today);
          const tomorrowDay = onlyDate(tomorrow);

          const timeStr = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          if (eventDay.getTime() === todayDay.getTime()) {
            formatted = `Today, ${timeStr}`;
          } else if (eventDay.getTime() === tomorrowDay.getTime()) {
            formatted = `Tomorrow, ${timeStr}`;
          } else {
            // day, date month, time
            formatted =
              dateObj.toLocaleDateString("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              }) + `, ${timeStr}`;
          }
          setEventTime(formatted);
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventId, sportId]);

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

  const route = useRouter();

  const handleChnage = () => {
    route.push("/");
  };

  function formatNumber(num: any) {
    if (num === null || num === undefined) return "";

    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  const GBP = "\u00A3";

  return (
    <>
      <DSportNav onSelect={handleChnage} />

      <div className="flex px-[3vw] pb-6">
        {loading ? (
          <>
            <div className="w-2/3">
              <div className="bg-[#213743] rounded shadow-sm">
                {/* Header skeleton */}
                <Skeleton className="h-12 mb-2 bg-[#2f4553]" />

                {/* Tabs skeleton */}
                <div className="flex h-8 gap-2 p-2 mb-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-32 bg-[#2f4553]" />
                  ))}
                </div>

                {/* Match info skeleton */}
                <Skeleton className="h-8 mb-2 bg-[#2f4553]" />

                {/* Table skeleton */}
                <div className="p-2">
                  <Skeleton className="h-6 mb-2 bg-[#2f4553]" />
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-8 mb-1 bg-[#2f4553]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel skeleton */}
            <div className="w-1/3 ml-2">
              <div className="bg-[#213743] rounded shadow-sm p-4">
                <Skeleton className="h-8 mb-4 bg-[#2f4553]" />
                <Skeleton className="h-24 mb-4 bg-[#2f4553]" />
                <Skeleton className="h-16 mb-4 bg-[#2f4553]" />
                <Skeleton className="h-12 bg-[#2f4553]" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full">
            <div className="w-2/3">
              <div className="bg-[#213743]  font-[proxima-nova, sans-serif] rounded shadow-sm text-sm">
                {/* Header */}
                <div className="bg-[#1A2C38] text-white px-[8px] pt-[5] pb-[4px] font-semibold justify-between flex ">
                  <div className="flex flex-col w-[100%] justify-between w-[fit-content] leading-[24px]">
                    <span className="text-[20px] font-[100]  leading-[24px]">
                      <span
                        onClick={() => setOpen(true)}
                        className="odds-icon-status bg-[#7f7f7f] relative top-[-1.1px] w-[16px] hover:bg-[yellow] cursor-pointer mt-1 mr-1 h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat rounded-[4px] bg-[0px_-1096px] hover:bg-[0px_-1112px]  "
                      ></span>
                      {eventName}
                    </span>
                    <div className="text-[12px] font-[Arial,Helvetica,sans-serif] font-[100] mt-[4px] leading-[18px]">
                      {eventTime}
                    </div>
                  </div>
                  <div className="font-[Arial,Helvetica,sans-serif]">
                    <div className="flex items-center space-x-1 ">
                      <div className="w-3 h-2.5 bg-[url('/sprite.41aea95fa.png')] bg-no-repeat [background-position:0_-774px] mt-1"></div>

                      <button className="bg-[#314652] text-[white] font-[100] cursor-pointer h-[16px] text-[11px] px-2 mt-1 rounded">
                        Live Stream
                      </button>

                      <button className="bg-[#314652] text-[white] font-[100] cursor-pointer h-[16px] text-[11px] px-2 mt-1 rounded">
                        Head to Head
                      </button>

                      <button className="bg-[#0F202D] text-[white] font-[100] cursor-pointer h-[16px] text-[11px] px-2 mt-1 rounded">
                        Multiples
                      </button>
                    </div>
                  </div>
                </div>

                {/* Show selected market or default Match Odds */}
                <div className="m-2">
                  {displayedMarkets.map((market, marketIndex) => (
                    <div key={marketIndex} className="m-2">
                      <div className="py-2 border-b bg-[#213743] text-[white] flex flex-col text-xs text-gray-700">
                        <div className="text-[12px] text-[white] font-[700]">
                          {market.marketName || "Market"}
                        </div>
                        <div>
                          <div className="my-[12px]">
                            <hr />
                          </div>
                          <div className="flex justify-between">
                            <div className="odds-main flex items-center">
                              <div className="odds-feature-inplay mr-2 text-[#273a47] overflow-hidden h-[16px] leading-[16px] py-[2px]">
                                <span className="odds-icon-status bg-[#7f7f7f] relative top-[-1.1px] w-[16px] h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1202px]"></span>
                                <span className="odds-text-status text-[11px] text-[white] ml-[5px]">
                                  Going In-Play
                                </span>
                              </div>
                              <div className="odds-feature-cashout mr-2 odds-status odds-main">
                                <span className="odds-icon-cashout bg-[#ffb900] w-[16px] h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1032px]"></span>
                                <span className="odds-text-cashout text-[11px] ml-[5px] text-[white]">
                                  Cash Out
                                </span>
                              </div>
                              <span
                                onClick={() => {
                                  setSelectedRules(market); // save clicked market’s full data
                                  setShowModal(true);
                                }}
                                className="odds-feature-rules align-middle cursor-pointer odds-status"
                              >
                                <GetRules
                                  id={market.marketId}
                                  name={market.marketName}
                                />
                              </span>
                            </div>
                            <div className="text-[white]">
                              Matched:{" "}
                              <span className="font-bold">
                                {GBP} {formatNumber(market.totalMatched) || 0}
                              </span>
                              <button className="ml-2 bg-[#bfbfbf] text-gray-800 px-[10px] cursor-pointer text-[11px] rounded-[2px] text-xs">
                                Refresh
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Odds Table */}
                      <table className="m-[5px_8px_2px] bg-[#213743] w-[calc(100%_-16px)] p-2">
                        <thead>
                          <tr className="align-bottom text-[white]">
                            {headerData.map((col, i) => (
                              <th
                                key={i}
                                className={`leading-[18px] font-[400] 
                ${col.align === "left" ? "text-left" : ""}
                ${col.align === "right" ? "text-right" : ""}
                ${i === 1 ? "pl-3 w-[10%]" : ""}
                ${i === 0 ? "w-[50%]" : ""}
                ${i === 2 || i === 3 ? "w-[16%]" : ""}
                ${i === 4 ? "w-[10%]" : ""}
              `}
                              >
                                {col.type === "button" ? (
                                  <button
                                    className={`${
                                      col.align === "right"
                                        ? "float-right mr-[1px]"
                                        : "float-left mr-[1px]"
                                    } bg-[${col.bg}] w-[54%]  p-[3px_5px] h-[18px] leading-[13px] text-[11px] cursor-pointer ${
                                      col.label == "Lay all"
                                        ? "hover:bg-[#F594AA]"
                                        : "hover:bg-[#75C2FD]"
                                    }`}
                                  >
                                    <span className="text-[black] font-[700]">
                                      {col.label || "0"}
                                    </span>
                                  </button>
                                ) : (
                                  <span>{col.label || "0"}</span>
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      </table>

                      <table className="text-white bg-[#213743] w-full h-full p-2">
                        <tbody>
                          {market.runnersName?.map(
                            (runner: any, runnerIndex: number) => {
                              const runnerData = market.runners?.find(
                                (r: any) => r.selectionId === runner.selectionId
                              );

                              // Get profit/loss for this runner
                              const profitLoss =
                                profitLossData[runner.runnerName] || 0;
                              const hasProfitLoss = profitLoss !== 0; // Check if there's any profit/loss

                              return (
                                <tr
                                  key={runnerIndex}
                                  className="h-full border-b border-[#b1bad3]"
                                >
                                  {/* Team column */}
                                  <td className="border-t w-[50%] pl-2 border-[#b1bad3]">
                                    <div className="flex items-center h-[29px]">
                                      {/* Left Icon */}
                                      <button className="w-[13px] h-[17px] cursor-pointer [filter:brightness(0)_invert(1)] bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-193px] mr-2" />

                                      {/* Name + Profit/Loss */}
                                      <div className="flex flex-col leading-[1.1]">
                                        <div className="whitespace-nowrap font-[700] text-white text-[11px]">
                                          {runner.runnerName || "0"}
                                        </div>
                                        {hasProfitLoss && (
                                          <div className="profit-loss text-[11px]">
                                            <span>&raquo;</span>
                                            <span
                                              className={
                                                profitLoss >= 0
                                                  ? "text-green-400"
                                                  : "text-red-400"
                                              }
                                            >
                                              {profitLoss >= 0 ? "+" : ""}
                                              {profitLoss.toFixed(2)}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>

                                  {/* Back Odds - 3 columns */}
                                  {[2, 1, 0].map((backIndex, arrayIndex) => {
                                    const back = runnerData?.ex
                                      ?.availableToBack?.[backIndex] || {
                                      price: 0,
                                      size: 0,
                                    };
                                    const isSelected = selectedOdds.some(
                                      (odd) =>
                                        odd.price === back.price.toString() &&
                                        odd.size === back.size.toString() &&
                                        odd.name === runner.runnerName
                                    );

                                    return (
                                      <td
                                        key={`back-${backIndex}`}
                                        className={`min-w-0 w-[7.99%] border-t border-b border-[#b1bad3] 
                                      ${backIndex === 0 ? "bg-[#A6D8FF]" : ""}
                                        hover:bg-[#1A2C38] 
                                        ${
                                          backIndex === 0
                                            ? "hover:bg-[#75C2FD] text-black"
                                            : ""
                                        }
                                       `}
                                      >
                                        <button
                                          onClick={() =>
                                            handleOddsClick(
                                              back.price.toString(),
                                              back.size.toString(),
                                              backIndex,
                                              runner.runnerName
                                            )
                                          }
                                          className="mb-0 border-r border-b border-l h-[29px] w-full cursor-pointer border-[#b1bad3]"
                                        >
                                          <div className="leading-[0px] font-[700] relative top-[-5px] text-[11px]">
                                            {formatNumber(back.price) || 0}
                                          </div>
                                          <div className="leading-[0px] relative top-[6px] text-[11px]">
                                            {formatNumber(back.size) || 0}
                                          </div>
                                        </button>
                                      </td>
                                    );
                                  })}

                                  {/* Lay Odds - 3 columns */}
                                  {[0, 1, 2].map((layIndex) => {
                                    const lay = runnerData?.ex
                                      ?.availableToLay?.[layIndex] || {
                                      price: 0,
                                      size: 0,
                                    };
                                    const isSelected = selectedLayOdds.some(
                                      (odd) =>
                                        odd.price === lay.price.toString() &&
                                        odd.size === lay.size.toString() &&
                                        odd.name === runner.runnerName
                                    );

                                    return (
                                      <td
                                        key={`lay-${layIndex}`}
                                        className={`min-w-0 w-[7.99%] border-t border-b border-[#b1bad3] 
              ${layIndex === 0 ? "bg-[#FAC9D1]" : ""}
              hover:bg-[#1A2C38] 
              ${layIndex === 0 ? "hover:bg-[#F594AA] text-black" : ""}
              `}
                                      >
                                        <button
                                          onClick={() =>
                                            handleOddsClick(
                                              lay.price.toString(),
                                              lay.size.toString(),
                                              layIndex + 3,
                                              runner.runnerName
                                            )
                                          }
                                          className="mb-0 border-r border-b border-l h-[29px] w-full cursor-pointer border-[#b1bad3]"
                                        >
                                          <div className="leading-[0px] font-[700] relative top-[-5px] text-[11px]">
                                            {formatNumber(lay.price) || 0}
                                          </div>
                                          <div className="leading-[0px] relative top-[6px] text-[11px]">
                                            {formatNumber(lay.size) || 0}
                                          </div>
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="bg-[#1A2C38] pl-2 flex justify-between font-[700] text-[12px] text-white">
                    <div className="h-[100%]  relative top-[5px]">
                      Other Markets
                    </div>
                    <div className="my-[8px] w-[24px] flex items-center justify-center h-[16px] cursor-pointer ">
                      <svg
                        fill="white"
                        data-icon="close"
                        data-style="close-icon"
                        viewBox="0 0 100 100"
                        className="svg-icon-default h-[8px] w-2 close-icon close-svg"
                      >
                        <path d="M100,12.5L87.5,0L50,37.5L12.5,0L0,12.5L37.5,50L0,87.5L12.5,100L50,62.5L87.5,100L100,87.5L62.5,50L100,12.5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    {/* Tabs */}
                    <ul className="h-[32px] flex text-[#1e1e1e] p-0 w-full bg-[#0E212E]border-b border-[#b1bad3]">
                      {tabs.map((tab) => (
                        <li
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`cursor-pointer flex items-center justify-center w-[120px] h-[31px]  border-r-[#dfdfdf] last:border-r-0 font-bold
              ${
                activeTab === tab.key
                  ? "border-t-[1.5px] border-[#b1bad3] bg-[#304553] text-white"
                  : "border-t-[1.5px] border-transparent bg-[#0E212E] text-white"
              }
            `}
                        >
                          <a className="block px-4 py-1">
                            <h4 className="text-[12px] whitespace-nowrap">
                              {tab.label}
                            </h4>
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <div className="w-[100%] flex">
                        {activeTab === "popular" && (
                          <>
                            {popularMarkets.length > 0 ? (
                              (() => {
                                // 1. Filter first (remove selected market + match odds)
                                const filteredMarkets = popularMarkets.filter(
                                  (market: any) => {
                                    if (selectedMarket) {
                                      return (
                                        market.marketId !==
                                          selectedMarket?.marketId &&
                                        market.marketName !==
                                          selectedMarket?.marketName
                                      );
                                    }
                                    return (
                                      market.marketName?.toLowerCase() !==
                                      "match odds"
                                    );
                                  }
                                );

                                // 2. Distribute markets based on "weight" (runner count = height approx)
                                const leftColumn: any[] = [];
                                const rightColumn: any[] = [];
                                let leftHeight = 0;
                                let rightHeight = 0;

                                filteredMarkets.forEach((market: any) => {
                                  const weight = market.runners?.length || 1; // longer markets "weigh more"
                                  if (leftHeight <= rightHeight) {
                                    leftColumn.push(market);
                                    leftHeight += weight;
                                  } else {
                                    rightColumn.push(market);
                                    rightHeight += weight;
                                  }
                                });

                                // 3. Helper to render market card (so no duplication)
                                const renderMarket = (
                                  market: any,
                                  index: number
                                ) => {
                                  const runnersWithNames =
                                    market.runners
                                      ?.map((runner: any) => {
                                        const runnerNameData =
                                          market.runnersName?.find(
                                            (rn: any) =>
                                              rn.selectionId ===
                                              runner.selectionId
                                          );
                                        return {
                                          ...runner,
                                          runnerName:
                                            runnerNameData?.runnerName ||
                                            `Runner ${runner.selectionId}`,
                                          sortPriority:
                                            runnerNameData?.sortPriority || 0,
                                        };
                                      })
                                      ?.sort(
                                        (a: any, b: any) =>
                                          a.sortPriority - b.sortPriority
                                      ) || [];

                                  return (
                                    <div
                                      key={market.marketId || index}
                                      className="w-full px-4 mb-4"
                                    >
                                      {/* ---- Market Header ---- */}
                                      <div className="py-2 h-[31px] pl-2 pr-6 border-b flex text-white bg-[#1A2C38] justify-between text-xs text-gray-700">
                                        <div className="text-[12px] font-[700]">
                                          {market.marketName || "Market"}
                                        </div>
                                        <div className="flex items-center">
                                          <span className="odds-icon-status bg-[#7f7f7f] w-[16px] h-[16px] bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1202px] mr-2"></span>
                                          <span
                                            onClick={() => {
                                              setSelectedRules(market); // save clicked market’s full data
                                              setShowModal(true);
                                            }}
                                            className="odds-feature-rules align-middle cursor-pointer odds-status"
                                          >
                                            <GetRules
                                              id={market.marketId}
                                              name={market.marketName}
                                            />
                                          </span>
                                        </div>
                                      </div>

                                      {/* ---- Matched Info ---- */}
                                      <div className="flex text-white px-2 items-center text-gray-500 text-sm font-medium border-b pb-1">
                                        <div className="w-[67%]">
                                          Matched:{" "}
                                          {market.totalMatched || "0.00"}
                                        </div>
                                        <div className="w-[16%] flex justify-center">
                                          Back
                                        </div>
                                        <div className="w-[16%] flex justify-center pl-4">
                                          Lay
                                        </div>
                                      </div>

                                      {/* ---- Runners ---- */}
                                      {runnersWithNames.map(
                                        (runner: any, idx: number) => {
                                          const bestBack =
                                            runner.ex?.availableToBack?.[0] ||
                                            null;
                                          const bestLay =
                                            runner.ex?.availableToLay?.[0] ||
                                            null;

                                          return (
                                            <table
                                              key={runner.selectionId || idx}
                                              className="w-full"
                                            >
                                              <tbody>
                                                <tr className="text-black border-b border-[#b1bad3]">
                                                  <td className="border-t w-[50%] pl-2 border-[#b1bad3]">
                                                    <h3 className="whitespace-nowrap text-white h-[29px] font-[700] leading-[26px] pr-[5px] pt-[4px] pb-[1px] m-0 flex items-center">
                                                      <button className="w-[13px] h-[17px] cursor-pointer [filter:brightness(0)_invert(1)] bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-193px] mr-2" />
                                                      {runner.runnerName}
                                                    </h3>
                                                  </td>
                                                  <td className="w-[12.99%] bg-[#A6D8FF] border-t border-b border-[#b1bad3]">
                                                    <div className="h-[29px] hover:bg-[#75C2FD] h-full cursor-pointer">
                                                      <button className="w-full border-[#b1bad3] cursor-pointer">
                                                        <div className="font-[700] leading-[11px] text-[11px]">
                                                          {bestBack
                                                            ? formatNumber(
                                                                bestBack.price
                                                              )
                                                            : "-"}
                                                        </div>
                                                        <div className="text-[11px] leading-[11px]">
                                                          {bestBack
                                                            ? formatNumber(
                                                                bestBack.size
                                                              )
                                                            : "-"}
                                                        </div>
                                                      </button>
                                                    </div>
                                                  </td>
                                                  <td className="w-[12.99%] bg-[#FAC9D1] border-t border-b border-[#b1bad3]">
                                                    <div className="h-[29px] hover:bg-[#F594AA] cursor-pointer">
                                                      <button className="w-full h-[29px] h-full cursor-pointer border-[#b1bad3]">
                                                        <div className="font-[700] leading-[11px] text-[11px]">
                                                          {bestLay
                                                            ? formatNumber(
                                                                bestLay.price
                                                              )
                                                            : "-"}
                                                        </div>
                                                        <div className="text-[11px] leading-[11px]">
                                                          {bestLay
                                                            ? formatNumber(
                                                                bestLay.size
                                                              )
                                                            : "-"}
                                                        </div>
                                                      </button>
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          );
                                        }
                                      )}

                                      {/* ---- Footer ---- */}
                                      <div className="w-full border-t">
                                        <div className="py-[7px] flex justify-end">
                                          <button
                                            onClick={() =>
                                              handleMarketSelection(market)
                                            }
                                            className="text-sm text-white hover:underline cursor-pointer"
                                          >
                                            View full market
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                };

                                // 4. Render both columns
                                return (
                                  <div className="w-full grid grid-cols-2 gap-0 pt-[10px]">
                                    <div className="w-full">
                                      {leftColumn.map(renderMarket)}
                                    </div>
                                    <div className="w-full">
                                      {rightColumn.map(renderMarket)}
                                    </div>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-[#1A2C38]">
                                  <div className="py-2 pl-2 pr-6 border-b flex text-white justify-between text-xs">
                                    <div className="text-[12px] font-[700]">
                                      No Popular Markets Available
                                    </div>
                                  </div>
                                  <div className="p-4 text-white text-center">
                                    No popular markets found for this event.
                                  </div>
                                </div>
                                <div className="p-4 bg-[#1A2C38]">
                                  <div className="py-2 pl-2 pr-6 border-b flex text-white justify-between text-xs">
                                    <div className="text-[12px] font-[700]">
                                      No Popular Markets Available
                                    </div>
                                  </div>
                                  <div className="p-4 text-white text-center">
                                    No popular markets found for this event.
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        {activeTab === "setMarkets" && (
                          <>
                            <div className="w-[50%]">
                              <div className="p-4 pt-[10px]">
                                <div className="py-2 pl-2 pr-6 border-b flex text-white bg-[#1A2C38] justify-between text-xs text-gray-700">
                                  <div className="text-[12px]  font-[700]">
                                    Completed Match
                                  </div>
                                  <div className="flex items-center">
                                    <span className="odds-icon-status bg-[#7f7f7f] relative top-[-1.1px] w-[16px] h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1202px] mr-2"></span>
                                    <span className="odds-icon-cashout mr-2 bg-[#ffb900]  w-[16px] h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1032px] "></span>

                                    <span
                                      onClick={() => setShowModal(true)}
                                      className="odds-feature-rules align-middle cursor-pointer odds-status"
                                    >
                                      <GetRules />
                                    </span>
                                  </div>
                                </div>
                                <div className="flex text-white px-2 items-center text-gray-500 text-sm font-medium border-b pb-1">
                                  {/* Left side */}
                                  <div className="w-[67%]">Matched: 29.25</div>

                                  {/* Right side */}
                                  <div className="w-[16%] flex justify-center">
                                    Back
                                  </div>
                                  <div className="w-[16%] flex justify-center pl-4">
                                    Lay
                                  </div>
                                </div>
                                {outcomes.map((o, idx) => (
                                  <table key={idx} className="w-[100%]">
                                    <tbody>
                                      <tr className="h-[100%] text-[black] border-b-[1px] border-[#b1bad3]">
                                        {/* Name Cell */}
                                        <td className="border-t-[1px] w-[50%] pl-2 border-[#b1bad3]">
                                          <div className="w-[13px] h-[29px] pl-[2px] float-left">
                                            <button className="mt-[7px] h-[17px] cursor-pointer [filter:brightness(0)_invert(1)] bg-[url('/sprite.41aea95fa.png')] bg-no-repeat w-[100%] bg-[0px_-193px]"></button>
                                          </div>
                                          <h3 className="whitespace-nowrap h-[29px] text-white font-[700] leading-[26px] pl-[18px] pr-[5px] pt-[4px] pb-[1px] m-0">
                                            {o.name}
                                          </h3>
                                        </td>

                                        {/* Back Odds */}
                                        <td className="min-w-0 w-[12.99%] bg-[#A6D8FF] border-t border-b border-[#b1bad3]">
                                          <div className="h-[29px] hover:bg-[#75C2FD] cursor-pointer">
                                            <button className="w-[100%] cursor-pointer border-[#b1bad3]">
                                              <div className="leading-[0px] font-[700] relative top-[-5px] text-[11px]">
                                                {formatNumber(o.back.price)}
                                              </div>
                                              <div className="leading-[0px] relative top-[6px] text-[11px]">
                                                {formatNumber(o.back.size)}
                                              </div>
                                            </button>
                                          </div>
                                        </td>
                                        {/* Lay Odds */}
                                        <td className="min-w-0 w-[12.99%] border-t bg-[#FAC9D1] border-b border-[#b1bad3]">
                                          <div className="h-[29px] hover:bg-[#f594aa]">
                                            <button className="w-[100%] !cursor-pointer h-[29px] border-[#b1bad3]">
                                              <div className="leading-[0px] font-[700] relative top-[-5px] text-[11px]">
                                                {formatNumber(o.lay.price)}
                                              </div>
                                              <div className="leading-[0px] relative top-[6px] text-[11px]">
                                                {formatNumber(o.lay.size)}
                                              </div>
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                ))}
                                <div className="w-full border-t ">
                                  <div className=" py-[7px] flex justify-end">
                                    <Link
                                      href=""
                                      className="text-sm text-white hover:underline"
                                    >
                                      View full market
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-[50%]">
                              <div className="pr-4 py-4 pt-[10px]">
                                <div className="py-2 pl-2 pr-6 border-b flex text-white bg-[#1A2C38] justify-between text-xs text-gray-700">
                                  <div className="text-[12px]  font-[700]">
                                    Completed Match
                                  </div>
                                  <div className="flex items-center">
                                    <span className="odds-icon-status bg-[#7f7f7f] relative top-[-1.1px] w-[16px] h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1202px] mr-2"></span>
                                    <span className="odds-icon-cashout mr-2 bg-[#ffb900]  w-[16px] h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1032px] "></span>

                                    <span
                                      onClick={() => setShowModal(true)}
                                      className="odds-feature-rules align-middle cursor-pointer odds-status"
                                    >
                                      <GetRules />
                                    </span>
                                  </div>
                                </div>
                                <div className="flex text-white px-2 items-center text-gray-500 text-sm font-medium border-b pb-1">
                                  {/* Left side */}
                                  <div className="w-[67%]">Matched: 29.25</div>
                                  {/* Right side */}
                                  <div className="w-[16%] flex justify-center">
                                    Back
                                  </div>
                                  <div className="w-[16%] flex justify-center pl-4">
                                    Lay
                                  </div>
                                </div>
                                {outcomes.map((o, idx) => (
                                  <table key={idx} className="w-[100%]">
                                    <tbody>
                                      <tr className="h-[100%] text-[black] border-b-[1px] border-[#b1bad3]">
                                        {/* Name Cell */}
                                        <td className="border-t-[1px] w-[50%] pl-2 border-[#b1bad3]">
                                          <div className="w-[13px] h-[29px] pl-[2px] float-left">
                                            <button className="mt-[7px] cursor-pointer h-[17px] [filter:brightness(0)_invert(1)] bg-[url('/sprite.41aea95fa.png')] bg-no-repeat w-[100%] bg-[0px_-193px]"></button>
                                          </div>
                                          <h3 className="whitespace-nowrap text-white h-[29px] font-[700] leading-[26px] pl-[18px] pr-[5px] pt-[4px] pb-[1px] m-0">
                                            {o.name}
                                          </h3>
                                        </td>

                                        {/* Back Odds */}
                                        <td className="min-w-0 w-[12.99%] bg-[#A6D8FF]  border-t border-b border-[#b1bad3]">
                                          <div className="h-[29px]  hover:bg-[#75C2FD] cursor-pointer">
                                            <button className="w-[100%] border-[#b1bad3] cursor-pointer">
                                              <div className="leading-[0px] font-[700] relative top-[-5px] text-[11px]">
                                                {formatNumber(o.back.price)}
                                              </div>
                                              <div className="leading-[0px] relative top-[6px] text-[11px]">
                                                {formatNumber(o.back.size)}
                                              </div>
                                            </button>
                                          </div>
                                        </td>

                                        {/* Lay Odds */}
                                        <td className="min-w-0 w-[12.99%] border-t bg-[#FAC9D1] border-b border-[#b1bad3]">
                                          <div className="h-[29px] hover:bg-[#f594aa]">
                                            <button className="w-[100%] cursor-pointer h-[29px] border-[#b1bad3]">
                                              <div className="leading-[0px] font-[700] relative top-[-5px] text-[11px]">
                                                {formatNumber(o.lay.price)}
                                              </div>
                                              <div className="leading-[0px] relative top-[6px] text-[11px]">
                                                {formatNumber(o.lay.size)}
                                              </div>
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer and modals remain the same */}

                {/* Modals */}
                {/* Rules Modal */}
                <div
                  onClick={() => setShowModal(false)}
                  className={`fixed inset-0 bg-[#1a2c38]/60 flex items-center justify-center z-50 transition-opacity duration-300 ${
                    showModal
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`w-[720px] rounded shadow-lg bg-white relative transform transition-all duration-300 ${
                      showModal
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-10 opacity-0"
                    }`}
                  >
                    <div className="bg-[#071824ff] px-4 flex justify-between items-center">
                      <h2 className="text-[14px] text-[#b1bad3] font-semibold">
                        {selectedRules?.marketName || "Market"} - Rules
                      </h2>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-600 text-2xl font-bold hover:text-white cursor-pointer"
                      >
                        ×
                      </button>
                    </div>

                    <div className="p-4 text-sm text-white bg-[#213743]">
                      {/* Rules (HTML string in description.rules) */}
                      {selectedRules?.description?.rules ? (
                        <div
                          className="mb-4 text-[11px] leading-[14px]"
                          dangerouslySetInnerHTML={{
                            __html: selectedRules.description.rules,
                          }}
                        />
                      ) : (
                        <p className="text-[11px]">
                          No rules available for this market.
                        </p>
                      )}

                      {/* Wallet */}
                      {selectedRules?.description?.wallet && (
                        <p className="mb-2 text-[11px] leading-[14px]">
                          <strong>Wallet:</strong>{" "}
                          {selectedRules.description.wallet}
                        </p>
                      )}

                      {/* Market Time */}
                      {selectedRules?.description?.marketTime && (
                        <p className="mb-2 text-[11px] leading-[14px]">
                          <strong>Market Time:</strong>{" "}
                          {new Date(
                            selectedRules.description.marketTime
                          ).toLocaleString()}
                        </p>
                      )}

                      {/* Suspend Time */}
                      {selectedRules?.description?.suspendTime && (
                        <p className="mb-2 text-[11px] leading-[14px]">
                          <strong>Suspend Time:</strong>{" "}
                          {new Date(
                            selectedRules.description.suspendTime
                          ).toLocaleString()}
                        </p>
                      )}

                      {/* Betting Type */}
                      {selectedRules?.description?.bettingType && (
                        <p className="mb-2 text-[11px] leading-[14px]">
                          <strong>Betting Type:</strong>{" "}
                          {selectedRules.description.bettingType}
                        </p>
                      )}

                      {/* Market Type */}
                      {selectedRules?.description?.marketType && (
                        <p className="mb-2 text-[11px] leading-[14px]">
                          <strong>Market Type:</strong>{" "}
                          {selectedRules.description.marketType}
                        </p>
                      )}

                      {/* Regulator */}
                      {selectedRules?.description?.regulator && (
                        <p className="mb-2 text-[11px] leading-[14px]">
                          <strong>Regulator:</strong>{" "}
                          {selectedRules.description.regulator}
                        </p>
                      )}

                      {/* Persistence */}
                      {selectedRules?.description?.persistenceEnabled !==
                        undefined && (
                        <p className="mb-2 text-[11px] leading-[14px]">
                          <strong>Persistence Enabled:</strong>{" "}
                          {selectedRules.description.persistenceEnabled
                            ? "Yes"
                            : "No"}
                        </p>
                      )}

                      {/* BSP Market */}
                      {selectedRules?.description?.bspMarket !== undefined && (
                        <p className="mb-2 text-[11px] leading-[14px]">
                          <strong>BSP Market:</strong>{" "}
                          {selectedRules.description.bspMarket ? "Yes" : "No"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {open && (
                  <div
                    onClick={() => setOpen(false)}
                    className={`fixed inset-0 flex items-center justify-center bg-[#1a2c38]/60 bg-opacity-50 z-50 ${open ? "visible" : "invisible duration-400"}`}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={` w-[486px] h-[222px] bg-[#213743] rounded shadow-lg relative  ${open ? "translate-y-[0] duration-400" : "translate-y-[-50px] duration-400"}`}
                    >
                      <div className="bg-[#071824ff] px-4 flex justify-end items-center">
                        <button
                          onClick={() => setOpen(false)}
                          className="text-[#b1bad3]  text-2xl cursor-pointer font-bold hover:text-white"
                        >
                          ×
                        </button>
                      </div>

                      <div className="grid grid-cols-2 divide-x divide-gray-300 bg-[#213743]">
                        <div className="pl-6 pr-2 pt-[24px] ">
                          <h2 className="text-[14px] text-white font-semibold">
                            Please log in below
                          </h2>
                          <label className="block text-[11px] font-medium mt-2 text-gray-200">
                            Username:
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-2  mb-1"
                          />

                          <label className="block text-[11px] font-medium text-gray-200">
                            Password:
                          </label>
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded px-2  mb-2"
                          />

                          <button className="bg-gradient-to-t from-[#c3c3c3] to-[#dedede] border border-[#aaa] text-sm px-1 text-[12px] font-[600]  text-black rounded shadow hover:brightness-95">
                            Log In
                          </button>

                          <p className="mt-2 text-[11px]">
                            Forgot your{" "}
                            <a href="#" className="text-blue-600">
                              username
                            </a>{" "}
                            /{" "}
                            <a href="#" className="text-blue-600 ">
                              password
                            </a>{" "}
                            ?
                          </p>
                        </div>

                        <div className="p-4">
                          <h3 className="font-[700] leading-[24px] text-white text-[14px] mb-[10px]">
                            New to Betfair?
                          </h3>
                          <p className="text-[11px] font-[700] text-white mb-3 leading-[1]">
                            Join more than 3 million Betfair customers and
                            become part of The World's Biggest Betting
                            Community.
                          </p>
                          <p className="text-[11px] font-[700] text-white mb-3 leading-[1]">
                            Opening an account is quick and easy to do.
                          </p>
                          <button className="border border-[#8093a0] text-black bg-gray-100 px-1 text-[11px] font-[700] p-[2px_5px] rounded shadow hover:bg-gray-200">
                            Join Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-1/3">
              <DMarketRightPanel
                onCancelAll={() => {
                  setSelectedOdds([]);
                  setSelectedLayOdds([]);
                }}
                selectedOdds={selectedOdds}
                selectedLayOdds={selectedLayOdds}
                onDeleteBackBet={handleDeleteBackBet}
                onDeleteLayBet={handleDeleteLayBet}
                onProfitLossUpdate={handleProfitLossUpdate}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DMarketDetail;

export function GetRules({ id, name }: { id?: any; name?: any }) {
  return (
    <>
      <span className="odds-feature-rules flex align-middle cursor-pointer odds-status">
        <a className="odds-link-rules odds-text-link">
          <span className="odds-icon-rules bg-[#ffb900] rounded-tl-[2px] rounded-bl-[2px] w-[16px] h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-2455px]"></span>
          <span className="odds-text-rules rounded-tr-[2px] flex items-center align-center justify-content-center rounded-br-[2px] cursor-pointer bg-[#bfbfbf] text-[11px] leading-[10px] text-[#1e1e1e] border-l-[1px] pb-[0.2px] pt-[0.4px] px-[5px] relative border-[#7f7f7f] !h-4">
            Rules
          </span>
        </a>
      </span>
    </>
  );
}
