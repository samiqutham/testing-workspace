"use client";

import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useRef, useState } from "react";
import Publisher from "../publisher-slider";
import { useAppStore } from "@workspace/ui/store/store";
import GameCarousel from "@workspace/ui/common/components/game-carousel";
import GridSection from "../new-releases";

export default function TabSlider() {
  const [activeMainBetsTab, setActiveMainBetsTab] = useState("Lobby");
  const [isMobile, setIsMobile] = useState(false);
  const trendingList = useAppStore((state) => state.trendingList);
  const { trendingEvents } = trendingList;
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // keep refs in sync
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, []);

  // center active tab
  useEffect(() => {
    const centerActive = () => {
      const idx = tabs.findIndex((t) => t.label === activeMainBetsTab);
      if (idx === -1) return;
      const tab = tabRefs.current[idx];
      const container = containerRef.current;
      if (!tab || !container) return;

      const cRect = container.getBoundingClientRect();
      const tRect = tab.getBoundingClientRect();
      const offset =
        tRect.left - cRect.left - cRect.width / 2 + tRect.width / 2;

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: "smooth",
      });
    };

    centerActive();

    const ro = new ResizeObserver(centerActive);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [activeMainBetsTab]);

  const breakpoints = {

    0: {
      slidesPerView: 3,
      spaceBetween: 6,
      // slidesPerGroup: 3,
      cardPerView: 3,
      scrollCards: 3,
      carouselSpace: 3,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
    910: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 16,
    },
    1061: {
      slidesPerView: 7,
      spaceBetween: 16,
    },
    1200: {
      slidesPerView: 8,
      spaceBetween: 11,
    },
  };
  // Tabs with dynamic icons
  const tabs = [
    { label: "Lobby", icon: "lobby" },
    { label: "New Releases", icon: "newReleases" },
    { label: "Stake Originals", icon: "stakeOriginals" },
    { label: "Slots", icon: "slots" },
    { label: "Live Casino", icon: "liveCasino" },
    { label: "Stake Exclusives", icon: "stakeExclusives" },
  ];
  const tredingimg = [
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "09530323",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "4344",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55223",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55224",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55225",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55226",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55227",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55228",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55229",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55230",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55231",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55232",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55233",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55234",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55235",
    },
    {
      image:
        "https://whiteimages.b-cdn.net/images/ezgif-129b05dedba24d-00f8c571.jpg",
      gameId: "55236",
    },
  ];

  return (
    <div className=" w-full max-w-[1200] mx-auto">
      {/* Tabs */}
      <div
        ref={containerRef}
        className="!overflow-x-auto overflow-y-hidden max-w-fit no-scrollbar "
      >
        <div className="flex bg-[#0F212E] rounded-[3rem] p-[6px] flex-shrink-0 min-w-max h-14 w-full overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              ref={(el: HTMLButtonElement | null) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => setActiveMainBetsTab(tab.label)}
              className={`inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] cursor-pointer group
                px-5 py-[15px] text-sm leading-none rounded-full
              ${activeMainBetsTab === tab.label
                  ? "bg-[#2F4553] text-white"
                  : "bg-transparent text-white hover:bg-[#2F4553] hover:text-white"
                }
              ${index > 0 ? "ml-[6px]" : ""} `}
            >
              <Icon
                name={tab.icon}
                className="w-[14px] h-[14px] group-hover:fill-white"
                fill={
                  activeMainBetsTab === tab.label
                    ? "white"
                    : "rgb(177, 186, 211)"
                }
              />
              <span className="mt-[1px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div>
        {activeMainBetsTab === "Lobby" && (
          <div className="mt-[26px] flex gap-6 flex-col w-full">
            {isMobile ? (
              <>
                <GameCarousel icon="stakeOriginals" data={trendingEvents} heading="Stake Originals" link='/game-category/stake-originals' breakpoints={breakpoints} />
                <GameCarousel icon="slots" data={trendingEvents} heading="Slots" link='/game-category/slots' breakpoints={breakpoints} />
                <Publisher />
                <GameCarousel icon="liveCasino" data={trendingEvents} heading="Live Casino" link='/game-category/live-casino' breakpoints={breakpoints} />
                <GameCarousel icon="gift" data={trendingEvents} heading="Game Shows" link='/game-category/game-shows' />
                <GameCarousel icon="stakeExclusives" data={trendingEvents} heading="Stake Exclusives" link='/game-category/stake-exclusives' breakpoints={breakpoints} />
                <GameCarousel icon="burstGames" data={trendingEvents} heading="Burst Games" link='/game-category/burst-games' breakpoints={breakpoints} />
              </>
            )
              :
              (
                <>
                  <GameCarousel icon="stakeOriginals" data={tredingimg} carouselSpace={10} heading="Stake Originals" link='/game-category/stake-originals' breakpoints={breakpoints} />
                  <GameCarousel icon="slots" data={tredingimg} carouselSpace={10} heading="Slots" link='/game-category/slots' breakpoints={breakpoints} />
                  <Publisher />
                  <GameCarousel icon="liveCasino" data={tredingimg} carouselSpace={10} heading="Live Casino" link='/game-category/live-casino' breakpoints={breakpoints} />
                  <GameCarousel icon="gift" data={tredingimg} carouselSpace={10} heading="Game Shows" link='/game-category/game-shows' breakpoints={breakpoints} />
                  <GameCarousel icon="stakeExclusives" data={tredingimg} carouselSpace={10} heading="Stake Exclusives" link='/game-category/stake-exclusives' breakpoints={breakpoints} />
                  <GameCarousel icon="burstGames" data={tredingimg} carouselSpace={10} heading="Burst Games" link='/game-category/burst-games' breakpoints={breakpoints} />
                </>
              )}
          </div>
        )}
        {activeMainBetsTab === "New Releases" && (
          <div className="mt-6 flex gap-6 flex-col w-full">
            <GridSection
              title="New Releases"
              iconName="newReleases"
              viewAllCount={116}
            />
            <Publisher />
          </div>
        )}
        {activeMainBetsTab === "Stake Originals" && (
          <div className="mt-6 flex gap-6 flex-col w-full">
            <GridSection
              title="Stake Originals"
              iconName="stakeOriginals"
              viewAllCount={116}
            />
            <Publisher />
          </div>
        )}

        {activeMainBetsTab === "Slots" && (
          <div className="mt-6 flex gap-6 flex-col w-full">
            <GridSection title="Slots" iconName="slots" viewAllCount={116} />
            <Publisher />
          </div>
        )}

        {activeMainBetsTab === "Live Casino" && (
          <div className="mt-6 flex gap-6 flex-col w-full">
            <GridSection
              title="Live Casino"
              iconName="liveCasino"
              viewAllCount={116}
            />
            <Publisher />
          </div>
        )}

        {activeMainBetsTab === "Stake Exclusives" && (
          <div className="mt-6 flex gap-6 flex-col w-full">
            <GridSection
              title="Stake Exclusives"
              iconName="stakeExclusives"
              viewAllCount={116}
            />
            <Publisher />
          </div>
        )}
      </div>
    </div>
  );
}
