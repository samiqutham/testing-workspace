"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { parseCookies, setCookie } from "nookies";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";
import Gcb from "@workspace/ui/assets/footer/bottom-footer.svg";
import { usePort } from "@workspace/ui/hooks/use-port";
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
const MFooter = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [languages, setLanguages] = useState<LanguageDescriptor[]>([]);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { hostPort, origin } = usePort();

  const footerMenu = [
    {
      label: "Exchange",
      links: [
        { name: "Casino Games", routerLink: "/casino/games" },
        { name: "Slots", routerLink: "/casino/slots" },
        { name: "Live Casino", routerLink: "/casino/live" },
        { name: "Roulette", routerLink: "/casino/roulette" },
        { name: "Blackjack", routerLink: "/casino/blackjack" },
        { name: "Poker", routerLink: "/casino/poker" },
        { name: "Publishers", routerLink: "/casino/publishers" },
        { name: "Promos & Competitions", routerLink: "/casino/promos" },
        { name: "Stake Engine", routerLink: "/casino/engine" },
      ],
    },
    ...(hostPort !== "3003" &&
      !origin.includes("stakefair-exchange.yourdesign.live")
      ? [
        {
          label: "Casino",
          links: [
            { name: "Casino Games", routerLink: "/casino/games" },
            { name: "Slots", routerLink: "/casino/slots" },
            { name: "Live Casino", routerLink: "/casino/live" },
            { name: "Roulette", routerLink: "/casino/roulette" },
            { name: "Blackjack", routerLink: "/casino/blackjack" },
            { name: "Poker", routerLink: "/casino/poker" },
            { name: "Publishers", routerLink: "/casino/publishers" },
            { name: "Promos & Competitions", routerLink: "/casino/promos" },
            { name: "Stake Engine", routerLink: "/casino/engine" },
          ],
        },
        {
          label: "Fantasy",
          links: [
            { name: "Casino Games", routerLink: "/casino/games" },
            { name: "Slots", routerLink: "/casino/slots" },
            { name: "Live Casino", routerLink: "/casino/live" },
            { name: "Roulette", routerLink: "/casino/roulette" },
            { name: "Blackjack", routerLink: "/casino/blackjack" },
            { name: "Poker", routerLink: "/casino/poker" },
            { name: "Publishers", routerLink: "/casino/publishers" },
            { name: "Promos & Competitions", routerLink: "/casino/promos" },
            { name: "Stake Engine", routerLink: "/casino/engine" },
          ],
        },
        {
          label: "Sports",
          links: [
            { name: "Sportsbook", routerLink: "/sports" },
            { name: "Live Sports", routerLink: "/sports/live" },
            { name: "Soccer", routerLink: "/sports/soccer" },
            { name: "Basketball", routerLink: "/sports/basketball" },
            { name: "Tennis", routerLink: "/sports/tennis" },
            { name: "eSports", routerLink: "/sports/esports" },
            { name: "Bet Bonuses", routerLink: "/sports/bonuses" },
            { name: "Sports Rules", routerLink: "/sports/rules" },
            { name: "Racing Rules", routerLink: "/sports/racing-rules" },
          ],
        },
      ]
      : []),
    ...(hostPort === "3003" ||
      origin.includes("stakefair-exchange.yourdesign.live")
      ? [
        {
          label: "Safer Gambling",
          links: [
            { name: "Safer Gambling Information", routerLink: "#" },
            { name: "Gordon Moody", routerLink: "#" },
            { name: "Gamcare", routerLink: "#" },
            { name: "Safer Gambling Tools", routerLink: "#" },
          ],
        },
      ]
      : []),
    {
      label: "Support",
      links: [
        { name: "Help Center", routerLink: "/support/help-center" },
        { name: "Fairness", routerLink: "/support/fairness" },
        { name: "Gambling Helpline", routerLink: "/support/helpline" },
        { name: "Live Support", routerLink: "/support/live" },
        { name: "Self Exclusion", routerLink: "/support/self-exclusion" },
        {
          name: "Law Enforcement Request",
          routerLink: "/support/law-enforcement",
        },
      ],
    },
    {
      label: "About Us",
      links: [
        { name: "VIP Club", routerLink: "/about/vip-club" },
        { name: "Affiliate", routerLink: "/about/affiliate" },
        { name: "Privacy Policy", routerLink: "/about/privacy-policy" },
        { name: "AML Policy", routerLink: "/about/aml-policy" },
        { name: "Terms of Service", routerLink: "/about/terms" },
        ...(hostPort === "3003" ||
          origin.includes("stakefair-exchange.yourdesign.live")
          ? [
            { name: "18+", routerLink: "#" },
            { name: "Developers", routerLink: "#" },
            { name: "StakeFair Exchange Sitemap name ", routerLink: "#" },
            { name: "B2B Partnerships", routerLink: "#" },
            { label: "Cookie Policy", routerLink: "#" },
            { label: "Privacy Preference Centre", routerLink: "#" },
            { label: "Rules & Regulations", routerLink: "#" },
          ]
          : []),
      ],
    },
    {
      label: "Payment Info",
      links: [
        {
          name: "Deposit & Withdrawals",
          routerLink: "/payment/deposit-withdrawals",
        },
        { name: "Currency Guide", routerLink: "/payment/currency-guide" },
        { name: "Crypto Guide", routerLink: "/payment/crypto-guide" },
        { name: "Supported Crypto", routerLink: "/payment/supported-crypto" },
        { name: "How to Use the Vault", routerLink: "/payment/vault-guide" },
        { name: "How Much to Bet With", routerLink: "/payment/bet-guide" },
      ],
    },
    {
      label: "FAQ",
      links: [
        { name: "How-to Guides", routerLink: "/faq/how-to" },
        { name: "Online Casino Guide", routerLink: "/faq/casino-guide" },
        { name: "Sports Betting Guide", routerLink: "/faq/sports-betting" },
        { name: "How to Live Stream Sports", routerLink: "/faq/live-stream" },
        { name: "Stake VIP Guide", routerLink: "/faq/vip-guide" },
        { name: "House Edge Guide", routerLink: "/faq/house-edge" },
      ],
    },
  ];
  const iconsArray = [
    "faqBlog",
    "faqChat",
    "faqFb",
    "faqTwitter",
    "faqInsta",
    "faqYoutube",
    "faqCart",
    "faqPrimeDice",
  ];
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
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("");
  const toggleAccordion = (item: string) => {
    console.log(item, "item");

    setExpandedAccordion(expandedAccordion === item ? null : item);
  };

  // const handleSelectLanguage = (lang: any, name: any) => {
  //   setLanguage(lang);
  //   setOpen(false);
  //   const cookieValue = `/auto/${name}`;
  //   setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });
  //   window.location.reload();
  // };
