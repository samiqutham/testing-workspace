"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@workspace/ui/lib/utils";
import { useAppStore } from "@workspace/ui/store/store";
import Icon from "@workspace/ui/icons/icons";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { useIsTab } from "@workspace/ui/hooks/use-tab";
import { usePort } from "@workspace/ui/hooks/use-port";
import { useExchangeTab } from "@workspace/ui/hooks/use-exchange-tab";
import BetSettingsModal from "@workspace/ui/common/modal/BetSettingsModal/index";
import betSetting from "@workspace/ui/assets/bet-setting.svg";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@workspace/ui/components/tooltip";

type DrawerAnimation = Record<string, any>;

type TabKey = "bet-slip" | "active-bets" | "settled-bets";
type Tab = { key: TabKey; label: string; icon: string };

const TABS = [
  { key: "bet-slip", label: "Bet Slip", icon: "betslip" },
  { key: "active-bets", label: "Active Bets", icon: "activeBets" },
  { key: "settled-bets", label: "Settled Bets", icon: "settleBets" },
] as const;

const EmptyStateSvg = () => (
  <div className="w-[80px] h-[80px] opacity-95 !mb-8">
    <img src={betSetting.src} className="w-[80px] h-[80px]" alt="" />
  </div>
);

export default function DBetslip({
  initialAnimation,
  animateTo,
}: {
  initialAnimation: DrawerAnimation;
  animateTo: DrawerAnimation;
}) {
  const { closeDrawer } = useAppStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
  const isMobile = useIsMobile();
  const isTablet = useIsTab();
  const exchangeTab = useExchangeTab();
  const { hostPort, origin } = usePort();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [panelLeft, setPanelLeft] = useState<number>(0);
  const panelWidth = 140;

  const isSlip = activeTab.key === "bet-slip";

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const wrap = menuWrapRef.current;
      if (wrap && wrap.contains(e.target as Node)) return;
      setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    if (!menuOpen || !menuWrapRef.current || !labelRef.current) return;
    const wrapRect = menuWrapRef.current.getBoundingClientRect();
    const labelRect = labelRef.current.getBoundingClientRect();
    const labelCenter = labelRect.left + labelRect.width / 2;
    const left = Math.round(labelCenter - wrapRect.left - panelWidth / 2);
    setPanelLeft(left < 0 ? 0 : left);
  }, [menuOpen]);

  return (
    <motion.div
      initial={initialAnimation}
      animate={animateTo}
      exit={initialAnimation}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex flex-col h-full bg-[#0f212e] text-white z-[10000]",
        isMobile ||
          (exchangeTab &&
            (hostPort === "3003" ||
              origin === "stakefair-exchange.vercel.app"))
          ? "w-full"
          : isTablet
            ? "w-[320px]"
            : "w-[370px]"
      )}>
      {/* Header */}
      <div className="flex items-center justify-between pl-4 pr-[6px] h-[60px] relative shadow-[0_10px_15px_-3px_rgba(0,0,0,.2),_0_4px_6px_-2px_rgba(0,0,0,.1)]">
        {/* Trigger + Dropdown */}
        <div ref={menuWrapRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((p) => !p)}
            className="flex items-center gap-2 cursor-pointer select-none group relative top-[-2.2px]">
            <Icon
              name={activeTab.icon}
              className="!w-[20px] !h-[20px] text-[#b1bad3] group-hover:text-white"
            />
            <span
              ref={labelRef}
              className="font-[600] relative top-[-1px] mt-[3px] text-[16px] leading-[16px] whitespace-nowrap">
              {activeTab.label}
            </span>
            <Icon
              name="arrowDown"
              className="h-[20px] w-[20px] relative left-[1px]  transition-transform text-[#b1bad3] group-hover:text-white"
              style={{ transform: menuOpen ? "rotate(180deg)" : "none" }}
            />
          </button>

          {menuOpen && (
            <div className="absolute top-[30px] z-[11010] -left-[15px]">
              {/* caret centered */}
              <div
                className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-0 h-0
                           border-l-[8px] border-r-[8px] border-b-[8px]
                           border-transparent border-b-white"
              />
              {/* panel: width 140, vertical padding 4px */}
              <div className="w-[140px] bg-white text-[#2f4553] rounded-[8px] shadow-lg overflow-hidden py-1">
                {TABS.map((t) => {
                  const isActive = t.key === activeTab.key;
                  return (
                    <div
                      key={t.key}
                      role="menuitem"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setActiveTab(t);
                        setMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-2 p-3 cursor-pointer text-[#2f4553]", // 12px all sides + 12px gap
                        isActive
                          ? "text-[#1475e1] hover:bg-[#fff]"
                          : "text-[#2f4553] hover:bg-[#b1bad3] hover:text-[#05080a]"
                      )}>
                      <Icon
                        name={t.icon}
                        className="w-[20px] h-[20px]" // 20×20
                        fill="currentColor"
                      />
                      <span className="text-[16px]  font-semibold whitespace-nowrap">
                        {t.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right controls with tooltips */}
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-[4.2px] ">
            {/* Settings tooltip (auto width, fixed height 45, rounded) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="grid place-items-center cursor-pointer p-3 rounded-full transition-colors hover:bg-[#071824]"
                  aria-label="Bet Settings">
                  <Icon
                    name="settings"
                    className="h-5 w-5 text-[#b1bad3] hover:text-white"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="center"
                sideOffset={12}
                className="z-[11020] p-0 bg-transparent">
                <div className="relative">
                  <div className="h-[45px] w-auto px-4 grid place-items-center rounded-[8px] bg-white text-[#1f2937] text-[14px] font-bold whitespace-nowrap shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
                    Bet Settings
                  </div>
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0
                               border-l-[8px] border-r-[8px] border-b-[8px]
                               border-transparent border-b-white"
                  />
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Close tooltip (right cap) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={closeDrawer}
                  className=" cursor-pointer p-3 rounded-full transition-colors hover:bg-[#071824]"
                  aria-label="Collapse Sidebar">
                  <Icon name="closeIcon" className="h-5 w-5" fill="#b1bad3" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="end"
                sideOffset={12}
                className="z-[11020] p-0 bg-transparent">
                <div className="relative">
                  <div className="h-[45px] w-auto px-4 grid place-items-center rounded-[8px] bg-white text-[#1f2937] text-[14px] font-bold whitespace-nowrap shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
                    Collapse Sidebar
                  </div>
                  <div
                    className="absolute -top-2 right-[18px] w-0 h-0
                               border-l-[8px] border-r-[8px] border-b-[8px]
                               border-transparent border-b-white"
                  />
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="h-full w-full flex flex-col items-center justify-center text-center px-6">
          <EmptyStateSvg />
          <p className="text-[#b1bad3] text-[16px] font-semibold mt-[8px] relative top-[-4px]">
            Bet Slip is Empty
          </p>
          <p className="text-white text-[16px] font-bold mt-[2px] relative top-[-2px]">
            Start Betting Now!
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 w-full bg-[#213743] px-4 py-4 ">
        {isSlip ? (
          <>
            <div className="">
              <div className="flex items-center justify-between">
                <span className="text-[#b1bad3] text-[16px]">Total Stake</span>
                <span className="flex items-center gap-2 relative left-[-1px]">
                  <span className="text-white font-semibold text-[16px] relative right-[-3px]">
                    0.00000000
                  </span>
                  <Icon name={"btc"} className="w-[18.2px] h-[18.2px]" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#b1bad3] text-[16px]">Est. Payout</span>
                <span className="flex items-center gap-2 relative left-[-1px]">
                  <span className="text-white font-semibold text-[16px] relative right-[-3px]">
                    0.00000000
                  </span>
                  <Icon name={"btc"} className="w-[18.2px] h-[18.2px]" />
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                disabled
                className="flex-1 cursor-not-allowed bg-[#2f4553] text-[#fff] font-semibold py-[10px] rounded-[10px] disabled:opacity-50">
                Clear Bet
              </button>
              <button
                disabled
                className="flex-1 bg-[#1475e1] text-white/90 font-semibold py-[10px] rounded-[10px] cursor-not-allowed disabled:opacity-50">
                Place Bet
              </button>
            </div>
          </>
        ) : (
          <button className="w-full bg-[#2f4553] hover:bg-[#3a5566] text-white font-semibold py-[10px] rounded-[8px] transition shadow-[0_1px_3px_0_rgba(0,0,0,.2),_0_1px_2px_0_rgba(0,0,0,.12)]">
            View All
          </button>
        )}
      </div>

      {/* Settings modal */}
      <BetSettingsModal
        open={settingsOpen}
        onClose={setSettingsOpen}
        initial="none"
      />
    </motion.div>
  );
}
