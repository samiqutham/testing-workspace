"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";
import Icon from "@workspace/ui/icons/icons";
import { useAppStore } from "@workspace/ui/store/store";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";

function shortNumber(val?: number) {
  const n = Number(val || 0);
  if (!n) return "0";
  if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "b";
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "m";
  if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  return String(Math.round(n));
}

function normalizeName(s?: string) {
  return (s || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function groupByCompetition(items: any[] = []) {
  const acc: any[] = [];
  for (const item of items) {
    const id = item?.competition?.id;
    let existing = acc.find((t) => t.competitionId === id);
    if (!existing) {
      existing = {
        competitionId: id,
        competitionName: item?.competition?.name,
        data: [],
      };
      acc.push(existing);
    }
    existing.data.push(item);
  }
  acc.forEach((t: any) => {
    t.data.sort((a: any, b: any) => {
      const aVal = a?.oddsData?.totalMatched ?? a?.totalMatched ?? 0;
      const bVal = b?.oddsData?.totalMatched ?? b?.totalMatched ?? 0;
      return bVal - aVal;
    });
  });
  return acc;
}

function splitEventName(name?: string) {
  if (!name) return ["", ""];
  const parts = name.split(" v ");
  return [parts[0] || "", parts[1] || ""];
}

function buildOdds(event: any) {
  const r = event?.runners || [];
  const safe = (fn: () => any, fallback: any) => {
    try {
      const v = fn();
      return v ?? fallback;
    } catch {
      return fallback;
    }
  };
  const back = [
    {
      price: safe(() => r[0]?.ex?.availableToBack?.[0]?.price, "0"),
      size: safe(() => r[0]?.ex?.availableToBack?.[0]?.size, 0),
      disabled: !safe(() => r[0]?.ex?.availableToBack?.[0], null),
    },
    {
      price: safe(() => r[2]?.ex?.availableToBack?.[0]?.price, "-"),
      size: safe(() => r[2]?.ex?.availableToBack?.[0]?.size, 0),
      disabled: !safe(() => r[2]?.ex?.availableToBack?.[0], null),
    },
    {
      price: safe(() => r[1]?.ex?.availableToBack?.[0]?.price, "0"),
      size: safe(() => r[1]?.ex?.availableToBack?.[0]?.size, 0),
      disabled: !safe(() => r[1]?.ex?.availableToBack?.[0], null),
    },
  ];
  const lay = [
    {
      price: safe(() => r[0]?.ex?.availableToLay?.[0]?.price, "0"),
      size: safe(() => r[0]?.ex?.availableToLay?.[0]?.size, 0),
      disabled: !safe(() => r[0]?.ex?.availableToLay?.[0], null),
    },
    {
      price: safe(() => r[2]?.ex?.availableToLay?.[0]?.price, "-"),
      size: safe(() => r[2]?.ex?.availableToLay?.[0]?.size, 0),
      disabled: !safe(() => r[2]?.ex?.availableToLay?.[0], null),
    },
    {
      price: safe(() => r[1]?.ex?.availableToLay?.[0]?.price, "0"),
      size: safe(() => r[1]?.ex?.availableToLay?.[0]?.size, 0),
      disabled: !safe(() => r[1]?.ex?.availableToLay?.[0], null),
    },
  ];
  return { back, lay };
}

const icons = [
  { name: "Cricket", bg: "bg-[-266px_-192px]" },
  { name: "Soccer", bg: "bg-[-89px_-192px]" },
  { name: "Tennis", bg: "bg-[-207px_-192px]" },
];

// Helper to dedupe events if the API sends dupes across blocks
function dedupeBy<T>(arr: T[], getKey: (x: T) => string) {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const x of arr) {
    const k = getKey(x);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(x);
    }
  }
  return out;
}

