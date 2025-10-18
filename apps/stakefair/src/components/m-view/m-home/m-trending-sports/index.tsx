"use client";
import React from "react";
import { useAppStore } from "@workspace/ui/store/store";
import GameCarousel from "@workspace/ui/common/components/game-carousel";

const MTrendingSports = () => {
  const trendingList = useAppStore((state) => state.trendingList);
  const { trendingSports } = trendingList;
  return (
    <GameCarousel
      data={trendingSports}
      heading="Treanding Sports"
      icon="basketball"
      cardPerView={3}
      carouselSpace={6}
      scrollCards={3}
    />
  );
};

export default MTrendingSports;
