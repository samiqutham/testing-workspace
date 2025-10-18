"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";
import Icon from "@workspace/ui/icons/icons";
// import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

import React, { useState } from "react";

const CopyIcon = () => (
  <svg
    data-ds-icon="Copy"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="inline-block shrink-0"
  >
    <path
      fill="#fff"
      d="M14 8H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2"
    />
    <path
      fill="#fff"
      d="M22 4v10c0 1.1-.9 2-2 2h-2v-6c0-2.21-1.79-4-4-4H8V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
    />
  </svg>
);

export default function DOverview() {
const [affiliateLink] = useState("stake.com/?c=SEUEkrD");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };



  return (
    <div className="flex flex-col gap-12">
      {/* ---------------- Overview Section ---------------- */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Side */}
        <div className="flex flex-col gap-6  max-w-[432px] w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-bold text-[20px]">Overview</h2>
            <span className="text-[#d5dceb] text-base">
              Earn commission for all bets placed by your referrals across
              Casino and Sportsbook.
            </span>
          </div>

          <div className="flex flex-row justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-white font-bold text-[20px]">35.3M</span>
              <span className="text-[#d5dceb] text-sm font-semibold ">
                Worldwide Customers
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white font-bold text-[20px]">36</span>
              <span className="text-[#d5dceb] text-sm font-semibold  ">
                Payment Methods
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white font-bold text-[20px]">16</span>
              <span className="text-[#d5dceb] text-sm font-semibold">
                Languages  Supported
              </span>
            </div>
          </div>
<div className="flex flex-col gap-1 w-full">
            <span className="text-sm font-semibold text-[#b1bad3]">
              Affiliate Link
            </span>
            {/* <div className="flex">
              <input
                type="text"
                value={affiliateLink}
                readOnly
                className="flex-1 bg-[#2f4553] border-2 border-[#2f4553] rounded-l-md p-2 text-white text-sm font-semibold"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="bg-[#2f4553] px-3 flex items-center justify-center rounded-r-md hover:bg-[#3a5a6b]"
              >
                <CopyIcon />
              </button>
            </div> */}
{/* <TooltipProvider>
  <Tooltip open={copied}>
    <TooltipTrigger asChild>
      <div className="flex relative">
        <input
          type="text"
          value={affiliateLink}
          readOnly
          className="flex-1 bg-[#2f4553] border-2 border-[#2f4553] rounded-l-md p-2 text-white text-sm font-semibold"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="bg-[#2f4553] px-3 flex items-center justify-center rounded-r-md hover:bg-[#3a5a6b]"
        >
          <CopyIcon />
        </button>
      </div>
    </TooltipTrigger>

     <TooltipContent
      side="top"
      align="end"
      sideOffset={4}
      className="bg-white relative text-[#0F212E] text-[14px] px-3 py-2 rounded-sm shadow-md"
    >
      Copied!
      <TooltipArrow className="fill-white   absolute left-[28px] visible" />
    </TooltipContent>
  </Tooltip>
</TooltipProvider> */}

 <TooltipProvider>
      <Tooltip open={copied}>
        {/*  TooltipTrigger only wraps the button for perfect positioning */}
        <div className="flex relative">
          <input
            type="text"
            value={affiliateLink}
            readOnly
            className="flex-1 bg-[#2f4553] border-2 border-[#2f4553] rounded-l-md p-2 text-white text-sm font-semibold"
          />

          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-[#2f4553] px-3 flex items-center justify-center rounded-r-md hover:bg-[#3a5a6b]"
            >
              <CopyIcon />
            </button>
          </TooltipTrigger>
        </div>

        {/*  Tooltip content — clean shadcn styling */}
        <TooltipContent
          side="top"
          align="center"
          sideOffset={6}
          className="bg-white text-[#0F212E] text-sm font-medium px-3 py-1.5 rounded-md shadow-md"
        >
          Copied!
          {/* <TooltipArrow className="fill-white stroke-[#d1d5db]" /> */}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>



          </div>
        </div>

        <div className="w-full max-w-[500px] bg-[#2f4553]">
          <div className="relative w-full overflow-hidden rounded-md">
            <div className="text-xl justify-center flex mt-27 text-white text-center">
              Player Placeholder
            </div>
          </div>
        </div>
        {/* Right Side - Video */}
        {/* <div className="w-full max-w-[500px]">
          <div className="relative w-full overflow-hidden rounded-md">
            <iframe
              title="video"
              src="https://player.vimeo.com/video/1089936550?h=a3bd07dcba"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video"
            />
          </div>
        </div> */}
      </div>

      {/* ---------------- Exclusive Advantages Section ---------------- */}
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-bold text-[18px]">Exclusive Advantages</h2>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
  {[
    {
      title: "Instant Payout",
      desc: "Skip the wait. See earnings instantly in your account.",
      icon: (
          <Icon
                  name="payout"
              />
      ),
    },
    {
      title: "Lifetime Commission",
      desc: "If the people you refer keep playing, you keep getting paid.",
      icon: (
         <Icon
                  name="MarketValue"
              />
      ),
    },
    {
      title: "Market Leading Player Value",
      desc: "Grow your earnings with some of the highest returns offered to players.",
      icon: (
       <Icon
                  name="updatecommission"
              />
      ),
    },
    {
      title: "Customise Your Commission",
      desc: "Tailor your commission plan to fit your unique business needs.",
      icon: (
       <Icon
                  name="commission"
              />
      ),
    },
    {
      title: "Crypto & Local Currencies",
      desc: "Earn your way with support for both cryptocurrency and local currencies.",
      icon: (
       <Icon
                  name="crytocurrency"
              />
      ),
    },
    {
      title: "24x7 Multi Language Support",
      desc: "Get the help you want in your preferred language all day, everyday.",
      icon: (
       <Icon
                  name="multilang"
              />
      ),
    },

  ].map((item, idx) => (
    <div
      key={idx}
      className="flex gap-4 rounded-md w-full bg-[#213743] py-3 px-4 min-h-[90px]"
    >
      <div className="min-h-10 min-w-10 flex items-center justify-center">
        {item.icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-white font-bold text-base">{item.title}</span>
        <span className="text-[#d5dceb] text-sm">{item.desc}</span>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* ---------------- Commission Rules Section ---------------- */}
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-bold text-[18px]">Commission Rules</h2>
        <span className="text-[#d5dceb] text-base">
          Our default commission rate is 10% but you can calculate specific
          rates for our products using the formulas below.
        </span>

        <div className="flex flex-col md:flex-row gap-2">
          {/* Casino */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-row items-center gap-2">
              {/* <div className="w-6 h-6 bg-[#2f4553] rounded" /> */}
               <Icon
                                name="casinocard"
                              />
              {" "}
              {/* Casino icon placeholder */}
              <h3 className="text-white font-semibold text-base">Casino</h3>
            </div>
            <span className="text-[#d5dceb] text-sm">
              All of our games have a different house edge. You can derive your
              commission using the following formula:
            </span>
            <div className="bg-[#2f4553] p-2 rounded-md">
              <code className="text-[#d5dceb] text-sm">
                (Edge as decimal * wagered / 2) * commission rate
              </code>
            </div>
          </div>

          <div className="bg-[#2f4553] w-0.5 hidden md:block"></div>

          {/* Sportsbook */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-row items-center gap-2">
               <Icon
                  name="casinocard"
                  />
              {/* <div className="w-6 h-6 bg-[#2f4553] rounded" /> */}
              {" "}
              {/* Sportsbook icon placeholder */}
              <h3 className="text-white font-semibold text-base">Sportsbook</h3>
            </div>
            <span className="text-[#d5dceb] text-sm">
              All sports bets are applied at a 3% theoretical house edge. You
              can derive your commission using the following formula:
            </span>
            <div className="bg-[#2f4553] p-2 rounded-md">
              <code className="text-[#d5dceb] text-sm">
                (0.03 * wagered / 2) * commission rate
              </code>
            </div>
          </div>

          <div className="bg-[#2f4553] w-0.5 hidden md:block"></div>

          {/* Poker */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-row items-center gap-2">
              {/* <div className="w-6 h-6 bg-[#2f4553] rounded" /> */}
               <Icon
                  name="sportbook"
                  
                />
              {" "}
              {/* Poker icon placeholder */}
              <h3 className="text-white font-semibold text-base">Poker</h3>
            </div>
            <span className="text-[#d5dceb] text-sm">
              We collect a small percentage of each pot (known as Rake) as a fee
              for hosting the game. Your commission is calculated using Rake:
            </span>
            <div className="bg-[#2f4553] p-2 rounded-md">
              <code className="text-[#d5dceb] text-sm">
                Rake * commission rate
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Banner */}
        <img
          src="@workspace/ui/assets/browse/affiliates-program.webp"
          alt="Affiliate Program Template Banner"
          className="w-full h-[180px] object-cover rounded-md"
          loading="lazy"
          decoding="async"
        />

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-bold text-[18px">
            Templates to Help Your Campaign Stand Out
          </h2>
          <span className="text-[#d5dceb] text-base">
            We’ve created digital banner templates to make it easier for you to
            promote your campaigns online.
          </span>
          <a
            href="https://drive.google.com/drive/folders/1vs9l-gQQb03SiYVu5FI6ey8PRi9xmggw"
            target="_blank"
            rel="noopener noreferrer"
            className="
  inline-flex items-center gap-1
  w-full justify-center         
  px-5 py-2.5 rounded-md
  bg-blue-500 text-white text-sm font-semibold
  hover:bg-blue-600 transition
  md:w-fit md:justify-start 
  text-[16px]    
"
          >
            Browse Templates
            <svg
              data-ds-icon="External"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="inline-block shrink-0"
            >
              <path
                fill="currentColor"
                d="M20 13.4c-.55 0-1 .45-1 1v4c0 .33-.27.6-.6.6H5.6c-.33 0-.6-.27-.6-.6V5.6c0-.33.27-.6.6-.6h4.8c.55 0 1-.45 1-1s-.45-1-1-1H5.6C4.17 3 3 4.17 3 5.6v12.8C3 19.83 4.17 21 5.6 21h12.8c1.43 0 2.6-1.17 2.6-2.6v-4c0-.55-.45-1-1-1"
              />
              <path
                fill="currentColor"
                d="M14.4 3c-.55 0-1 .45-1 1s.45 1 1 1h3.19L8.1 14.49a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l9.49-9.49V9.6c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}