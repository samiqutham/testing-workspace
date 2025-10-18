"use client";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useRef, useState } from "react";

const MBetBoards = () => {
  const [activeMainBetsTab, setActiveMainBetsTab] = useState("Exchange Bets");
  const [showSkeleton, setShowSkeleton] = useState(false);
  const tabs = ["Exchange Bets", "Casino Bets", "Race Leaderboard"];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const betsData = {
    "Exchange Bets": [
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
    "Casino Bets": [
      { event: "BEL - MAL", amount: "$2,600.00" },
      { event: "BLA - IMA", amount: "$2,321.68" },
      { event: "Multi (2)", amount: "$1,243.00" },
      { event: "LON - SOU", amount: "$2,100.00" },
      { event: "ACT - MEL", amount: "$1,600.00" },
      { event: "Multi (8)", amount: "$2,000.00" },
      { event: "ACT - MEL", amount: "$1,136.00" },
    ],
    "Race Leaderboard": [
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
    }, 1000);
  }, [activeMainBetsTab]);
  return (
    <div className="w-full flex flex-col gap-[6px]">
      <div
        ref={containerRef}
        className=" overflow-y-hidden no-scrollbar leading-[133%]"
      >
        <div className="flex bg-[#0F212E] rounded-l-[3rem] rounded-r-[3rem] pl-[4px] p-[5px] flex-shrink-0 min-w-max h-14">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => setActiveMainBetsTab(tab)}
              className={`inline-flex relative items-center gap-1 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98]
    px-5 py-[15px] text-sm leading-none rounded-full
    pt-[2px] pb-[2px] mt-[1px] mb-[1px]  
    ${
      activeMainBetsTab === tab
        ? "bg-[#2F4553] text-white"
        : "bg-transparent text-white hover:bg-[#2F4553] hover:text-white"
    }
    first:ml-[2px] ${index > 0 ? "ml-[6px]" : ""}
  `}
            >
              <span className="relative top-[0.5px]">{tab}</span>
              {tab === "Race Leaderboard" && (
                <span className="inline-block w-2 h-2 rounded-full bg-[#1FFF20] relative top-[1px]"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeMainBetsTab === "Exchange Bets" && (
        <div className="overflow-x-auto scrollbar-hide leading-[134.2%]">
          <table className="min-w-full border-collapse border-spacing-0 relative transform-style-[preserve-3d] border-collapse-[separate] table-fixed">
            {/* Table Head */}
            <thead className="bg-[#1A2C38]">
              <tr>
                <th className="text-left px-4 py-4 text-[#b1bad3] font-semibold text-sm rounded-tl-md">
                  Game
                </th>
                <th className="text-right px-4 py-4 text-[#b1bad3] font-semibold text-sm rounded-tr-md">
                  Payout
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {betsData["Exchange Bets"].map((bet, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                >
                  {/* Game Column */}
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

      {activeMainBetsTab === "Casino Bets" && (
        <div className="overflow-x-auto scrollbar-hide leading-[134.2%]">
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
              {betsData["Casino Bets"].map((bet, index) => (
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

      {activeMainBetsTab === "Race Leaderboard" && (
        <div className="overflow-x-auto scrollbar-hide leading-[134.2%]">
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
              {betsData["Race Leaderboard"].map((entry, index) => (
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
                        style={{ width: 20, height: 20, background: "#b1bad3" }}
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
                        style={{ width: 70, height: 14, background: "#b1bad3" }}
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
  );
};

export default MBetBoards;
