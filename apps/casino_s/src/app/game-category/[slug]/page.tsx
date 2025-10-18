"use client";

import DSearch from "@workspace/ui/common/components/d-view/d-search";
import MSearch from "@workspace/ui/common/components/m-view/m-search";
import React, { useEffect, useRef, useState } from "react";
import GridSection from "../../../components/common/new-releases";
import Publisher from "../../../components/common/publisher-slider";
import BetBoards from "../../../components/common/bet-board";
import { useParams } from "next/navigation";
import SeeMore from "@casino_s/components/common/see-more";
import GameCategoryFilters from "@casino_s/components/common/game-category-filters";
import Provider from "@casino_s/components/common/provider-slider";

const CATEGORY_DATA: Record<
  string,
  { title: string; banner: string; icon: string }
> = {
  "stake-originals": {
    title: "Stake Originals",
    banner: "/casino_S/stake-originals-banner.png",
    icon: "stakeOriginals",
  },
  slots: {
    title: "Slots",
    banner: "/casino_S/slots-banner.png",
    icon: "slots",
  },
  "live-casino": {
    title: "Live Casino",
    banner: "/casino_S/live-casino-banner.png",
    icon: "liveCasino",
  },
  "game-shows": {
    title: "Game Shows",
    banner: "/casino_S/game-shows-banner.png",
    icon: "gift",
  },
  "stake-exclusives": {
    title: "Stake Exclusives",
    banner: "/casino_S/game-shows-banner.png",
    icon: "stakeExclusives",
  },
  "burst-games": {
    title: "Burst Games",
    banner: "/casino_S/game-shows-banner.png",
    icon: "brustGames",
  },
  provider: {
    title: "Publishers",
    banner: "/casino_S/game-shows-banner.png",
    icon: "brustGames",
  },
};

export default function GameCategory() {
  const params = useParams();
  const slug = params?.slug as string;
  const category = CATEGORY_DATA[slug] || CATEGORY_DATA["stake-originals"];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex flex-col mb-6">
      <div className="w-full relative bg-[#213743] h-[80px] min-[700px]:h-[115px]">
        <div className=" px-[3vw]">
          <div className=" flex justify-between max-w-[1200px] mx-auto">
            <div className="flex items-center font-semibold text-[20px] min-[80rem]:text-[24px] text-white">
              {category.title}
            </div>
            <div>
              <img
                className="w-auto h-[80px] min-[700px]:h-[115px]"
                src={category.banner}
                alt={category.title}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {isMobile ? (
          <MSearch />
        ) : (
          <DSearch
            hideDropDown
            classNameIcon="ml-[0px] mt-[0.5px] "
            classNameInput="pl-9 relative bottom-[1px]  h-[37px] !pt-[11px] focus:!text-sm"
          />
        )}
      </div>

      <div className="px-[3vw] flex flex-col  mt-6 ">
        {/* Filters */}

        {slug === "provider" ? (
          <div className="">{/* <Providers /> */}</div>
        ) : (
          <div>
            <GameCategoryFilters />
          </div>
        )}

        {slug !== "provider" && (
          <div className="w-full max-w-[1200px] mx-auto mt-6">
            <GridSection title={category.title} iconName={""} />
          </div>
        )}

        {slug === "provider" ? (
          <div>
            <Provider />
          </div>
        ) : (
          <div className="mt-6">
            <Publisher />
          </div>
        )}

        <div className="mt-6">
          <BetBoards />
        </div>

        <div className="mt-6">
          <SeeMore />
        </div>
      </div>
    </div>
  );
}
