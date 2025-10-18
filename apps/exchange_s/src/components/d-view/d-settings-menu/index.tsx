"use client";

import Icon from "@workspace/ui/icons/icons";
import React, { useState, useRef, useEffect } from "react";

export const DSettingMenu = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"main" | "cashout">("main");

  // ✅ Allow oddsType to be null initially
  const [mainSettings, setMainSettings] = useState({
    layOdds: false,
    marketDepth: false,
    bsp: false,
    oddsType: null as "projected" | "nearfar" | "neither" | null,
  });

  const [cashoutSettings, setCashoutSettings] = useState({
    cashoutMarketView: false,
    cashoutConfirmation: false,
  });

  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative w-full flex justify-end">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4 bg-[#071824] text-[#dfdfdf] flex items-center text-xs cursor-pointer h-[30px] hover:bg-[hsla(0,0%,96.5%,.1)] font-semibold"
      >
        Settings
        <span className="ml-2 flex items-center">
          <Icon
            name="rightSlide"
            className={`w-3 h-3 fill-white transition-transform duration-300 transform rotate-90
          `}
          />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full border border-[#213743] min-w-[504px] bg-[#071824] shadow-[0_2px_6px_0_rgba(0,0,0,.5)] z-50">
          <div className="flex w-full">
            {/* Sidebar Tabs */}
            <div className="w-[150px] h-[236px] pt-12 text-sm flex flex-col items-start">
              <button
                onClick={() => setActiveTab("main")}
                className={`cursor-pointer w-full text-start font-bold text-xs leading-[28px] pl-[19px] pr-1.5 ${
                  activeTab === "main"
                    ? "pl-4 border-l-2 border-[#155DFC] bg-[#213743] text-white"
                    : "text-white"
                }`}
              >
                Main
              </button>
              <button
                onClick={() => setActiveTab("cashout")}
                className={`cursor-pointer w-full text-start font-bold text-xs leading-[28px] pl-[19px] pr-1.5 ${
                  activeTab === "cashout"
                    ? "pl-4 border-l-2 border-[#155DFC] bg-[#213743] text-white"
                    : "text-white"
                }`}
              >
                Cash Out
              </button>
            </div>

            {/* Content */}
            <div className="w-[350px] min-h-[233px] h-auto p-[13px_16px_16px] bg-[#213743] leading-[1] text-white">
              {activeTab === "main" && (
                <>
                  <p className="font-bold mb-2 text-sm">Main</p>
                  <p className="text-[11px] text-[#b1bad3] mb-2 ">
                    Log in above for more options
                  </p>

                  {/* Lay Odds */}
                  <label className="  flex items-center py-[7.5px] cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      checked={mainSettings.layOdds}
                      onChange={(e) =>
                        setMainSettings({
                          ...mainSettings,
                          layOdds: e.target.checked,
                        })
                      }
                    />
                    <span className="pl-2 text-[11px]">Lay odds</span>
                  </label>

                  {/* Market Depth */}
                  <label className="  flex items-center py-[7.5px] cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      checked={mainSettings.marketDepth}
                      onChange={(e) =>
                        setMainSettings({
                          ...mainSettings,
                          marketDepth: e.target.checked,
                        })
                      }
                    />
                    <span className="pl-2 text-[11px]">Market depth</span>
                  </label>

                  {/* BSP */}
                  <div className="pt-2">
                    <label className="flex items-center cursor-pointer w-fit">
                      <input
                        type="checkbox"
                        checked={mainSettings.bsp}
                        onChange={(e) =>
                          setMainSettings({
                            ...mainSettings,
                            bsp: e.target.checked,
                            oddsType: e.target.checked
                              ? null // ✅ don’t auto-select any
                              : null, // reset if unchecked
                          })
                        }
                      />
                      <span className="pl-2 text-[11px]">
                        Betfair Starting Price (BSP)&nbsp;&nbsp;
                        <span className="text-[#b1bad3]">[?]</span>
                      </span>
                    </label>

                    {/* Radio Buttons */}
                    <div className="flex flex-col pl-[14px] mt-1">
                      <label className="  flex items-center py-[7.5px] cursor-pointer w-fit">
                        <input
                          type="radio"
                          name="mainOdds"
                          value="projected"
                          checked={mainSettings.oddsType === "projected"}
                          onChange={(e) =>
                            setMainSettings({
                              ...mainSettings,
                              oddsType: e.target.value as any,
                            })
                          }
                          disabled={!mainSettings.bsp}
                        />
                        <span className="pl-2 text-[11px] capitalize">
                          Projected odds&nbsp;&nbsp;
                          <span className="text-[#b1bad3]">[?]</span>
                        </span>
                      </label>

                      <label className="  flex items-center py-[7.5px] cursor-pointer w-fit">
                        <input
                          type="radio"
                          name="mainOdds"
                          value="nearfar"
                          checked={mainSettings.oddsType === "nearfar"}
                          onChange={(e) =>
                            setMainSettings({
                              ...mainSettings,
                              oddsType: e.target.value as any,
                            })
                          }
                          disabled={!mainSettings.bsp}
                        />
                        <span className="pl-2 text-[11px] capitalize">
                          Near/Far odds&nbsp;&nbsp;
                          <span className="text-[#b1bad3]">[?]</span>
                        </span>
                      </label>

                      <label className="  flex items-center py-[7.5px] cursor-pointer w-fit">
                        <input
                          type="radio"
                          name="mainOdds"
                          value="neither"
                          checked={mainSettings.oddsType === "neither"}
                          onChange={(e) =>
                            setMainSettings({
                              ...mainSettings,
                              oddsType: e.target.value as any,
                            })
                          }
                          disabled={!mainSettings.bsp}
                        />
                        <span className="pl-2 text-[11px] capitalize">
                          Neither
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "cashout" && (
                <>
                  <p className="font-bold mb-2 text-sm">Cash Out</p>

                  <label className="  flex items-center py-2 cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      checked={cashoutSettings.cashoutMarketView}
                      onChange={(e) =>
                        setCashoutSettings({
                          ...cashoutSettings,
                          cashoutMarketView: e.target.checked,
                        })
                      }
                    />
                    <span className="pl-2 text-[11px]">
                      Cash Out (on Market View)
                    </span>
                  </label>

                  <label className="  flex items-center py-2 cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      checked={cashoutSettings.cashoutConfirmation}
                      onChange={(e) =>
                        setCashoutSettings({
                          ...cashoutSettings,
                          cashoutConfirmation: e.target.checked,
                        })
                      }
                    />
                    <span className="pl-2 text-[11px]">
                      Show Cash Out confirmation
                    </span>
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