export default function MInplay({ status }: { status: string }) {
  const params = useParams();
  const sportName = (params?.id as string) || "Cricket";
  const router = useRouter();

  const inplaySports = useAppStore((s: any) => s.inplaySports);
  const allEventsList = useAppStore((s: any) => s.allEventsList);
  const sportIds = { cricket: 4, soccer: 1, tennis: 2 } as any;
  // Collect ALL blocks that match the sport (not just the first)
  const selectedBlocks = useMemo(() => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    const date = status == "today" ? currentDate : tomorrow;
    const dateFilter = allEventsList[
      sportIds[sportName.toLocaleLowerCase()]
    ]?.filter((item: any) => {
      const dateToCheck = new Date(item?.marketStartTime);
      if (dateToCheck.toDateString() === date.toDateString()) {
        return item;
      } else {
        return null;
      }
    });
    const list = inplaySports?.data || [];
    const byName = list.filter(
      (s: any) => normalizeName(s?.sportName) === normalizeName(sportName)
    );
    // if route is id (e.g., "4") instead of name
    const byId = list.filter((s: any) => String(s?.sportId) === sportName);
    return status !== "inplay" ? dateFilter : byName.length ? byName : byId;
  }, [inplaySports, sportName]);

  // Merge all events across blocks, and dedupe
  const allEvents = useMemo(() => {
    const merged = selectedBlocks?.flatMap((b: any) => b?.data || []);
    return status !== "inplay"
      ? selectedBlocks
      : dedupeBy(merged, (e: any) =>
        String(e?.event?.id ?? e?.marketId ?? Math.random())
      );
  }, [selectedBlocks]);

  const tournaments = useMemo(() => groupByCompetition(allEvents), [allEvents]);

  // const loading = !inplaySports;
  const loading = !inplaySports?.data || inplaySports.data.length === 0;
  const setEventName = useAppStore((state) => state.setEventName);

  const navigateToMarket = (sport: string, id: string, eventName: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("eventName", eventName);
    }

    setEventName(eventName);
    router.push(`/exchange/${sport}/market/event/${id}`);
  };

  return (
    <>
      <header>
        <div className="flex items-center h-[44px] px-3 bg-[#071824]">
          <div
            className={cn(
              "h-[16px] w-[17.82px] mr-1 bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat",
              icons.find((icon) => icon.name === sportName)?.bg ||
              "bg-[-87px_-22px]"
            )}
          />
          <div className="ml-1 font-bold text-white text-[16px] overflow-hidden text-ellipsis whitespace-nowrap capitalize w-full">
            {status}
          </div>
        </div>
      </header>

      <section>
        <div>
          <div className="flex justify-between items-center h-[27px] border-b border-[#2f4553] px-[10px]">
            <div></div>
            <div className="flex justify-between items-center">
              {["1", "X", "2"].map((item) => (
                <div
                  key={item}
                  className="w-[53px] min-[500px]:w-[111px] text-center ml-[5px] font-bold text-[11px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            [...Array(3)].map((_, tIndex) => (
              <div key={tIndex} className="border-t-[5px] border-[#2f4553] p-2">
                <Skeleton className="h-[38px] w-full mb-2 skeleton-dark" />
                {[...Array(2)].map((__, eIndex) => (
                  <Skeleton
                    key={eIndex}
                    className="h-[60px] w-full mb-2 skeleton-dark"
                  />
                ))}
              </div>
            ))
          ) : tournaments.length === 0 ? (
            <div className="p-4 text-center text-sm text-[#9fb2bf]">
              No in-play events for {sportName}
            </div>
          ) : (
            tournaments?.map((tournament: any, tIndex: number) => (
              <div
                key={tournament?.competitionId ?? tIndex}
                className={
                  tIndex === 0 ? "" : "border-t-[5px] border-[#2f4553]"
                }
              >
                <Link
                  href={`/exchange/${sportName.toLowerCase()}/market/competition/${tournament?.competitionId}`}
                  className="flex items-center justify-between h-[38px] px-[10px] border-b border-[#2f4553] cursor-pointer"
                  prefetch
                >
                  <span className="text-[12px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {tournament?.competitionName}
                  </span>
                  <Icon name="rightSlide" className="h-[17px] w-[17px]" />
                </Link>

                <div>
                  {tournament?.data?.map((event: any, idx: number) => {
                    const [home, away] = splitEventName(event?.event?.name);
                    const isSuspendedOrClosed =
                      event?.status === "SUSPENDED" ||
                      event?.status === "CLOSED";
                    const odds = buildOdds(event);

                    return (
                      <div
                        key={
                          event?.event?.id ??
                          `${tournament?.competitionId}-${idx}`
                        }
                        onClick={() =>
                          navigateToMarket(
                            event?.eventType?.id === "1"
                              ? "soccer"
                              : event?.eventType?.id === "4"
                                ? "cricket"
                                : "tennis",
                            event?.event?.id,
                            event?.event?.name
                          )
                        }
                        className={cn(
                          "flex items-center min-[500px]:pr-[10px]",
                          idx === 0 ? "" : "border-t border-[#2f4553]"
                        )}
                      >
                        <div className="w-full min-w-0">
                          <div className="mr-2">
                            <div className="flex items-center h-[60px]">
                              <div className="w-[42px] min-w-[42px] h-full text-[10px]">
                                <div
                                  className={cn(
                                    "w-[42px] h-[60px] px-[2px] text-white",
                                    event?.status === "CLOSED"
                                      ? "bg-[#8a8d91]"
                                      : event?.inplay
                                        ? "bg-[#20a052]"
                                        : "bg-[#26343f]"
                                  )}
                                >
                                  <div className="max-w-[38px] h-full flex justify-center items-center text-center">
                                    {event?.status === "CLOSED"
                                      ? "END"
                                      : "In-Play"}
                                  </div>
                                </div>
                              </div>

                              <div className="flex ml-[10px] min-w-0 justify-between w-full">
                                <div className="flex flex-col min-w-0">
                                  <div className="text-[11px] font-normal">
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                      <span>{home}</span>
                                    </div>
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                      <span>{away}</span>
                                    </div>
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap mt-[2px] hidden min-[500px]:block">
                                      <span>
                                        {shortNumber(event?.totalMatched)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {event?.isStreaming ? (
                                  <div className="min-w-[20px] ml-2 flex items-start">
                                    <div className="sprite icon-tv-grey" />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={cn(
                            "flex justify-start w-[179px] min-w-[179px] min-[500px]:min-w-[343px] scrollbar-hidden relative",
                            isSuspendedOrClosed
                              ? "overflow-x-hidden"
                              : "overflow-x-auto"
                          )}
                        >
                          {odds.back.map((o, i) => (
                            <div
                              key={`b-${i}`}
                              className={i > 0 ? "ml-[5px]" : ""}
                            >
                              <button
                                disabled={o.disabled}
                                className={cn(
                                  "rounded-[2px] w-[53px] h-10 flex flex-col justify-center items-center",
                                  o.disabled
                                    ? "bg-[#E7EFF5] text-[#aec0cd]"
                                    : "bg-[#a6d8ff] text-[#303030]"
                                )}
                              >
                                <span className="font-bold text-[13px] h-[15px]">
                                  {o.price}
                                </span>
                                <span className="text-[10px]">
                                  {o.disabled
                                    ? i === 1
                                      ? "-"
                                      : "0"
                                    : shortNumber(o.size)}
                                </span>
                              </button>
                            </div>
                          ))}

                          {odds.lay.map((o, i) => (
                            <div key={`l-${i}`} className="ml-[5px]">
                              <button
                                disabled={o.disabled}
                                className={cn(
                                  "rounded-[2px] w-[53px] h-10 flex flex-col justify-center items-center",
                                  o.disabled
                                    ? "bg-[#f4e7e9] text-[#aec0cd]"
                                    : "bg-[#fac9d1] text-[#303030]"
                                )}
                              >
                                <span className="font-bold text-[13px]">
                                  {o.price}
                                </span>
                                <span className="text-[10px]">
                                  {o.disabled
                                    ? i === 1
                                      ? "-"
                                      : "0"
                                    : shortNumber(o.size)}
                                </span>
                              </button>
                            </div>
                          ))}

                          {isSuspendedOrClosed && (
                            <div className="w-full bg-white/28 border-2 border-[#d54d4d] font-bold text-[13px] font-sans text-[#d54d4d] uppercase text-center absolute z-10 left-0 right-0 top-0 bottom-0 flex justify-center items-center">
                              {event?.status}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
