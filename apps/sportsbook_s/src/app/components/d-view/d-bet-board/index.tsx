import React, { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Icon from "@workspace/ui/icons/icons";

import { Skeleton } from "@workspace/ui/components/skeleton";
import { Span } from "next/dist/trace";

const DBetBoard = () => {
  const [activeMainBetsTab, setActiveMainBetsTab] = useState("All Bets");
  const betsData = {
    "All Bets": [
      {
        game: "Japanese Salon Privé...",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$7,812.77",
        multiplier: "0.00x",
        payout: "-$7,812.77",
        type: "negative",
      },
      {
        game: "Lightning Baccarat",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$6,000.00",
        multiplier: "7.50x",
        payout: "$45,000.00",
        type: "positive",
      },
      {
        game: "Baccarat",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$1,249.48",
        multiplier: "0.98x",
        payout: "-$31.24",
        type: "negative",
      },
      {
        game: "Crash",
        user: "zaghlala90",
        time: "10:43 AM",
        betAmount: "$2,000.00",
        multiplier: "1.50x",
        payout: "$3,000.00",
        type: "positive",
      },
      {
        game: "Jackpot District: City ...",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$80.82",
        multiplier: "158.57x",
        payout: "$12,815.97",
        type: "positive",
      },
    ],
    "High Rollers": [
      {
        event: "BEL - MAL",
        odds: "2.17",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$7,812.77",
      },
      {
        event: "BLA - IMA",
        odds: "2.17",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$7,812.77",
      },
      {
        event: "Multi (2)",
        odds: "2.17",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$7,812.77",
      },
      {
        event: "LON - SOU",
        odds: "2.17",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$7,812.77",
      },
      {
        event: "ACT - MEL",
        odds: "2.17",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$7,812.77",
      },
      {
        event: "Multi (8)",
        odds: "2.17",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$7,812.77",
      },
      {
        event: "ACT - MEL",
        odds: "2.17",
        user: "Hidden",
        time: "10:43 AM",
        betAmount: "$7,812.77",
      },
    ],
    "Race Leaderboard": [
      {
        rank: "1st",
        user: "Hidden",
        wagered: "$73,907,647.96",
        prize: "25.00%",
      },
      {
        rank: "2nd",
        user: "Hidden",
        wagered: "$73,907,647.96",
        prize: "12.00%",
      },
      {
        rank: "3rd",
        user: "Hidden",
        wagered: "$213,907,647.96",
        prize: "8.00%",
      },
      {
        rank: "4th",
        user: "Hidden",
        wagered: "$6,3907,647.96",
        prize: "6.00%",
      },
      {
        rank: "5th",
        user: "EHE...",
        wagered: "$6,907,647.96",
        prize: "5.00%",
      },
      {
        rank: "6th",
        user: "Hidden",
        wagered: "$4,907,647.96",
        prize: "3.50%",
      },
      {
        rank: "7th",
        user: "Hidden",
        wagered: "$4,907,647.96",
        prize: "2.50%",
      },
    ],
  };
  const [showSkeleton, setShowSkeleton] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabs = ["All Bets", "High Rollers", "Race Leaderboard"];

  useEffect(() => {
    setShowSkeleton(true);
    const activeIndex = tabs.indexOf(activeMainBetsTab);
    const activeTab = tabRefs.current[activeIndex];
    const container = containerRef.current;

    if (activeTab && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      // calculate offset to center active tab
      const offset =
        tabRect.left -
        containerRect.left -
        containerRect.width / 2 +
        tabRect.width / 2;

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: "smooth",
      });
    }
    setTimeout(() => {
      setShowSkeleton(false);
    }, 800);
  }, [activeMainBetsTab]);
  return (
    <TooltipProvider>
      <div className="w-full max-w-[1200px] mx-auto mt-6 max-[1025px]:mt-[23.5px] ">
        {/* Tabs */}
        <div className="overflow-x-auto overflow-y-hidden lg:overflow-visible no-scrollbar w-full">
          <div className="flex items-center w-full justify-between">
            <div className="flex bg-[#0F212E] rounded-[3rem] p-[6px] flex-shrink-0 min-w-max h-14">
              {["All Bets", "High Rollers", "Race Leaderboard"].map(
                (tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMainBetsTab(tab)}
                    className={`inline-flex relative items-center  justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] cursor-pointer
          px-5 py-[15px] text-sm leading-none rounded-full
          ${activeMainBetsTab === tab
                        ? "bg-[#2F4553] text-white"
                        : "bg-transparent text-white hover:bg-[#2F4553] hover:text-white"
                      }
          ${index > 0 ? "ml-[6px]" : ""}
        `}
                  >
                    <span className="relative top-[.5px]">{tab}</span>

                    {tab === "Race Leaderboard" && (
                      <div className="font-inherit align-baseline border-0 m-0 p-0">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#1FFF20]  relative left-[4px] top-[1px]"></span>
                      </div>
                    )}
                  </button>
                )
              )}
            </div>
            <div className="flex gap-2 items-center justify-end">
              <div
                role="button"
                tabIndex={0}
                className="hidden min-[1025px]:inline-flex z-10 relative group text-[#B1BAD3] bg-[#0E212E] cursor-pointer items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap shadow-md py-[0.8125rem] px-[1rem]"
              >
                <Icon
                  name="ghostMode"
                  className="fill-white h-[14px] w-[14px]"
                />

                <div className="absolute left-[50%] -translate-x-1/2 z-[100] top-[-50px] bg-white rounded-[.25rem] shadow-lg w-fit hidden group-hover:flex">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                  <div className="flex flex-col max-h-inherit">
                    <button
                      type="button"
                      className="inline-flex w-full cursor-pointer items-center gap-2 font-semibold whitespace-nowrap text-[rgb(47_69_83)] hover:bg-[#B1BAD3] hover:text-black px-3 py-3 text-sm justify-start"
                    >
                      Ghost Mode On
                    </button>
                  </div>
                </div>

                <span>Ghost Mode On</span>
              </div>

              <div translate="no" className="w-fit  relative max-md:hidden  top-[-1px] ">
                <select className="top-[1.8px] relative py-[8.5px] focus:border-[#567086] appearance-none  pr-[28px] w-[61px] text-white bg-[#0E212E] border-2 rounded-[0.25rem]  outline-none border-[#304553] cursor-pointer leading-[1.25rem] text-sm touch-auto shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.12)] pl-[8px] font-semibold">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                </select>

                <Icon
                  name={"arrow"}
                  width={16}
                  height={16}
                  fill="#B1BAD3"
                  className=" !w-[16px] !h-[16px] rotate-0 absolute top-[13.2px] right-[8px]"
                ></Icon>
              </div>
            </div>
          </div>
        </div>

        {activeMainBetsTab === "All Bets" && (
          <div className="overflow-x-auto mt-[4.2px]">
            <table className="w-full table-fixed border-collapse border-spacing-0 relative">
              {/* Table Head */}
              <thead className="bg-[#1A2C38] text-sm leading-[23.79px] cursor-default w-full table-fixed">
                <tr>
                  <th className="text-left p-4 text-[#b1bad3] font-semibold  w-1/6">
                    Event
                  </th>
                  <th className="text-left p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[768px]:table-cell">
                    User
                  </th>
                  <th className="text-right p-4  text-[#b1bad3] font-semibold w-1/6 hidden min-[1020px]:table-cell">
                    Time
                  </th>

                  <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[1020px]:table-cell">
                    Multiplier
                  </th>
                  <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6">
                    Bet Amount
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="w-full table-fixed">
                {betsData["All Bets"].map((bet, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                  >
                    <td className="px-4 py-4 text-left">
                      <button className="active:scale-95 flex items-center gap-2 font-semibold text-white">
                        {!showSkeleton ? (
                          <>
                            <Icon
                              name={"tab777"}
                              className="h-[14px] w-[14px]"
                              fill="rgb(177, 186, 211)"
                            ></Icon>
                            <span className="truncate text-[14px] font-semibold">
                              {bet.game}
                            </span>
                          </>
                        ) : (
                          <>
                            <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 80,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                          </>
                        )}
                      </button>
                    </td>

                    <td className="p-4 text-left text-[#b1bad3] cursor-help  w-1/6 hidden min-[768px]:table-cell">
                      {!showSkeleton ? (
                        <div className="flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                          <Icon
                            name={"hidIc"}
                            className="w-[14px] h-[14px] flex-shrink-0"
                            fill="#b1bad3"
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                tabIndex={0} // ✅ makes span focusable so tooltip works
                                className="truncate font-semibold text-[14px] font-['Proxima Nova'] cursor-help leading-[20.67px]"
                              >
                                {bet.user}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="bg-white text-[#0F212E] text-[14px] px-3 font-semibold h-[38px] flex items-center rounded shadow-lg"
                              sideOffset={6}
                            >
                              <p>This user has privacy enabled</p>
                              <TooltipArrow className="fill-white" />
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ) : (
                        <div className="flex">
                          <Skeleton
                            className="rounded-full"
                            style={{
                              width: 14,
                              height: 14,
                              background: "#b1bad3",
                            }}
                          />
                          <Skeleton
                            className="py-2"
                            style={{
                              width: 80,
                              height: 14,
                              background: "#b1bad3",
                            }}
                          />
                        </div>
                      )}
                    </td>

                    <td className="p-4 text-right text-[#b1bad3] text-[14px] font-['Proxima Nova'] cursor-default leading-[21px]  w-1/6 hidden min-[1020px]:table-cell">
                      {!showSkeleton ? (
                        <span>{bet.time}</span>
                      ) : (
                        <div className="w-full flex justify-end">
                          <Skeleton
                            className="rounded-full text-end"
                            style={{
                              width: 57,
                              height: 14,
                              background: "#b1bad3",
                            }}
                          />
                        </div>
                      )}
                    </td>

                    <td className="p-4 text-right text-[#b1bad3] text-[14px]  font-['Proxima Nova'] cursor-default  w-1/6 hidden min-[1020px]:table-cell">
                      {!showSkeleton ? (
                        <span>{bet.multiplier}33</span>
                      ) : (
                        <div className="w-full flex justify-end">
                          <Skeleton
                            className="rounded-full text-end"
                            style={{
                              width: 57,
                              height: 14,
                              background: "#b1bad3",
                            }}
                          />
                        </div>
                      )}
                    </td>

                    {/* Payout Column */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {!showSkeleton ? (
                          <>
                            <span className="text-[14px] tabular-nums text-slate-300 truncate">
                              {bet.payout}
                            </span>
                            <Icon
                              name={"dollar"}
                              className="h-[14px] w-[14px]"
                              fill="rgb(177, 186, 211)"
                            />
                          </>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 80,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeMainBetsTab === "High Rollers" && (
          <div className="overflow-x-auto mt-[4.2px]">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#1A2C38] text-sm cursor-default text-[#b1bad3]">
                <tr>
                  <th className="text-left p-4 font-semibold  leading-[23.79px] w-1/5">
                    Event
                  </th>
                  <th className="text-left p-4  font-semibold leading-[23.79px] w-1/5 hidden min-[768px]:table-cell">
                    User
                  </th>
                  <th className="text-right p-4 font-semibold leading-[23.79px] w-1/5 hidden min-[768px]:table-cell">
                    Time
                  </th>
                  <th className="text-right p-4 font-semibold leading-[23.79px] w-1/5 hidden min-[768px]:table-cell">
                    Odds
                  </th>
                  <th className="text-right p-4 font-semibold leading-[23.79px] w-1/5">
                    Bet Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {betsData["High Rollers"].map((bet, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                  >
                    <td className="px-4 py-4 text-left">
                      <button className="active:scale-95 flex items-center gap-2 font-semibold text-white">
                        {!showSkeleton ? (
                          <>
                            <Icon
                              name={"tab777"}
                              className="h-[14px] w-[14px]"
                              fill="rgb(177, 186, 211)"
                            ></Icon>
                            <span className="truncate text-[14px]">
                              {bet.event}
                            </span>
                          </>
                        ) : (
                          <>
                            <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 80,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-left">
                      <div className="flex items-center justify-start gap-1">
                        {!showSkeleton ? (
                          <>
                            <Icon
                              name={"ghostMode"}
                              className="h-[14px] w-[14px]"
                              fill="rgb(177, 186, 211)"
                            />
                            <span className="text-[14px] text-slate-300 font-semibold">
                              {bet.user}
                            </span>
                          </>
                        ) : (
                          <>
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 80,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {!showSkeleton ? (
                          <>
                            <span className="text-[14px] text-slate-300">
                              {bet.time}
                            </span>
                          </>
                        ) : (
                          <>
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 80,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {!showSkeleton ? (
                          <>
                            <span className="text-[14px] text-slate-300">
                              {bet.odds}
                            </span>
                          </>
                        ) : (
                          <>
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 80,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {!showSkeleton ? (
                          <>
                            <span className="text-[14px] text-slate-300">
                              {bet.betAmount}
                            </span>
                            <Icon
                              name={"dollar"}
                              className="h-[12px] w-[12px]"
                              fill="rgb(177, 186, 211)"
                            />
                          </>
                        ) : (
                          <>
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 80,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeMainBetsTab === "Race Leaderboard" && (
          <div className="overflow-x-auto">
            {/* Race start */}
            <div className="w-full bg-grey-600 px-2 mt-1 py-4 cursor-pointer border-b-[#213743] border-b-2 border-solid flex flex-col gap-1 items-start md:flex-row md:justify-between md:gap-0 md:items-center">
              <button
                type="button"
                className="inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none "
              >
                <Icon
                  name={"timer"}
                  className="h-[14px] w-[14px]  relative bottom-[.5px]"
                  fill="#b1bad3"
                />
                {!showSkeleton ? (
                  <span>$100k Race</span>
                ) : (
                  <Skeleton
                    className="h-3.5 w-10 "
                    style={{ width: 80, height: 14, background: "#b1bad3" }}
                  />
                )}
              </button>
              <button
                type="button"
                className="inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none "
              >
                <Icon
                  name={"graph"}
                  className="h-[14px] w-[14px] relative bottom-[1px]"
                  fill="#b1bad3"
                />
                {!showSkeleton ? (
                  <span>Ends in 22 hours</span>
                ) : (
                  <Skeleton
                    style={{ width: 80, height: 14, background: "#b1bad3" }}
                  />
                )}
              </button>
            </div>

            <table className="min-w-full border-collapse">
              <thead className="bg-[#1A2C38] text-sm cursor-default text-[#b1bad3] leading-[20.79px]">
                <tr>
                  <th className="text-left p-4 font-semibold w-1/4">Rank</th>
                  <th className="text-left p-4 font-semibold w-1/4">User</th>
                  <th className=" text-right p-4 font-semibold w-1/4">
                    <span className="flex gap-2 items-center justify-end">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icon
                            name={"questions"}
                            className="h-[14px] w-[14px] cursor-help"
                            fill="#557086ff"
                          />
                        </TooltipTrigger>

                        <TooltipContent
                          side="top"
                          className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                          sideOffset={6}
                        >
                          <p>
                            Your wager for all currencies is normalised to the
                            race currency
                          </p>
                          <TooltipArrow className="fill-white" />
                        </TooltipContent>
                      </Tooltip>

                      <span className="leading-[21px]">Wagered</span>
                    </span>
                  </th>
                  <th className="text-right p-4 font-semibold w-1/4">Prize</th>
                </tr>
              </thead>
              <tbody className="-mt-1">
                {betsData["Race Leaderboard"].map((entry, index) => (
                  // <tr
                  //   key={index}
                  //   className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}>
                  //   <td className="p-4 text-left text-[#b1bad3] rounded-l cursor-default w-1/4">
                  //     <Icon name={"guardic"} fill="rgb(177, 186, 211)" />
                  //   </td>
                  //   <td className="p-4 text-left text-white cursor-default w-1/4">
                  //     <div className="flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                  //       <Icon
                  //         name={"hidIc"}
                  //         className="w-[14px] h-[14px] flex-shrink-0"
                  //         fill="#b1bad3"
                  //       />
                  //       <span className="truncate font-semibold text-[14px] font-['Proxima Nova']">
                  //         {entry.user}
                  //       </span>
                  //     </div>
                  //   </td>

                  //   {/* <td className="px-4 py-4 text-slate-300">{entry.wagered}</td> */}
                  //   <td className="p-4 text-right cursor-default w-1/4">
                  //     <div className="flex items-center justify-end gap-1 overflow-hidden">
                  //       <Tooltip>
                  //         <TooltipTrigger asChild>
                  //           <div className="min-w-0 max-w-[45px]">
                  //             <span className="truncate block font-normal text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                  //               {entry.wagered}
                  //             </span>
                  //           </div>
                  //         </TooltipTrigger>
                  //         <TooltipContent
                  //           side="top"
                  //           className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                  //           sideOffset={6}>
                  //           <div className="flex justify-center items-center gap-1">
                  //             {entry.wagered}
                  //             <Icon
                  //               name={"dollar"}
                  //               className="h-[14px] w-[14px]"
                  //               fill="rgb(177, 186, 211)"
                  //             />
                  //           </div>
                  //           <TooltipArrow className="fill-white" />
                  //         </TooltipContent>
                  //       </Tooltip>
                  //       <span className="ml-1 truncate inline-block max-w-[6ch]">
                  //         <Icon
                  //           name="dollar"
                  //           className="w-[14px] h-[14px]"
                  //           fill="#1FFF20"
                  //         />
                  //       </span>
                  //     </div>
                  //   </td>
                  //   <td className="p-4 text-right align-middle whitespace-nowrap cursor-default text-sm text-[#b1bad3] font-medium rounded-r w-1/4">
                  //     <div className="flex justify-end items-center gap-1">
                  //       <Tooltip>
                  //         <TooltipTrigger asChild>
                  //           <span className="text-[14px] font-['Proxima_Nova',sans-serif] truncate">
                  //             {entry.prize}
                  //           </span>
                  //         </TooltipTrigger>

                  //         <TooltipContent
                  //           side="top"
                  //           className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                  //           sideOffset={6}>
                  //           <div className="flex items-center gap-1">
                  //             <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#0F212E]">
                  //               {entry.prize}
                  //             </span>
                  //             <Icon
                  //               name="dollar"
                  //               className="h-[14px] w-[14px]"
                  //               fill="#0F212E"
                  //             />
                  //           </div>
                  //           <TooltipArrow className="fill-white" />
                  //         </TooltipContent>
                  //       </Tooltip>
                  //     </div>
                  //   </td>
                  // </tr>

                  <tr
                    key={index}
                    className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                  >
                    <td className="px-4 py-4 text-left text-slate-300">
                      {!showSkeleton ? (
                        <Icon name={"guardic"} fill="rgb(177, 186, 211)" />
                      ) : (
                        <Skeleton
                          className="rounded-full"
                          style={{
                            width: 20,
                            height: 20,
                            background: "#b1bad3",
                          }}
                        />
                      )}
                    </td>
                    <td className="px-4 py-4 text-left text-white">
                      <div className="flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] text-[#b1bad3]">
                        {!showSkeleton ? (
                          <>
                            <Icon
                              name={"hidIc"}
                              className="w-[14px] h-[14px] flex-shrink-0"
                              fill="#b1bad3"
                            />
                            <span className="truncate font-semibold text-[14px]">
                              {entry.user}
                            </span>
                          </>
                        ) : (
                          <>
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 70,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            {/* <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            /> */}
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end">
                        {!showSkeleton ? (
                          <>
                            <span className=" inline-block  font-normal text-[14px] text-[#b1bad3]">
                              {entry.wagered}
                            </span>
                            <span className="ml-1 truncate inline-block max-w-[6ch]">
                              <Icon
                                name="dollar"
                                className="w-[12px] h-[12px]"
                                fill="#EAA749"
                              />
                            </span>
                          </>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Skeleton
                              className="py-2"
                              style={{
                                width: 70,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                            <Skeleton
                              className="rounded-full"
                              style={{
                                width: 14,
                                height: 14,
                                background: "#b1bad3",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-right align-middle whitespace-nowrap text-[12px] text-[#b1bad3] font-medium">
                      {!showSkeleton ? (
                        <span>{entry.prize}</span>
                      ) : (
                        <div className="flex w-full justify-end">
                          <Skeleton
                            className="py-2"
                            style={{
                              width: 70,
                              height: 14,
                              background: "#b1bad3",
                            }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
export default DBetBoard;
