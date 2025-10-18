"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Diamond } from "lucide-react";
import { parseCookies, setCookie } from "nookies";
import { useAppStore } from "@workspace/ui/store/store";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import casinoActive from "@workspace/ui/assets/browse/exchange-active.svg";
import exchange from "@workspace/ui/assets/browse/exchange.svg";
import exchangeActive from "@workspace/ui/assets/browse/casino-active.svg";
import casino from "@workspace/ui/assets/browse/casino.svg";
import fantasy from "@workspace/ui/assets/browse/fantasy.svg";
import fantasyActive from "@workspace/ui/assets/browse/fantasy-active.svg";
import sports from "@workspace/ui/assets/browse/sports.svg";
import sportsActive from "@workspace/ui/assets/browse/sports-active.svg";
import {
  casino_sLiveUrl,
  exchange_sLiveUrl,
  fantasy_sLiveUrl,
  sportsbook_sLiveUrl,
} from "@workspace/ui/config/config";
import { getBrowseComponent } from "@workspace/ui/lib/browserMapper";
import { motion } from "framer-motion";
import MBroweSearch from "@workspace/ui/common/components/m-view/m-footer-navbar/m-browse/MBroweSearch";
const COOKIE_NAME = "googtrans";

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
interface LanguageDescriptor {
  name: string;
  title: string;
}
declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}
interface GoogleTranslationConfig {
  languages: LanguageDescriptor[];
  defaultLanguage: string;
  countryLanguages: Record<string, string>; // <-- add this
}
const translationConfig =
  globalThis.__GOOGLE_TRANSLATION_CONFIG__ as GoogleTranslationConfig;
const MBrowse = () => {
  const btns = [
    { name: "Exchange", key: "exchange", link: exchange_sLiveUrl },
    { name: "Casino", key: "casino", link: casino_sLiveUrl },
    // { name: "Fantasy", key: "fantasy", link: fantasy_sLiveUrl },
    // { name: "Sports", key: "sports", link: sportsbook_sLiveUrl },
  ];
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { port, origin } = window.location;

    // 🎯 Casino env
    if (
      port === "3002" ||
      origin.includes("stakefair-casino.yourdesign.live")
    ) {
      setActiveKey("casino");
    }
    else if (
      port === "3003" ||
      origin.includes("stakefair-exchange.yourdesign.live")
    ) {
      setActiveKey("exchange");
    }
    // 🎯 Sports env
    else if (
      port === "3005" ||
      origin.includes("stakefair-sportsbook.yourdesign.live")
    ) {
      setActiveKey("sports");
    }
    // 🎯 Default env (3001 or stakefair.yourdesign.live)
    else {
      setActiveKey(null);
    }
  }, []);

  const [selectedTitle, setSelectedtitle] = useState<any>("English");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<any>([]);
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [languages, setLanguages] = useState<LanguageDescriptor[]>([]);
  const [expandedAll, setExpandedAll] = useState<string[]>([]);
  const [expandedLanguage, setExpandedLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { activeDrawer } = useAppStore();
  const [show, setShow] = useState(false);
  const [showCards, setShowCards] = useState(false);
  async function getUserCountry(): Promise<string> {
    try {
      const res = await fetch(
        "https://pro.ip-api.com/json/?key=qSA5ctYZHdWsx04"
      );
      const data = await res.json();
      // console.log('User country code:', data.countryCode);
      return data.countryCode;
    } catch (err) {
      console.error("Failed to detect country", err);
      return "US";
    }
  }
  function reorderLanguagesByCountry(
    languages: LanguageDescriptor[],
    countryCode: string
  ) {
    const defaultLang = translationConfig?.defaultLanguage || "en";
    const localLang = translationConfig?.countryLanguages[countryCode] || "";
    const english = languages?.find((l) => l.name === defaultLang);
    const local =
      localLang && localLang !== defaultLang
        ? languages?.find((l) => l.name === localLang)
        : null;
    const others = languages?.filter(
      (l) => l.name !== defaultLang && l.name !== localLang
    );
    return [english, local, ...(others?.length ? others : [])].filter(Boolean);
  }

  useEffect(() => {
    // console.log('Translation config:', selectedLanguage);
    getUserCountry().then((countryCode) => {
      const reordered = reorderLanguagesByCountry(
        globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages,
        countryCode
      );
      setCurrentLanguage(reordered);
      // console.log('Reordered languages:', reordered);
    });

    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(globalThis.__GOOGLE_TRANSLATION_CONFIG__);
    }
    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      // console.log('Loaded languages:', globalThis.__GOOGLE_TRANSLATION_CONFIG__.languages);

      setLanguages(globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages);
    }
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue: any;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = globalThis.__GOOGLE_TRANSLATION_CONFIG__?.defaultLanguage;
    }
    const languageTitle =
      globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages?.find(
        (lang) => lang.name === languageValue
      )?.title || languageValue;

    if (languageValue) {
      setSelectedLanguage(languageValue);
      setSelectedtitle(languageTitle);
    }
  }, []);

  const handleSelectLanguage = (lang: any, name: any) => {
    setSelectedLanguage(name);
    setCookie(null, COOKIE_NAME, "/auto/" + name);
    window.location.reload();
  };
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
  const [BrowseContent, setBrowseContent] = useState<React.FC | null>(null);

  useEffect(() => {
    if (activeDrawer === "browse") {
      const Comp = getBrowseComponent();
      setBrowseContent(Comp);
      setShow(true);
    } else {
      setShow(false);
    }
  }, [activeDrawer]);

  if (!BrowseContent) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full bg-[#0f212e] overflow-hidden text-white"
    >
      <div className="w-full px-4 py-4  ">
        <MBroweSearch
          className={
            activeKey == "exchange" ? "!border-[#ff9401]" : activeKey == "casino" ? "!border-[#22c55e]" : ""
          }
        />
      </div>
      {/* Switch Tabs */}
      <div className="flex flex-wrap gap-2 px-4 pb-4">
        {btns.map((item) => {
          let bg: any;
          if (item.key === "exchange") {
            activeKey === "exchange" ? (bg = exchangeActive) : (bg = exchange);
          } else if (item.key === "casino") {
            activeKey === "casino" ? (bg = casinoActive) : (bg = casino);
          }
          // else if (item.key === "fantasy") {
          //   activeKey === "fantasy" ? (bg = fantasyActive) : (bg = fantasy);
          // } else if (item.key === "sports") {
          //   activeKey === "sports" ? (bg = sportsActive) : (bg = sports);
          // }

          return (
            <a
              href={item.link}
              key={item.key}
              className={cn(
                "relative min-[420px]:flex-1 min-h-[50px] rounded text-sm font-bold shadow-md flex justify-center items-center overflow-hidden bg-cover bg-center",
                "max-[420px]:w-[calc(50%-0.25rem)]"
              )}
              style={{ backgroundImage: `url(${bg.src})` }}
            >
              <span className="relative z-10 drop-shadow-sm leading-none">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>

      {/* Scrollable content container */}
      <div className="flex overflow-hidden flex-col flex-1 p-0">
        <div className="px-4  overflow-y-scroll  overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div
            className={`bg-[#1a2c38] rounded-sm   transform transition-all duration-200  ease-out
            ${
              showCards
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
          `}
          >
            <BrowseContent />
          </div>
        </div>
      </div>
      <div className="h-4"></div>
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
