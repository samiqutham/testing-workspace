"use client";
import React from "react";
import { useAppStore } from "@workspace/ui/store/store";
import GameCarousel from "@workspace/ui/common/components/game-carousel/index";

const DTrendingEvents = () => {
  const trendingEvents = useAppStore(
    (state) => state.trendingList?.trendingEvents
  );

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
      carouselSpeed={600}
      data={trendingEvents?.concat(trendingEvents)}
      carouselSpace={11}
      heading="Trending Events"
      breakpoints={breakpoints}
    />
  );
};

export default DTrendingEvents;
