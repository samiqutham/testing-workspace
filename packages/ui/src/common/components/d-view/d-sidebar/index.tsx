"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";
import Icon from "@workspace/ui/icons/icons";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { NavMain } from "@workspace/ui/common/components/d-view/d-sidebar/nav-main";
import {
  NavData,
  casinoNavData,
} from "@workspace/ui/common/components/d-view/d-sidebar/project-data/d-casino-browse/index";
import { sportsNavData } from "@workspace/ui/common/components/d-view/d-sidebar/project-data/d-sports-browse/index";
import { defaultNavData } from "@workspace/ui/common/components/d-view/d-sidebar/project-data/d-default-browse/index";
import {
  exchangeNavData,
  ExchangeOpenNavMain,
} from "@workspace/ui/common/components/d-view/d-sidebar/project-data/d-exchange-browse/index";
import { useAppStore } from "@workspace/ui/store/store";
import  casinoActive from "@workspace/ui/assets/browse/exchange-active.svg";
import exchange from "@workspace/ui/assets/browse/exchange.svg";
import exchangeActive from "@workspace/ui/assets/browse/casino-active.svg";
import casino from "@workspace/ui/assets/browse/casino.svg";
import fantasy from "@workspace/ui/assets/browse/sports.svg";
import fantasyActive from "@workspace/ui/assets/browse/sports-active.svg";
import sports from "@workspace/ui/assets/browse/fantasy.svg";
import sportsActive from "@workspace/ui/assets/browse/fantasy-active.svg";
import casinoDActive from "@workspace/ui/assets/browse/exchange-d-active.svg";
import exchangeD from "@workspace/ui/assets/browse/exchange-d.svg";
import exchangeDActive from "@workspace/ui/assets/browse/casino-d-active.svg";
import casinoD from "@workspace/ui/assets/browse/casino-d.svg";
import fantasyD from "@workspace/ui/assets/browse/sports-d.svg";
import fantasyDActive from "@workspace/ui/assets/browse/sports-d-active.svg";
import sportsD from "@workspace/ui/assets/browse/fantasy-d.svg";
import sportsDActive from "@workspace/ui/assets/browse/fantasy-d-active.svg";
import style from "./style.module.css";
import {
  casino_sLiveUrl,
  exchange_sLiveUrl,
  fantasy_sLiveUrl,
  sportsbook_sLiveUrl,
  stakefairLiveUrl,
} from "@workspace/ui/config/config";
import Link from "next/link";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { usePathname } from "next/navigation";

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
  countryLanguages: Record<string, string>;
}

const translationConfig =
  globalThis.__GOOGLE_TRANSLATION_CONFIG__ as GoogleTranslationConfig;

const DSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const btns = [
    { name: "Exchange", link: exchange_sLiveUrl },
    { name: "Casino", link: casino_sLiveUrl },
    // { name: "Fantasy", link: fantasy_sLiveUrl },
    // { name: "Sports", link: sportsbook_sLiveUrl },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<any>("English");
  const [currentLanguage, setCurrentLanguage] = useState<any>([]);
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [languages, setLanguages] = useState<LanguageDescriptor[]>([]);
  const [hostPort, setHostPort] = useState<string | null>(null);
  const { open, openTab, isTablet } = useSidebar();
  const activeSubMenu = useAppStore((state) => state.activeSubMenu);
  const [activeData, setActiveData] = useState<any>(null);
  const setIsOverlayOpen = useAppStore((state) => state.setIsOverlayOpen);
  const setIsHeaderOverlayOpen = useAppStore(
    (state) => state.setIsHeaderOverlayOpen
  );
  const setSideBarTabs = useAppStore((state) => state.setSideBarTabs);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const isHeaderOverlayOpen = useAppStore((state) => state.isHeaderOverlayOpen);
  const [loading, setLoading] = useState(true);
  const [isBase, setIsBase] = useState(false);
  const pathName = usePathname();
  // const handleShowCasino = () => {
  //   setActiveData(mergeNavData(data, casinoNavData));
  // };

  // const handleShowSports = () => {
  //   setActiveData(mergeNavData(data, sportsNavData));
  // };

  // const mergeNavData = (base: any, extra: any) => {
  //   return {
  //     navMain: [...extra.navMain, { divider: true }, ...base.navMain],
  //   };
  // };

  // const [open, setOpen] = useState(false);
  // const [language, setLanguage] = useState("English");

  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  async function getUserCountry(): Promise<string> {
    try {
      const res = await fetch(
        "https://pro.ip-api.com/json/?key=qSA5ctYZHdWsx04"
      );
      const data = await res.json();
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
    setLoading(true);

    getUserCountry().then((countryCode) => {
      const reordered = reorderLanguagesByCountry(
        globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages,
        countryCode
      );
      setCurrentLanguage(reordered);
    });

    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(globalThis.__GOOGLE_TRANSLATION_CONFIG__);
    }
    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguages(globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages);
    }
  }, []);

  useEffect(() => {
    if (!currentLanguage.length) return;

    const { port, origin } = window.location;
    setHostPort(port);

    let baseNav: NavData;
    let activeButton: string | null = null;

    if (
      port === "3005" ||
      origin.includes("stakefair-sports.yourdesign.live")
    ) {
      baseNav = sportsNavData;
      activeButton = "Sports";
    } else if (
      port === "3002" ||
      origin.includes("stakefair-casino.yourdesign.live")
    ) {
      baseNav = casinoNavData;
      activeButton = "Casino";
    } else if (
      port === "3003" ||
      origin.includes("stakefair-exchange.yourdesign.live")
    ) {
      baseNav = exchangeNavData;
      activeButton = "Exchange";
    } else if (
      port === "3004" ||
      origin.includes("stakefair-fantasy.yourdesign.live")
    ) {
      baseNav = defaultNavData;
      activeButton = "Fantasy";
    } else {
      baseNav = defaultNavData;
      activeButton = null;
    }

    // inject languages
    const injected = {
      ...baseNav,
      navMain: baseNav.navMain.map((item) =>
        item.title?.startsWith("Language")
          ? {
              ...item,
              items: currentLanguage.map((lang: LanguageDescriptor) => ({
                title: lang.title,
                name: lang.name,
                icon: "",
                url: "#",
              })),
            }
          : item
      ),
    };

    setActiveData(injected);
    setActiveBtn(activeButton);
    setLoading(false);
  }, [open, openTab, currentLanguage]);

  const orderedBtns = React.useMemo(() => {
    const found = btns.find((b) => b.name === activeBtn);
    if (!found) return btns;
    return [found, ...btns.filter((b) => b.name !== activeBtn)];
  }, [btns, activeBtn]);

  const handleClickLogo = () => {
    localStorage.setItem("itemId", "home");
    setSideBarTabs("home");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { port, origin } = window.location;

    // 🎯 Casino env
    if (port === "3001" || origin.includes("stakefair.yourdesign.live")) {
      setIsBase(true);
    } else setIsBase(false);
  }, []);

  // Skeleton components
  const SidebarSkeleton = () => (
    <div className="text-white border-0 d-load">
      <div className="shadow-lg">
        <div
          className={cn(
            "flex items-center h-[60px]",
            (isTablet ? openTab : open) ? "px-3 gap-4" : "justify-center px-2"
          )}
        >
          <Skeleton className="w-8 h-8 rounded-md bg-[#2f4553]" />
          {(isTablet ? openTab : open) && (
            <Skeleton className="w-[105px] h-[32px] bg-[#2f4553]" />
          )}
        </div>
      </div>

      <div
        className={cn(
          "scroll-width-none !gap-0",
          (hostPort === "3003" ||
            origin.includes("stakefair-exchange.yourdesign.live")) &&
            (openTab || open)
            ? "overflow-hidden"
            : "overflow-auto"
        )}
      >
        {/* Collapsed icon-only skeleton */}
        {(isTablet ? !openTab : !open) && (
          <div className="flex flex-col justify-center items-center gap-2 w-full pt-2">
            {[...Array(2)].map((_, idx) => (
              <Skeleton key={idx} className="w-11 h-11 rounded bg-[#2f4553]" />
            ))}
          </div>
        )}

        {/* OPEN: Promo buttons skeleton */}
        {(isTablet ? openTab : open) && (
          <div className="px-2 pt-2">
            <div className="flex flex-col gap-2">
              {[...Array(4)].map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="w-full h-9 rounded bg-[#2f4553]"
                />
              ))}
            </div>
          </div>
        )}

        {/* Main nav skeleton */}
        <div className="mt-4">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="px-2 py-1 mb-2">
              <Skeleton className="w-full h-6 rounded bg-[#2f4553]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <Sidebar
          collapsible="icon"
          {...props}
          className="text-white border-0 d-load"
        >
          <SidebarHeader className="shadow-lg">
            <div
              className={cn(
                "flex items-center h-[60px]",
                (isTablet ? openTab : open)
                  ? "px-3 gap-4"
                  : "justify-center px-2"
              )}
            >
              <SidebarTrigger className="cursor-pointer hover:text-white text-[#B1BAD3] hover:bg-transparent" />

              {(isTablet ? openTab : open) && (
                <>
                  {isBase || (!isBase && pathName !== "/") ? (
                    <Link
                      href="/"
                      onClick={() => handleClickLogo()}
                      className="text-white relative cursor-pointer bottom-[1px] left-[0.5px]"
                    >
                      <Icon
                        name="logo"
                        className="w-[105px] h-[32.47px]"
                        fill="white"
                      />
                    </Link>
                  ) : (
                    <a
                      href={stakefairLiveUrl}
                      onClick={() => handleClickLogo()}
                      className="text-white relative cursor-pointer bottom-[1px] left-[0.5px]"
                    >
                      <Icon
                        name="logo"
                        className="w-[105px] h-[32.47px]"
                        fill="white"
                      />
                    </a>
                  )}
                </>
              )}
            </div>
          </SidebarHeader>

          <SidebarContent
            className={cn(
              "scroll-width-none !gap-0",
              (hostPort === "3003" ||
                origin.includes("stakefair-exchange.yourdesign.live")) &&
                (openTab || open)
                ? "overflow-hidden"
                : "overflow-auto"
            )}
          >
            {(isTablet ? !openTab : !open) && (
              <div className="flex flex-col justify-center items-center gap-2 w-full pt-2">
                {btns.map((item, idx) => {
                  const isActive = item.name === activeBtn;

                  let bg: any;
                  let bgHover: any;
                  if (item.name === "Exchange") {
                    bg = exchangeD;
                    bgHover = exchangeDActive;
                  } else if (item.name === "Casino") {
                    bg = casinoD;
                    bgHover = casinoDActive;
                  } else if (item.name === "Fantasy") {
                    bg = fantasyD;
                    bgHover = fantasyDActive;
                  } else if (item.name === "Sports") {
                    bg = sportsD;
                    bgHover = sportsDActive;
                  }

                  return (
                    <Tooltip key={idx}>
                      <TooltipTrigger>
                        <a
                          href={item.link}
                          className="min-h-11 !group min-w-11 rounded justify-center items-center flex text-sm font-bold transition-all cursor-pointer shadow-md overflow-hidden bg-center bg-cover"
                          style={{
                            backgroundImage: `url(${isActive ? bgHover.src : bg.src})`,
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundImage = `url(${bgHover.src})`)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundImage = `url(${
                              isActive ? bgHover.src : bg.src
                            })`)
                          }
                        >
                          <Icon
                            name={
                              idx !== 3 ? "trendingGames" : "trendingSports"
                            }
                            width={14}
                            height={14}
                            className={cn(
                              "transition-colors",
                              isActive
                                ? "text-white"
                                : "text-[#B1BAD3] group-hover:text-white"
                            )}
                          />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="z-[9999]"
                      >
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            )}

            {(isTablet ? openTab : open) && (
              <div className="px-2 pt-2">
                <div className="flex flex-col gap-2">
                  {orderedBtns.map((item, idx) => {
                    const isActive = item.name === activeBtn;

                    let bg = "";
                    let bgHover = "";
                    if (item.name === "Exchange") {
                      bg = exchange.src;
                      bgHover = exchangeActive.src;
                    } else if (item.name === "Casino") {
                      bg = casino.src;
                      bgHover = casinoActive.src;
                    }
                    // else if (item.name === "Fantasy") {
                    //   bg = fantasy.src;
                    //   bgHover = fantasyActive.src;
                    // } else if (item.name === "Sports") {
                    //   bg = sports.src;
                    //   bgHover = sportsActive.src;
                    // }

                    const iconName =
                      item.name === "Sports"
                        ? "trendingSports"
                        : "trendingGames";

                    return (
                      <a
                        key={idx}
                        href={item.link}
                        rel="noreferrer"
                        className="group w-full min-h-9 rounded text-white text-sm font-bold flex items-center gap-2 pl-3 pr-3 cursor-pointer bg-center bg-cover shadow-md transition-all"
                        style={{
                          backgroundImage: `url(${isActive ? bgHover : bg})`,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundImage = `url(${bgHover})`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundImage = `url(${
                            isActive ? bgHover : bg
                          })`)
                        }
                      >
                        <Icon
                          name={iconName}
                          width={16}
                          height={16}
                          className={cn(
                            "transition-colors",
                            isActive
                              ? "text-white"
                              : "text-[#B1BAD3] group-hover:text-white"
                          )}
                        />
                        <span className="z-10 drop-shadow-sm pt-[2px]">
                          {item.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            <motion.div
              key={open || openTab ? "open" : "closed"}
              initial={{ opacity: 0, y: "5%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.4,
              }}
              className={cn(
                (hostPort === "3003" ||
                  origin.includes("stakefair-exchange.yourdesign.live")) &&
                  (open || openTab) &&
                  "overflow-y-auto scroll-width-none"
              )}
              onAnimationComplete={() => {
                const el = document.getElementById(`menu-${activeSubMenu}`);
                if (el) {
                  setTimeout(() => {
                    el.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }
              }}
            >
              {activeData &&
                (hostPort === "3003" ||
                origin.includes("stakefair-exchange.yourdesign.live") ? (
                  <>
                    <ExchangeOpenNavMain
                      items={activeData.navMain.filter(
                        (item: any) =>
                          item.title !== "Language: English" &&
                          item.title !== "Live Support" &&
                          item.title !== "Responsible Gambling"
                      )}
                    />

                    <NavMain
                      items={activeData.navMain.filter(
                        (item: any) =>
                          item.title === "Responsible Gambling" ||
                          item.title === "Live Support" ||
                          item.title?.startsWith("Language")
                      )}
                    />
                  </>
                ) : (
                  <NavMain items={activeData.navMain} />
                ))}
            </motion.div>

            {isOverlayOpen ||
              (isHeaderOverlayOpen && (
                <div
                  onClick={() => {
                    setIsOverlayOpen(false);
                    setIsHeaderOverlayOpen(false);
                  }}
                  className={cn(
                    "absolute h-screen w-full top-[60px] bg-[#1a2e38b3] z-40 opacity-0 ",
                    style.animateFadeIn
                  )}
                />
              ))}
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
};

export default DSidebar;
