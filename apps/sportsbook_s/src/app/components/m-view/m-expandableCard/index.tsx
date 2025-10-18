"use client";
import { useState } from "react";

export default function MExpandableCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`mt-6 bg-[#0f212e] overflow-hidden rounded-[4px] relative ${!expanded ? "seeMore" : ""} ${!expanded ? "max-h-[250px]" : ""}`}>
      <div className={` text-white  p-4 ${!expanded ? "max-h-[250px]" : ""}`}>
        <h1 className="font-semibold  align-left text-[1.5rem] mb-2 leading-[32px]">
          <span>
            Sports Betting at Stakefair Sportsbook - Bet on Sports Online with the
            Best Odds
          </span>
        </h1>
        <p className="text-[#b1bad3] inline-block mb-5">
          <span className="text-[1rem] relative bottom-[1px]">
            With over 100,000 bets placed daily, Stake.com is the best place to
            place wagers on your favourite sports teams and players.
          </span>
        </p>
        <p className="text-[#b1bad3] inline-block mb-5">
          <span className="text-[1rem] ">
            With over 100,000 bets placed daily, Stake.com is the best place to
            place wagers on your favourite sports teams and players.
          </span>
        </p>

        <p className="inline-block mb-5 text-[#b1bad3]">
          {expanded && (
            <span className="block mt-2">
              At <span className="font-semibold ">Stakefair Sportsbook</span>, we
              cover all bases regarding sports and markets, and offer unbeatable
              odds in real time for our users. At{" "}
              <span className="font-semibold ">Stake Sportsbook</span>, we cover
              all bases regarding sports and markets, and offer unbeatable odds
              in real time for our users. At{" "}
              <span className="font-semibold ">Stake Sportsbook</span>, we cover
              all bases regarding sports and markets, and offer unbeatable odds
              in real time for our users. At{" "}
              <span className="font-semibold ">Stake Sportsbook</span>, we cover
              all bases regarding sports and markets, and offer unbeatable odds
              in real time for our users. At{" "}
              <span className="font-semibold ">Stake Sportsbook</span>, we cover
              all bases regarding sports and markets, and offer unbeatable odds
              in real time for our users. At{" "}
              <span className="font-semibold ">Stake Sportsbook</span>, we cover
              all bases regarding sports and markets, and offer unbeatable odds
              in real time for our users.
            </span>
          )}
        </p>

        <div className="sticky bottom-[23px] w-full flex justify-center z-50">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem] bg-[#2f4553]  bottom-[1px]">
            {expanded ? "Show Less" : "See More"}
          </button>
        </div>
      </div>
    </div>
  );
}
