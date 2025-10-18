"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "@workspace/ui/icons/icons";
import SportsInfoModal from "@exchange_s/modals/sports-info-modal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DSkeleton from "../d-skeleton";

export const DInplay = ({
  events,
  filter,
}: {
  events: any[];
  filter?: string;
}) => {
  const groupedBySport = events.reduce(
    (acc, ev) => {
      const sport = ev.eventType?.name || "Other";
      if (!acc[sport]) acc[sport] = [];
      acc[sport].push(ev);
      return acc;
    },
    {} as Record<string, any[]>
  );

  const formatNumber = (value: any) => {
    const num = Number(value);
    if (isNaN(num)) return value ?? "";
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    const time = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    if (isToday) return `Today ${time}`;
    if (isTomorrow) return `Tomorrow ${time}`;
    return `${date.toLocaleDateString("en-US", { weekday: "long" })} ${time}`;
  };
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [openSports, setOpenSports] = useState<string[]>([]);
  const [openMultiples, setOpenMultiples] = useState<Record<string, boolean>>(
    {}
  );
  const multiplesRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setOpenSports(Object.keys(groupedBySport));
  }, [events]);

  useEffect(() => {
    if (events && events.length > 0) {
      setLoading(false);
    }
  }, [events]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.entries(multiplesRef.current).every(
        ([sport, ref]) => {
          if (!ref || !openMultiples[sport]) return true;
          return !ref.contains(event.target as Node);
        }
      );

      if (clickedOutside) {
        setOpenMultiples({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMultiples]);

  const toggleSport = (sport: string) =>
    setOpenSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );

  const groupByCompetition = (evs: any[]) =>
    evs.reduce(
      (acc, ev) => {
        const comp = ev.competition?.name || "Other Competitions";
        if (!acc[comp]) acc[comp] = [];
        acc[comp].push(ev);
        return acc;
      },
      {} as Record<string, any[]>
    );

  const renderEventsSection = (
    section: "In-Play" | "Upcoming",
    events: any[]
  ) => {
    if (events.length === 0) return null;
    if (loading) {
      return <DSkeleton />;
    }
    return (
      <div key={section}>
        <div className="flex justify-between items-center h-6 text-[12px] bg-[#0f212e] border-b border-[#071824ff] pl-2.5 pr-6">
          <div className="text-white font-semibold">{section}</div>
          <div className="flex items-center font-semibold justify-end">
            <div className="text-[12px] text-center w-[113px] hidden min-[1200px]:block">
              <span className="text-[#fff] leading-[16px]">Matched</span>
            </div>
            <div className="text-[12px] w-[113px] text-center text-[#fff]">
              1
            </div>
            <div className="text-[12px] w-[113px] text-center text-[#fff]">
              X
            </div>
            <div className="text-[12px] w-[113px] text-center text-[#fff]">
              2
            </div>
          </div>
        </div>

        {events.map((ev, eventIndex) => {
          const sportName = ev.eventType?.name;
          const sportId = ev.eventType?.id;

          const isSuspended = ev.status !== "OPEN";
          return (
            <Link
              href={`/market-details/${sportId}/${ev.event?.id}`}
              prefetch
              key={eventIndex}
              className="bg-[#] border-b border-[#b1bad3] text-white flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex flex-col items-center justify-center px-[9px] w-[60px] h-[42px] text-[10px] ${
                    ev.inplay
                      ? "bg-[#20a052] text-white font-bold"
                      : "text-[#b1bad3] bg-[#0F212E]"
                  }`}
                >
                  <div className="text-center">
                    {ev.inplay ? "In-Play" : formatDateTime(ev.marketStartTime)}
                  </div>
                </div>
                <div className="flex flex-col justify-center h-[42px] font-bold text-[12px] text-[#fff]">
                  <span>{ev.runnersName?.[0]?.runnerName}</span>
                  <span>{ev.runnersName?.[1]?.runnerName}</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="hidden min-[1200px]:block">
                  <div className="flex">
                    <span className="text-[11px] text-[#b1bad3] leading-[16px]">
                      {formatNumber(ev.totalMatched?.toFixed(2))}
                    </span>
                    <div className="px-2 tv-icon">
                      {ev.inplay && (
                        <svg className="w-4 h-4" viewBox="0 0 100 100">
                          <path
                            fill="grey"
                            d="M0 13v68.75h25V88h50v-6.25h25V13H0zm87.5 56.25h-75V25.5h75v43.75z"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex relative min-w-[339px] justify-between">
                  {isSuspended && (
                    <div className="absolute inset-0 bg-[hsla(0,0%,100%,.65)] flex items-center justify-center z-10 w-[333px] border-2 border-[#b30000]">
                      <span className="text-sm leading-[39px] text-[#b30000] text-center font-bold px-3 py-1 rounded">
                        Suspended
                      </span>
                    </div>
                  )}
                  {[0, 2, 1].map((idx) => {
                    const runner = ev.runners?.[idx];
                    return (
                      <div
                        key={idx}
                        className="flex w-[113px] h-[42px] text-[#212529]"
                      >
                        <button
                          disabled={isSuspended}
                          className="flex justify-center items-center flex-col bg-[#a6d8ff] h-[41px] w-[52px] text-[11px]"
                        >
                          <span className="font-bold">
                            {idx === 2
                              ? (runner?.ex?.availableToBack?.[0]?.price ?? "")
                              : (runner?.ex?.availableToBack?.[0]?.price ??
                                "0")}
                          </span>
                          <span>
                            {idx === 2
                              ? (formatNumber(
                                  runner?.ex?.availableToBack?.[0]?.size
                                ) ?? "")
                              : (formatNumber(
                                  runner?.ex?.availableToBack?.[0]?.size
                                ) ?? "0")}
                          </span>
                        </button>

                        <button
                          disabled={isSuspended}
                          className="flex justify-center items-center flex-col bg-[#fac9d1] h-[41px] w-[52px] text-[11px]"
                        >
                          <span className="font-bold">
                            {idx === 2
                              ? (runner?.ex?.availableToLay?.[0]?.price ?? "")
                              : (runner?.ex?.availableToLay?.[0]?.price ?? "0")}
                          </span>
                          <span>
                            {idx === 2
                              ? (formatNumber(
                                  runner?.ex?.availableToLay?.[0]?.size
                                ) ?? "")
                              : (formatNumber(
                                  runner?.ex?.availableToLay?.[0]?.size
                                ) ?? "0")}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div
                  className="pr-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <SportsInfoModal>
                    <img
                      src="/info.png"
                      alt="Info"
                      className="h-4 w-4 rounded hover:opacity-75 transition"
                    />
                  </SportsInfoModal>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {Object.entries(groupedBySport).map(([sport, sportEvents]) => {
        const isOpen = openSports.includes(sport);
        const isMultiplesOpen = openMultiples[sport];
        return (
          <div key={sport} className="mb-6">
            <div
              onClick={() => toggleSport(sport)}
              className="bg-[#0f212e] py-[7px] px-2 font-semibold text-white flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Icon
                  name="rightSlide"
                  className={`w-3 h-3 fill-white transition-transform ${
                    isOpen ? "rotate-270" : "rotate-90"
                  }`}
                />
                <span>{sport}</span>
              </div>
              <div
                ref={(el) => {
                  if (el) {
                    multiplesRef.current[sport] = el;
                  }
                }}
                className="relative inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() =>
                    setOpenMultiples((prev) => ({
                      ...prev,
                      [sport]: !isMultiplesOpen,
                    }))
                  }
                  className="w-[146px] h-[24.5px] flex items-center justify-between border border-gray-500 hover:bg-[#213743] bg-[#0F202D] px-[7px] rounded-[2px] text-[11px] text-white"
                >
                  <span className="truncate">Multiples</span>
                  <Icon
                    name="rightSlide"
                    className={`w-3 h-3 fill-white transition-transform ${
                      isMultiplesOpen ? "rotate-270" : "rotate-90"
                    }`}
                  />
                </button>
                {isMultiplesOpen && (
                  <div className="absolute right-0 mt-[1px] w-[236px] border border-gray-500 shadow-md z-100 bg-[#0F202D] p-3 rounded text-white text-[11px]">
                    <h3 className="font-bold mb-2.5">Multiples</h3>
                    <div className="mb-2.5">
                      You will need to go to Sportsbook to place multiples
                    </div>
                    <div className="w-full text-center">
                      <button className="rounded font-bold text-[11px] py-2 px-3 bg-[#1A2C38] border border-[#1a2c3881] cursor-pointer shadow-md">
                        Go to Sportsbook
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isOpen && (
              <div>
                {filter === "Competition"
                  ? Object.entries(
                      groupByCompetition(sportEvents as any[])
                    ).map(([compName, compEvents]) => {
                      const inplay = (compEvents as any[])
                        .filter((ev) => ev.inplay)
                        .sort((a, b) => b.totalMatched - a.totalMatched);
                      const upcoming = (compEvents as any[])
                        .filter((ev) => !ev.inplay)
                        .sort(
                          (a, b) =>
                            +new Date(a.marketStartTime) -
                            +new Date(b.marketStartTime)
                        );
                      return (
                        <div key={compName}>
                          <div className="bg-[#071824ff] px-2 py-1 text-[#b1bad3] text-[12px] font-semibold mt-2.5 first:mt-0">
                            {compName}
                          </div>
                          {renderEventsSection("In-Play", inplay)}
                          {renderEventsSection("Upcoming", upcoming)}
                        </div>
                      );
                    })
                  : (() => {
                      const inplay = (sportEvents as any[])
                        .filter((ev) => ev.inplay)
                        .sort((a, b) => b.totalMatched - a.totalMatched);
                      const upcoming = (sportEvents as any[])
                        .filter((ev) => !ev.inplay)
                        .sort(
                          (a, b) =>
                            +new Date(a.marketStartTime) -
                            +new Date(b.marketStartTime)
                        );
                      return (
                        <>
                          {renderEventsSection("In-Play", inplay)}
                          {renderEventsSection("Upcoming", upcoming)}
                        </>
                      );
                    })()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
