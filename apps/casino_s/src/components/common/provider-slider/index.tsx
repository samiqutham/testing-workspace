"use client";
import React, { useRef, useState } from "react";

const Provider = () => {
  const cards = [
    {
      img: "/provider/card-01.png",
      players: "6,635",
      status: "playing",
    },
    {
      img: "/provider/card-02.png",
      players: "2,410",
      status: "playing",
    },
    {
      img: "/provider/card-03.png",
      players: "9,120",
      status: "playing",
    },
    {
      img: "/provider/card-04.png",
      players: "9,120",
      status: "playing",
    },
    {
      img: "/provider/card-05.jpeg",
      players: "9,120",
      status: "playing",
    },
    {
      img: "/provider/card-06.png",
      players: "9,120",
      status: "playing",
    },

    {
      img: "/provider/card-04.png",
      players: "9,120",
      status: "playing",
    },
    {
      img: "/provider/card-01.png",
      players: "6,635",
      status: "playing",
    },
    {
      img: "/provider/card-02.png",
      players: "2,410",
      status: "playing",
    },
    {
      img: "/provider/card-03.png",
      players: "9,120",
      status: "playing",
    },
    {
      img: "/provider/card-04.png",
      players: "9,120",
      status: "playing",
    },
    {
      img: "/provider/card-05.jpeg",
      players: "9,120",
      status: "playing",
    },
    {
      img: "/provider/card-06.png",
      players: "9,120",
      status: "playing",
    },

    {
      img: "/provider/card-04.png",
      players: "9,120",
      status: "playing",
    },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-y-8 gap-x-4 max-w-[1200px] mx-auto">
      {cards.map((card) => (
        <div>
          <div className="rounded">
            <img className="rounded shadow-md" src={card.img} alt="" />
          </div>
          <div className="flex gap-2 items-center pt-[4.5px] justify-stretch">
            <span className="flex items-center h-[18px] leading-[18px]">
              <span className="h-[6.5px] w-[6.5px] rounded-full bg-[rgb(31,255,32)]"></span>
              <span className="flex items-center text-[.75rem] font-semibold text-[rgb(177,186,211)] ml-[6.2px]">
                <span className="font-semibold text-white tabular-nums">
                  {card.players}
                </span>
                <span className="ml-[3px]">{card.status}</span>
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Provider;
