"use client";
import React from "react";
import { useAppStore } from "@workspace/ui/store/store";
import GameCarousel from "@workspace/ui/common/components/game-carousel";

const DTrendingSports = () => {
  const trendingList = useAppStore((state) => state.trendingList);
  const { trendingSports } = trendingList;
  const breakpoints = {
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
  return (
    <GameCarousel
      icon="basketball"
      data={trendingSports?.concat(trendingSports?.concat(trendingSports))}
      carouselSpace={11}
      carouselSpeed={600}
      heading="Trending Sports"
      breakpoints={breakpoints}
    />
  );
};

export default DTrendingSports;
