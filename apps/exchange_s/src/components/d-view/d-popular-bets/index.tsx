"use client";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useAppStore } from "@workspace/ui/store/store";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Format date & time
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

export default function DPopularBetsUI() {
  const router = useRouter();
  const top21Events = useAppStore((state) => state.top21Events);
  const setEventName = useAppStore((state) => state.setEventName);
  const top6Events = top21Events?.slice(0, 6);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (top6Events?.length > 0) setLoading(false);
  }, [top6Events]);

  const navigateToMarket = (sport: string, id: string, eventName: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("eventName", eventName);
    }
    setEventName(eventName);
    router.push(`/market-details/${sport}/${id}`);
  };

  return (
    <div className="mb-2.5 gap-[1px] flex flex-col">
      {loading ? (
        [...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-full !rounded-none mb-[2px]"
            style={{ height: 40, background: "#213843" }}
          />
        ))
      ) : (
        <div className="flex-auto">
          {/* Header */}
          <div className="flex justify-between items-center h-6 text-[12px] bg-[#071824ff] border-b border-[#071824ff] pl-2.5 pr-6">
            <div className="px-0 py-[2.5px] text-[12px] font-semibold text-[#fff]">
              Most Popular Bets
            </div>
          </div>

          {/* Top 6 Events */}
          <div className="bg-[#2f4553ff]">
            {top6Events?.map((item: any, idx: number) => {
              let runner0 = item?.runners[0]?.ex?.availableToBack[0]?.price;
              let runner1 = item?.runners[1]?.ex?.availableToBack[0]?.price;
              let runner2 = item?.runners[2]?.ex?.availableToBack[0]?.price;
              const prices = [
                { runner: "0", price: runner0 },
                { runner: "1", price: runner1 },
                { runner: "2", price: runner2 },
              ];
              const validPrices = prices.filter((p) => typeof p.price === "number");
              let favoriteName = "";
              if (validPrices.length) {
                const smallest = validPrices.reduce((min, current) =>
                  current.price! < min.price! ? current : min
                );
                favoriteName = item?.runnersName[smallest.runner]?.runnerName;
              }

              const sport =
                item?.eventType?.id === "1"
                  ? "soccer"
                  : item?.eventType?.id === "4"
                  ? "cricket"
                  : "tennis";

              return (
                <div
                  key={idx}
                  onClick={() =>
                    navigateToMarket(sport, item?.event?.id, item?.event?.name)
                  }
                  className="flex justify-between items-center cursor-pointer border-[#b1bad3] border-b "
                >
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex flex-col items-center justify-center px-[9px] w-[60px] h-[42px] text-[10px] ${
                        item?.inplay
                          ? "bg-[#20a052] text-[#fff] font-bold"
                          : "text-[#b1bad3] bg-[#2f4553ff]"
                      }`}
                    >
                      {item?.inplay
                        ? "In-Play"
                        : formatDateTime(item.marketStartTime)}
                    </div>

                    <div className="flex flex-col justify-center h-[42px] font-bold text-[12px] text-[#fff]">
                      <span className="leading-[16px]">{favoriteName}</span>
                      <span className="leading-[16px] font-normal text-[#b1bad3]">
                        {item?.event?.name} , {item?.competition?.name}
                      </span>
                    </div>
                  </div>

              
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
