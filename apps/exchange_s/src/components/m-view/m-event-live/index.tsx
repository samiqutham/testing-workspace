"use client";

import React, { useState } from "react";

const MEventLive = () => {
  const [activeLiveTab, setActiveLiveTab] = useState("score");

  return (
    <div className="w-full">
      {/* Live Tabs */}
      <div className="overflow-x-auto">
        <ul className="flex">
          {["score", "live"].map((tab) => (
            <li
              key={tab}
              className={`flex-1 ${
                activeLiveTab === tab
                  ? "bg-[#304553] border-b-2 border-[#fff]"
                  : "bg-[#304553] border-b-2 border-[#0E212E]"
              }`}
            >
              <button
                onClick={() => setActiveLiveTab(tab)}
                className="w-full p-[9px_10px]"
              >
                <div
                  className={`leading-[14px] text-[12px] ${
                    activeLiveTab === tab ? "text-[#FFFFFF] " : "text-[#FFFFFF]"
                  }`}
                >
                  {tab === "score" ? "Score" : "Watch Live"}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      {activeLiveTab === "score" && (
        <div className="h-[239px] bg-black flex justify-center items-center text-white text-[14px] font-[Arial]">
          Please{" "}
          <a href="/login" className="text-[#2789ce] mx-1">
            Login
          </a>{" "}
          before to Score.
        </div>
      )}

      {activeLiveTab === "live" && (
        <div className="h-[239px] bg-black flex justify-center items-center text-white text-[14px] font-[Arial]">
          Please{" "}
          <a href="/login" className="text-[#2789ce] mx-1">
            Login
          </a>{" "}
          before to Watch Live.
        </div>
      )}
    </div>
  );
};

export default MEventLive;