const handleSelectLanguage = (lang: any, name: any) => {
  setLanguage(lang);
  setOpen(false);

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
};

  //  Close on outside click
  useEffect(() => {
    getUserCountry().then((countryCode) => {
      const reordered = reorderLanguagesByCountry(
        globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages,
        countryCode
      );
      setLanguageConfig(reordered);
      // console.log('Reordered languages:', reordered);
    });
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
      setLanguage(languageTitle);
      setCurrentLanguage(languageValue);
    }

    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(globalThis.__GOOGLE_TRANSLATION_CONFIG__);
    }
    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      // console.log('Loaded languages:', globalThis.__GOOGLE_TRANSLATION_CONFIG__.languages);
      setLanguages(globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="pt-8 pb-[36.1px] bg-[#071d2a]">
      <div className="px-[3vw] flex flex-col items-center">
        <div className="w-full max-w-[1200px]">
          <div className="footer-content w-full m-auto grid ">
            {(hostPort === "3003" ||
              origin.includes("stakefair-exchange.yourdesign.live")) && (
                <div className="bg-[#213743] py-[10px] mb-3 gap-[10px] flex items-center justify-center font-bold text-[12px]">
                  <div className="inline-block w-[36px] aspect-square bg-gradient-to-b from-[#e1e1e1] to-[silver] text-[#1e1e1e] rounded-[2px] py-[10px] px-[17px] h-[36px] bg-[position:-89px_-490px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-no-repeat bg-[length:1280px_1024px]"></div>
                  <p className="text-[#c4c4c4] m-0 leading-normal">
                    Please Gamble Responsibly
                  </p>
                  <a className="bg-[#2f4553] py-[10px] px-[17px] text-[white] rounded-[2px]">
                    <button className="leading-normal">More details</button>
                  </a>
                </div>
              )}
            <div className="flex flex-col gap-3 md:gap-4 mb-[1.43rem]">
              {footerMenu.map((item, index) => (
                <div
                  key={index}
                  className="border-none rounded overflow-hidden bg-[#213743ff]"
                  style={{
                    boxShadow:
                      "rgba(0,0,0,0.2) 0px 1px 3px 0px, rgba(0,0,0,0.12) 0px 1px 2px 0px, rgba(255,255,255,0.04) 0px 1px 0px 0px inset",
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors rounded"
                  >
                    <span className="text-white font-semibold leading-[21px] text-sm">
                      {item.label}
                    </span>
                    <Icon
                      name="questionArrow"
                      className={`w-[16px] h-[16px] text-[#d5dcebff] ${expandedAccordion === item.label ? "rotate-180" : ""
                        }`}
                      fill="#d5dceb"
                    />
                  </button>
                  {expandedAccordion === item.label && (
                    <div className="p-4 pt-[0.95rem] pb-[0.8rem] border-t-2 border-[#2f4553]">
                      <div className="flex flex-col gap-2">
                        {item.links.map((ele: any, index) => (
                          <p
                            className="text-[#b1bad3] hover:text-white text-sm font-semibold cursor-pointer"
                            key={index}
                          >
                            {ele.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Social Media Icons */}
            <div className="flex justify-end items-center gap-3 mb-[1.55rem]">
              {iconsArray?.map((item, index) => (
                <Icon
                  name={item}
                  key={index}
                  width={24}
                  height={26}
                  className="social-svgs h-[26.4px]"
                />
              ))}
            </div>

            {/* Border Divider */}
            <div className="border-t-2 border-[#213743] mb-[1.44rem]"></div>

            <div className="flex flex-col gap-4">
              {/* Copyright */}
              <span className="text-[#b1bad3] text-sm leading-[21px] relative top-[.5px]">
                © 2025 Stakefair.com | All Rights Reserved.
              </span>

              {/* Company Information */}
              <p
                className="text-sm leading-[21px] relative top-[1px]"
                style={{ color: "#b1bad3" }}
              >
                Stake is owned and operated by Medium Rare N.V., registration
                number: 145353, registered address: Seru Loraweg 17 B, Curaçao.
                Payment agent companies are Medium Rare Limited and MRS Tech
                Limited. Contact us at support@stakefair.com.
              </p>

              {/* Responsible Gambling */}
              <p
                className="text-sm leading-[21px] relative top-[1px]"
                style={{ color: "#b1bad3" }}
              >
                <span className="relative top-[.5px]">
                  Stake is committed to responsible gambling, for more
                  information{" "}
                </span>
                visit{" "}
                <a
                  href="https://www.gamblingtherapy.org/"
                  rel="external noreferrer noopener"
                  className="text-white hover:text-gray-300 font-bold"
                >
                  Gamblingtherapy.org
                </a>
              </p>
            </div>

            {/* Bitcoin Price */}

            <p
              className="text-sm leading-[21px] text-center relative top-[.5px] mt-[1.5rem]"
              style={{ color: "#b1bad3" }}
            >
              1 BTC = $110,132.16
            </p>

            {/* language button  */}

            <div className="flex justify-center  mt-[1.5rem]" ref={dropdownRef}>
              <div className="relative">
                {open && (
                  <div
                    className="arrow"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "49px",
                      transform: "translateX(-50%)",
                    }}
                  ></div>
                )}

                {/* Button */}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="inline-flex relative items-center h-[44px] gap-2 !cursor-pointer rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:bg-[#557086] hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.9375rem] px-[1.25rem] w-full justify-between bg-[#213743]"
                  aria-label="Open Dropdown"
                >
                  <span>{language}</span>
                  {/* <ChevronDown
                    className={`h-4 w-4  ${open ? "rotate-180" : ""}`}
                  /> */}
                  <Icon
                    name="translateArrow"
                    className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {open && (
                  <div className="relative">
                    {/* Dropdown Menu */}
                    <ul
                      translate="no"
                      className="absolute h-40 mt-[11px] left-1/2 -translate-x-1/2 rounded-md shadow-lg bg-white text-gray-800 z-50 overflow-x-hidden overflow-y-auto scrollbar-hide"
                    >
                      {/* Cone/Arrow (centered) */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>

                      {languageConfig?.map((lang: any) => (
                        <li key={lang.title}>
                          <button
                            onClick={() =>
                              handleSelectLanguage(lang.title, lang.name)
                            }
                            className={cn(
                              "text-sm w-full text-left bg-transparent cursor-pointer gap-2 font-semibold transition p-3 pt-[13px] pb-[0px] rounded-none",
                              language === lang.title
                                ? "text-blue-500 bg-transparent"
                                : "text-[#2f4553] hover:bg-[#b1bad3] hover:text-black"
                            )}
                          >
                            {lang.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Stakefair Logo */}
            <div className="flex justify-center mt-[1.5rem]">
              <a href={"/"} className="text-white">
                <Icon
                  name={"logo"}
                  className="w-[105px] h-[33.47px] "
                  fill="white"
                ></Icon>
              </a>
            </div>

            {/* GCB Certification Badge */}
            <div className="flex justify-center relative top-[2px] mt-[1.58rem]">
              <img
                // src="/bottom-footer.svg"
                src={Gcb.src}
                alt="footer"
                width={106}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MFooter;
