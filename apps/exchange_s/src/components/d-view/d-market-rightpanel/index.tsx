"use client";

import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PlayGames } from "../d-play-games";
import DBetslip from "../d-betslip";
import LoginModal from "@workspace/ui/common/modal/LoginModal";

type QuickLink = {
  id: number;
  label: string;
  count?: number;
  highlight?: boolean;
  spriteClass?: string;
  url?: string;
};

interface DMarketRightPanelProps {
  selectedOdds: { price: string; size: string; name?: string }[];
  selectedLayOdds: { price: string; size: string; name?: string }[];
  onDeleteBackBet: (index: number) => void;
  onDeleteLayBet: (index: number) => void;
  onCancelAll: () => void;
  onProfitLossUpdate?: (profitLossData: { [key: string]: number }) => void;
}

export const DMarketRightPanel: React.FC<DMarketRightPanelProps> = ({
  selectedOdds,
  selectedLayOdds,
  onDeleteBackBet,
  onDeleteLayBet,
  onCancelAll,
  onProfitLossUpdate,
}) => {
  const games = [
    { id: 1, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    { id: 2, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    {
      id: 3,
      img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg",
      play: true,
    },
    { id: 4, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    { id: 5, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    { id: 6, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    { id: 7, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    { id: 8, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    { id: 9, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    { id: 10, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
  ];
  const [showAll, setShowAll] = useState(false);
  const [betColor, setBetColor] = useState("back");

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const visibleGames = showAll ? games : games.slice(0, 6);
  const [stream, setStream] = useState("view");
  const [activeTab, setActiveTab] = useState("open");
  const [openSection, setOpenSection] = useState<"live" | "games" | null>(null);
  useEffect(() => {
    if (selectedOdds.length > 0 || selectedLayOdds.length > 0) {
      setActiveTab("place");
    }
  }, [selectedOdds, selectedLayOdds]);
  const quickLinks: QuickLink[] = [
    { id: 1, label: "In-Play Now", count: 2, highlight: true, url: "/inplay" },
    {
      id: 2,
      label: "Man City v Man Utd",
      spriteClass:
        "bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1095px_857px] bg-no-repeat bg-[-85px_-19px]",
      url: "/markets/man-city-v-man-utd",
    },
    {
      id: 3,
      label: "Arsenal v Chelsea",
      spriteClass:
        "bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1095px_857px] bg-no-repeat bg-[-85px_-19px]",
      url: "/markets/arsenal-v-chelsea",
    },
  ];

  return (
    <>
      <div className="w-full max-w-[346px]  relative flex flex-col h-full  border-gray-300 shadow bg-[#1A2C38]">
        {/* Tab Navigation */}
        <div className="flex bg-[#0E212E] border-b border-gray-300 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("place")}
            className={`px-4 cursor-pointer text-[11px] font-[700] ${
              activeTab === "place"
                ? "bg-[#304553] text-white border-t-2 border-[#0E212E] font-bold"
                : "bg-[#0E212E] text-white"
            }`}
          >
            Place bets
          </button>
          <button
            onClick={() => setActiveTab("open")}
            className={`px-4 cursor-pointer text-[11px] font-[700] ${
              activeTab === "open"
                ? "bg-[#304553] text-white border-t-2 border-[#0E212E] font-bold"
                : "bg-[#0E212E] text-white"
            }`}
          >
            Open bets
          </button>
          <button
            onClick={() => setActiveTab("games")}
            className={`ml-auto cursor-pointer px-4 text-[11px] font-[700] py-2 flex items-center gap-1 ${
              activeTab === "games"
                ? "bg-[#304553] text-white border-t-2 border-[#0E212E] font-bold"
                : "bg-[#0E212E] text-white"
            }`}
          >
            <img
              src="/games-tab-icon.svg"
              alt="Games Icon"
              className="w-4 h-4"
            />
            Games
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 text-center bg-[#213743] text-white overflow-y-auto">
          {activeTab === "place" ? (
            selectedOdds.length || selectedLayOdds.length ? (
              <DBetslip
                hasBackBetslipArray={selectedOdds}
                hasLayBetslipArray={selectedLayOdds}
                onDeleteBackBet={onDeleteBackBet}
                onDeleteLayBet={onDeleteLayBet}
                onCancelAll={onCancelAll} // 👈 add this
                betColor={betColor}
                onProfitLossUpdate={onProfitLossUpdate}
              />
            ) : (
              <div>
                {" "}
                <header className="bg-[#1A2C38] text-white text-[1.2rem] p-2 relative">
                  <h2 className="font-bold text-left text-[12px] m-0 p-0 leading-[1]">
                    Current odds bets
                  </h2>
                </header>
                <div className="bg-[#122D38] p-1">
                  <div className="flex justify-end text-right text-[12px] text-[#fff] p-[7px]">
                    <span>
                      <span className="font-bold">Liability : £0.00</span>
                    </span>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={onCancelAll}
                      className="bg-[#122D38] rounded-[2px] text-[#fff] inline-block p-[6px_12px] text-[13px] font-bold cursor-pointer hover:bg-[#e0e0e0] hover:text-[#000]"
                    >
                      Cancel all selections
                    </button>
                    <div className="flex-1 flex justify-end">
                      <button
                        type="button"
                        className="rounded-[2px] inline-block p-[6px_12px] text-[13px] font-bold cursor-default pointer-events-none text-[#e0e0e0]"
                      >
                        Place bets
                      </button>
                    </div>
                  </div>
                  <div className="p-[8px_4px_5px] text-left text-[13px]">
                    <label className="inline-block">
                      <input type="checkbox" className="mr-1" name="confirm" />
                      Confirm bets before placing
                    </label>
                    <label className="inline-block ml-4">
                      <input
                        type="checkbox"
                        className="mr-1"
                        name="show-percent"
                      />
                      <span>Show % Book</span>
                    </label>
                  </div>
                </div>
              </div>
            )
          ) : activeTab === "open" ? (
            <div>
              <h2 className="text-[14px] border-b border-[#dcdcdc] font-bold text-white pl-2 py-2 leading-[14px] text-left">
                Win Only Market
              </h2>
              <div className="mt-10 space-y-3">
                <p className="text-white text-[13px]">
                  <span
                    className="text-[#2789CE] font-medium cursor-pointer"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Log in{" "}
                  </span>
                  to view your bets.
                </p>
                <p className="text-white font-[700] text-[13px]">
                  Click on the odds to add selections to the betslip.
                </p>
                <button className="bg-[#1475e1] hover:bg-[#105EB4] cursor-pointer text-white text-[11px] px-3 py-[6px] leading-[13px] my-[13] rounded">
                  Place Multiple Bets on Stakefair
                </button>
              </div>
            </div>
          ) : activeTab === "games" ? (
            <div className="w-full px-[40px] max-w-md ">
              <div className="shadow-lg">
                <div className="flex text-[12px] font-bold px-3 py-[5px]">
                  <span
                    className="text-[#2789CE] mr-1 cursor-pointer"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Log in{" "}
                  </span>{" "}
                  to play Games
                </div>
                <div className="bg-[#1A2C38] flex text-white text-[12px] font-bold px-3 py-[5px]">
                  Play Games
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {visibleGames.map((game) => (
                    <div key={game.id} className="relative cursor-pointer">
                      <Image
                        src={game.img}
                        alt=""
                        width={300}
                        height={150}
                        className="w-full h-28 object-cover"
                      />
                      {game.play && (
                        <button className="absolute inset-0 flex items-center justify-center bg-black/60">
                          <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded">
                            Play
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center flex justify-end px-2 py-2 border-t">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-sm text-white flex cursor-pointer items-center hover:underline"
                  >
                    {showAll ? "Show less" : "Show more"}
                    <Icon
                      name="questionArrow"
                      className={`h-3 w-3 ml-1 transition-transform duration-300 ${
                        showAll ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sticky bottom-0 bg-[#1A2C38] z-10">
          <div className="flex flex-col gap-0">
            <div
              className="flex justify-between items-center bg-[#0E212E] text-white px-2 cursor-pointer h-6 border-b-[1px] border-gray-300 translate-y-[2px]"
              onClick={() =>
                setOpenSection(openSection === "live" ? null : "live")
              }
            >
              <span className="font-semibold text-[12px] leading-[24px]">
                Live Stream{" "}
                <span className="text-[#4eb6ff] ml-2 text-[11px]">Pop-out</span>
              </span>

              <Icon
                name="questionArrow"
                className={`transition-transform h-3 w-3 duration-300 ${openSection === "live" ? "rotate-180" : "rotate-0"}`}
              />
            </div>

            <div
              className={`bg-[#1A2C38] border-b border-gray-300 overflow-hidden transition-all duration-300 ease-in-out 
                  ${
                    openSection === "live"
                      ? "max-h-[300px]  opacity-100"
                      : "max-h-0 !p-0 opacity-0"
                  }`}
            >
              <div className="relative w-full  overflow-hidden shadow">
                <div className="w-full">
                  {/* Tabs Header */}
                  <div className="flex text-[12px] font-[700] w-full">
                    <button
                      onClick={() => setStream("view")}
                      className={`w-1/2 cursor-pointer leading-[24px] px-[10px] font-semibold ${
                        stream === "view"
                          ? "bg-gradient-to-b from-[#f8f8f8] to-[#d3d3d3] text-black"
                          : "bg-[#0E212E] text-white"
                      }`}
                    >
                      Match View
                    </button>

                    <button
                      onClick={() => setStream("stats")}
                      className={`w-1/2 cursor-pointer leading-[24px] px-[10px] font-semibold ${
                        stream === "stats"
                          ? "bg-gradient-to-b from-[#f8f8f8] to-[#d3d3d3] text-black"
                          : "bg-[#0E212E] text-white"
                      }`}
                    >
                      Match Stats
                    </button>
                  </div>

                  {/* Tabs Content */}
                  <div className="p-4 h-[188px] flex justify-center ">
                    {stream === "view" && (
                      <div className="flex justify-center items-center h-[52%] w-[80%]">
                        <div className="h-full mx-3 flex justify-center items-center">
                          <div className="text-center text-sm flex items-center flex flex-col">
                            We're sorry, but live video isn't available yet for
                            this event. Please try again later
                            <br />
                            <a className="text-[#4eb6ff] text-center">Reload</a>
                          </div>
                        </div>
                      </div>
                    )}
                    {stream === "stats" && <div>Match Stats Content</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Play Games Section */}
          <div>
            <div
              className="flex justify-between items-center bg-[#0E212E] text-white px-2 cursor-pointer h-6 border-t-[0px] border-gray-300"
              onClick={() =>
                setOpenSection(openSection === "games" ? null : "games")
              }
            >
              <span className="font-semibold text-[12px] leading-[24px]">
                Play Games
              </span>
              <Icon
                name="questionArrow"
                className={`transition-transform h-3 w-3 duration-300 ${
                  openSection === "games" ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            <div
              className={`flex justify-between bg-[#1A2C38] border-b border-gray-300 overflow-hidden transition-all duration-300 ease-in-out 
                  ${
                    openSection === "games"
                      ? "max-h-[500px] px-[25px]  gap-4 opacity-100"
                      : "max-h-0 !p-0 gap-0 opacity-0"
                  }`}
            >
              <div className="relative shadow overflow-hidden">
                <img
                  src="/blackjack.jpg"
                  alt="BlackJack"
                  className="w-full h-30 pr-0 p-[10px] object-cover"
                />
              </div>

              <div className="relative shadow overflow-hidden">
                <img
                  src="/blackjack.jpg"
                  alt="BlackJack"
                  className="w-full h-30 pl-0 p-[10px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onForgotPassword={() => {
            console.log("Forgot password clicked");
          }}
        />
      )}
    </>
  );
};
