"use client";
import React, { useEffect, useRef, useState } from "react";
import SportsInfoModal from "@exchange_s/modals/sports-info-modal";
import Icon from "@workspace/ui/icons/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DSkeleton from "../d-skeleton";

type DCompetitionProps = {
  events: any[];
  filter?: string;
};

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  if (isToday) return `Today ${time}`;
  if (isTomorrow) return `Tomorrow ${time}`;
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  return `${dayName} ${time}`;
};

const formatNumber = (value: any) => {
  const num = Number(value);
  if (isNaN(num)) return value ?? "";
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return num.toString();
};

export const DCompetition = ({ events }: DCompetitionProps) => {
  const router = useRouter();
  const multiplesRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const [openMarkets, setOpenMarkets] = useState<Record<string, boolean>>({});
  const [openMultiples, setOpenMultiples] = useState<Record<string, boolean>>(
    {}
  );

  const groupedEvents = Object.entries(events)
    .map(([competitionName, events]) => ({
      competitionName,
      events,
      totalMatched: events.reduce(
        (sum: number, ev: any) => sum + (ev.totalMatched || 0),
        0
      ),
    }))
    .sort((a, b) => b.totalMatched - a.totalMatched);

  useEffect(() => {
    const hasData = Object.keys(events ?? {}).length > 0;
    if (hasData) setLoading(false);
  }, [events]);

  if (loading) {
    return <DSkeleton />;
  }
  if (!groupedEvents?.length)
    return (
      <div className="marketCard empty-card-container w-full flex justify-center">
        <div className="coupon-cards-empty-reset-filters text-center">
          <p>There are no events to be displayed for the applied filters</p>
          <p>
            You can{" "}
            <a href="#" className="reset-filters text-blue-500">
              reset filters
            </a>{" "}
            to see more events
          </p>
        </div>
      </div>
    );

  const Header = ({ title }: { title: string }) => (
    <div className="flex justify-between items-center h-6 text-[12px] bg-[#0f212e] border-b border-[#071824ff] pl-2.5 pr-6">
      <div className="px-0 py-[2.5px] text-[12px] font-semibold text-[#fff]">
        {title}
      </div>
      <div className="flex items-center font-semibold justify-end">
        <div className="text-[12px] text-center w-[113px] hidden min-[1200px]:block">
          <div className="ml-1">
            <span className="text-[#fff] leading-[16px]">Matched</span>
          </div>
        </div>
        <div className="text-[12px] flex justify-center w-[113px] pr-2">
          <span className="text-[#fff] leading-[16px]">1</span>
        </div>
        <div className="text-[12px] flex justify-center w-[113px] pr-2">
          <span className="text-[#fff] leading-[16px]">X</span>
        </div>
        <div className="text-[12px] flex justify-center w-[113px] pr-2">
          <span className="text-[#fff] leading-[16px]">2</span>
        </div>
      </div>
    </div>
  );

  const renderEvent = (event: any) => {
    return (
      <Link
        href={`/market-details/${event?.eventType?.id?.toLowerCase()}/${event?.event?.id}`}
        prefetch
        key={
          event.id ||
          `${event.runnersName[0]?.runnerName}-${event.runnersName[1]?.runnerName}-${event.marketStartTime}`
        }
        className="mb-0 cursor-pointer"
      >
        <div className="bg-[#2f4553ff]">
          <div className="flex justify-between items-center cursor-pointer border-b border-[#b1bad3] text-[#212529ff]">
            <div className="flex items-center gap-4">
              {event.marketType.name === "Tennis" ? (
                <div className="flex w-[60px] h-[42px] text-[10px] font-bold text-white">
                  <div
                    className={`flex-1 flex-col flex items-center justify-center ${
                      event.status != "OPEN"
                        ? "bg-[#787878]"
                        : event.inplay === true
                          ? "bg-[#4DB375]"
                          : "bg-transparent"
                    }`}
                  >
                    {event.status != "OPEN" ? <span>End</span> : <span>1</span>}
                  </div>
                  <div
                    className={`flex-1 flex-col flex items-center justify-center ${
                      event.status != "OPEN"
                        ? "bg-[#4B4B4B]"
                        : event.inplay === true
                          ? "bg-[#20A052]"
                          : "bg-transparent"
                    }`}
                  >
                    {event.status != "OPEN" ? <span>End</span> : <span>2</span>}
                  </div>
                </div>
              ) : (
                <div
                  className={`flex flex-col items-center justify-center px-[9px] w-[60px] h-[42px] text-[10px] ${
                    event.inplay === true
                      ? "bg-[#20a052] text-[#fff] font-bold"
                      : "text-[#b1bad3] bg-[#2f4553ff]"
                  }`}
                >
                  <div className="text-center">
                    {event.inplay === true
                      ? "In-Play"
                      : formatDateTime(event.marketStartTime)}
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-center h-[42px] font-bold text-[12px] text-[#fff]">
                <span className="leading-[16px]">
                  {event.runnersName[0]?.runnerName}
                </span>
                <span className="leading-[16px]">
                  {event.runnersName[1]?.runnerName}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="hidden min-[1200px]:block">
                <div className="flex">
                  <span className="text-[11px] text-[#b1bad3] leading-[16px]">
                    {formatNumber(event.totalMatched.toFixed(2))}
                  </span>
                  <div className="px-2 tv-icon">
                    <span className="w-4 h-4 inline-block">
                      {event.inplay && (
                        <svg className="w-4 h-4" viewBox="0 0 100 100">
                          <path
                            fill="grey"
                            d="M0 13v68.75h25V88h50v-6.25h25V13H0zm87.5 56.25h-75V25.5h75v43.75z"
                          ></path>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex relative min-w-[339px] justify-between">
                {event.status === "SUSPENDED" && (
                  <div className="absolute inset-0 bg-[hsla(0,0%,100%,.65)] flex items-center justify-center z-100 w-[333px] border-2 border-[#b30000]">
                    <span className="text-sm leading-[39px] text-[#b30000] text-center font-bold px-3 py-1 rounded">
                      Suspended
                    </span>
                  </div>
                )}

                {[0, 2, 1].map((idx) => {
                  const runner = event.runners[idx];
                  return (
                    <div
                      key={runner?.selectionId ?? idx}
                      className="flex w-[113px] h-[42px]"
                    >
                      <button
                        disabled={event.status !== "OPEN"}
                        className="flex justify-center items-center flex-col bg-[#a6d8ff] h-[41px] w-[52px] text-[11px]"
                      >
                        <span className="font-bold">
                          {idx === 2
                            ? (runner?.ex?.availableToBack?.[0]?.price ?? "")
                            : (runner?.ex?.availableToBack?.[0]?.price ?? "0")}
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
                        disabled={event.status !== "OPEN"}
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
                    className="h-4 w-4 rounded-[2px] hover:opacity-75 transition"
                  />
                </SportsInfoModal>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      {groupedEvents.map((compi) => {
        const isMarketOpen = openMarkets[compi.competitionName] ?? true;
        const isMultiplesOpen = openMultiples[compi.competitionName] ?? false;

        const inplayEvents = compi.events.filter((ev: any) => ev.inplay);

        const upcomingEvents = compi.events.filter((ev: any) => !ev.inplay);

        return (
          <div key={compi.competitionName} className="mb-4">
            {/* Competition Header */}
            <div className="pt-1 shadow-[1px_1px_3px_#0006] cursor-pointer">
              <div className="bg-[#071824ff]">
                <div className="flex items-center justify-between py-[7px] px-2 text-[12px] text-[#b1bad3] font-semibold leading-[14.4px]">
                  <div
                    className="w-full"
                    onClick={() =>
                      setOpenMarkets((prev) => ({
                        ...prev,
                        [compi.competitionName]: !isMarketOpen,
                      }))
                    }
                  >
                    <div className="flex max-w-fit items-center gap-1">
                      <Icon
                        name="rightSlide"
                        className={`w-3 h-3 fill-white transition-transform duration-300 transform ${
                          isMarketOpen ? "rotate-270" : "rotate-90"
                        }`}
                      />
                      <span>{compi.competitionName}</span>
                    </div>
                  </div>

                  <div ref={multiplesRef} className="relative inline-block">
                    <button
                      onClick={() =>
                        setOpenMultiples((prev) => ({
                          ...prev,
                          [compi.competitionName]: !isMultiplesOpen,
                        }))
                      }
                      className="w-[146px] h-[24.5px] flex items-center justify-between border border-gray-500 hover:bg-[#213743] cursor-pointer bg-[#0F202D] px-[7px] rounded-[2px] text-[11px] text-white"
                    >
                      <span className="truncate max-w-full">Multiples</span>
                      <Icon
                        name="rightSlide"
                        className={`min-w-3 min-h-3 max-w-3 max-h-3 fill-white transition-transform duration-300 transform ${
                          isMultiplesOpen ? "rotate-90" : "rotate-270"
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
              </div>
            </div>

            {/* Events */}
            {isMarketOpen && (
              <>
                {inplayEvents.length > 0 && (
                  <>
                    <Header title="In-Play" />
                    {inplayEvents.map(renderEvent)}
                  </>
                )}
                {upcomingEvents.length > 0 && (
                  <>
                    <Header title="Upcoming" />
                    {upcomingEvents.map(renderEvent)}
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
