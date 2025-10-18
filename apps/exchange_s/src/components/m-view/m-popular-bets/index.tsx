"use client";
import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@workspace/ui/store/store";
import { cn } from "@workspace/ui/lib/utils";
import { Skeleton } from "@workspace/ui/components/skeleton";

const MPopularBets = () => {
  const top21Events = useAppStore((state) => state.top21Events);
  const setEventName = useAppStore((state) => state.setEventName);
  const top6Events = top21Events?.slice(0, 6);
  const router = useRouter();

  const navigateToMarket = (sport: string, id: string, eventName: string) => {
      if (typeof window !== "undefined") {
    localStorage.setItem("eventName", eventName);
  }

      setEventName(eventName)
    router.push(`/exchange/${sport}/market/event/${id}`);
  };

  return (
    <div className="w-full">
      {/* market header */}
      <div className="p-[8px_12px] bg-[#071824] w-full">
        <div className="text-[14px] leading-[16.8px] font-bold">
          Most Popular Bets
        </div>
      </div>
      {/* market header */}

      {!top6Events?.length ? (
        <>
          {[...Array(6)].map((_, i) => (
            <div className="flex items-center gap-2.5 px-[11] py-[11]" key={i}>
              <Skeleton
                className="w-5 h-5 rounded-full"
                style={{
                  background: "#213843",
                }}
              />
              <div className="flex flex-col gap-2">
                <Skeleton
                  className="w-2xs h-3"
                  style={{
                    background: "#213843",
                  }}
                />
                <Skeleton
                  className="w-2xs h-3"
                  style={{
                    background: "#213843",
                  }}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="w-full">
          {top6Events?.map((item: any, idx: number) => {
            let runner0: any;
            let runner1: any;
            let runner2: any;
            let favoriteName: any;
            runner0 = item?.runners[0]?.ex?.availableToBack[0]?.price;
            runner1 = item?.runners[1]?.ex?.availableToBack[0]?.price;
            runner2 = item?.runners[2]?.ex?.availableToBack[0]?.price;
            const prices = [
              { runner: "0", price: runner0 },
              { runner: "1", price: runner1 },
              { runner: "2", price: runner2 },
            ];
            const validPrices = prices.filter(
              (p) => typeof p.price === "number"
            );
            if (validPrices.length) {
              const smallest = validPrices.reduce((min, current) =>
                current.price! < min.price! ? current : min
              );
              favoriteName = item?.runnersName[smallest.runner]?.runnerName;
            }
            return (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-[#304553] bg-[#213743]"
                onClick={() =>
                  navigateToMarket(
                    item?.eventType?.id === "1"
                      ? "soccer"
                      : item?.eventType?.id === "4"
                        ? "cricket"
                        : "tennis",
                    item?.event?.id,
                    item?.event?.name,
                  )
                }
              >
                <div className="py-[11px] px-[11px] flex items-center max-w-[calc(100%-21px)]">
                  <span className="relative top-[1px]">
                    <img
                      src="/transparent-login.gif"
                      className={cn(
                        "h-[17px] min-w-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]",
                        item?.eventType?.id === "1"
                          ? "bg-[-90px_-109px]"
                          : item?.eventType?.id === "4"
                            ? "bg-[-266px_-109px] "
                            : "bg-[-206.5px_-109px]"
                      )}
                    />
                  </span>
                  <span className="text-[13px] px-2.5 leading-[16px] w-full truncate inline-block">
                    <span className="font-bold text-[14px] leading-[16px]">
                      {favoriteName}
                      {item?.inplay && (
                        <span className="text-[13px] text-[#24c060] font-semibold leading-[15px] ms-2 inline-block">
                          In-Play
                        </span>
                      )}
                    </span>
                    <br />
                    <span className="truncate inline-block leading-[15px] max-w-[100%]">
                      {item?.event?.name} , {item?.competition?.name}
                    </span>
                  </span>
                </div>
                <div className="pr-1">
                  <Icon name="rightSlide" className="h-[17px] w-[17px]" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MPopularBets;