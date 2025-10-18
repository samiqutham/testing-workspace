import { Skeleton } from "@workspace/ui/components/skeleton";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";
import { useAppStore } from "@workspace/ui/store/store";
import { useRouter } from "next/navigation";
import React from "react";

const MQuickLink = () => {
  const top21Events = useAppStore((state) => state.top21Events);
  const quickLinks = top21Events?.slice(6, 21);
    const setEventName = useAppStore((state) => state.setEventName);
  
  const router = useRouter();

  const navigateToMarket = (sport: string, id: string, eventName: string) => {
  // save to localStorage
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
        <div className="text-[14px] leading-[16px] font-bold">Quick Link</div>
      </div>
      {/* market header */}
      {!quickLinks?.length ? (
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
          {quickLinks?.map((item: any, idx: number) => (
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
                    {item?.event?.name}
                  </span>
                  <br />
                  <span className="truncate inline-block leading-[15px] max-w-[100%]">
                    {item?.competition?.name}
                  </span>
                </span>
              </div>
              <div className="pr-1">
                <Icon name="rightSlide" className="h-[17px] w-[17px]" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MQuickLink;