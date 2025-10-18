"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@workspace/ui/store/store";
import Icon from "@workspace/ui/icons/icons";
import { Skeleton } from "@workspace/ui/components/skeleton";

const MBet = () => {
  const { closeDrawer, activeDrawer } = useAppStore();
  const [activeMainBetsTab, setActiveMainBetsTab] = useState("All Bets");
  const [showSkeleton, setShowSkeleton] = useState(false);
  const betsData = {
    "All Bets": [
      { game: "In Jazz", payout: "$1,406.63", type: "positive" },
      { game: "Roman Bonanza", payout: "-$949.00", type: "negative" },
      { game: "Baccarat", payout: "-$1,560.00", type: "negative" },
      {
        game: "Platinum Privé Blackj...",
        payout: "$3,983.74",
        type: "positive",
      },
      { game: "Dragon Tiger", payout: "-$1,362.64", type: "negative" },
      { game: "Fairytale Fortune", payout: "CA$17,000.00", type: "jackpot" },
      { game: "Sweet Bonanza 1000", payout: "$4,574.77", type: "positive" },
    ],
    "High Rollers": [
      { event: "BEL - MAL", amount: "$2,600.00" },
      { event: "BLA - IMA", amount: "$2,321.68" },
      { event: "Multi (2)", amount: "$1,243.00" },
      { event: "LON - SOU", amount: "$2,100.00" },
      { event: "ACT - MEL", amount: "$1,600.00" },
      { event: "Multi (8)", amount: "$2,000.00" },
      { event: "ACT - MEL", amount: "$1,136.00" },
    ],
    Races: [
      { rank: "1st", user: "Hidden", wagered: "$91,6...", prize: "25.00%" },
      { rank: "2nd", user: "Hidden", wagered: "$75,2...", prize: "12.00%" },
      { rank: "3rd", user: "Hidden", wagered: "$21,7...", prize: "8.00%" },
      { rank: "4th", user: "Hidden", wagered: "$6,39...", prize: "6.00%" },
      { rank: "5th", user: "EHE...", wagered: "$6,25...", prize: "5.00%" },
      { rank: "6th", user: "Hidden", wagered: "$4,68...", prize: "3.50%" },
      { rank: "7th", user: "Hidden", wagered: "$4,56...", prize: "2.50%" },
    ],
  };
  useEffect(() => {
    setShowSkeleton(true);
    setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);
  }, [activeMainBetsTab]);
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={
        activeDrawer === "bets"
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: "100%" }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full bg-[#1a2c38]"
    >
      <div className="flex items-center py-4 px-3.5 h-[53px] shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.12)] justify-between bg-[#0f212e]">
        <div className="flex items-center gap-1">
          <Icon name={"bets"} className="h-[24px] w-[16px]" fill="#b1bad3" />
          <h2 className="text-lg text-[.875rem] font-bold leading-[1.6] text-white">
            Bets
          </h2>
        </div>
        <button
          onClick={closeDrawer}
          className="text-slate-400 hover:text-white relative right-[6px]"
        >
          {/* <X className="w-5 h-5 text-white" /> */}
          <Icon
            name={"betsClose"}
            className="h-[14px] w-[14px]"
            fill="#b1bad3"
          />
        </button>
      </div>

      <div className="w-full mt-[1.5rem] ">
        <div className=" w-fit overflow-x-auto overflow-y-hidden scroll-width-none pl-[3vw]">
          <div className="flex bg-[#0F212E] rounded-[3rem] p-[6px] flex-shrink-0  h-14">
            {["All Bets", "High Rollers", "Races"].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveMainBetsTab(tab)}
                className={`inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98]
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
                  <span className="inline-block w-2 h-2 rounded-full bg-[#1FFF20]"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-0 pb-0 pl-[12.75px] pr-[12.75px] relative bottom-[-7px]">
          {activeMainBetsTab === "All Bets" && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-spacing-0 relative table-fixed w-full z-[2] [transform-style:preserve-3d] border-separate">
                {/* Table Head */}
                <thead className="bg-[#1A2C38]">
                  <tr>
                    <th className="text-left px-4 py-4 text-slate-300 font-semibold text-sm rounded-tl-md">
                      Game
                    </th>
                    <th className="text-right px-4 py-4 text-slate-300 font-semibold text-sm rounded-tr-md">
                      Payout
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
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

          {activeMainBetsTab === "High Rollers" && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-[#1A2C38]">
                  <tr>
                    <th className="text-left px-4 py-4 text-slate-300 font-semibold text-sm">
                      Event
                    </th>
                    <th className="text-right px-4 py-4 text-slate-300 font-semibold text-sm">
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
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {!showSkeleton ? (
                            <>
                              <span className="text-[14px] text-slate-300">
                                {bet.amount}
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

          {activeMainBetsTab === "Races" && (
            <div className="overflow-x-auto">
              <div className="bg-grey-600 px-2 py-4 border-b-[#213743] border-b-2 border-solid flex flex-col gap-1 items-start ">
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
                <thead className="bg-[#1A2C38]">
                  <tr>
                    <th className="text-left px-4 py-4 text-slate-300 font-semibold text-sm">
                      Rank
                    </th>
                    <th className="text-left px-4 py-4 text-slate-300 font-semibold text-sm">
                      User
                    </th>
                    <th className="px-4 py-4 text-slate-300 font-semibold text-sm">
                      <span className="flex gap-1 items-center">
                        <Icon
                          name={"questions"}
                          className="h-[14px] w-[17px]"
                          fill="rgb(177, 186, 211)"
                        />
                        Wagered
                      </span>
                    </th>
                    <th className="text-right px-4 py-4 text-slate-300 font-semibold text-sm">
                      Prize
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {betsData["Races"].map((entry, index) => (
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
                        <div className="flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
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
                        <div className="flex items-center justify-end max-w-[12ch] overflow-hidden">
                          {!showSkeleton ? (
                            <>
                              <span className="truncate inline-block max-w-[6ch] font-normal text-[14px] text-[#b1bad3]">
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
                            <>
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
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right align-middle whitespace-nowrap text-[12px] text-[#b1bad3] font-medium">
                        {!showSkeleton ? (
                          <span>{entry.prize}</span>
                        ) : (
                          <Skeleton
                            className="py-2"
                            style={{
                              width: 70,
                              height: 14,
                              background: "#b1bad3",
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MBet;
