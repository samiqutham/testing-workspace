"use client";
import SportsInfoModal from "@exchange_s/modals/sports-info-modal";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import DSkeleton from "../d-skeleton";

type Event = {
  id: string;
  date: string;
  home: string;
  away: string;
  matched?: string;
  odds: { back: string; lay: string }[];
  inplay?: boolean;
  hasTv?: boolean;
  suspended?: boolean;
  market?: any;
};

type Sport = {
  id: string;
  name: string;
  events: Event[];
};

type DSportsHighlightsProps = {
  events: any[];
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

export default function DSportsHighlights({ events }: DSportsHighlightsProps) {
  const [loading, setLoading] = useState(true);

  const groupedSports: Sport[] = useMemo(() => {
    return events.reduce((acc: Sport[], ev: any) => {
      const sportId = ev.eventType?.id || "0";
      const sportName = ev.eventType?.name || "Unknown";

      let sport = acc.find((s) => s.id === sportId);
      if (!sport) {
        sport = { id: sportId, name: sportName, events: [] };
        acc.push(sport);
      }

      // build event as before ...
      const [home, away] = ev.event?.name?.split(" v ") || [ev.event?.name, ""];

      const runners = ev.runners || [];
      const ordered: any[] = [runners[0], runners[2], runners[1]];

      const odds = ordered.map((runner: any) =>
        runner
          ? {
              back: runner?.ex?.availableToBack?.[0]?.price?.toString(),
              lay: runner?.ex?.availableToLay?.[0]?.price?.toString(),
            }
          : { back: "", lay: "" }
      );

      sport.events.push({
        id: ev.event?.id,
        date: ev.inplay ? "In-Play" : formatDateTime(ev.marketStartTime),
        home,
        away,
        matched: ev.totalMatched?.toFixed(2),
        odds,
        inplay: ev.inplay,
        suspended: ev.status !== "OPEN",
        hasTv: ev.isStreaming,
        market: ev.markets || [],
      });

      return acc;
    }, []);
  }, [events]);

  // console.log("Market Data:1234567890", groupedSports );
  useEffect(() => {
    if (groupedSports.length > 0) {
      setLoading(false);
      console.log(groupedSports, "00000000");
    }
  }, [groupedSports]);

  if (!events || events.length === 0) {
    return <DSkeleton />;
  }
  if (loading) {
    return <DSkeleton />;
  }

  function formatNumber(num: any) {
    if (num === null || num === undefined) return "";

    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  return (
    <div className="mb-3">
      <div className="pt-1 shadow-[1px_1px_3px_#0006]">
        <div className="bg-[#071824ff]">
          <div className="py-[7px] px-2 text-[12px] text-[#b1bad3] font-semibold">
            Sport Highlights
          </div>
        </div>
      </div>
      {loading ? (
        [...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-full !rounded-none mb-[2px]"
            style={{ height: 40, background: "#213843" }}
          />
        ))
      ) : (
        <>
          {groupedSports?.map((sport) => {
            const inplayEvents = sport.events
              .filter((ev) => ev.inplay && (Number(ev.matched) || 0) >= 25000) // filter 2500+
              .sort((a: any, b: any) => (b.matched || 0) - (a.matched || 0));

            const todayEvents = sport.events
              .filter((ev) => !ev.inplay && (Number(ev.matched) || 0) >= 25000) // filter 2500+
              .sort(
                (a: any, b: any) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              );

            const visibleEvents = [...inplayEvents, ...todayEvents];

            if (visibleEvents.length === 0) return null;

            return (
              <div key={sport.name}>
                {/* Header */}
                <div className="flex justify-between items-center h-6 text-[12px] bg-[#0f212e] border-b border-[#071824ff] pl-2.5 pr-6">
                  <div className="font-semibold text-white">{sport.name}</div>
                  <div className="flex items-center font-semibold justify-end">
                    <div className="text-[12px] text-center w-[113px] hidden min-[1200px]:block">
                      <span className="text-white">Matched</span>
                    </div>
                    <div className="text-[12px] w-[113px] text-center text-white">
                      1
                    </div>
                    <div className="text-[12px] w-[113px] text-center text-white">
                      X
                    </div>
                    <div className="text-[12px] w-[113px] text-center text-white">
                      2
                    </div>
                  </div>
                </div>

                {/* Events */}
                <div className="bg-[#2f4553ff]">
                  {visibleEvents.map((event) => (
                    <Link
                      prefetch={true}
                      key={event.id}
                      href={`/market-details/${sport.id}/${event.id}`}
                      className="flex justify-between items-center cursor-pointer border-b border-[#b1bad3]"
                    >
                      {/* Left side */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex flex-col items-center justify-center px-2 w-[60px] h-[42px] text-[10px] ${
                            event.inplay
                              ? "bg-[#20a052] text-white font-bold"
                              : "text-[#b1bad3] bg-[#0E212E]"
                          }`}
                        >
                          <div className="text-white ">{event.date}</div>
                        </div>
                        <div className="flex flex-col justify-center h-[42px] font-bold text-[12px] text-white">
                          <span>{event.home}</span>
                          <span>{event.away}</span>
                        </div>
                      </div>

                      {/* Odds & matched */}
                      <div className="flex items-center">
                        {/* Matched + TV like DInplay */}
                        <div className="hidden min-[1200px]:block">
                          <div className="flex items-center gap-2 mr-2">
                            <span className="text-[11px] text-[#b1bad3]">
                              {formatNumber(event.matched)}
                            </span>
                            {event.inplay && (
                              <svg className="w-4 h-4" viewBox="0 0 100 100">
                                <path
                                  fill="grey"
                                  d="M0 13v68.75h25V88h50v-6.25h25V13H0zm87.5 56.25h-75V25.5h75v43.75z"
                                ></path>
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Odds */}
                        <div className="flex relative">
                          {event.suspended && (
                            <div className="absolute inset-0 bg-white/65 flex items-center justify-center z-10 w-[332px] border-2 border-red-700">
                              <span className="text-sm text-red-700 font-bold px-3 py-1 rounded">
                                Suspended
                              </span>
                            </div>
                          )}

                          {event.odds.map((odd, idx) => (
                            <div key={idx} className="flex w-[113px] h-[42px]">
                              <button
                                disabled={event.suspended}
                                className="flex justify-center items-center flex-col bg-[#a6d8ff] h-[41px] w-[52px] text-[11px]"
                              >
                                <span className="font-bold text-[#071824ff]">
                                  {formatNumber(odd.back)}
                                </span>
                                <span className="text-[#071824ff]">
                                  {formatNumber(odd.lay)}
                                </span>
                              </button>
                              <button
                                disabled={event.suspended}
                                className="flex justify-center items-center flex-col bg-[#fac9d1] h-[41px] w-[52px] text-[11px]"
                              >
                                <span className="font-bold text-[#071824ff]">
                                  {formatNumber(odd.lay)}
                                </span>
                                <span className="text-[#071824ff]">
                                  {formatNumber(odd.back)}
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>

                        <div
                          className="pr-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <SportsInfoModal market={event.market}>
                            <img
                              src="/info.png"
                              alt="Info"
                              className="h-4 w-4 rounded hover:opacity-75 transition"
                            />
                          </SportsInfoModal>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
