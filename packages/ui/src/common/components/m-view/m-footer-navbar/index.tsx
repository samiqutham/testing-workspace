"use client";
import Icon from "@workspace/ui/icons/icons";
import { useAppStore } from "@workspace/ui/store/store";
import React, { useEffect, useRef } from "react";
import MBet from "@workspace/ui/common/components/m-view/m-footer-navbar/m-bets/index";
import MBrowse from "@workspace/ui/common/components/m-view/m-footer-navbar/m-browse/index";
import MChat from "@workspace/ui/common/components/m-view/m-footer-navbar/m-chat/index";
import { cn } from "@workspace/ui/lib/utils";
import { usePort } from "@workspace/ui/hooks/use-port";
import { useExchangeTab } from "@workspace/ui/hooks/use-exchange-tab";
import {
  casino_sLiveUrl,
  exchange_sLiveUrl,
  fantasy_sLiveUrl,
  sportsbook_sLiveUrl,
} from "@workspace/ui/config/config";

const MFooterNavbar = () => {
  // const { port, origin } = usePort();
  const { origin, hostname, port } = window.location;
  const exchangeTab = useExchangeTab();
  const footerItems = [
    {
      id: "browse",
      label: "Browse",
      icon: "browse",
    },
    {
      id: "casino",
      label: "Casino",
      link: casino_sLiveUrl,
      icon: "casinoDice",
    },
    {
      id: "bets",
      label: "Bets",
      icon: "myBets",
    },
    // {
    //   id: "sports",
    //   label:
    //     port === "3001" || origin.includes("stakefair.yourdesign.live")
    //       ? "Exchange"
    //       : port === "3003" || origin.includes("stakefair-exchange.yourdesign.live")
    //       ? "Fantacy"
    //       : "Sports",
    //   link:
    //     port === "3001" || origin.includes("stakefair.yourdesign.live")
    //       ? "https://stakefair-exchange.yourdesign.live"
    //       : port === "3003" || origin.includes("stakefair-exchange.yourdesign.live")
    //       ? "https://stakefair-fantasy.yourdesign.live"
    //       : sportsbook_sLiveUrl,
    //   icon: "basketball",
    // },
    // {
    //   id:
    //     port === "3005" || origin.includes("stakefair-sportsbook.yourdesign.live")
    //       ? "sports"
    //       : "exchange",
    //   label:
    //     port === "3005" || origin.includes("stakefair-sportsbook.yourdesign.live")
    //       ? "Sports"
    //       : "Exchange",
    //   link:
    //     port === "3005" || origin.includes("stakefair-sportsbook.yourdesign.live")
    //       ? "https://stakefair-sportsbook.yourdesign.live"
    //       : "https://stakefair-exchange.yourdesign.live",
    //   icon: "basketball",
    // },
    {
      id:
        port === "3004" || origin.includes("stakefair-fantasy.yourdesign.live")
          ? "fantasy"
          : port === "3005" || origin.includes("stakefair-sportsbook.yourdesign.live")
          ? "sports"
          : "exchange",
      label:
        port === "3004" || origin.includes("stakefair-fantasy.yourdesign.live")
          ? "Fantasy"
          : port === "3005" || origin.includes("stakefair-sportsbook.yourdesign.live")
          ? "Sports"
          : "Exchange",
      link:
        port === "3004" || origin.includes("stakefair-fantasy.yourdesign.live")
          ? fantasy_sLiveUrl
          : port === "3005" || origin.includes("stakefair-sportsbook.yourdesign.live")
          ? "https://stakefair-sportsbook.yourdesign.live"
          : "https://stakefair-exchange.yourdesign.live",
      icon: "basketball",
    },
    {
      id: "chat",
      label: "Chat",
      icon: "chat",
    },
  ];
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { activeDrawer, openDrawer, closeDrawer } = useAppStore();
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      port === "3002" ||
      origin.includes("stakefair-casino.yourdesign.live")
    ) {
      openDrawer("casino");
    }else if (
      port === "3003" ||
      origin.includes("stakefair-exchange.yourdesign.live")
    ) {
      openDrawer("exchange");
    } else if (
      port === "3004" ||
      origin.includes("stakefair-fantasy.yourdesign.live")
    ) {
      openDrawer("fantasy");
    }else if (
      port === "3005" ||
      origin.includes("stakefair-sportsbook.yourdesign.live")
    ) {
      openDrawer("sports");
    }
  }, []);
  // useEffect(() => {
  //   function handleClickOutside(e: MouseEvent) {
  //     if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
  //       closeDrawer(); // outside click => close drawer
  //     }
  //   }

  //   if (activeDrawer) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [activeDrawer, closeDrawer]);

  const handleClick = (id: string, link?: string) => {
    // Pages navigation
    if (id === "sports" || id === "casino" || id === "exchange") {
      openDrawer(id); // yahin exit
      window.location.href = link || "";
    }

    // Drawer toggle
    if (activeDrawer === id) {
      console.log("hey");
      closeDrawer(); // agar already open hai to close
    } else {
      openDrawer(id); // nahi to open
    }
  };

  return (
    <div  className="mainMbl">
      <footer
        className="fixed bottom-0 left-0 right-0 bg-[#0f212e] z-[1000] mx-auto px-4 flex justify-around items-center 
       shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] 
       h-[68px]"
      >
        <div className="grid grid-cols-5 justify-items-center w-full leading-[1]">
          {footerItems.map((item) => (
            <div
              key={item.id}
              className={`button-wrap  h-[68px] ${
                activeDrawer === item.id ? "active" : ""
              }`}
            >
              <button
                onClick={() => handleClick(item.id, item?.link)}
                className={`inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-xs leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white button ${
                  activeDrawer === item.id
                    ? "text-blue-500"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <div className="content svelte-aebahz">
                  <div className="h-[18.4px]">
                    <Icon
                      name={item.icon}
                      width={16}
                      height={16}
                      fill={activeDrawer === item.id ? "#fff" : "#b1bad3"}
                    />
                  </div>
                  <span>{item.label}</span>
                </div>

                {/* <Icon
                  name={item.icon}
                  width={16}
                  height={16}
                  fill={activeDrawer === item.id ? "#fff" : "#b1bad3"}
                />
                <span className="text-xs text-white relative bottom-[-0.5px]">
                  {item.label}
                </span> */}
              </button>
            </div>
          ))}
        </div>
      </footer>

      {activeDrawer &&
        (activeDrawer === "bets" ||
        activeDrawer === "browse" ||
        activeDrawer === "chat" ? (
          <div
            className={cn(
              `fixed top-15 bottom-16 drawer right-0 bg-[#1a2c38] z-30 mx-auto transform transition-transform duration-300 ease-in-out ${
                activeDrawer ? "translate-y-0" : "translate-y-full"
              }`,
              (port === "3003" ||
                origin.includes("stakefair-exchange.yourdesign.live")) &&
                exchangeTab
                ? "left-[50px]"
                : "left-0"
            )}
          >
            {/* Bets Drawer */}
            {activeDrawer === "bets" && <MBet />}

            {/* Browse Drawer */}
            {activeDrawer === "browse" && <MBrowse />}

            {/* Chat Drawer */}
            {activeDrawer === "chat" && (
              <MChat
                initialAnimation={{ opacity: 0, y: "100%" }}
                animateTo={
                  activeDrawer === "chat"
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: "100%" }
                }
              />
            )}
          </div>
        ) : (
          <></>
        ))}
    </div>
  );
};

export default MFooterNavbar;
