"use client";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";
import React, { useEffect, useState } from "react";

const DBetBoards = () => {
  const [activeMainBetsTab, setActiveMainBetsTab] = useState("Exchange Bets");
  const [showSkeleton, setShowSkeleton] = useState(false);
  useEffect(() => {
    setShowSkeleton(true);
    setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);
  }, [activeMainBetsTab]);
  const betsData = {
    "Exchange Bets": [
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
    "Casino Bets": [
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
      { rank: "5th", user: "EHE...", wagered: "$6,907,647.96", prize: "5.00%" },
      { rank: "6th", user: "Hidden", wagered: "$4,907,647.96", prize: "3.50%" },
      { rank: "7th", user: "Hidden", wagered: "$4,907,647.96", prize: "2.50%" },
    ],
  };
  return (
    <TooltipProvider>
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Tabs */}
        <div className="overflow-x-auto overflow-y-hidden no-scrollbar w-fit">
          <div className="flex bg-[#0F212E] rounded-[3rem] p-[6px] flex-shrink-0 min-w-max h-14">
            {["Exchange Bets", "Casino Bets", "Race Leaderboard"].map(
              (tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveMainBetsTab(tab)}
                  className={`inline-flex relative items-center  justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] cursor-pointer
          px-5 py-[15px] text-sm leading-none rounded-full
          ${
            activeMainBetsTab === tab
              ? "bg-[#2F4553] text-white"
              : "bg-transparent text-white hover:bg-[#2F4553] hover:text-white"
          }
          ${index > 0 ? "ml-[6px]" : ""}
        `}
                >
                  <span>{tab}</span>

                  {tab === "Race Leaderboard" && (
                    <div className="font-inherit align-baseline border-0 m-0 p-0">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#1FFF20]  relative left-[4px]"></span>
                    </div>
                  )}
                </button>
              )
            )}
          </div>
        </div>

        {activeMainBetsTab === "Exchange Bets" && (
          <div className="overflow-x-auto mt-[4.2px]">
            <table className="w-full table-fixed border-collapse border-spacing-0 relative">
              {/* Table Head */}
              <thead className="bg-[#1A2C38] text-sm leading-[23.79px] cursor-default w-full table-fixed">
                <tr>
                  <th className="text-left p-4 text-grey-200 font-semibold  w-1/6">
                    Game
                  </th>
                  <th className="text-left p-4 text-grey-200 font-semibold w-1/6 hidden min-[768px]:table-cell">
                    User
                  </th>
                  <th className="text-right p-4  text-grey-200 font-semibold w-1/6 hidden min-[1020px]:table-cell">
                    Time
                  </th>
                  <th className="text-right p-4 text-grey-200 font-semibold w-1/6 hidden min-[768px]:table-cell">
                    Bet Amount
                  </th>
                  <th className="text-right p-4 text-grey-200 font-semibold w-1/6 hidden min-[1020px]:table-cell">
                    Multiplier
                  </th>
                  <th className="text-right p-4 text-grey-200 font-semibold w-1/6">
                    Payout
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="w-full table-fixed">
                {betsData["Exchange Bets"].map((bet, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                  >
                    {/* Game Column */}
                    <td className="px-4 py-4 text-left rounded-l  w-1/6">
                      {!showSkeleton ? (
                        <button className="active:scale-95 flex items-center gap-2 font-semibold text-white group w-full">
                          <Icon
                            name={"tab777"}
                            className="h-[14px] w-[14px] fill-[rgb(177,186,211)] group-hover:fill-white transition-colors"
                          ></Icon>
                          <span className="truncate text-[14px] font-semibold font-['Proxima_Nova',sans-serif] leading-[14px]">
                            {bet.game}
                          </span>
                        </button>
                      ) : (
                        <div className="flex gap-1">
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
                    {/* <td className="px-4 py-3 text-left text-[#b1bad3]">{bet.user}</td> */}
                    <td className="p-4 text-left text-[#b1bad3] cursor-help  w-1/6 hidden min-[768px]:table-cell">
                      <div className="flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                        {!showSkeleton ? (
                          <>
                            <Icon
                              name={"hidIc"}
                              className="w-[14px] h-[14px] flex-shrink-0"
                              fill="#b1bad3"
                            />
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="truncate font-semibold text-[14px] font-['Proxima Nova'] cursor-help leading-[20.67px]">
                                  {bet.user}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                sideOffset={6}
                              >
                                <p>This user has privacy enabled</p>
                              </TooltipContent>
                            </Tooltip>
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
                      </div>
                    </td>
                    <td className="p-4 text-right text-[#b1bad3] text-[14px] font-['Proxima Nova'] cursor-default leading-[21px]  w-1/6 hidden min-[1020px]:table-cell">
                      {!showSkeleton ? (
                        <>{bet.time}</>
                      ) : (
                        <div className="w-full flex justify-end">
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
                    <td className="p-4 text-right cursor-default  w-1/6 leading-[20.67px] hidden min-[768px]:table-cell">
                      <div className="flex items-center justify-end gap-1">
                        {!showSkeleton ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#b1bad3] truncate">
                                  {bet.betAmount}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                sideOffset={6}
                              >
                                <div className="flex justify-center items-center gap-1">
                                  {bet.betAmount}
                                  <Icon
                                    name={"betAmount"}
                                    className="h-[14px] w-[14px]"
                                    fill="rgb(177, 186, 211)"
                                  />
                                </div>
                              </TooltipContent>
                            </Tooltip>
                            <Icon
                              name={"betAmount"}
                              className="h-[14px] w-[14px]"
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
                    <td className="p-4 text-right text-[#b1bad3] text-[14px]  font-['Proxima Nova'] cursor-default  w-1/6 hidden min-[1020px]:table-cell">
                      {!showSkeleton ? (
                        <>{bet.multiplier}33</>
                      ) : (
                        <div className="w-full flex justify-end">
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

                    {/* Payout Column */}
                    <td className="p-4 text-right rounded-r cursor-default  w-1/6 leading-[20.67px]">
                      <div className="flex items-center justify-end gap-1">
                        {!showSkeleton ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#b1bad3] truncate tabular-nums">
                                  {bet.payout}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                sideOffset={6}
                              >
                                <div className="flex justify-center items-center gap-1">
                                  {bet.payout}
                                  <Icon
                                    name={"dollar"}
                                    className="h-[14px] w-[14px]"
                                    fill="rgb(177, 186, 211)"
                                  />
                                </div>
                              </TooltipContent>
                            </Tooltip>
                            <Icon
                              name={"dollar"}
                              className="h-[14px] w-[14px]"
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

        {activeMainBetsTab === "Casino Bets" && (
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
                {betsData["Casino Bets"].map((bet, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                  >
                    <td className="p-4 text-left rounded-l w-1/5">
                      {!showSkeleton ? (
                        <button className="active:scale-95 flex items-center gap-2 font-semibold text-white cursor-pointer">
                          <Icon
                            name={"tab777"}
                            className="h-[14px] w-[14px] hover:fill-white"
                            fill="rgb(177, 186, 211)"
                          ></Icon>
                          <span className="truncate text-[14px] font-['Proxima_Nova',sans-serif]">
                            {bet.event}
                          </span>
                        </button>
                      ) : (
                        <div className="flex gap-2">
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
                    <td className="p-4 text-left text-[#b1bad3] text-sm cursor-help w-1/5 hidden min-[768px]:table-cell">
                      <div className="flex items-center gap-1 max-w-[150px] overflow-hidden font-['Proxima Nova'] text-[#b1bad3]">
                        {!showSkeleton ? (
                          <>
                            <Icon
                              name={"hidIc"}
                              className="w-[14px] h-[14px] flex-shrink-0"
                              fill="#b1bad3"
                            />
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="truncate font-semibold text-[14px] font-['Proxima Nova']">
                                  {bet.user}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                sideOffset={6}
                              >
                                <p>This user has privacy enabled</p>
                              </TooltipContent>
                            </Tooltip>
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
                      </div>
                    </td>

                    <td className="p-4 text-right text-[#b1bad3] text-sm cursor-default w-1/5 hidden min-[768px]:table-cell">
                      {!showSkeleton ? (
                        <>{bet.time}</>
                      ) : (
                        <div className="w-full flex justify-end">
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
                    <td className="p-4 text-right text-[#b1bad3] text-sm cursor-default w-1/5 hidden min-[768px]:table-cell">
                      {!showSkeleton ? (
                        <>{bet.odds}</>
                      ) : (
                        <div className="w-full flex justify-end">
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
                    <td className="p-4 text-right text-sm cursor-default text-[#b1bad3] rounded-r w-1/5">
                      <div className="flex justify-end items-center gap-1">
                        {!showSkeleton ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-[14px] font-['Proxima_Nova',sans-serif] truncate">
                                  {bet.betAmount}
                                </span>
                              </TooltipTrigger>

                              <TooltipContent
                                side="top"
                                className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                sideOffset={6}
                              >
                                <div className="flex items-center gap-1">
                                  <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#0F212E]">
                                    {bet.betAmount}
                                  </span>
                                  <Icon
                                    name="dollar"
                                    className="!h-[14px] !w-[14px]"
                                    fill="#0F212E"
                                  />
                                </div>
                              </TooltipContent>
                            </Tooltip>

                            <Icon
                              name="dollar"
                              className="h-[14px] w-[14px]"
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
            <div className="w-full bg-grey-600 px-2 py-4 cursor-pointer border-b-[#213743] border-b-2 border-solid flex flex-col gap-1 items-start md:flex-row md:justify-between md:gap-0 md:items-center">
              <button className="inline-flex relative cursor-pointer group items-center gap-2 justify-center  font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                <Icon
                  name={"betRace"}
                  className="h-[14px] w-[14px]  group-hover:fill-white inline-block"
                  fill="rgb(177, 186, 211)"
                ></Icon>
                {!showSkeleton ? (
                  <span>$100k Race</span>
                ) : (
                  <div className="w-full flex justify-end">
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
              </button>
              <button className="inline-flex relative cursor-pointer group items-center gap-2 justify-center font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                <Icon
                  name={"raceTime"}
                  className="h-[14px] w-[14px]  group-hover:fill-white"
                  fill="rgb(177, 186, 211)"
                ></Icon>
                {!showSkeleton ? (
                  <> Ends in 6 hours</>
                ) : (
                  <div className="w-full flex justify-end">
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
                        </TooltipContent>
                      </Tooltip>

                      <span className="leading-[21px] -translate-y-[1px]">
                        Wagered
                      </span>
                    </span>
                  </th>
                  <th className="text-right p-4 font-semibold w-1/4">Prize</th>
                </tr>
              </thead>
              <tbody className="-mt-1">
                {betsData["Race Leaderboard"].map((entry, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                  >
                    <td className="p-4 text-left text-[#b1bad3] rounded-l cursor-default w-1/4">
                      {!showSkeleton ? (
                        <Icon name={"guardic"} fill="rgb(177, 186, 211)" />
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
                        </>
                      )}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-left text-white w-1/4",
                        entry?.user.toLocaleLowerCase() == "hidden"
                          ? "cursor-help"
                          : "cursor-pointer"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] ",
                          entry?.user.toLocaleLowerCase() == "hidden"
                            ? "text-[#b1bad3]"
                            : "text-white"
                        )}
                      >
                        {!showSkeleton ? (
                          <>
                            {entry?.user.toLocaleLowerCase() == "hidden" && (
                              <Icon
                                name={"hidIc"}
                                className="w-[14px] h-[14px] flex-shrink-0"
                                fill="#b1bad3"
                              />
                            )}
                            {entry?.user.toLocaleLowerCase() == "hidden" ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="truncate font-semibold text-[14px] font-['Proxima Nova']">
                                    {entry.user}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                  sideOffset={6}
                                >
                                  <p>This user has privacy enabled</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <span className="truncate font-semibold text-[14px] font-['Proxima Nova']">
                                {entry.user}
                              </span>
                            )}
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
                      </div>
                    </td>

                    {/* <td className="px-4 py-4 text-slate-300">{entry.wagered}</td> */}
                    <td className="p-4 text-right cursor-default w-1/4">
                      <div className="flex items-center justify-end gap-1">
                        {!showSkeleton ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="truncate inline-block  font-normal text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                                  {entry.wagered}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                sideOffset={6}
                              >
                                <div className="flex justify-center items-center gap-1">
                                  {entry.wagered}
                                  <Icon
                                    name={"dollar"}
                                    className="h-[14px] w-[14px]"
                                    fill="rgb(177, 186, 211)"
                                  />
                                </div>
                              </TooltipContent>
                            </Tooltip>
                            <span className="ml-1 truncate inline-block max-w-[6ch]">
                              <Icon
                                name="dollar"
                                className="w-[14px] h-[14px]"
                                fill="#1FFF20"
                              />
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
                    <td className="p-4 text-right align-middle whitespace-nowrap cursor-default text-sm text-[#b1bad3] font-medium rounded-r w-1/4">
                      <div className="flex justify-end items-center gap-1">
                        {!showSkeleton ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-[14px] font-['Proxima_Nova',sans-serif] truncate">
                                  {entry.prize}
                                </span>
                              </TooltipTrigger>

                              <TooltipContent
                                side="top"
                                className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                sideOffset={6}
                              >
                                <div className="flex items-center gap-1">
                                  <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#0F212E]">
                                    {entry.prize}
                                  </span>
                                  <Icon
                                    name="dollar"
                                    className="h-[14px] w-[14px]"
                                    fill="#0F212E"
                                  />
                                </div>
                              </TooltipContent>
                            </Tooltip>

                            <Icon
                              name="dollar"
                              className="h-[14px] w-[14px]"
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
      </div>
    </TooltipProvider>
  );
};

export default DBetBoards;
