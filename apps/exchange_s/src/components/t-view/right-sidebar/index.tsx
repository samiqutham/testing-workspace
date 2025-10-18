"use client";

import React from "react";

const TRightSidebar = () => {
  const matches = [
    { title: "Rahmatganj MFS v Brothers Union", time: "Începe în 11'" },
    {
      title: "Maccabi Ironi Yafia v Hapoel Ironi Arraba",
      time: "Începe în 11'",
    },
    { title: "Mohammedan Dhaka v Sheikh ...", time: "Începe în 52'" },
    { title: "Sydney FC v Wellington Phoenix", time: "Mâine 00:45" },
    { title: "Cr Belouizdad U21 v CS Constan...", time: "Mâine 01:00" },
    { title: "USM Khenchela U21 v ASO Chlef...", time: "Mâine 01:00" },
    { title: "Shikhun HaMizrah v Hapoel Bn...", time: "Mâine 01:30" },
    { title: "HaMakhtesh Givatayim v Maccabi Iro...", time: "Mâine 01:45" },
    { title: "Maccabi Shaaraim v Shimshon Tel...", time: "Mâine 01:45" },
    { title: "Hapoel Migdal Haemek v Hapoel Bn...", time: "02:00" },
    { title: "Hapoel Azor v Beitar Tel Aviv Bat...", time: "02:40" },
    { title: "Ironi Nesher v Tzeirey Umm al-Fahm", time: "02:45" },
  ];

  return (
    <div className="w-full mt-1">
      {/* Header */}
      <div className="flex items-center bg-[#071824] h-[32px] px-2">
        <h2 className="text-white font-semibold text-[14px]">Football</h2>
      </div>

      {/* Matches */}
      {matches.map((match, idx) => (
        <a key={idx}>
          <div className="flex items-center h-[39px] bg-[#213743]  border-b border-[#304553] hover:bg-gray-100 pl-[10px]">
            <div className="flex flex-col gap-[5px]">
              <span className="text-[12px] text-white truncate max-w-[170px] leading-[13px]">
                {match.title}
              </span>
              <span className="text-[10px] leading-[11px] text-white opacity-50">
                {match.time}
              </span>
            </div>
          </div>
        </a>
      ))}

      {/* Last Item */}
      <a href="#">
        <div className="flex items-center bg-[#213743] px-2 py-[10.5px]">
          <span className="text-[12px] text-white">Fotbal</span>
        </div>
      </a>
    </div>
  );
};

export default TRightSidebar;
