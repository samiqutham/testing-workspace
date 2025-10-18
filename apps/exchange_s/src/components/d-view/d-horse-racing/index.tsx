"use client";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@workspace/ui/store/store";
import { useRouter } from "next/navigation";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";

type DHorseRacingProps = {
  currentSportId: string;
};

export const DHorseRacing = ({ currentSportId }: DHorseRacingProps) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeCountry, setActiveCountry] = useState<string>("");
  const [filterRacingEvent, setFilterRacingEvent] = useState<any[]>([]);
  const allRacingList = useAppStore((state) => state.allRacingEvents);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const buttons = Array.from({ length: 3 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    if (i === 0) return "Today";
    if (i === 1) return "Tomorrow";
    return date.toLocaleDateString("en-US", { weekday: "long" });
  });

  const groupEventsByTournament = (tournaments: any[], events: any[]) => {
    const filteredTournaments = tournaments
      .filter((t) => t.eventType?.id === currentSportId)
      .map((t) => ({ ...t, events: [] }));

    const byId = new Map<string, any>(
      filteredTournaments.map((t) => [t.competition?.id, t])
    );

    events.forEach((ev) => {
      if (ev.eventType?.id !== currentSportId) return;
      byId.get(ev.competition?.id)?.events.push(ev);
    });

    return filteredTournaments;
  };

  useEffect(() => {
    if (!allRacingList?.tournaments || !allRacingList?.events) return;

    const filtered = groupEventsByTournament(
      allRacingList.tournaments,
      allRacingList.events
    );

    setFilterRacingEvent(filtered);
    console.log(filtered);
    if (filtered.length > 0) setActiveCountry(filtered[0].competition.id);
    if (filtered.length > 0) {
      setLoading(false);
    }
  }, [allRacingList, currentSportId]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isEventOnActiveDay = (eventDateStr: string) => {
    const eventDate = new Date(eventDateStr);
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + activeDayIndex);
    return isSameDay(eventDate, targetDate);
  };
  return (
    <section className="hidden md:block shadow-[1px_1px_2px_#0000004d] mb-2.5 w-full">
      <div className="p-2 h-11 bg-[#071824] flex items-center justify-between">
        <h4 className="text-xs text-white font-semibold py-2">
          {currentSportId === "4339"
            ? "Greyhound Schedule"
            : "Horse Racing Schedule"}
        </h4>
        <div className="btn-matches">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => setActiveDayIndex(index)}
              className={`capitalize rounded-[2px] cursor-pointer px-4 hover:bg-[#c2c2c2] font-bold h-7 text-[11px] ml-[5px] ${
                activeDayIndex === index
                  ? "bg-white text-[#1e1e1e]"
                  : "bg-[#dcdcdc] text-[#1e1e1e]"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div>
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
            {filterRacingEvent.some((c: any) =>
              c.events?.some((ev: any) =>
                isEventOnActiveDay(ev.marketStartTime)
              )
            ) ? (
              <>
                <div className="flex items-center bg-[#213743]">
                  {filterRacingEvent.map((c) => {
                    const eventCount = c.events?.filter((ev: any) =>
                      isEventOnActiveDay(ev.marketStartTime)
                    ).length;

                    return eventCount > 0 ? (
                      <div
                        key={c.competition?.id}
                        onClick={() => setActiveCountry(c.competition?.id)}
                        className={`w-[88px] h-11 flex justify-center flex-col items-center cursor-pointer ${
                          activeCountry === c.competition?.id
                            ? "border-t-2 border-[#ffb80c] bg-[#071824]"
                            : ""
                        }`}
                      >
                        <div className="mb-1">
                          <img
                            width={20}
                            src={`flags/${c.competition?.name}.svg`}
                            alt={c.competition?.name}
                          />
                        </div>
                        <span className="font-bold text-[11px] leading-[16px] text-white text-center">
                          {c.competition?.name} ({eventCount || 0})
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>

                {filterRacingEvent.map((c: any, i: number) =>
                  activeCountry === c.competition?.id ? (
                    <div key={i} className="text-[11px] bg-[#071824] font-bold">
                      {c.events
                        ?.filter((ev: any) =>
                          isEventOnActiveDay(ev.marketStartTime)
                        )
                        .map((ev: any, j: number) => (
                          <div
                            key={j}
                            className="p-2 pr-0 flex items-center border-b border-[#b1bad3] last:border-b-transparent"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-[42px] font-bold text-[12px] w-[200px] flex flex-col justify-center">
                                <span className="leading-[1rem]">
                                  {ev.event.name}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-nowrap w-[calc(100%-250px)] items-center">
                              <div className="w-4 h-4 mr-2">
                                <svg
                                  className="w-4 h-4"
                                  data-icon="on-tv"
                                  viewBox="0 0 100 100"
                                >
                                  <path
                                    fill="grey"
                                    d="M0 13v68.75h25V88h50v-6.25h25V13H0zm87.5 56.25h-75V25.5h75v43.75z"
                                  ></path>
                                </svg>
                              </div>
                              <div className="w-full grid grid-cols-[repeat(auto-fill,60px)] gap-x-[3px] gap-y-[3px] my-1">
                                {ev.eventData?.map(
                                  (eventTime: any, k: number) =>
                                    isEventOnActiveDay(
                                      eventTime.marketStartTime
                                    ) ? (
                                      <Link
                                        href={`/market-details/${ev.eventType.id.toLowerCase()}/${ev.event.id}`}
                                        prefetch
                                        key={k}
                                        className="bg-[#213743] py-[5px] px-4 text-center rounded-[2px] w-[60px] h-7 text-[11px] leading-[16px] font-bold cursor-pointer hover:opacity-80"
                                      >
                                        {formatTime(eventTime.marketStartTime)}
                                      </Link>
                                    ) : null
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : null
                )}
              </>
            ) : (
              <div className="text-center text-white py-6">
                No events available
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
