"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Flag,
  PlayCircle,
  Diamond,
  Crown,
  Globe,
  Newspaper,
  MessageSquare,
  Link2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@workspace/ui/store/store";
import Icon from "@workspace/ui/icons/icons";
import { Input } from "@workspace/ui/components/input";

const submenuItems = [
  "Live & Upcoming",
  "Outrights",
  "Premier League",
  "La Liga",
  "Bundesliga",
];
const SponsorshipsItems = [
  "Drake",
  "Stake F1 Team",
  "Everton Football Club",
  "Esporte Clube Juventude",
  "FBC Melgar",
  "Enyimba Football Club",
  "Fortaleza CEIF",
  "Club Deportivo Ñublense",
  "Patrice Evra",
  "Merab Dvalishvili",
  "Caio Borralho",
];

const topSports = [
  "New Releases",
  "Slots",
  "Stake Originals",
  "Stake Exclusives",
  "Live Casino",
  "Game Shows",
  "Burst Games",
  "Stake Poker",
  "Bonus Buy",
  "Blackjack",
  "Baccarat",
  "Roulette  ",
  "Publishers",
];
const promotionGroup = ["Promotion"];
const SponsorshipsGroup = ["Sponsorships"];

const MBrowse = () => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const [expandedAll, setExpandedAll] = useState<string[]>([]);
  const [expandedLanguage, setExpandedLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { activeDrawer } = useAppStore();
  const [show, setShow] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const toggle = (key: string) =>
    setExpanded((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const toggleAllGroup = (key: string) =>
    setExpandedAll((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const Arrow = ({ open }: { open: boolean }) =>
    open ? (
      <ChevronUp className="w-4 h-4 text-white transition-transform duration-300" />
    ) : (
      <ChevronDown className="w-4 h-4 text-white transition-transform duration-300" />
    );

  useEffect(() => {
    setShow(activeDrawer === "browse");
  }, []);
  useEffect(() => {
    const t2 = setTimeout(() => setShowCards(true), 400);

    return () => {
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full bg-[#0f212e] overflow-hidden text-white"
    >
      <div className="w-full px-4 py-4  ">
        <div className="relative">
          <Icon
            name="search"
            width={20}
            height={20}
            className="absolute left-[9.4] top-[10]   text-slate-400"
          />
          <Input
            placeholder="Search your game"
            className="bg-[#0f212e] !border-[#2f4553] border-2 text-white placeholder:text-[#566671] placeholder:font-semibold focus-visible:ring-0 pl-9 py-2 text-sm  w-full cursor-pointer h-[40.2px] rounded-[4.2px]"
            readOnly
          />
        </div>
      </div>
      {/* Switch Tabs */}
      <div className="flex gap-2 px-4 pb-4">
        <button className="flex-1 min-h-[50px] rounded text-sm font-bold shadow-md overflow-hidden !bg-[url('/browse/casino1.svg')] bg-cover">
          <span className="drop-shadow-sm leading-none  ">Casino</span>
        </button>
        <button className="flex-1 min-h-[50px] rounded text-sm font-bold shadow-md overflow-hidden !bg-[url('/browse/sports.svg')] bg-cover">
          <span className="drop-shadow-sm leading-none ">Sports</span>
        </button>
      </div>

      {/* Scrollable content container */}
      <div className="flex overflow-hidden flex-col flex-1 p-0">
        <div className="px-4  overflow-y-scroll  overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={showCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#1a2c38] rounded-sm"
          >
            <div className="rounded mx-0 ">
              <div className="  bg-[#1a2c38] rounded-[0.25rem]">
                {/* bg-[#0e6c84] */}
                {/* #0f212e */}
                {/* <button className="group inline-flex items-center  font-semibold text-sm opacity-50 leading-none py-3 px-[16px] w-full rounded-md hover:bg-[#2f4553] transition">
              <PlayCircle className="w-4 h-4 text-[#adb5bd] group-hover:text-white" />
              <span className="truncate block max-w-full ms-[8px] mt-[2px]  ">Favourites</span>
            </button>
            <button className="group inline-flex items-center gap-2  font-semibold opacity-50 text-white text-sm leading-none py-3 px-4 w-full rounded-md hover:bg-[#2f4553] transition">
              <Clock className="w-4 h-4 text-[#adb5bd] group-hover:text-white" />
              <span className="truncate block max-w-full mt-[1px]">Recent</span>
            </button>
            <button className="group inline-flex items-center  font-semibold text-sm leading-none py-3 px-[16px] w-full rounded-md hover:bg-[#2f4553] transition">
              <PlayCircle className="w-4 h-4 text-[#adb5bd] group-hover:text-white" />
              <span className="truncate block max-w-full ms-[8px] mt-[2px]  ">Challenges</span>
            </button>
            <button
              disabled
              className="group inline-flex items-center gap-2 font-semibold text-white text-sm leading-none py-3 px-4 w-full rounded-md opacity-50 pointer-events-none"
            >
              <Flag className="w-4 h-4 text-[#adb5bd]" />
              <span className="truncate block max-w-full mt-[1px]">My Bets</span>
            </button>
            <div className="py-[11px] px-2">
              <hr className="border-1 border-[#2f4553]" />
            </div> */}

                {/* Games */}
                {/* <div className="py-[6px] px-[18px]">
              <span className="font-semibold text-[#b1bad3] text-sm block">
                Games
              </span>
            </div> */}
                {/*  */}
                {/* <div>
              {topSports.map((sport, index) => {
                const open = expanded.includes(sport); // index yahan mat do
                return (
                  <div
                    key={sport}
                    className={`pt-1 pb-1 ${index !== 0 ? "pt-[0px]" : ""}`}
                  >
                    <button
                      className={`w-full rounded-none flex items-center justify-between text-left font-semibold text-sm py-2 px-4 transition`}
                    >
                      <div className="flex items-center gap-2">
                        <svg viewBox="0 0 64 64" className="svg-icons" width="14"
                          height="14">
                          <title></title>
                          <path
                            fill="#b1bad3"
                            d="M57.164 0a6.836 6.836 0 0 1 6.79 7.629l-.798 6.836-.011.133a28.9 28.9 0 0 1-8.266 17.086L44.188 42.367l.93 8.473L31.976 64 30.34 51.078c-8.374-3.028-14.1-8.943-17.438-17.437L0 32.023l13.16-13.14 8.473.93L32.316 9.12c4.491-4.477 10.446-7.494 17.22-8.277l6.8-.793q.408-.05.828-.05M8.637 41.125c2.4 6.9 7.869 12.368 14.937 14.82 0 0-4.697 8.467-20.676 5.649C.07 45.615 8.586 40.957 8.586 40.957zm35.64-30.187a7.995 7.995 0 0 0 0 15.988v.039a7.995 7.995 0 0 0 7.996-7.992v-.04a8 8 0 0 0-7.996-7.995"
                          />
                        </svg>

                        <span>{sport}</span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div> */}

                {/* Divider */}
                {/* <div className="py-2 px-2">
              <hr className="border-[#2f4553]" />
            </div> */}
                {/* Promotions */}
                {/*  */}
                <div>
                  {promotionGroup.map((sport) => {
                    const open = expanded.includes(sport);
                    return (
                      <div key={sport}>
                        <button
                          onClick={() => toggle(sport)}
                          className={`w-full rounded-none flex items-center justify-between text-left font-semibold text-sm 
                            px-4 py-[13px]   transition leading-none
    ${expanded.includes(sport) ? "bg-[#0e6c84]" : "hover:bg-[#2f4553]"}
  `}
                        >
                          <div className="flex items-center gap-[8px]">
                            {/* Generic icon for sport */}
                            <Icon
                              name={"promotion"}
                              className="w-[14px] h-[14px] "
                              fill="#b1bad3"
                            />
                            <span>Promotions</span>
                          </div>
                          {/* <Arrow open={open} /> */}

                          <div className="shrink-0 flex w-4 h-4 -my-1 rounded-full items-center justify-center text-xs svelte-ndmlla">
                            <Icon
                              name={"arrow"}
                              width={12}
                              height={12}
                              className={`transition-transform duration-300 ${
                                open
                                  ? "rotate-180 text-[#b1bad3]"
                                  : "rotate-0 text-[#b1bad3]"
                              }`}
                            />
                          </div>
                        </button>
                        {open && (
                          <div className="ml-[26px]   border-l-2 border-[#2f4553]">
                            {submenuItems.map((item) => (
                              <button
                                key={item}
                                className={`w-full inline-flex items-center gap-[10px] py-3 px-4 text-sm font-semibold hover:bg-transparent
        ${
          item === "Outrights" ||
          item === "Premier League" ||
          item === "La Liga" ||
          item === "Bundesliga"
            ? "pt-2"
            : ""
        }`}
                              >
                                <Diamond className="w-3 h-3 text-[#adb5bd]" />
                                <span className="truncate">{item}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/*  */}
                {/* Misc Links */}

                <a className=" max-w-full ">
                  <button
                    type="button"
                    className="inline-flex  items-center gap-2 font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white  focus-visible:outline-white text-sm leading-none  py-[0.8125rem] px-[1rem] w-full rounded-sm justify-start max-w-full"
                  >
                    <Icon
                      name={"joint"}
                      className="w-[14px] h-[14px]"
                      fill="#b1bad3"
                    />
                    <span>Affiliate</span>
                  </button>
                </a>
                <a className=" max-w-full ">
                  <button
                    type="button"
                    className="inline-flex  items-center gap-2 font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white  focus-visible:outline-white text-sm leading-none  py-[0.8125rem] px-[1rem] w-full rounded-sm justify-start max-w-full"
                  >
                    <Icon
                      name={"trophy"}
                      className="w-[14px] h-[14px]"
                      fill="#b1bad3"
                    />
                    <span>VIP Club</span>
                  </button>
                </a>
                <a className=" max-w-full ">
                  <button
                    type="button"
                    className="inline-flex  items-center gap-2 font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white  focus-visible:outline-white text-sm leading-none  py-[0.8125rem] px-[1rem] w-full rounded-sm justify-start max-w-full"
                  >
                    <Icon
                      name={"faqBlog"}
                      className="w-[14px] h-[14px]"
                      fill="#b1bad3"
                    />
                    <span>Blog</span>
                  </button>
                </a>
                <a className=" max-w-full ">
                  <button
                    type="button"
                    className="inline-flex  items-center gap-2 font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white  focus-visible:outline-white text-sm leading-none  py-[0.8125rem] px-[1rem] w-full rounded-sm justify-start max-w-full"
                  >
                    <Icon
                      name={"chat"}
                      className="w-[14px] h-[14px]"
                      fill="#b1bad3"
                    />
                    <span>Forum</span>
                  </button>
                </a>

                {/* Divider */}
                <div className="py-2.5 px-2">
                  <hr className="border-[#2f4553] border-b-2" />
                </div>
                {/*  */}
                <div>
                  {SponsorshipsGroup.map((sport) => {
                    const open = expanded.includes(sport);
                    return (
                      <div key={sport}>
                        <button
                          onClick={() => toggle(sport)}
                          className={`w-full rounded-none flex items-center justify-between text-left font-semibold text-sm py-[13px] px-4  transition
    ${expanded.includes(sport) ? "bg-[#0e6c84]" : "hover:bg-[#2f4553]"}
  `}
                        >
                          <div className="flex items-center gap-2 leading-none">
                            {/* Generic icon for sport */}
                            <Icon
                              name={"hand"}
                              className="w-[14px] h-[14px]"
                              fill="#b1bad3"
                            />
                            <span>Sponsorships</span>
                          </div>
                          {/* <Arrow open={open} /> */}
                          <div className="shrink-0 flex w-4 h-4 -my-1 rounded-full items-center justify-center text-xs svelte-ndmlla">
                            <Icon
                              name={"arrow"}
                              width={12}
                              height={12}
                              className={`transition-transform duration-300 ${
                                open
                                  ? "rotate-180 text-[#b1bad3]"
                                  : "rotate-0 text-[#b1bad3]"
                              }`}
                            />
                          </div>
                        </button>
                        {open && (
                          <div className="ml-[26px]   border-l-2 border-[#2f4553]">
                            {SponsorshipsItems.map((item) => (
                              <button
                                key={item}
                                className={`w-full inline-flex items-center gap-[10px] py-[13px] px-4 text-sm font-semibold hover:bg-transparent
        ${
          item === "Outrights" ||
          item === "Premier League" ||
          item === "La Liga" ||
          item === "Bundesliga"
            ? "pt-2"
            : ""
        }`}
                              >
                                <Diamond className="w-3 h-3 text-[#adb5bd]" />
                                <span className="truncate">{item}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div>
                    <button
                      className={`w-full rounded-none flex items-center justify-between text-left font-semibold text-sm py-[13px] px-4 transition`}
                    >
                      <div className="flex items-center gap-2 leading-none">
                        <Icon
                          name={"privacy"}
                          className="w-[14px] h-[14px]"
                          fill="#b1bad3"
                        />
                        <span>Responsible Gambling</span>
                      </div>
                    </button>
                  </div>
                  <div>
                    <button
                      className={`w-full rounded-none flex items-center justify-between text-left font-semibold text-sm py-[13px] px-4 transition`}
                    >
                      <div className="flex items-center gap-2 leading-none">
                        <Icon
                          name={"support"}
                          className="w-[14px] h-[14px]"
                          fill="#b1bad3"
                        />
                        <span>Live Support</span>
                      </div>
                    </button>
                  </div>
                </div>
                {/* Language */}
                <div>
                  <button
                    onClick={() => setExpandedLanguage((o) => !o)}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm py-[13px] px-4 rounded hover:bg-[#2f4553] transition"
                  >
                    <div className="flex items-center gap-2 leading-none">
                      <Icon
                        name={"language"}
                        className="w-[14px] h-[14px]"
                        fill="#b1bad3"
                      />
                      <span>Language: {selectedLanguage}</span>
                    </div>
                    {/* <Arrow open={expandedLanguage} /> */}
                    <div className="shrink-0 flex w-4 h-4 -my-1 rounded-full items-center justify-center text-xs svelte-ndmlla">
                      <Icon
                        name={"arrow"}
                        width={12}
                        height={12}
                        className={`transition-transform duration-300 ${
                          expandedLanguage
                            ? "rotate-180 text-[#b1bad3]"
                            : "rotate-0 text-[#b1bad3]"
                        }`}
                      />
                    </div>
                  </button>
                  {expandedLanguage && (
                    <div className="ml-[26px] border-l-2 border-[#2f4553]">
                      <button className="w-full py-2 px-4 text-left">
                        <div className="flex items-center justify-between">
                          <span>English</span>
                          <input
                            type="radio"
                            name="language"
                            checked={selectedLanguage === "English"}
                            onChange={() => setSelectedLanguage("English")}
                            className="h-5 w-5 accent-[#2f4553] cursor-pointer"
                          />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* end px-2 */}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex items-center gap-2 text-white px-4 py-2 w-full text-sm font-semibold hover:bg-[#2f4553] transition">
    <span className="text-[#b1bad3]">{icon}</span>
    <span className="truncate">{label}</span>
  </button>
);

// Simple gift icon using the same Diamond to keep styling consistent
const GiftIcon = () => (
  <span className="inline-flex items-center justify-center text-[#b1bad3]">
    <Diamond className="w-4 h-4" />
  </span>
);

export default MBrowse;
