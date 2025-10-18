"use client";

import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useRef, useState } from "react";
import { DMarketOdds } from "../d-market-odds";
import { DCompetition } from "../d-competition";

type DSportsMarketProps = {
  title: string;
  buttons: string[];
  sportId: number;
  events: any[];
  onFilterChange?: (filter: string) => void;
  customRender?: (events: any[], filter: string) => React.ReactNode;
};

const DateGroup = ({
  dateKey,
  dateEvents,
  formatDateDisplay,
}: {
  dateKey: string;
  dateEvents: any[];
  formatDateDisplay: (d: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMultiplesOpen, setIsMultiplesOpen] = useState(false);
  const multiplesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        multiplesRef.current &&
        !multiplesRef.current.contains(e.target as Node)
      ) {
        setIsMultiplesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between bg-[#0F202D] p-2 text-white text-sm font-semibold cursor-pointer">
        <div
          className="flex items-center gap-1 w-full"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Icon
            name="rightSlide"
            className={`w-3 h-3 fill-white transition-transform duration-300 transform ${isOpen ? "rotate-270" : "rotate-90"
              }`}
          />
          {formatDateDisplay(dateKey)}
        </div>
        <div ref={multiplesRef} className="relative inline-block">
          <button
            onClick={() => setIsMultiplesOpen((prev) => !prev)}
            className=" h-[24.5px] flex items-center justify-between border border-gray-500 hover:bg-[#213743] cursor-pointer bg-[#0F202D] px-[7px] rounded-[2px] text-[11px] text-white"
          >
            <span className=" max-w-full">Multiples</span>
            <Icon
              name="rightSlide"
              className={`min-w-3 min-h-3 max-w-3 max-h-3 fill-white transition-transform duration-300 transform ${isMultiplesOpen ? "rotate-90" : "rotate-270"
                }`}
            />
          </button>
          {isMultiplesOpen && (
            <div className="absolute right-0 mt-[1px] w-[236px] border border-gray-500 shadow-md z-10 bg-[#0F202D] p-3 rounded-[2px_0_2px_2px] text-white text-[11px]">
              <h3 className="font-bold mb-2.5">Multiples</h3>
              <div className="mb-2.5">
                You will need to go to Sportsbook to place multiples
              </div>
              <div className="w-full text-center">
                <button className="rounded-[2px] font-bold text-[11px] py-2 px-3 bg-[#1A2C38] border border-[#1a2c3881] cursor-pointer shadow-md">
                  Go to Sportsbook
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && <DMarketOdds events={dateEvents} filter="Time" />}
    </div>
  );
};

export const DSportsMarket = ({
  title,
  buttons,
  events,
  onFilterChange,
  customRender,
}: DSportsMarketProps) => {
  const [activeSport, setActiveSport] = useState(buttons[0] || "");
  const [openDropdown, setOpenDropdown] = useState<null | "view1" | "view2">(
    null
  );
  const [selectedView1, setSelectedView1] = useState("Matched Amount");
  const [amount, setAmount] = useState("");
  const [showMarket, setShowMarket] = useState(true);
  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const [isMultiplesOpen, setIsMultiplesOpen] = useState(false);
  const options = ["Matched Amount", "Competition", "Time"];
  const multiplesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(e.target as Node) &&
        dropdownRef2.current &&
        !dropdownRef2.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (
        multiplesRef.current &&
        !multiplesRef.current.contains(e.target as Node)
      ) {
        setIsMultiplesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const groupedByCompetition = events.reduce(
    (acc, match) => {
      const compName = match.competition.name;
      if (!acc[compName]) {
        acc[compName] = [];
      }
      acc[compName].push(match);
      return acc;
    },
    {} as Record<string, typeof events>
  );

  const eventsByDate = events.reduce((acc: Record<string, any[]>, event) => {
    const dateValue = event.marketStartTime;
    if (dateValue) {
      try {
        const eventDate = new Date(dateValue);
        if (!isNaN(eventDate.getTime())) {
          const dateKey = eventDate.toISOString().split("T")[0];
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(event);
        }
      } catch { }
    }
    return acc;
  }, {});

  const hasDateEvents = Object.keys(eventsByDate).length > 0;

  const sortedDateKeys = Object.keys(eventsByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const formatDateDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const days = ["Sunday", "Monday", "Tue", "Wed", "Thu", "Friday", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = days[date.getDay()];
      const dateNum = date.getDate();
      const month = months[date.getMonth()];
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isTomorrow = date.toDateString() === tomorrow.toDateString();
      if (isToday) return `Today, ${dateNum} ${month}`;
      if (isTomorrow) return `Tomorrow, ${dateNum} ${month}`;
      return `${day}, ${dateNum} ${month}`;
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <>
      <section className="w-full flex flex-col">
        <div className="p-2 h-11 bg-[#0B1E2A] flex items-center justify-between">
          <h4 className="text-sm text-white font-bold leading-[1.1] truncate m-[6px_17px_0px_8px] flex-[1_1_0] h-[22px]">
            {title}
          </h4>
          <div className="btn-matches">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  setActiveSport(btn);
                  onFilterChange?.(btn);
                }}
                className={`capitalize rounded-[2px] cursor-pointer hover:bg-[#c2c2c2] px-4 font-bold h-7 text-[11px] ml-[5px] 
                  ${activeSport === btn ? "bg-white " : "bg-[#dcdcdc]"} text-[#1e1e1e]`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#213743] py-4 px-[9px] flex items-center rounded-[2px] relative justify-between">
          <div>
            <span className="text-xs leading-[16px] text-white">
              Filter by:&nbsp;&nbsp;&nbsp;
            </span>
            <div ref={dropdownRef1} className="relative inline-block w-[146px]">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "view1" ? null : "view1")
                }
                className="w-full flex items-center justify-between border border-gray-500 bg-[#0F202D] px-[7px] rounded-[2px] text-[11px] cursor-pointer h-[22px] text-white"
              >
                {selectedView1}
                <Icon
                  name="rightSlide"
                  className={`w-3 h-3 fill-white transition-transform duration-300 transform ${openDropdown === "view1" ? "rotate-270" : "rotate-90"
                    }`}
                />
              </button>
              {openDropdown === "view1" && (
                <div className="absolute left-0 mt-[1px] w-full border border-gray-500 border-t-0 shadow-md z-10">
                  {options.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setSelectedView1(option);
                        setOpenDropdown(null);
                      }}
                      className="pl-[7px] py-[5px] text-[13px] bg-[#0F202D] hover:bg-[#213743] cursor-pointer truncate leading-[1.155] text-white"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs leading-[16px] text-white">View by</span>
            <span className="flex justify-center items-center inline-block mx-[5px] w-[52.39px] h-[24.5px] text-[11px] leading-[24px] font-bold rounded-[2px] cursor-pointer text-center border border-[#bfbfbf] text-white">
              On Tv
            </span>
            <span className="flex justify-center items-center inline-block mx-[5px] ml-0 w-[77.88px] h-[24.5px] text-[11px] leading-[24px] font-bold rounded-[2px] cursor-pointer text-center border border-[#bfbfbf] text-white">
              Live Video
            </span>
            <div ref={dropdownRef2} className="relative inline-block">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "view2" ? null : "view2")
                }
                className={`flex items-center min-w-[125px] justify-between border border-gray-500 hover:bg-[#213743] cursor-pointer bg-[#0F202D] px-[7px] rounded-[2px] text-[11px] text-white transition-all duration-200
                 ${openDropdown === "view2" ? "h-[26.4px] border-b-0" : "h-[24.5px]"}`}
              >
                <span className=" max-w-full">
                  {amount ? `Matched: > ${amount}` : "Matched Amount"}
                </span>
                <Icon
                  name="rightSlide"
                  className={`min-w-3 min-h-3 max-w-3 max-h-3 fill-white transition-transform duration-300 transform ${openDropdown === "view2" ? "rotate-270 " : "rotate-90"
                    }`}
                />
              </button>
              {openDropdown === "view2" && (
                <div className="absolute right-0  w-[302px] border border-gray-500 shadow-md z-10 bg-[#0F202D] p-2 text-white">
                  <div className="text-[12px] mb-2">
                    Filter the view to show only markets with matched amount
                    above:
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-[12px]">Matched Amount (£)</strong>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-[100px] text-center text-white px-1 py-[2px] border border-gray-500 rounded-[2px] text-[12px] focus:!text-[12px] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setAmount("");
                        setOpenDropdown(null);
                      }}
                      className="px-3 py-1 text-[12px] bg-gray-300 text-black rounded-[2px] hover:bg-gray-400"
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {customRender ? (
        customRender(events, selectedView1)
      ) : selectedView1 === "Matched Amount" ? (
        <div className="mt-4">
          <DMarketOdds events={events} filter="Matched Amount" />
        </div>
      ) : selectedView1 === "Competition" ? (
        <div className="mt-4">
          <DCompetition events={groupedByCompetition} filter="Competition" />
        </div>
      ) : (
        <section>
          <div className="my-3">
            {showMarket && (
              <div>
                {hasDateEvents ? (
                  sortedDateKeys.map((dateKey) => {
                    const dateEvents = eventsByDate[dateKey];
                    return (
                      <DateGroup
                        key={dateKey}
                        dateKey={dateKey}
                        dateEvents={dateEvents}
                        formatDateDisplay={formatDateDisplay}
                      />
                    );
                  })
                ) : (
                  <div className="mt-2">
                    <div className="bg-[#0F202D] p-2 text-white text-sm font-semibold">
                      All Events
                    </div>
                    <DMarketOdds events={events} filter="Time" />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
