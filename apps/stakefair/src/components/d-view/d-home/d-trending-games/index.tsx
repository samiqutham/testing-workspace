"use client";
import React from "react";
import { useAppStore } from "@workspace/ui/store/store";
import GameCarousel from "@workspace/ui/common/components/game-carousel";

const DTrendingGames = () => {
  const trendingList = useAppStore((state) => state.trendingList);
  const { trendingGames } = trendingList;
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
      spriteIcon
      data={trendingGames?.concat(
        trendingGames?.concat(trendingGames?.concat(trendingGames))
      )}
      carouselSpace={11}
      heading="Trending Games"
      breakpoints={breakpoints}
      carouselSpeed={600}
    />
  );
};

export default DTrendingGames;
