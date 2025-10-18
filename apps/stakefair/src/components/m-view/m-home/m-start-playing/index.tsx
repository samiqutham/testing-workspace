"use client";
import Image from "next/image";
import React from "react";
import style from "./style.module.css";
import { cn } from "@workspace/ui/lib/utils";
import { useAppStore } from "@workspace/ui/store/store";
import casinoPlay from "@workspace/ui/assets/start-playing/casino-play.webp";
import exchnagePlay from "@workspace/ui/assets/start-playing/sports-play.webp";
import {
  casino_sLiveUrl,
  exchange_sLiveUrl,
  sportsbook_sLiveUrl,
} from "@workspace/ui/config/config";

const MStartPlaying = () => {
  const trendingList = useAppStore((state) => state.trendingList);
  const { exchangeTypes } = trendingList;
  const extraData = {
    Exchange: { border: "#FF9401", link: exchange_sLiveUrl },
    Casino: { border: "#22c55e", link: casino_sLiveUrl },
    Sports: { border: "#3b82f6", link: sportsbook_sLiveUrl },
  } as any;
  const filteredTypes = exchangeTypes?.filter(
    (item: any) => item?.name !== "Sports"
  );
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 relative top-[-0.5px]  [@media(min-width:768px)_and_(max-width:805px)]:top-[0px]">
        {/* <Icon
          name="startPlaying"
          fill="#b1bad3"
          className="!h-[18px] !w-[18px]"
          width={18}
          height={18}
        /> */}
        <div className="h-[18px] w-[18px] bg-[url('/sprite/casino-sprite.svg')] bg-no-repeat bg-cover bg-[0px_0px]" />

        <h2 className="text-lg font-semibold">Start Playing</h2>
      </div>

      <div className="flex gap-1.5 mt-3 overflow-x-auto scroll-width-none">
        {filteredTypes?.map((item: any, index: number) => (
          <a
            href={extraData[item?.name]?.link}
            key={index}
            className="bg-[#213743] overflow-hidden rounded-[4px] flex-shrink-0 w-[calc(50%-0.25rem)]"
            // style={{ width: "calc(50% - 1.5rem)" }}
          >
            <div
              className={cn(
                "h-[30.725vw] relative border-2 border-b-0 rounded-t-[4px] overflow-hidden w-full object-cover max-w-[350px] max-h-[230px] aspect-[1.52174/1]",
                // "max-[767px]:aspect-[350/215] max-[767px]:h-auto",
                item?.name === "Fantasy" && style.fantasyGradient
              )}
              style={{
                borderColor: extraData[item?.name]?.border,
              }}
            >
              <Image
                // src={item?.name === "Casino" ? casinoPlay : item?.image}
                src={
                  item?.name === "Casino"
                    ? casinoPlay
                    : item?.name === "Exchange"
                    ? exchnagePlay
                    : item?.image
                }
                alt="Casino"
                width={1000}
                height={1000}
                priority
                className="w-full max-w-[350px] h-full object-cover"
              />
            </div>
            <div className="px-3 py-3 max-[374px]:px-2">
              <div className="flex justify-between items-center">
                <span className="text-white  text-base font-semibold max-[374px]:text-sm">
                  {item?.name}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm max-[374px]:text-xs">49,914</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MStartPlaying;
