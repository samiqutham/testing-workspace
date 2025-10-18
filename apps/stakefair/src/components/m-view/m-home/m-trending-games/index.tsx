"use client";
import React from "react";
import { useAppStore } from "@workspace/ui/store/store";
import GameCarousel from "@workspace/ui/common/components/game-carousel";

const MTrendingGames = () => {
  const trendingList = useAppStore((state) => state.trendingList);
  const { trendingGames } = trendingList;

  return (
    <GameCarousel
      data={trendingGames}
      heading="Treanding Games"
      spriteIcon
      cardPerView={3}
      carouselSpace={6}
      scrollCards={3}
    />
  );
};

export default MTrendingGames;
