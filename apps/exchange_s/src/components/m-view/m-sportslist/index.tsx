import React from "react";
import style from "./m-sportslis.module.css";
import { cn } from "@workspace/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useAppStore } from "@workspace/ui/store/store";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";

export default function MSportsList() {
  const setHeaderTitle = useAppStore((state) => state.setHeaderTitle);
  const inplaySports = useAppStore((state) => state.inplaySports);
  const sportsList = [
    { name: "In-Play", sprite: "bg-[-312px_-590px]" },
    { name: "Cricket", sprite: "bg-[-263.4px_-22px]" },
    { name: "Soccer", sprite: "bg-[-87px_-22px]" },
    { name: "Tennis", sprite: "bg-[-204px_-22px]" },
    { name: "Horse Racing", sprite: "bg-[-862px_-22px]" },
    { name: "Greyhound Racing", sprite: "bg-[-622px_-22px]" },
  ];

  const router = useRouter();
  const handleClick = (name: string) => {
    if (["Cricket", "Soccer", "Tennis"].includes(name)) {
      router.push(`/exchange/${name}`);
    }

    if (["Horse Racing", "Greyhound Racing"].includes(name)) {
      router.push(`/exchange/racing/${name?.toLocaleLowerCase()?.replace(" ", "-")}`);
    }
  };

  const getSprite = (name: string) => {
    const found = sportsList.find((s) => s.name === name);
    return found?.sprite || "";
  };

  const allSportList = useAppStore((state) => state.AllSportList);
  return (
    <>
      <div
        className={`flex overflow-x-scroll  bg-[#071d2a] px-[5px] py-[4px] gap-[5px] relative h-[56px] ${style.scrollbarHidden}`}
      >
        {!allSportList?.eventTypes ? (
          <>
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="w-full !rounded-none"
                style={{
                  height: 47.7,
                  background: "#213843",
                }}
              />
            ))}
          </>
        ) : (
          <>
            <Link href="/exchange/inplay/football" prefetch={true}>
              <div className="flex flex-col items-center justify-center rounded-[1px] whitespace-nowrap bg-[#20a052]  text-[#eee] h-[47.7px] px-[12.212px] py-[3px] w-full">
                <div className="flex items-center justify-center text-[#dddcdc] w-[40px] aspect-square m-[-7px] relative">
                  <div
                    className={cn(
                      "h-[21px] w-[21px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat bg-[-312px_-590px]"
                    )}
                  />
                  <strong className="absolute top-[8px] right-0 flex items-center justify-center bg-white text-[#20a052] border border-[#20a052] px-[3.2px] pt-[2px] font-black text-[10px] h-[15px] leading-[11px] font-[Arial,sans-serif]">
                    {inplaySports?.totalEvent}
                  </strong>
                </div>
                <div className="relative top-[0.5px] text-white text-[10px] -mt-[2px] leading-none">
                  In-Play
                </div>
              </div>
            </Link>

            {allSportList?.eventTypes?.map((sport: any, index: number) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center bg-[#213743] rounded-[1px] whitespace-nowrap text-[#eee] h-[47.7px] px-[12.212px] py-[3px] w-full`}
                onClick={() => handleClick(sport.eventType.name)}
              >
                {getSprite(sport.eventType.name) && (
                  <div className="flex items-center justify-center text-[#dddcdc] w-[40px] aspect-square m-[-7px] relative">
                    <div
                      className={cn(
                        "h-[21px] w-[21px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat",
                        getSprite(sport.eventType.name)
                      )}
                    />
                    {sport.showCount && (
                      <strong className="absolute top-[8px] right-0 flex items-center justify-center bg-white text-[#20a052] border border-[#20a052] px-[3.2px] pt-[2px] font-black text-[10px] h-[15px] leading-[11px] font-[Arial,sans-serif]">
                        {sport.showCount}
                      </strong>
                    )}
                  </div>
                )}

                <div className="relative top-[0.5px] text-white text-[10px] -mt-[2px] leading-none">
                  {sport.eventType.name}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
