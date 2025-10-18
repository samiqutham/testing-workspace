"use client";
import React, { useState } from "react";

export default function DExpandableCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div
        className={`mt-6 bg-[#0f212e] overflow-hidden rounded-[4px] relative max-w-[1200px] mx-auto ${!expanded ? "seeMore" : ""} ${!expanded ? "max-h-[250px]" : ""}`}>
        <div className={` text-white  p-4 ${!expanded ? "max-h-[250px]" : ""}`}>
          <div className=" column-container">
            <div className="">
              <h1 className="font-semibold  align-left text-[1.75rem] max-[1025px]:text-[1.5rem] max-[1025px]:leading-[31.68px] mb-2 leading-[37px]">
                <span>
                  Sports Betting at StakeFair Sportsbook - Bet on Sports Online with the Best Odds
                </span>
              </h1>
              <p className="text-[#b1bad3] inline-block mb-5">
                <span className="text-[1rem] relative max-[1025]:bottom-[.5px]  min-[1440px]:top-[.5px]">
                  With over 100,000 bets placed daily, StakeFair.com is the best
                  place to place wagers on your favourite sports teams and
                  players.
                </span>
              </p>
              <p className="text-[#b1bad3] inline-block mb-5">
                <span className="text-[1rem] ">
                  With over 100,000 bets placed daily, StakeFair.com is the best
                  place to place wagers on your favourite sports teams and
                  players.  With over 100,000 bets placed daily, StakeFair.com is the best
                  place to place wagers on your favourite sports teams 
                </span>
              </p>

              <p className="inline-text">
                <span className="weight-normal line-height-150pct is-inline align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-1f6lug3">
                  With over 100,000 bets placed daily, StakeFair.com is the best
                  place to place wagers on your favourite sports teams and
                  players.
                </span>
              </p>

              <p className="inline-text">
                <span className="weight-normal line-height-150pct is-inline align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-1f6lug3">
                  At{" "}
                </span>
                <a
                  className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-grey-200 hover:bg-transparent hover:text-white focus-visible:outline-hidden !bg-transparent !text-white [&amp;_svg]:!text-white focus-visible:text-white focus-visible!:[&amp;_svg]:text-white inline"
                  href="/sports/home">
                  <span>StakeFair Sportsbook</span>
                </a>
                <span className="weight-normal line-height-150pct is-inline align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-1f6lug3">
                  , we cover all bases regarding sports and markets and offer
                  unbeatable odds to online sports bettors. And thanks to our
                  free live streaming platform, you can watch all the action
                  from the biggest sporting events throughout the year!
                </span>
              </p>

              <p className="inline-text">
                <span className="weight-normal line-height-150pct is-inline align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-1f6lug3">
                  Discover the variety of sports you can bet on at our online
                  sportsbook with our wide range of betting options and the best
                  markets available!
                </span>
              </p>

              <p className="inline-text">
                <span className="weight-normal line-height-150pct is-inline align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-1f6lug3">
                  You can get all the latest betting trends and{" "}
                </span>
                <a
                  className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden inline"
                  href="/blog/july-casino-sports-betting-highlights-stats">
                  <span>statistics for July</span>
                </a>
                <span className="weight-normal line-height-150pct is-inline align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-1f6lug3">
                  or discover the{" "}
                </span>
                <a
                  className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden inline"
                  href="/blog/2024-online-gambling-betting-statistics-trends">
                  <span>greatest wins of 2024 </span>
                </a>
                <span className="weight-normal line-height-150pct is-inline align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-1f6lug3">
                  with our yearly wrap-up to find out why{" "}
                </span>
                <a
                  className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]  text-grey-200 hover:bg-transparent hover:text-white focus-visible:outline-hidden !bg-transparent !text-white [&amp;_svg]:!text-white focus-visible:text-white focus-visible!:[&amp;_svg]:text-white inline"
                  href="/">
                  <span>StakeFair.com</span>
                </a>
                <span className="weight-normal line-height-150pct is-inline align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-1f6lug3">
                  is the number one sports betting platform.
                </span>
              </p>

              <h2 className="weight-semibold line-height-responsive is-inline align-left size-base text-size-base responsive-type-scale variant-highlighted with-icon-space svelte-1f6lug3">
                <span id="Bet_on_Popular_Sports_&amp;_Major_Sporting_Events">
                  Bet on Popular Sports &amp; Major Sporting Events
                </span>
              </h2>

              <h3 className="weight-semibold line-height-responsive is-inline align-left size-default text-size-default responsive-type-scale variant-highlighted with-icon-space svelte-1f6lug3">
                <span id="Traditional_Sports">Traditional Sports</span>
              </h3>

              <p className="inline-block mb-5 text-[#b1bad3]">
                {expanded && (
                  <span className="block mt-2">
                    At{" "}
                    <span className="font-semibold ">StakeFair Sportsbook</span>
                    , we cover all bases regarding sports and markets, and offer
                    unbeatable odds in real time for our users. At{" "}
                    <span className="font-semibold ">StakeFair Sportsbook</span>
                    , we cover all bases regarding sports and markets, and offer
                    unbeatable odds in real time for our users. At{" "}
                    <span className="font-semibold ">StakeFair Sportsbook</span>
                    , we cover all bases regarding sports and markets, and offer
                    unbeatable odds in real time for our users. At{" "}
                    <span className="font-semibold ">StakeFair Sportsbook</span>
                    , we cover all bases regarding sports and markets, and offer
                    unbeatable odds in real time for our users. At{" "}
                    <span className="font-semibold ">StakeFair Sportsbook</span>
                    , we cover all bases regarding sports and markets, and offer
                    unbeatable odds in real time for our users. At{" "}
                    <span className="font-semibold ">StakeFair Sportsbook</span>
                    , we cover all bases regarding sports and markets, and offer
                    unbeatable odds in real time for our users.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="sticky bottom-[23px] w-full flex justify-center z-50">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem] bg-[#2f4553]  bottom-[0.5px] max-[1442px]:bottom-[.8px]">
            {expanded ? "Show Less" : "See More"}
          </button>
        </div>
      </div>
    </>
  );
}
