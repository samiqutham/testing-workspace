"use client";
import React from "react";
import { useAppStore } from "@workspace/ui/store/store";
import GameCarousel from "@workspace/ui/common/components/game-carousel";

const MTrendingEvents = () => {
  const trendingList = useAppStore((state) => state.trendingList);
  const { trendingEvents } = trendingList;
  return (
    <GameCarousel
      data={trendingEvents}
      heading="Treanding Events"
      spriteIcon
      cardPerView={3}
      carouselSpace={6}
      scrollCards={3}
    />
  );
};

export default MTrendingEvents;
