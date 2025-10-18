"use client";

import React, { useEffect, useState } from "react";
import { DMarketRightPanel } from "../d-market-rightpanel";
import { log } from "console";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { CONFIG } from "@workspace/ui/config/config";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useRouter } from "next/navigation";
import DSportNav from "../d-sport-nav";
interface HeaderData {
  label?: string;
  type?: "button" | "text";
  align?: "left" | "right" | "center";
  bg?: string;
}

interface OddsCell {
  odd: string;
  amount: string;
  bg?: string;
}

interface PastRace {
  date: string;
  course: string;
  distance: string;
  going: string;
  position: string;
  type: string;
  or: string;
  bsp: string;
  hiLo: string;
  jockey: string;
}

interface RowData {
  trainer: string;
  team: string;
  silkUrl: string;
  number: number;
  odds: OddsCell[];
  bspData?: {
    back: string;
    lay: string;
  };
  details?: {
    form: string;
    trainer: string;
    age: number;
    weight: string;
    rating: number;
    equipment: string;
    pedigree: string;
    comments: string;
    pastRaces?: PastRace[];
  };
}

interface MarketData {
  marketId: string;
  marketName: string;
  marketType: string;
  runners: any[];
  runnersName: any[];
  popular: boolean;
}

const DRacingMarketDetail = ({
  sportId,
  eventId,
}: {
  sportId: string;
  eventId: string;
}) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedOdds, setSelectedOdds] = useState<
    { price: string; size: string; name?: string }[]
  >([]);

  const [selectedLayOdds, setSelectedLayOdds] = useState<
    { price: string; size: string; name?: string }[]
  >([]);

  const [bspChecked, setBspChecked] = useState(false);
  const [timeformChecked, setTimeformChecked] = useState(false);

  // Market data state
  const [marketData, setMarketData] = useState<any>({});
  const [marketTabs, setMarketTabs] = useState<MarketData[]>([]);
  const [runnersData, setRunnersData] = useState<any[]>([]);
  const [eventInfo, setEventInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    // Fetch market data
    runtimeApiService
      .marketList({
        key: CONFIG.siteKey2,
        eventId: eventId,
        sportId: sportId,
      })
      .then((data) => {
        const record = data?.data ?? {};
        setMarketData(record);

        // Extract market tabs from the response
        const markets = record.matchOddsData || [];
        setMarketTabs(markets);

        // Set active tab to the first market if available
        if (markets.length > 0 && !activeTab) {
          setActiveTab(markets[0].marketId);
          updateRunnersData(markets[0]);
        }

        // Set event info
        if (markets.length > 0) {
          setEventInfo(markets[0].event || {});
        }
      })
      .catch((error) => {
        console.error("Error fetching market data:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when done
      });
  }, [eventId, sportId]);

  // Update runners data when active tab changes
  useEffect(() => {
    const currentMarket = marketTabs.find(
      (market) => market.marketId === activeTab
    );
    if (currentMarket) {
      updateRunnersData(currentMarket);
    }
  }, [activeTab, marketTabs]);

  const updateRunnersData = (market: MarketData) => {
    if (!market.runners || !market.runnersName) {
      setRunnersData([]);
      return;
    }

    // Combine runners data with runner names
    const combinedRunners = market.runners.map((runner, index) => {
      const runnerNameInfo =
        market.runnersName.find(
          (r: any) => r.selectionId === runner.selectionId
        ) || {};

      return {
        ...runner,
        ...runnerNameInfo,
        number: index + 1,
        odds: generateOddsCells(runner),
        bspData: {
          back: "SP",
          lay: "SP",
        },
      };
    });

    setRunnersData(combinedRunners);
  };

  const generateOddsCells = (runner: any): OddsCell[] => {
    // Generate odds cells based on runner data
    const backOdds = runner.ex?.availableToBack || [];
    const layOdds = runner.ex?.availableToLay || [];

    const oddsCells: OddsCell[] = [];

    // Add back odds (first 3)
    for (let i = 0; i < 3; i++) {
      if (backOdds[i]) {
        oddsCells.push({
          odd: backOdds[i].price.toString(),
          amount: `${backOdds[i].size}`,
          bg: i === 2 ? "#A6D8FF" : undefined,
        });
      } else {
        oddsCells.push({ odd: "", amount: "" });
      }
    }

    // Add lay odds (first 3)
    for (let i = 0; i < 3; i++) {
      if (layOdds[i]) {
        oddsCells.push({
          odd: layOdds[i].price.toString(),
          amount: `${layOdds[i].size}`,
          bg: i === 0 ? "#FAC9D1" : undefined,
        });
      } else {
        oddsCells.push({ odd: "", amount: "" });
      }
    }

    return oddsCells;
  };

  const getHeaderData = (bspChecked: boolean): HeaderData[] => {
    const baseHeaders: HeaderData[] = [
      {
        label: `${runnersData.length} selections`,
        type: "text",
        align: "left",
      },
      { label: "100.8%", type: "text", align: "left" },
      { label: "Back ", type: "button", align: "right", bg: "#a6d8ff" },
    ];

    if (bspChecked) {
      baseHeaders.push({ label: "BSP", type: "text", align: "center" });
    }

    baseHeaders.push(
      { label: "Lay ", type: "button", align: "left", bg: "#fac9d4" },
      { label: "99.4%", type: "text", align: "right" }
    );

    return baseHeaders;
  };
  const handleDeleteBackBet = (index: number) => {
    setSelectedOdds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteLayBet = (index: number) => {
    setSelectedLayOdds((prev) => prev.filter((_, i) => i !== index));
  };
  const handleOddsClick = (
    price: string,
    size: string,
    type: "back" | "lay",
    name?: string
  ) => {
    const newOdd = { price, size, name };

    if (type === "back") {
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

  // Format event time for display
  const formatEventTime = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const route = useRouter();

  const handleChnage = () => {
    route.push("/");
  };
  const GBP = "\u00A3";
  return (
    <>
      <DSportNav onSelect={handleChnage} />
      <div className="flex px-[3vw] py-6">
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
              <div className="bg-[#213743] font-[proxima-nova, sans-serif] rounded shadow-sm text-sm">
                {/* Header */}
                <div className="bg-[#1A2C38] text-white px-[8px] pt-[5] pb-[4px] font-semibold justify-between flex">
                  <div className="flex flex-col w-[100%] justify-between w-[fit-content] leading-[24px]">
                    <span className="text-[20px] font-[100] leading-[24px]">
                      {eventInfo.name || "Loading event..."}
                    </span>
                    <div className="text-[12px] font-[Arial,Helvetica,sans-serif] font-[100] mt-[4px] leading-[18px]">
                      {formatEventTime(eventInfo.openDate)}
                    </div>
                  </div>
                  <div className="font-[Arial,Helvetica,sans-serif]">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-2.5 bg-[url('/sprite.41aea95fa.png')] bg-no-repeat [background-position:0_-774px] mt-1 mr-1"></div>
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

                {/* Dynamic Tabs */}
                <ul className="h-[32px] flex text-[#1e1e1e] p-0 w-full bg-[#04222E] border-[#b1bad3] overflow-x-auto scrollbar-hidden">
                  {marketTabs.map((market) => (
                    <li
                      key={market.marketId}
                      onClick={() => setActiveTab(market.marketId)}
                      className={`cursor-pointer flex items-center justify-center w-[120px] h-[31px] border-r 
                  ${
                    activeTab === market.marketId
                      ? "border-t-[2px] border-[#0E212E] bg-[#304553] text-white font-bold"
                      : "border-t-[2px] border-transparent bg-[#0E212E] text-white"
                  }
                `}
                    >
                      <a className="block px-4 py-1">
                        <h4 className="text-[12px] whitespace-nowrap">
                          {market.marketName}
                        </h4>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Match Info */}
                <div className="p-2 mr-2 ml-2 border-b bg-[#213743] text-white flex flex-col text-xs">
                  <div className="flex justify-between items-center">
                    {/* Left side */}
                    <div className="odds-main flex items-center space-x-3">
                      {/* In-Play */}
                      <span
                        onClick={() => setOpen(true)}
                        className="odds-icon-status bg-[#7f7f7f] relative top-[-1.1px] w-[16px] hover:bg-[yellow] cursor-pointer mt-1 mr-1 h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat rounded-[4px] bg-[0px_-1096px]"
                      ></span>

                      <div className="flex items-center h-[16px]">
                        <span className="bg-[#7f7f7f] w-[16px] h-[16px] inline-block mr-1 bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1202px]" />
                        <span className="text-[11px]">Going In-Play</span>
                      </div>

                      {/* Cash Out */}
                      <div className="flex items-center h-[16px]">
                        <span className="bg-[#ffb900] w-[16px] h-[16px] inline-block mr-1 bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-1032px]" />
                        <span className="text-[11px]">Cash Out</span>
                      </div>

                      {/* Rules */}
                      <div className="flex items-center h-[16px] cursor-pointer">
                        <span className="odds-feature-rules align-middle cursor-pointer odds-status">
                          <a className="odds-link-rules odds-text-link">
                            <span className="odds-icon-rules bg-[#ffb900] rounded-tl-[2px] rounded-bl-[2px]  w-[16px] h-[16px] float-left bg-[url('/sprite.41aea95fa.png')] bg-no-repeat bg-[0px_-2455px] "></span>
                            <span
                              onClick={() => setShowModal(true)}
                              className="odds-text-rules rounded-tr-[2px] pt-[0.5px] rounded-br-[2px] cursor-pointer bg-[#bfbfbf] text-[11px] leading-[0px] h-[15px] text-[#1e1e1e] border-l-[1px] p-[0.1px_5px] relative  border-[#7f7f7f]"
                            >
                              Rules
                            </span>
                          </a>
                        </span>
                      </div>

                      {/* BSP */}
                      <label className="flex items-center h-[16px] ml-2 cursor-pointer">
                        <input
                          type="checkbox"
                          id="bsp"
                          checked={bspChecked}
                          onChange={() => setBspChecked(!bspChecked)}
                          className="mr-1"
                        />
                        <span className="text-[11px]">BSP</span>
                      </label>

                      {/* Timeform */}
                      <label className="flex items-center h-[16px] ml-2 cursor-pointer">
                        <input
                          type="checkbox"
                          id="timeform"
                          checked={timeformChecked}
                          onChange={() => setTimeformChecked(!timeformChecked)}
                          className="mr-1"
                        />
                        <span className="text-[11px]">Timeform</span>
                      </label>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center h-[16px]">
                      <span className="mr-1">Matched:</span>
                      <span className="font-bold">
                        {GBP} {formatNumber(25878.36)}
                      </span>
                      <button className="ml-2 bg-[#bfbfbf] text-gray-800 px-[10px] cursor-pointer text-[11px]  rounded-[2px] text-xs">
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-2">
                  {/* Odds Table */}
                  <table className="m-[5px_8px_2px] bg-[#213743] w-[calc(100%_-16px)]">
                    <thead>
                      <tr className="align-bottom text-[white]">
                        {getHeaderData(bspChecked).map((col, i) => (
                          <th
                            key={i}
                            className={`leading-[18px] font-[400] 
                      ${col.align === "left" ? "text-left" : ""}
                      ${col.align === "right" ? "text-right" : ""}
                      ${col.align === "center" ? "text-center" : ""}
                      ${i === 1 ? "pl-3 w-[10%]" : ""}
                      ${i === 0 ? "w-[50%]" : ""}
                      ${i === 2 || (i === 3 && !bspChecked) || (i === 4 && bspChecked) ? "w-[16%]" : ""}
                      ${(!bspChecked && i === 4) || (bspChecked && i === 5) ? "w-[8%]" : ""}
                      ${bspChecked && i === 3 ? "w-[8%] " : ""}
                      ${bspChecked && i === 2 ? "flex justify-start w-full" : ""}
                    `}
                          >
                            {col.type === "button" ? (
                              <div
                                className={`flex ${bspChecked ? "w-full" : ""}  ${
                                  col.align === "center"
                                    ? "justify-center"
                                    : col.align === "right"
                                      ? "justify-end  relative left-[5px]"
                                      : "justify-start relative left-1"
                                }`}
                              >
                                <button
                                  className={`${bspChecked && i === 2 ? "w-full relative -left-[3px]" : ""} bg-[${col.bg}] w-[52%] p-[3px_5px] h-[18px] leading-[13px] text-[11px] cursor-pointer
                              ${col.label == "Lay all" ? "hover:bg-[#F594AA]" : "hover:bg-[#75C2FD]"}
        `}
                                >
                                  <span className="text-[black] font-[700]">
                                    {col.label}
                                  </span>
                                </button>
                              </div>
                            ) : (
                              <span>{col.label}</span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  </table>

                  {/* Runners Table */}

                  <table className="text-white bg-[#213743] w-full h-full">
                    <tbody>
                      {runnersData.map((runner, rowIndex) => (
                        <React.Fragment key={runner.selectionId || rowIndex}>
                          {/* Main row */}
                          <tr className="h-full border-b border-[#b1bad3]">
                            {/* Team column */}
                            <td className="border-t pl-2 border-[#b1bad3]">
                              <div className="flex items-center h-[29px]">
                                {/* Dropdown icon */}
                                {timeformChecked && (
                                  <button
                                    onClick={() =>
                                      setExpandedRow(
                                        expandedRow === rowIndex
                                          ? null
                                          : rowIndex
                                      )
                                    }
                                    className="w-[14px] h-[14px] mr-1 cursor-pointer transform transition-transform"
                                  >
                                    <svg
                                      viewBox="0 0 100 100"
                                      className={`fill-white w-[12px] h-[12px] transition-transform ${
                                        expandedRow === rowIndex
                                          ? "rotate-90"
                                          : "rotate-270"
                                      }`}
                                    >
                                      <path d="M68.496,0.028L18.44,50.083l48.81,50.055l12.514-12.514L43.468,50.083l37.543-37.542 L68.496,0.028z"></path>
                                    </svg>
                                  </button>
                                )}

                                {/* Graph icon */}
                                <div className="w-[13px] h-[29px] pl-[2px]">
                                  <button className="mt-[7px] h-[17px] cursor-pointer [filter:brightness(0)_invert(1)] bg-[url('/sprite.41aea95fa.png')] bg-no-repeat w-full bg-[0px_-193px]" />
                                </div>

                                {/* Runner number */}
                                <div className="w-[16px] text-center text-[12px]">
                                  {runner.number}
                                </div>

                                {/* Silk/Jersey image */}
                                <div className="w-[20px] h-[20px] mx-2">
                                  <img
                                    src={`https://content-cache.cdnbf.net/feeds_images/Horses/SilkColours/${runner.metadata.COLOURS_FILENAME}`}
                                    alt="Silk"
                                    className="w-full h-full object-contain"
                                  />
                                </div>

                                {/* Name + Trainer */}
                                <div className="flex flex-col leading-tight">
                                  <h3 className="text-[13px] font-[700] text-white leading-[14px]">
                                    {runner.runnerName}
                                  </h3>
                                  <span className="text-[11px] text-[#ccc] leading-[12px]">
                                    {runner.metadata?.TRAINER_NAME}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Conditional rendering based on BSP */}
                            {!bspChecked ? (
                              // Normal mode: Show all 6 odds columns
                              runner.odds.map((cell: OddsCell, i: number) => {
                                const isBack = i <= 2; // first 3 are back
                                const isLay = i >= 3; // last 3 are lay
                                return (
                                  <td
                                    key={i}
                                    className={`min-w-0 w-[7.99%] border-t border-b border-[#b1bad3] 
                    ${i === 2 ? "bg-[#A6D8FF] hover:bg-[#75C2FD] text-black" : ""}
                    ${i === 3 ? "bg-[#FAC9D1] hover:bg-[#F594AA] text-black" : ""}
                    ${i !== 2 && i !== 3 ? "hover:bg-[#1A2C38]" : ""}
                  `}
                                  >
                                    <button
                                      onClick={() =>
                                        handleOddsClick(
                                          cell.odd || "0",
                                          cell.amount || "0",
                                          isBack ? "back" : "lay",
                                          runner.runnerName
                                        )
                                      }
                                      className="mb-0 border-r border-l h-[29px] w-full cursor-pointer border-[#b1bad3]"
                                    >
                                      <div className="font-[700] text-[11px] leading-[0px] relative top-[-5px]">
                                        {cell.odd || "0"}
                                      </div>
                                      <div className="text-[11px] leading-[0px] relative top-[6px]">
                                        {cell.amount || "0"}
                                      </div>
                                    </button>
                                  </td>
                                );
                              })
                            ) : (
                              // BSP mode
                              <>
                                {/* First 2 odds columns (Back) */}
                                {runner.odds
                                  .slice(0, 2)
                                  .map((cell: OddsCell, i: number) => (
                                    <td
                                      key={i}
                                      className={`min-w-0 w-[7.99%] border-t border-b border-[#b1bad3] 
                    ${cell.bg === "#A6D8FF" ? "bg-[#A6D8FF]" : ""}
                    ${cell.bg === "#FAC9D1" ? "bg-[#FAC9D1]" : ""}
                    hover:bg-[#1A2C38]
                  `}
                                    >
                                      <button
                                        onClick={() =>
                                          handleOddsClick(
                                            cell.odd || "0",
                                            cell.amount || "0",
                                            "back",
                                            runner.runnerName
                                          )
                                        }
                                        className="mb-0 border h-[29px] w-full cursor-pointer border-[#b1bad3]"
                                      >
                                        <div className="font-[700] text-[11px] leading-[0px] relative top-[-5px]">
                                          {cell.odd || "0"}
                                        </div>
                                        <div className="text-[11px] leading-[0px] relative top-[6px]">
                                          {cell.amount || "0"}
                                        </div>
                                      </button>
                                    </td>
                                  ))}

                                {/* Back All column */}
                                <td className="min-w-0 w-[7.99%] border-t border-b border-[#b1bad3] bg-[#A6D8FF] hover:bg-[#75C2FD] text-black">
                                  <button
                                    onClick={() =>
                                      handleOddsClick(
                                        runner.odds[2]?.odd || "0",
                                        runner.odds[2]?.amount || "0",
                                        "back",
                                        runner.runnerName
                                      )
                                    }
                                    className="mb-0 border h-[29px] w-full cursor-pointer border-[#b1bad3]"
                                  >
                                    <div className="font-[700] text-[11px] leading-[0px] relative top-[-5px]">
                                      {runner.odds[2]?.odd || "0"}
                                    </div>
                                    <div className="text-[11px] leading-[0px] relative top-[6px]">
                                      {runner.odds[2]?.amount || "0"}
                                    </div>
                                  </button>
                                </td>

                                {/* BSP Back column */}
                                <td className="min-w-0 w-[4%] border-t border-b border-[#b1bad3] bg-[#A6D8FF] hover:bg-[#75C2FD] text-black">
                                  <button className="mb-0 border h-[29px] w-full cursor-pointer border-[#b1bad3]">
                                    <div className="font-[700] text-[11px] leading-[14.5px]">
                                      {runner.bspData?.back || "SP"}
                                    </div>
                                  </button>
                                </td>

                                {/* BSP Lay column */}
                                <td className="min-w-0 w-[4%] border-t border-b border-[#b1bad3] bg-[#FAC9D1] hover:bg-[#F594AA] text-black">
                                  <button className="mb-0 border h-[29px] w-full cursor-pointer border-[#b1bad3]">
                                    <div className="font-[700] text-[11px] leading-[14.5px]">
                                      {runner.bspData?.lay || "SP"}
                                    </div>
                                  </button>
                                </td>

                                {/* Lay All column */}
                                <td className="min-w-0 w-[7.99%] border-t border-b border-[#b1bad3] bg-[#FAC9D1] hover:bg-[#F594AA] text-black">
                                  <button
                                    onClick={() =>
                                      handleOddsClick(
                                        runner.odds[3]?.odd || "0",
                                        runner.odds[3]?.amount || "0",
                                        "lay",
                                        runner.runnerName
                                      )
                                    }
                                    className="mb-0 border h-[29px] w-full cursor-pointer border-[#b1bad3]"
                                  >
                                    <div className="font-[700] text-[11px] leading-[0px] relative top-[-5px]">
                                      {runner.odds[3]?.odd || "0"}
                                    </div>
                                    <div className="text-[11px] leading-[0px] relative top-[6px]">
                                      {runner.odds[3]?.amount || "0"}
                                    </div>
                                  </button>
                                </td>

                                {/* Last 2 odds columns (Lay) */}
                                {runner.odds
                                  .slice(4)
                                  .map((cell: OddsCell, i: number) => (
                                    <td
                                      key={i + 4}
                                      className={`min-w-0 w-[7.99%] border-t border-b border-[#b1bad3] 
                    ${cell.bg === "#A6D8FF" ? "bg-[#A6D8FF]" : ""}
                    ${cell.bg === "#FAC9D1" ? "bg-[#FAC9D1]" : ""}
                    hover:bg-[#1A2C38]
                  `}
                                    >
                                      <button
                                        onClick={() =>
                                          handleOddsClick(
                                            cell.odd || "0",
                                            cell.amount || "0",
                                            "lay",
                                            runner.runnerName
                                          )
                                        }
                                        className="mb-0 border h-[29px] w-full cursor-pointer border-[#b1bad3]"
                                      >
                                        <div className="font-[700] text-[11px] leading-[0px] relative top-[-5px]">
                                          {cell.odd || "0"}
                                        </div>
                                        <div className="text-[11px] leading-[0px] relative top-[6px]">
                                          {cell.amount || "0"}
                                        </div>
                                      </button>
                                    </td>
                                  ))}
                              </>
                            )}
                          </tr>

                          {/* Expanded row */}
                          {expandedRow === rowIndex && timeformChecked && (
                            <tr>
                              <td colSpan={bspChecked ? 8 : 7} className="p-0">
                                <div className="p-2 text-white bg-[#213743] text-[12px]">
                                  <div className="flex justify-between mb-2">
                                    <div>
                                      <div>
                                        <strong>Form:</strong>{" "}
                                        {runner.metadata?.FORM || "N/A"}
                                      </div>
                                      <div>
                                        <strong>Trainer:</strong>{" "}
                                        {runner.metadata?.TRAINER_NAME || "N/A"}
                                      </div>
                                      <div>
                                        <strong>Age:</strong>{" "}
                                        {runner.metadata?.AGE || "N/A"} &nbsp;
                                        <strong>Weight:</strong>{" "}
                                        {runner.metadata?.WEIGHT_VALUE || "N/A"}{" "}
                                        &nbsp;
                                        <strong>Official Rating:</strong>{" "}
                                        {runner.metadata?.OFFICIAL_RATING ||
                                          "N/A"}
                                      </div>
                                      <div>
                                        <strong>Jockey:</strong>{" "}
                                        {runner.metadata?.JOCKEY_NAME || "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              />
            </div>

            <div
              className={`fixed inset-0 bg-[#1a2c38]/60 flex items-center justify-center z-50  ${showModal ? "visible" : "invisible duration-400"}`}
            >
              <div
                className={` w-[720px] rounded shadow-lg bg-white relative  ${showModal ? "translate-y-[0] duration-400" : "translate-y-[-50px] duration-400"}`}
              >
                {/* Header */}
                <div className="bg-[#071824ff] px-4  flex justify-between items-center">
                  <h2 className="text-[14px] text-[#b1bad3] font-semibold">
                    Match Odds - Rules
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-600 text-2xl font-bold hover:text-white cursor-pointer"
                  >
                    ×
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 text-sm text-white bg-[#213743]">
                  <p className="mb-2 text-[11px] leading-[10px]">
                    <strong className="text-[11px]">Event Start Time</strong>
                    <br />
                    N/A <br />
                    Win Only Market
                  </p>

                  <p className="mb-2  text-[11px] leading-[10px]">
                    <strong>Predict the result of this match.</strong>
                    <br />
                    All bets apply to Full Time according to the match
                    officials, plus any stoppage time. Extra-time/penalty
                    shoot-outs are not included.
                  </p>

                  <p className="mb-[10px] text-[11px]">
                    For further information please see{" "}
                    <a className="text-[#b1bad3] underline">Rules &amp; Regs</a>
                  </p>

                  <p className="  text-[11px] leading-[10px]">
                    <strong>UK wallet</strong>
                    <br />
                    Commission on this market <br />
                    Log in to see your commission rate
                  </p>

                  <a className="text-[#b1bad3]  text-[11px] underline">
                    Your Discount Rate explained
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DRacingMarketDetail;
