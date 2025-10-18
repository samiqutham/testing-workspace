"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@workspace/ui/icons/icons";

// const TABS = ["Lobby", "My Bets", "Favourites", "Starting Soon"];
const TABS = [
  { tabName: "Lobby", tabIcon: "basketball" },
  { tabName: "My Bets", tabIcon: "MyBet" },
  { tabName: "Favourites", tabIcon: "favoritos" },
  { tabName: "Starting Soon", tabIcon: "pronto" },
];

const MSportsTabs = () => {
  const [active, setActive] = useState<string>("Lobby");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // keep refs in sync
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, TABS.length);
  }, []);

  // center active tab
  useEffect(() => {
    const centerActive = () => {
      const idx = TABS.findIndex((t) => t.tabName === active);
      if (idx === -1) return;
      const tab = tabRefs.current[idx];
      const container = containerRef.current;
      if (!tab || !container) return;

      const cRect = container.getBoundingClientRect();
      const tRect = tab.getBoundingClientRect();
      const offset =
        tRect.left - cRect.left - cRect.width / 2 + tRect.width / 2;

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: "smooth",
      });
    };

    centerActive();

    const ro = new ResizeObserver(centerActive);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [active]);

  const ids = useMemo(
    () =>
      TABS.map(
        (t, i) => `tab-${t.tabName.replace(/\s+/g, "-").toLowerCase()}-${i}`
      ),
    []
  );
  return (
    <div className="w-full flex flex-col gap-4 mt-4">
      {/* Tabs pill bar */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden leading-[133%] tabs-scrollbar"
        role="tablist"
        aria-label="MBet Tabs"
      >
        <div className="flex bg-[#0F212E] rounded-[3rem] p-[5px] pl-[4px] flex-shrink-0 min-w-max h-14">
          {TABS.map((tab, index) => {
            const activeState = active === tab.tabName;
            return (
              <button
                id={ids[index]}
                key={tab.tabName}
                ref={(el: HTMLButtonElement | null) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                aria-selected={activeState}
                aria-controls={`${ids[index]}-panel`}
                onClick={() => setActive(tab.tabName)}
                className={[
                  "inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98]",
                  "px-5 py-[15px] text-sm leading-none rounded-full pt-[2px] pb-[2px] mt-[1px] mb-[1px]",
                  activeState
                    ? "bg-[#2F4553] text-white"
                    : "bg-transparent opacity-50",
                  index > 0 ? "ml-[6px]" : "first:ml-[2px]",
                ].join(" ")}
              >
                {/* icon before tab name */}
                <Icon
                  name={tab.tabIcon}
                  className={`w-[14px] h-[14px] !fill-[rgb(177,186,211)] ${activeState ? "!fill-[#fff]" : ""}`}
                />
                <span className="relative">{tab.tabName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MSportsTabs;
