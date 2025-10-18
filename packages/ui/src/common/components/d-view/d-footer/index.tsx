"use client";
import "./footer.css";
import { useEffect, useRef, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useIsTab } from "@workspace/ui/hooks/use-tab";
import { cn } from "@workspace/ui/lib/utils";
import Icon from "@workspace/ui/icons/icons";
import Gcb from "@workspace/ui/assets/footer/bottom-footer.svg";
import { usePort } from "@workspace/ui/hooks/use-port";
import Link from "next/link";
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

export default function DFooter() {
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [language, setLanguage] = useState("English");
  const [open, setOpen] = useState(false);
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
    !origin.includes("stakefair-exchange.vercel.app")
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
    origin.includes("stakefair-exchange.vercel.app")
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
        origin.includes("stakefair-exchange.vercel.app")
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

  // const handleSelectLanguage = (lang: any, name: any) => {
  //   setLanguage(lang);
  //   setOpen(false);
  //    const cookieValue = `/auto/${name}`;
  //    setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });
  //   window.location.reload();
  // };
const handleSelectLanguage = (lang: any, name: any) => {
  setLanguage(lang);
  setOpen(false);

  // Expire old googtrans cookie
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

  document.cookie = `googtrans=; ${expire}; path=/;`;
  document.cookie = `googtrans=; ${expire}; domain=.vercel.app; path=/;`;

  // Set new googtrans cookie
  const cookieValue = `/auto/${name}`;
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  document.cookie = `googtrans=${cookieValue}; domain=.vercel.app; path=/;`;

  // Also store in your app’s cookie (if you want)
  setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });

  // Refresh to apply translation
  window.location.reload();
};

  //  Close on outside click
  useEffect(() => {
    // console.log('Translation config:', language);
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
      console.log("Set language from cookie or default:", languageTitle);
    }

    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(globalThis.__GOOGLE_TRANSLATION_CONFIG__);
    }
    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      // console.log('Loaded languages:', globalThis.__GOOGLE_TRANSLATION_CONFIG__.languages);

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

  const isTablet = useIsTab();
  return (
    <>
      <div className="parent px-[3vw] py-8 bg-[#071d2a]">
        <div className="max-w-[1200] mx-auto">
          {(hostPort === "3003" ||
            origin.includes("stakefair-exchange.vercel.app")) && (
            <div className="bg-[#213743] py-[10px] mb-8 gap-[10px] flex items-center justify-center font-bold text-[12px]">
              <div className="inline-block w-[36px] aspect-square bg-gradient-to-b from-[#e1e1e1] to-[silver] text-[#1e1e1e] rounded-[2px] py-[10px] px-[17px] h-[36px] bg-[position:-89px_-490px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-no-repeat bg-[length:1280px_1024px]"></div>
              <p className="m-0 leading-normal">Please Gamble Responsibly</p>
              <a className="bg-[#2f4553] cursor-pointer py-[10px] px-[17px] text-[white] rounded-[2px]">
                <button className="leading-normal">More details</button>
              </a>
            </div>
          )}
          <div className="footer-content w-full m-auto grid gap-6 md:gap-8 h-full max-[1024px]:!gap-0">
            <div className="footer-grid flex flex-col md:grid gap-3 md:gap-4 w-full m-auto break-words whitespace-normal hyphens-auto d-footer h-full">
              {footerMenu?.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "column d-footer-links",
                    isTablet && "!gap-[1rem] mb-[14px]",
                    "max-[860px]:!mb-[0px]"
                  )}
                >
                  <p className="font-semibold  align-left text-base text-white cursor-default ">
                    {item.label}
                  </p>

                  <ul
                    className={cn(
                      "flex flex-col gap-1.5 relative top-[-4px]",
                      isTablet && "!gap-[8px] !top-[-6px]"
                    )}
                  >
                    {item.links?.map((ele, index) => (
                      <li
                        key={index}
                        className={cn(
                          "footer-links",
                          isTablet && "inline-flex !my-0 !h-auto"
                        )}
                      >
                        <a
                          className="inline-flex relative items-center gap-2 justify-center  font-semibold  transition    active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none  break-words whitespace-normal "
                          href={ele.routerLink}
                        >
                          <span>{ele.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-row justify-end max-[1024px]:!relative   max-[1024px]:mt-[16px] max-[1024px]:mb-[16px]">
              <div className="flex justify-between items-center gap-x-3 h-[18.67px] relative bottom-[.866px]">
                {iconsArray?.map((item, index) => (
                  <Icon
                    name={item}
                    key={index}
                    width={16}
                    height={16}
                    fill="white"
                    className="cursor-pointer"
                  />
                ))}
              </div>
            </div>

            <div className="border-solid !border-t-2 border-[#b1bad3ff] border-l-none border-r-none !border-t-[#213743] max-[1024px]:relative max-[1024px]:mb-[42.5px] max-[1024px]:bottom-[-11.5px]  max-[860px]:mb-[29px] max-[806px]:relative  max-[806px]:!mb-[44px]"></div>

            <div className="flex flex-col gap-4 max-[1024px]:pb-[2rem]">
              <div>
                <span className="text-grey-200 text-sm cursor-default relative bottom-[2.5px]">
                  © 2025 Stakefair.com | All Rights Reserved.
                </span>
              </div>

              {/* Company Information */}
              <div>
                <p className="text-sm leading-[21px] text-grey-200 cursor-default relative bottom-[3px]">
                  <span>
                    Stake is owned and operated by Medium Rare N.V.,
                    registration number: 145353, registered address: Seru
                    Loraweg 17 B, Curaçao.
                  </span>{" "}
                  <span>
                    Payment agent companies are Medium Rare Limited and MRS
                    <span className="relative bottom-[.5px]">
                      {" "}
                      Tech Limited. Contact us at support@stakefair.com.
                    </span>
                  </span>
                </p>
              </div>

              {/* Responsible Gambling */}
              <div>
                <p className="text-sm leading-[21px] text-grey-200 cursor-default relative bottom-[2.5px]">
                  Stake is committed to responsible gambling, for more
                  information visit{" "}
                  <a
                    href="https://www.gamblingtherapy.org/"
                    rel="external noreferrer noopener"
                    className="text-white hover:text-white underline-none"
                  >
                    Gamblingtherapy.org
                  </a>
                </p>
              </div>
            </div>

            {/* Bitcoin Price */}
            <div className="text-center relative bottom-[3px] max-[1024px]:pb-[2rem]">
              <p className="text-sm cursor-default text-[#b1bad3]">
                1 BTC = $112,359.55
              </p>
            </div>

            {/* language button  */}

            <div
              className="flex justify-center max-[1024px]:pb-[2.2rem]"
              ref={dropdownRef}
            >
              <div className="relative">
                {open && (
                  <div
                    className="arrow"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: isTablet ? "47px" : "48px",
                      transform: "translateX(-50%)",
                    }}
                  ></div>
                )}

                {/* Button */}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="inline-flex relative items-center gap-2 !cursor-pointer rounded-(--ds-radius-md,0.25rem) font-semibold  ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:bg-[#557086] hover:text-white focus-visible:outline-white text-sm leading-none  break-words whitespace-normal shadow-md py-[0.9375rem] px-[1.25rem] w-full justify-between bg-[#213743] bottom-[2px] max-[1024px]:w-[107.45px]
                  max-[1024px]:h-[44px]"
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
                  <ul
                    translate="no"
                    className="absolute mt-2 -ml-1 h-40 rounded-sm shadow-lg bg-white text-gray-800 ring-1 ring-black/10 z-50 overflow-y-auto"
                  >
                    {languageConfig.map((lang: any) => (
                      <li key={lang.title}>
                        <button
                          onClick={() =>
                            handleSelectLanguage(lang.title, lang.name)
                          }
                          className={`text-sm w-full text-left relative bg-transparent cursor-pointer gap-2 font-semibold  transition p-3 rounded-none  
                           ${
                             language === lang.title
                               ? "text-blue-500 bg-transparent"
                               : "text-[#2f4553] hover:bg-[#b1bad3] hover:text-black"
                           }`}
                        >
                          {lang.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Stakefair Logo */}
            <div className="flex justify-center max-[1024px]:pb-[1.9rem]">
              <a href="/" className="text-white cursor-pointer">
                <Icon
                  name={"logo"}
                  className="w-[105px] h-[33.47px] "
                  fill="white"
                ></Icon>
              </a>
            </div>

            {/* GCB Certification Badge */}
            <div className="flex justify-center cursor-pointer relative bottom-[2.5px]">
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
    </>
  );
}
