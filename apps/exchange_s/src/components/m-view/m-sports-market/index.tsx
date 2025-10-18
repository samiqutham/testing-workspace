"use client";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";
import { useAppStore } from "@workspace/ui/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@workspace/ui/components/skeleton";

export default function MSportsMarket({ sportName }: any) {
  const router = useRouter();

  const [showText, setShowText] = React.useState(false);
  const [competitions, setCompetitions] = useState<any[]>([]);

  // ✅ get navigation data (same as Angular mainService.getNavigationData)
  const allSportsList = useAppStore((state) => state.AllSportList);
  const [loading, setLoading] = useState(true);
  const [inplayCount, setInplayCount] = useState(0);
  const inplayData = useAppStore((state) => state.inplaySports || { data: [] });
  useEffect(() => {
    if (!inplayData?.data?.length) {
      setInplayCount(0);
      return;
    }

    let total = 0;
    inplayData.data.forEach((item: any) => {
      if (
        item.sportName?.toLowerCase() === sportName?.toLowerCase() &&
        Array.isArray(item.data)
      ) {
        total += item.data.length;
      }
    });
    setInplayCount(total);
  }, [inplayData, sportName]);

  useEffect(() => {
    if (!allSportsList?.competitions) return;

    const filtered = allSportsList.competitions.filter(
      (comp: any) =>
        comp?.eventType?.name?.toLowerCase() === sportName?.toLowerCase()
    );

    setCompetitions(filtered || []);
    setLoading(false);
  }, [allSportsList, sportName]);

  const icons = [
    { name: "Cricket", bg: "bg-[-266px_-192px]" },
    { name: "Soccer", bg: "bg-[-89px_-192px]" },
    { name: "Tennis", bg: "bg-[-207px_-192px]" },
  ];

  return (
    <div className="">
      <div className="w-full">
        <div className="h-[32px] bg-[#071824] w-full flex items-center px-[12px]">
          <div
            className={cn(
              "h-[16px] w-[17px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat mr-1",
              icons.find((icon) => icon.name === sportName)?.bg ||
                "bg-[-87px_-22px]"
            )}
          />
          <div className="text-[14px] leading-[16px] font-bold ml-1">
            {sportName || "Sport Name"}
          </div>
        </div>
      </div>

      {/* time  */}
      <div className="w-full">
        <div className="py-[5px] bg-[#071824] w-full">
          <div className="text-[14px] leading-[16.8px] font-[600] px-[12px] pt-[2.61px] pb-[2.6px] relative left-[-4px]">
            Time
          </div>
        </div>

        <Link
          href={`/exchange/${sportName}/inplay`}
          prefetch
          className="flex items-center justify-between w-full border-b border-[#304553] bg-[#213743]"
        >
          <div className="text-[12px] leading-[16px] py-[10.5px] px-[10px]">
            Inplay &nbsp;({inplayCount})
          </div>
          <div>
            <Icon name="rightSlide" className="h-[17px] w-[17px]" />
          </div>
        </Link>

        <Link
          href={`/exchange/${sportName}/today`}
          prefetch
          className="flex items-center justify-between w-full border-b border-[#304553] bg-[#213743]"
        >
          <div className="text-[12px] leading-[16px] py-[10.5px] px-[10px]">
            Today
          </div>
          <div>
            <Icon name="rightSlide" className="h-[17px] w-[17px]" />
          </div>
        </Link>

        <Link
          href={`/exchange/${sportName}/tomorrow`}
          prefetch
          className="flex items-center justify-between w-full bg-[#213743]"
        >
          <div className="text-[12px] leading-[16px] py-[10.5px] px-[10px]">
            Tomorrow
          </div>
          <div>
            <Icon name="rightSlide" className="h-[17px] w-[17px]" />
          </div>
        </Link>
      </div>

      {/* compitition */}
      <div className="w-full">
        <div className="py-[5px] bg-[#071824] w-full">
          <div className="text-[14px] leading-[16.8px] font-[600] px-[12px] pt-[2.61px] pb-[2.6px] relative left-[-4px]">
            Competitions
          </div>
        </div>

        {/* <div className="w-full">
          {competitions.map((competition, index) => (
            <Link
              key={index}
              href={`/exchange/${sportName}/market/competition`}
            >
              <div className={`flex items-center justify-between w-full bg-[#213743] cursor-pointer hover:bg-[#1C313D]
                ${index !== competitions.length - 1 ? "border-b border-[#304553]" : ""
                                }`}>
                <div className="text-[12px] leading-[16px] py-[10.5px] px-[10px]">
                  {competition}
                </div>
                <Icon name="rightSlide" className="h-[17px] w-[17px]" />
              </div>
            </Link>
          ))}
        </div> */}
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-full !rounded-none mb-[2px]"
              style={{ height: 40, background: "#213843" }}
            />
          ))
        ) : (
          <div className="w-full">
            {competitions.map((comp, index) => (
              <Link
                prefetch={true}
                key={comp.competition.id}
                href={`/exchange/${sportName.toLowerCase()}/market/competition/${comp.competition.id}`}
              >
                <div
                  className={`flex items-center justify-between w-full bg-[#213743] cursor-pointer hover:bg-[#1C313D] ${
                    index !== competitions.length - 1
                      ? "border-b border-[#304553]"
                      : ""
                  }`}
                >
                  <div className="text-[12px] leading-[16px] py-[10.5px] px-[10px]">
                    {comp.competition.name}
                  </div>
                  <Icon name="rightSlide" className="h-[17px] w-[17px]" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Poular Sports */}

      <div className="w-full">
        <div className="py-[5px] bg-[#071824] w-full mb-[5px]">
          <div className="text-[14px] leading-[16.8px] font-[600] px-[12px] pt-[2.61px] pb-[2.6px] relative left-[-4px]">
            Popular Sports
          </div>
        </div>

        <div>
          <div
            onClick={() => setShowText(!showText)}
            className={`flex items-center justify-between w-full  ${showText ? "mb-0" : "mb-[5px]"} cursor-pointer bg-[#213743]`}
          >
            <div className="text-[12px] font-bold leading-[16px] py-[10.5px] px-[10px] hover:bg-[#1C313D]">
              Soccer Betting Explained
            </div>
            <div className="pr-[10px]">
              <Icon
                name="rightSlide"
                className={`h-[21px] w-[16px] ${showText ? "rotate-270" : "rotate-90"} `}
              />
            </div>
          </div>
          {showText && (
            <div
              className={`${showText ? "mb-[5px]" : "mb-0"} border-t border-[#304553] bg-[rgb(33,55,67)]`}
            >
              <p className="py-[2px] px-[12px] leading-[16px bg-[#213743]  mb-[10px] text-[13px] leading-[16px]">
                {" "}
                Betting on Soccer is simple on the StakeFair Exchange. You can
                bet for or against an outcome – e.g. if you're betting on
                Brisbane Roar v Macarthur FC, you can place a lay bet if you
                think Brisbane Roar will lose, or you can place a back bet if
                you think Brisbane Roar will win.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
