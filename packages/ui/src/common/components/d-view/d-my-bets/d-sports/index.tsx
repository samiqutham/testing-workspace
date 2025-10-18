"use client";
import { useState } from "react";
import sportsImg from "@workspace/ui/assets/empty-betslip-icon.CA770lCW.svg";

export default function DSports() {
  const [activeTab, setActiveTab] = useState("Active");
  const tabs = ["Active", "Settled"];

  return (
    <div className="bg-[#0E212E] rounded-xl  w-full flex justify-center">
      <div className="w-full flex flex-col items-center">
        <div className="w-full">
          {" "}
          <div className="bg-[#1A2C38] px-[6px] py-[6px] w-[fit-content] flex gap-2 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-white cursor-pointer font-semibold px-[19.8px] py-[10px] rounded-full transition-all ${
                  activeTab === tab
                    ? "bg-[#304553]"
                    : "hover:bg-[#304553]/60 text-gray-300"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center mt-4 py-2">
          <img className="w-[80px] h-[80px] mb-8" src={sportsImg.src} alt="" />
          <p className="text-[#B1BAD3] mt-1 text-[16px]">No Active Bets</p>
          <p className="text-white font-semibold text-[16px] mt-1">
            Start Betting Now!
          </p>
        </div>

        {/* Pagination */}
        <div className="flex gap-4 mt-[24px]">
          <button className="bg-[#2f4553] opacity-50 text-white px-[20px] py-[10px] font-semibold rounded-md cursor-pointer">
            Previous
          </button>
          <button className="bg-[#2f4553] opacity-50 text-white px-[20px] py-[10px] font-semibold rounded-md cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
