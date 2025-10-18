"use client";

import Icon from "@workspace/ui/icons/icons";
import Image from "next/image";
import React, { useState } from "react";

const totalGames = 12;

export const PlayGames = () => {
  // const games = Array.from({ length: totalGames }, (_, i) => ({
  //   id: i + 1,
  //   title: `Game ${i + 1}`,
  //   image:
  //     "https://gmimages.cdnppb.net/betfair-com/a1ada31a-58cc-40d5-bbe1-7449b46253a7_DESIGNS-109823_The_Goonies_Hey_You_Guys_flat.jpg?auto=compress,format&rect=0,0,900,900&w=225&h=225",
  // }));
  const [showAll, setShowAll] = useState(false);

  const gameImages = [
    "/playgames/goonies.avif",
    "/playgames/roulette.avif",
    "/playgames/storms.avif",
    "/playgames/goonies.avif",
    "/playgames/storms.avif",
    // "/blackjack.png",
    
  ];

  const games = Array.from({ length: totalGames }, (_, i) => ({
    id: i + 1,
    title: `Game ${i + 1}`,
    image: gameImages[i % gameImages.length], // cycle through available images
  }));
  return (
    <section className="mt-4">
      <div className="bg-[#071824] leading-[28px] rounded-t-[2px] text-white px-2.5 text-xs">
        Play Games
      </div>

      <div>
        {games.map((game) => (
          <div
            key={game.id}
            className="w-1/2 float-left relative pt-0 pr-0 pb-[2px] pl-[1px] odd:clear-both odd:pl-0 odd:pr-[1px] odd:pb-[2px] group cursor-pointer"
          >
            <div className="block overflow-hidden pt-[65%] relative">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="absolute inset-0 object-cover"
              />

              <div className="hidden group-hover:block inset-0 absolute h-full text-center bg-[#ffffff80]">
                <div className="top-1/2 -translate-y-1/2 h-4 block relative text-center">
                  <span className="inline-block h-[25px] rounded-[2px] text-[10px] leading-[25px] px-[11px] min-w-[70%] max-w-full bg-[#ffb80c] text-[#1e1e1e]">
                    Play
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center flex justify-end px-2 py-2 border-t">
        {" "}
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-white flex cursor-pointer items-center hover:underline"
        >
          {" "}
          {showAll ? "Show less" : "Show more"}{" "}
          <Icon
            name="questionArrow"
            className={`h-3 w-3 ml-1 transition-transform duration-300 ${showAll ? "rotate-180" : "rotate-0"}`}
          />{" "}
        </button>{" "}
      </div>
    </section>
  );
};
