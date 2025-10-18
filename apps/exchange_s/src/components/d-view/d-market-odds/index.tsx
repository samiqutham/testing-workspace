"use client";
import React, { useEffect, useState } from "react";
import SportsInfoModal from "@exchange_s/modals/sports-info-modal";
import { useRouter } from "next/navigation";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";
import DSkeleton from "../d-skeleton";

type DMarketOddsProps = {
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

export const DMarketOdds = ({ events }: DMarketOddsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const inplayEvents = events.filter((ev) => ev.inplay);

  const upcomingEvents = events.filter((ev) => !ev.inplay);
  useEffect(() => {
    if (inplayEvents.length > 0 || upcomingEvents.length > 0) {
      setLoading(false);
    }
  }, [inplayEvents.length > 0 || upcomingEvents.length > 0]);
  if (loading) {
    return <DSkeleton />;
  }
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

  if (!events?.length)
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

  const renderEvents = (list: any[]) => {
    if (loading) {
      return [...Array(4)].map((_, i) => (
        <Skeleton
          key={i}
          className="w-full !rounded-none mb-[2px]"
          style={{ height: 40, background: "#213843" }}
        />
      ));
    }

    return list.map((ev) => {
      const sportName = ev.event.name;
      const isSuspended = ev.status !== "OPEN";
      const sportId = ev.eventType?.id; // ✅ true sportId
      return (
        <Link
          href={`/market-details/${sportId}/${ev.event?.id}`} // ✅ use ID, not name
          key={ev.event.id}
          className="mb-0 cursor-pointer"
          prefetch
        >
          <div className="bg-[#2f4553ff]">
            <div className="flex justify-between items-center cursor-pointer border-b border-[#b1bad3] text-[#212529ff]">
              <div className="flex items-center gap-4">
                {sportName === "Tennis" ? (
                  <div className="flex w-[60px] h-[42px] text-[10px] font-bold text-white">
                    <div
                      className={`flex-1 flex-col flex items-center justify-center ${
                        isSuspended
                          ? "bg-[#787878]"
                          : ev.inplay
                            ? "bg-[#4DB375]"
                            : "bg-transparent"
                      }`}
                    >
                      {isSuspended ? <span>End</span> : <span>1</span>}
                    </div>
                    <div
                      className={`flex-1 flex-col flex items-center justify-center ${
                        isSuspended
                          ? "bg-[#4B4B4B]"
                          : ev.inplay
                            ? "bg-[#20A052]"
                            : "bg-transparent"
                      }`}
                    >
                      {isSuspended ? <span>End</span> : <span>2</span>}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex flex-col items-center justify-center px-[9px] w-[60px] h-[42px] text-[10px] ${
                      ev.inplay
                        ? "bg-[#20a052] text-[#fff] font-bold"
                        : "text-[#b1bad3] bg-[#2f4553ff]"
                    }`}
                  >
                    <div className="text-center">
                      {ev.inplay
                        ? "In-Play"
                        : formatDateTime(ev.marketStartTime)}
                    </div>
                  </div>
                )}
                <div className="flex flex-col justify-center h-[42px] font-bold text-[12px] text-[#fff]">
                  <span className="leading-[16px]">
                    {ev.runnersName[0]?.runnerName}
                  </span>
                  <span className="leading-[16px]">
                    {ev.runnersName[1]?.runnerName}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="hidden min-[1200px]:block">
                  <div className="flex">
                    <span className="text-[11px] text-[#b1bad3] leading-[16px]">
                      {formatNumber(ev.totalMatched.toFixed(2))}
                    </span>
                    <div className="px-2 tv-icon">
                      <span className="w-4 h-4 inline-block">
                        {ev.inplay && (
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
                  {isSuspended && (
                    <div className="absolute inset-0 bg-[hsla(0,0%,100%,.65)] flex items-center justify-center z-10 w-[333pxpx] border-2 border-[#b30000]">
                      <span className="text-sm leading-[39px] text-[#b30000] text-center font-bold px-3 py-1 rounded">
                        Suspended
                      </span>
                    </div>
                  )}

                  {[0, 2, 1].map((idx) => {
                    if (sportName === "Tennis" && idx === 2) return null;

                    const runner = ev.runners[idx];
                    return (
                      <div
                        key={runner?.selectionId ?? idx}
                        className="flex w-[113px] h-[42px]"
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
                      className="h-4 w-4 rounded-[2px] hover:opacity-75 transition"
                    />
                  </SportsInfoModal>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };
  return (
    <div>
      {inplayEvents.length > 0 && (
        <>
          <Header title="In-Play" />
          {renderEvents(inplayEvents)}
        </>
      )}
      {upcomingEvents.length > 0 && (
        <>
          <Header title="Upcoming" />
          {renderEvents(upcomingEvents)}
        </>
      )}
    </div>
  );
};
