"use client";

import { Button } from "@workspace/ui/components/button";
import React from "react";
import Image from "next/image";
import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";
import { useParams } from "next/navigation";

interface GameSectionProps {
  title: string;
  iconName: string;
  viewAllCount?: number;
}

export default function GridSection({
  title,
  iconName,
  viewAllCount = 0,
}: GameSectionProps) {
  const { slug } = useParams();
  const hide = [
    "provider",
    "publishers",
    "stake-originals",
    "slots",
    "live-casino",
    "live-casino",
    "game-shows",
    "stake-exclusives",
  ];
  const games = [
    {
      id: 1,
      title: "Game 1",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 2,
      title: "Game 2",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 3,
      title: "Game 3",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 4,
      title: "Game 4",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 5,
      title: "Game 5",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 6,
      title: "Game 6",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 7,
      title: "Game 7",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 8,
      title: "Game 8",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
    {
      id: 9,
      title: "Game 9",
      img: "https://mediumrare.imgix.net/15a51a2ae2895872ae2b600fa6fe8d7f8d32c9814766b66ddea2b288d04ba89c?w=360&h=472&fit=min&auto=format",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        {!hide.includes(slug as string) && (
          <div className="inline-flex items-center gap-2 justify-start font-semibold whitespace-nowrap bg-transparent text-white text-lg leading-none w-full h-[27px]">
            <span className="mt-0.5">
              <Icon
                name={iconName}
                className="w-[18px] h-[18px] text-[#b1bad3] group-hover:text-white"
              />
            </span>
            <span className="font-semibold text-lg text-white">{title}</span>
          </div>
        )}

        <div>
          {/* Games Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 md:gap-y-[30px] md:gap-x-[15px] lg:gap-y-5 lg:gap-x-2.5 gap-[10px_5px]">
            {games.map((game) => (
              <Link
                href={{
                  pathname: `/game-detail/${game.id}`,
                  query: { title: game.title, img: game.img },
                }}
                key={game.id}
                className="relative min-h-[calc(100%+5px)]"
                prefetch={true}
              >
                <div className="flex justify-center flex-col h-full">
                  {/* Static Image */}
                  <div className="image-carousel-container group relative transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                    <Image
                      src={game.img}
                      alt={`Game ${game.title}`}
                      className="max-w-full h-full object-cover rounded-[4px] w-full min-h-[calc(100%+4px)]"
                      width={1000}
                      height={0}
                    />
                    {/* <Button className="absolute bottom-2 right-2 bg-[#2f4553ff] cursor-pointer hover:bg-[#4a667a] p-3 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Icon
                        name="externalLink"
                        className="w-3 h-3 text-white"
                      />
                    </Button> */}
                  </div>

                  {/* Live playing count */}
                  <div className="live-container text-[12px] cursor-default mt-[7.5px]">
                    <span className="inline-block h-[6.5px] w-[6.5px] bg-[rgb(31,255,32)] rounded-full"></span>
                    <span className="text-[#B1BAD3] tabular-nums font-semibold relative top-[0.5px]">
                      &nbsp;&nbsp;<span className="text-white ">331</span>{" "}
                      playing
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* View All */}
          <div className="w-full flex items-center justify-center mt-6">
            {hide.includes(slug as string) ? (
              <Button className="shadow-md text-white py-[0.9375rem] px-5 bg-[#4a667a] rounded-[4px] cursor-pointer h-11 hover:bg-[#5e7d91]">
                Load More
              </Button>
            ) : (
              <Button className="shadow-md text-white py-[0.9375rem] px-5 bg-[#2f4553] rounded-[4px] cursor-pointer h-11 hover:bg-[#557086]">
                View All {viewAllCount} {title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
