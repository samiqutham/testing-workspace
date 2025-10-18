"use client";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Event = {
  id: string;
  date: string;
  home: string;
  away: string;
  matched?: string;
  inplay?: boolean;
  suspended?: boolean;
};

type Sport = {
  name: string;
  events: Event[];
};

type DMarketHighlightsProps = {
  events: any[]; // raw merged events from API
};

// ✅ Format like DInplay
const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const time = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  if (isToday) return `Today ${time}`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function DMarketHighlights({ events }: DMarketHighlightsProps) {
  // Group & filter by sport
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const groupedSports: Sport[] = useMemo(() => {
    return events.reduce((acc: Sport[], ev: any) => {
      const sportName = ev.eventType?.name || "Unknown";
      let sport = acc.find((s) => s.name === sportName);
      if (!sport) {
        sport = { name: sportName, events: [] };
        acc.push(sport);
      }

      const eventDate = new Date(ev.marketStartTime);
      const today = new Date();
      const isToday =
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear();

      // only keep inplay or today
      if (!ev.inplay && !isToday) return acc;

      const [home, away] = ev.event?.name?.split(" v ") || [ev.event?.name, ""];

      sport.events.push({
        id: ev.event?.id,
        date: ev.inplay ? "In-Play" : formatDateTime(ev.marketStartTime),
        home: home || "",
        away: away || "",
        matched: ev.totalMatched?.toFixed(2),
        inplay: ev.inplay,
        suspended: ev.status !== "OPEN",
      });

      return acc;
    }, []);
  }, [events]);

  useEffect(() => {
    if (groupedSports.length > 0) {
      setLoading(false);
    }
  }, [groupedSports]);

  return (
    <div className="mb-2.5 gap-[1px] flex">
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
          {groupedSports
            .filter((sport) => sport.name === "Cricket") // ✅ only Cricket
            .map((sport) => {
              // Pick max 5 events
              const inplays = sport.events.filter((e) => e.inplay);
              const todays = sport.events.filter((e) => !e.inplay);

              let visibleEvents: Event[] = [];
              if (inplays.length >= 5) {
                visibleEvents = inplays.slice(0, 5);
              } else {
                visibleEvents = [...inplays, ...todays].slice(0, 5);
              }

              if (visibleEvents.length === 0) return null;

              return (
                <div className="flex-auto" key={sport.name}>
                  {/* Header */}
                  <div className="flex justify-between items-center h-6 text-[12px] bg-[#071824ff] border-b border-[#071824ff] pl-2.5 pr-6">
                    <div className="px-0 py-[2.5px] text-[12px] font-semibold text-[#fff]">
                      {sport.name}
                    </div>
                  </div>

                  {/* Events */}
                  <div className="bg-[#2f4553ff]">
                    {visibleEvents.map((event) => (
                      <Link
                        prefetch
                        key={event.id}
                        href={`/market-details/${sport.name.toLowerCase()}/${event.id}`}
                        className="flex justify-between items-center cursor-pointer border-b border-[#b1bad3] text-[#212529ff]"
                      >
                        <div className="flex items-center gap-4">
                          {sport.name === "Tennis" ? (
                            <div className="flex w-[60px] h-[42px] text-[10px] font-bold text-white">
                              <div
                                className={`flex-1 flex-col flex items-center justify-center ${
                                  event.suspended
                                    ? "bg-[#787878]"
                                    : event.inplay
                                      ? "bg-[#4DB375]"
                                      : "bg-transparent"
                                }`}
                              >
                                {event.suspended ? (
                                  <span>End</span>
                                ) : (
                                  <>
                                    <span>1</span>
                                    <span>1</span>
                                  </>
                                )}
                              </div>
                              <div
                                className={`flex-1 flex-col flex items-center justify-center ${
                                  event.suspended
                                    ? "bg-[#4B4B4B]"
                                    : event.inplay
                                      ? "bg-[#20A052]"
                                      : "bg-transparent"
                                }`}
                              >
                                <span>2</span>
                                <span>2</span>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`flex flex-col items-center justify-center px-[9px] w-[60px] h-[42px] text-[10px] ${
                                event.inplay
                                  ? "bg-[#20a052] text-[#fff] font-bold"
                                  : "text-[#b1bad3] bg-[#2f4553ff]"
                              }`}
                            >
                              <div>{event.date}</div>
                            </div>
                          )}

                          <div className="flex flex-col justify-center h-[42px] font-bold text-[12px] text-[#fff]">
                            <span className="leading-[16px]">{event.home}</span>
                            <span className="leading-[16px]">{event.away}</span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="hidden min-[1200px]:block w-[64.64px]">
                            <div className="flex">
                              <span className="text-[11px] text-[#b1bad3] leading-[16px]">
                                {event.matched}
                              </span>
                              <div className="px-2 tv-icon"></div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View All */}
                  <div className="bg-[#2f4553ff] w-full text-right h-[22px] text-white flex items-center justify-end px-2 gap-1">
                    <span className="py-[5px] flex justify-end items-center h-full text-center text-xs hover:underline cursor-pointer">
                      View all {sport.name}
                    </span>
                    <Icon name="rightSlide" className="w-3 h-3" fill="white" />
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}
