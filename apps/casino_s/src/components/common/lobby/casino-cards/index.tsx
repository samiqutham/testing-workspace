"use client";

import Icon from "@workspace/ui/icons/icons";
import Image from "next/image";
import React from "react";

const cards = [
  {
    id: 1,
    title: "Vietnamese Speed Baccarat 1",
    price: "$0.2",
    users: 416,
    image: "/carousel/config.png",
  },
  {
    id: 2,
    title: "Stake Exclusive Speed Baccarat 1",
    price: "$0.5",
    users: 289,
    image: "/carousel/config.png",
  },
  {
    id: 3,
    title: "Vietnamese Speed Baccarat 3",
    price: "$1",
    users: 612,
    image: "/carousel/config.png",
  },
  {
    id: 4,
    title: "Vietnamese Speed Baccarat 4",
    price: "$2",
    users: 98,
    image: "/carousel/config.png",
  },
  {
    id: 5,
    title: "Vietnamese Speed Baccarat 5",
    price: "$5",
    users: 743,
    image: "/carousel/config.png",
  },
  {
    id: 6,
    title: "Vietnamese Speed Baccarat 6",
    price: "$10",
    users: 120,
    image: "/carousel/config.png",
  },
  {
    id: 7,
    title: "Vietnamese Speed Baccarat 6",
    price: "$10",
    users: 120,
    image: "/carousel/config.png",
  },
  {
    id: 8,
    title: "Vietnamese Speed Baccarat 6",
    price: "$10",
    users: 120,
    image: "/carousel/config.png",
  },
  {
    id: 9,
    title: "Vietnamese Speed Baccarat 6",
    price: "$10",
    users: 120,
    image: "/carousel/config.png",
  },
  {
    id: 10,
    title: "Vietnamese Speed Baccarat 6",
    price: "$10",
    users: 120,
    image: "/carousel/config.png",
  },
  {
    id: 11,
    title: "Vietnamese Speed Baccarat 6",
    price: "$10",
    users: 120,
    image: "/carousel/config.png",
  },
  {
    id: 12,
    title: "Vietnamese Speed Baccarat 6",
    price: "$10",
    users: 120,
    image: "/carousel/config.png",
  },
];

export const CasinoCards = () => {
  return (
    <div className="flex flex-col flex-grow relative">
      <div className="flex flex-1 px-5 lg:px-7 xl:px-10 pt-0 relative z-[1]">
        <ul className="grid auto-rows-min grid-cols-2 md:grid-cols-4 relative w-full gap-y-4 gap-x-4">
          {cards.map((card) => (
            <li key={card.id} className="list-none max-w-full relative">
              <div className="w-full">
                <div className="overflow-hidden rounded-[.375rem] bg-[#39394d] aspect-[4/3] relative w-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={1000}
                    height={121.5}
                    className="absolute left-0 top-0 rounded-[0.5em] block h-full object-cover transition-all group-hover:scale-[1.1]"
                  />
                  <div className="absolute w-full bottom-0 p-1">
                    <div className="p-[0.21em] w-full relative z-[2] rounded-[.42em] bg-white min-h-[36.38px]"></div>
                  </div>
                </div>

                <div className="grid w-full cursor-pointer">
                  <div className="mt-1 flex overflow-hidden relative items-center">
                    <p className="truncate text-white font-semibold text-[.75rem] leading-[1rem]">
                      {card.title}
                    </p>
                  </div>
                  <div className="mt-[.125rem] gap-2 flex overflow-hidden relative items-center">
                    <span className="text-[#fc0] flex cursor-pointer leading-[1rem] font-semibold text-[.625rem]">
                      {card.price}
                    </span>
                    <span className="text-[#ffffff] flex cursor-pointer text-[.625rem] items-center">
                      <span className="w-3 h-3">
                        <Icon
                          className="text-[#ffffff]"
                          width="10"
                          height="10"
                          name="user"
                        />
                      </span>
                      {card.users}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
