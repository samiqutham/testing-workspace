"use client";

import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "@workspace/ui/icons/icons";

type GameDescProps = {
  img?: string;
};

const GameDesc = ({ img }: GameDescProps) => {
  const [tabs, setTabs] = useState(true);

  const [activeTab, setActiveTab] = useState("Description");

  const tabItems = [{ label: "Description" }, { label: "Challenges" }];

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setTabs(false);
    } else {
      setTabs(true);
    }
  }, []);

  return (
    <div className="w-full md:px-[3vw] flex flex-col mb-6 max-md:mt-6">
      <div className="flex w-full bg-[rgb(15,33,46)] rounded text-[rgb(213,220,235)]">
        <div className="flex flex-col p-6 w-full">
          <div
            onClick={() => setTabs(!tabs)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex flex-row gap-2 items-center">
              <h1 className="inline text-white leading-[1.5] text-base font-semibold truncate">
                Baccarat Lobby
              </h1>
              <span className="text-[#b1bad3] active:scale-[0.98] hover:text-white transition-colors">
                Pragmatic Play
              </span>
            </div>
            <span className="p-2">
              <ChevronDown
                className={`w-5 h-5 scale-[1.25] text-white transition-transform duration-500 ${
                  tabs ? "rotate-0" : "rotate-90"
                }`}
              />
            </span>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              tabs ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="w-full max-w-[1200px] mx-auto">
              <div
                className="!overflow-x-auto overflow-y-hidden max-w-fit scrollbar-thin"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#2F4553 #222",
                }}
              >
                <div className="flex bg-[rgb(26,44,56)] rounded-[3rem] p-[6px] flex-shrink-0 min-w-max h-14 w-full overflow-x-auto">
                  {tabItems.map((tab, index) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(tab.label)}
                      className={`inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] cursor-pointer
                px-5 py-[15px] text-sm leading-none rounded-full
                ${
                  activeTab === tab.label
                    ? "bg-[#2F4553] text-white"
                    : "bg-transparent text-white hover:bg-[#2F4553] hover:text-white"
                }
                ${index > 0 ? "ml-[6px]" : ""}`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-6 w-full leading-[1.5]">
                {activeTab === "Description" && (
                  <div className="flex items-start">
                    {img && (
                      <Image
                        src={img}
                        alt={"Game"}
                        width={150}
                        height={200}
                        className="rounded hidden md:block mr-4"
                      />
                    )}
                    <div className="mb-1 mt-2 flex flex-wrap">
                      <div className="text-[rgb(213,220,235)] bg-[rgb(47,69,83)] px-2 mt-2 mr-2 rounded-full min-w-[1.8em] font-semibold flex items-center justify-center whitespace-nowrap">
                        <span className="text-[rgb(177,186,211)] leading-[1.5] text-[0.75rem] font-semibold">
                          Edge:&nbsp;
                        </span>
                        <span className="text-white leading-[1.5] text-[0.75rem] font-semibold">
                          1.06%
                        </span>
                      </div>
                      <div className="text-[rgb(213,220,235)] bg-[rgb(47,69,83)] px-2 mt-2 mr-2 rounded-full min-w-[1.8em] font-semibold flex items-center justify-center whitespace-nowrap">
                        <span className="text-[rgb(177,186,211)] leading-[1.3] text-sm font-semibold">
                          Baccarat
                        </span>
                      </div>
                      <div className="text-[rgb(213,220,235)] bg-[rgb(47,69,83)] px-2 mt-2 mr-2 rounded-full min-w-[1.8em] font-semibold flex items-center justify-center whitespace-nowrap">
                        <span className="text-[rgb(177,186,211)] leading-[1.3] text-sm font-semibold">
                          Cards
                        </span>
                      </div>
                      <div className="text-[rgb(213,220,235)] bg-[rgb(47,69,83)] px-2 mt-2 mr-2 rounded-full min-w-[1.8em] font-semibold flex items-center justify-center whitespace-nowrap">
                        <span className="text-[rgb(177,186,211)] leading-[1.3] text-sm font-semibold">
                          Live Casino
                        </span>
                      </div>
                      <div className="text-[rgb(213,220,235)] bg-[rgb(47,69,83)] px-2 mt-2 mr-2 rounded-full min-w-[1.8em] font-semibold flex items-center justify-center whitespace-nowrap">
                        <span className="text-[rgb(177,186,211)] leading-[1.3] text-sm font-semibold">
                          Pragmatic Play
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Challenges" && (
                  <div className="mt-3 !p-4 text-[rgb(177,186,211)] flex mx-auto items-center flex-col text-sm">
                    <div className="min-h-24">
                      <Icon name="raceTime" className="w-[80px] h-[80px]" />
                    </div>
                    Baccarat Lobby has no active challenges
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDesc;
