"use client";
import React, { useEffect, useState } from "react";
import Icon from "@workspace/ui/icons/icons";
import { Diamond } from "lucide-react";
import { parseCookies, setCookie } from "nookies";
const COOKIE_NAME = "googtrans";

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

export default function MSportsBrowse() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<any>([]);
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [languages, setLanguages] = useState<LanguageDescriptor[]>([]);
  const [expandedAll, setExpandedAll] = useState<string[]>([]);
  const [expandedLanguage, setExpandedLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedTitle, setSelectedtitle] = useState<any>("English");

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

  const handleSelectLanguage = (name: any) => {
    setTimeout(() => {
      // Expire old googtrans cookie
      const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

      document.cookie = `googtrans=; ${expire}; path=/;`;
      document.cookie = `googtrans=; ${expire}; domain=.yourdesign.live; path=/;`;

      // Set new googtrans cookie
      const cookieValue = `/auto/${name}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; domain=.yourdesign.live; path=/;`;

      // Also store in your app’s cookie (if you want)
      setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });

      // Refresh to apply translation
      window.location.reload();
    }, 500);
  };

  const toggle = (name: string) => {
    setExpanded((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  // -------- DATA ----------
  const liveSection = [
    { title: "Live Events", icon: "startPlaying", badge: 57 },
    { title: "Starting Soon", icon: "timer" },
    { title: "My Bets", icon: "ticket" },
  ];

  const topSports = [
    { title: "Soccer", icon: "sports" },
    { title: "Tennis", icon: "sports" },
    { title: "Baseball", icon: "sports" },
    { title: "American Football", icon: "sports" },
    { title: "Cricket", icon: "sports" },
    { title: "Basketball", icon: "sports" },
    { title: "Racing", icon: "sports" },
    { title: "Volleyball", icon: "sports" },
    { title: "CS2", icon: "sports" },
    { title: "eSports", icon: "sports" },
  ];

  const allGroups = [
    { title: "All Sports", icon: "sports" },
    { title: "All Esports", icon: "sports" },
    { title: "All Racing", icon: "sports" },
  ];

  const promotionGroup = ["Promotions"];
  const submenuItems = ["Free Bets", "Boosted Odds", "Special Offers"];

  const SponsorshipsGroup = ["Sponsorships"];
  const SponsorshipsItems = ["Sports Cup", "League Tournaments"];

  // const currentLanguage = [
  //   { title: "English", name: "en" },
  //   { title: "Deutsch", name: "de" },
  //   { title: "Español", name: "es" },
  // ];

  const submenuExample = [
    "Live & Upcoming",
    "Outrights",
    "Primera LFP",
    "La Liga 2",
    "Brasileiro Serie B",
    "View All",
  ];

  const allSubmenuSports = Array.from(
    { length: 10 },
    (_, i) => `Sport ${i + 1}`
  );
  const allSubmenuEsports = Array.from(
    { length: 10 },
    (_, i) => `Esport ${i + 1}`
  );
  const allSubmenuRacing = ["Horse Racing", "Formula 1", "MotoGP"];

  return (
    <div className="rounded mx-0 bg-[#1a2c38]">
      {/* -------- LIVE SECTION -------- */}
      <div>
        {liveSection.map((item, idx) => (
          <button
            key={idx}
            className="w-full flex items-center justify-between text-left font-semibold text-sm px-4 py-[13px] hover:bg-[#2f4553] transition"
          >
            <div className="flex items-center gap-2 leading-none">
              <Icon
                name={item.icon}
                className="w-[14px] h-[14px]"
                fill="#b1bad3"
              />
              <span>{item.title}</span>
            </div>
            {item.badge && (
              <span className="px-2 py-0.5 min-w-[1.8em] rounded-full bg-[#4391e7]  text-xs font-semibold text-[#04172d]">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="py-2.5 px-2">
        <hr className="border-[#2f4553] border-b-1" />
      </div>

      {/* -------- TOP SPORTS -------- */}
      <div>
        <div className="px-4 py-1.75 text-sm  text-[#b1bad3] font-semibold">
          Top Sports
        </div>
        {topSports.map((sport) => {
          const open = expanded.includes(sport.title);
          return (
            <div key={sport.title}>
              <button
                onClick={() => toggle(sport.title)}
                className={`w-full flex items-center justify-between text-left font-semibold text-sm px-4 py-[13px] transition ${
                  open ? "bg-[#0e6c84]" : "hover:bg-[#2f4553]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    name={sport.icon}
                    className="w-[14px] h-[14px]"
                    fill="#b1bad3"
                  />
                  <span>{sport.title}</span>
                </div>
                <Icon
                  name="arrow"
                  width={12}
                  height={12}
                  className={`transition-transform duration-300 ${
                    open
                      ? "rotate-180 text-[#b1bad3]"
                      : "rotate-0 text-[#b1bad3]"
                  }`}
                />
              </button>
              {open && (
                <div className="ml-[26px] border-l-2 border-[#2f4553]">
                  {submenuExample.map((item) => (
                    <button
                      key={item}
                      className="w-full inline-flex items-center gap-[10px] py-3 px-4 text-sm font-semibold hover:bg-transparent"
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

      {/* Divider */}
      <div className="py-2.5 px-2">
        <hr className="border-[#2f4553] border-b-2" />
      </div>

      {/* -------- ALL GROUPS -------- */}
      {allGroups.map((group) => {
        const open = expanded.includes(group.title);
        const submenu =
          group.title === "All Sports"
            ? allSubmenuSports
            : group.title === "All Esports"
              ? allSubmenuEsports
              : allSubmenuRacing;

        return (
          <div key={group.title}>
            <button
              onClick={() => toggle(group.title)}
              className={`w-full flex items-center justify-between text-left font-semibold text-sm px-4 py-[13px] transition ${
                open ? "bg-[#0e6c84]" : "hover:bg-[#2f4553]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  name={group.icon}
                  className="w-[14px] h-[14px]"
                  fill="#b1bad3"
                />
                <span>{group.title}</span>
              </div>
              <Icon
                name={"arrow"}
                width={12}
                height={12}
                className={`transition-transform duration-300 ${
                  open ? "rotate-180 text-[#b1bad3]" : "rotate-0 text-[#b1bad3]"
                }`}
              />
            </button>
            {open && (
              <div className="ml-[26px] border-l-2 border-[#2f4553]">
                {submenu.map((item) => (
                  <button
                    key={item}
                    className="w-full inline-flex items-center gap-[10px] py-3 px-4 text-sm font-semibold hover:bg-transparent"
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

      {/* Divider */}
      <div className="py-2.5 px-2">
        <hr className="border-[#2f4553] border-b-2" />
      </div>

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
                  <div className="bg-[url('/sprite/casino-sprite.svg')] bg-no-repeat bg-[length:70px] bg-[-41px_0px]  h-[14px] w-[14px]"></div>
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
          <Icon name={"joint"} className="w-[14px] h-[14px]" fill="#b1bad3" />
          <span>Affiliate</span>
        </button>
      </a>
      <a className=" max-w-full ">
        <button
          type="button"
          className="inline-flex  items-center gap-2 font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white  focus-visible:outline-white text-sm leading-none  py-[0.8125rem] px-[1rem] w-full rounded-sm justify-start max-w-full"
        >
          <Icon name={"trophy"} className="w-[14px] h-[14px]" fill="#b1bad3" />
          <span>VIP Club</span>
        </button>
      </a>
      <a className=" max-w-full ">
        <button
          type="button"
          className="inline-flex  items-center gap-2 font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white  focus-visible:outline-white text-sm leading-none  py-[0.8125rem] px-[1rem] w-full rounded-sm justify-start max-w-full"
        >
          <Icon name={"faqBlog"} className="w-[14px] h-[14px]" fill="#b1bad3" />
          <span>Blog</span>
        </button>
      </a>
      <a className=" max-w-full ">
        <button
          type="button"
          className="inline-flex  items-center gap-2 font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white  focus-visible:outline-white text-sm leading-none  py-[0.8125rem] px-[1rem] w-full rounded-sm justify-start max-w-full"
        >
          <Icon name={"chat"} className="w-[14px] h-[14px]" fill="#b1bad3" />
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
      {/* Language Section */}
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
            <span>Language: {selectedTitle}</span>
          </div>
          <div className="shrink-0 flex w-4 h-4 -my-1 rounded-full items-center justify-center text-xs">
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
            {currentLanguage?.map((item: any, index: number) => (
              <button
                key={index}
                className="w-full py-2 px-4 text-left"
                onClick={() => handleSelectLanguage(item.name)}
              >
                <div
                  translate="no"
                  className="flex items-center justify-between text-sm"
                >
                  <span>{item.title}</span>

                  <label
                    className="inline-flex items-center relative"
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <input
                      id={item.title}
                      type="radio"
                      value={item.name}
                      checked={selectedLanguage === item.name}
                      readOnly
                      className="peer hidden"
                    />

                    <span
                      className="
                w-6 h-6 flex-shrink-0 rounded-full border-2 border-[#2f4553] 
                bg-center bg-no-repeat transition
                peer-checked:bg-[#2f4553]
                bg-[length:0%] peer-checked:bg-[length:75%]
              "
                      style={{ backgroundImage: "var(--radio-img)" }}
                    ></span>
                  </label>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
