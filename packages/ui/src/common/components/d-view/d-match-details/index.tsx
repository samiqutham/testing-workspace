"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Icon from "@workspace/ui/icons/icons";

const TABS = [
  { tabName: "Live & Upcoming" },
  { tabName: "Outrights" },
  { tabName: "All Tennis" },
];
const DMatchDetails = () => {
  const [active, setActive] = useState<string>("Live & Upcoming");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isMarket, setMarket] = useState(false);
  const [isMostrar, setMostrar] = useState(false);
  const [mostrarValue, setMostrarValue] = useState("Standard ");
  const [isMarketValue, setisMarketValue] = useState("Winner");

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

  const toggleMarket = () => {
    setMarket((prev) => !prev);
  };

  const toggleMostrar = () => {
    setMostrar((prev) => !prev);
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* top section */}
      <div className="inline-flex w-full items-center justify-start">
        <div className="mr-[calc(.25rem*3)]">
          <div className="inline-flex relative bg-[#0E212E] hover:bg-[#071824] cursor-pointer items-center gap-2 justify-center font-semibold whitespace-nowrap  transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-700 text-white hover:bg-grey-900 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.9375rem] px-[1.25rem] shadow-none rounded-(--ds-radius-md,0.25rem)">
            <Icon name="backArrow" className="h-[14px] w-[14px] fill-white " />
          </div>
        </div>
        <div className="p-[16px_20px] flex justify-center items-center max-h-[44px] bg-[rgb(15,33,46)] rounded">
          <div className="inline-flex mx-2 cursor-pointer relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white">
            Tennis
          </div>
          <span className="inline-flex w-[2px] h-[3.2em] m-[-12px_16px] bg-[#1A2C38] -skew-20"></span>
          <div className="inline-flex mx-2 cursor-pointer relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white">
            ATP
          </div>
          <span className="inline-flex w-[2px] h-[3.2em] m-[-12px_16px] bg-[#1A2C38] -skew-20"></span>
          <div className="inline-flex mx-2  relative text-[#879097] items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent  hover:bg-transparent  focus-visible:outline-hidden text-sm leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white">
            US Open Men Singles
          </div>
        </div>
      </div>
      {/* top section */}

      {/* tab Section */}
      <div className="mt-[calc(.25rem*6)]">
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden leading-[133%] tabs-scrollbar"
          role="tablist"
          aria-label="MBet Tabs"
        >
          <div className="flex w-fit bg-[#0F212E] rounded-[3rem] p-[5px] pl-[4px] pr-[6px] flex-shrink-0 min-w-max h-14 ">
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
                    "inline-flex cursor-pointer relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98]",
                    "px-5 py-[15px] text-sm leading-none rounded-full pt-[2px] pb-[2px] mt-[1px] mb-[1px] hover:bg-[#304553] hover:text-white",
                    activeState ? "!bg-[#2F4553] !text-white" : "text-white",
                    index > 0 ? "ml-[6px]" : "first:ml-[2px]",
                    tab.tabName === "Starting Soon"
                      ? "!text-[#fff] !opacity-100"
                      : "",
                  ].join(" ")}
                >
                  <span className="relative">{tab.tabName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* tab Section */}

      {/* live event header  */}
      <div className="relative flex items-center justify-between mt-[22.5px] !min-h-11">
        {/* left */}
        <span className="min-[1024]:mt-[-1px] flex items-center gap-[8px]">
          <Icon
            name="tennis"
            className="w-[16px] h-[16px]  "
            fill="#fff"
          />
          <span className="font-semibold text-left text-[1.125rem] inline-flex items-center text-white relative max-[1025px]:bottom-[1.5px] ">
            US Open Men Singles
          </span>
        </span>

        {/* Right */}
        <div className="w-full flex flex-row gap-4 justify-end items-center flex-1">
          <div className="flex gap-2 relative">
            <button className="inline-flex relative cursor-pointer items-center rounded-[2rem] gap-2 justify-center border  border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none">
              <span className="text-[.875rem] font-semibold inline-flex items-center justify-between leading-[1.5]">
                <Icon
                  name="display"
                  className="w-[14px] h-[14px] mb-[1px]  mr-[8px]"
                  fill="#b1bad3"
                />
                <span>Display</span>
              </span>
            </button>

            <button
              className="inline-flex max-h-[40px]  cursor-pointer items-center  gap-2 justify-center border  border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]  text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none !py-[13px] !px-4 bg-[#0f212e] rounded-[4px] relative  max-[1025px]:bottom-[1px] bottom-[.5px]"
              onClick={toggleMostrar}
            >
              <span className="mt-[1px]"> {mostrarValue}</span>
              <Icon
                name="ChevronDown"
                className={`w-[14px] h-[14px]  ${isMostrar ? "rotate-180" : ""
                  }`}
                fill="#b1bad3"
                style={{ transform: "rotate(0deg)" }} // 👈 same as svg
              />



              {isMostrar ? (
                <div className="absolute left-[50%] -translate-x-1/2 z-[100] top-[50px]   bg-white rounded-[.25rem] shadow-lg  max-w-fit">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>
                  <div className="flex flex-col p-[.25rem_0] [max-height:inherit]">
                    <div className="flex flex-col">
                      <button
                        className="inline-flex cursor-pointer w-full relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-sm leading-none hover:text-black  px-3 py-3 rounded-none justify-start "
                        type="button"
                        onClick={() => {
                          setMostrarValue("Standard ");
                          setMostrar(false);
                        }}
                      >
                        <span
                          className={`${mostrarValue == "Standard " ? "text-[#1475e1]" : ""}`}
                        >
                          Standard
                        </span>
                      </button>
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent hover:text-black text-sm leading-none  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setMostrarValue("Three Way");
                          setMostrar(false);
                        }}
                      >
                        <span
                          className={`${mostrarValue == "Three Way" ? "text-[#1475e1]" : ""}`}
                        >
                          Three Way
                        </span>
                      </button>
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] hover:text-black bg-transparent text-sm leading-none  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setMostrarValue("Handicap");
                          setMostrar(false);
                        }}
                      >
                        <span
                          className={`${mostrarValue == "Handicap" ? "text-[#1475e1]" : ""}`}
                        >
                          Handicap
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </button>
          </div>

          <div className="flex gap-2 relative">
            <button className="inline-flex relative cursor-pointer items-center rounded-[2rem] gap-2 justify-center border  border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none">
              <span className="text-[.875rem] font-semibold inline-flex items-center justify-between leading-[1.5]">
                <Icon
                  name="market"
                  className="w-[14px] h-[14px] mr-[8px] mb-[1px]"
                  fill="#b1bad3"
                />
                <span>Market</span>
              </span>
            </button>

            <button
              className="inline-flex max-h-[40px]   cursor-pointer items-center  gap-2 justify-center border  border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]  text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none !py-[13px] !px-4 bg-[#0f212e] rounded-[4px] relative max-[1025px]:bottom-[1px] bottom-[0.5px]"
              onClick={toggleMarket}
            >
              <span className="mt-[1px]">{isMarketValue} </span>
              <Icon
                name="arrow"
                className={`w-[14px] h-[14px]     ${isMostrar ? "rotate-180" : ""
                  }`}
                fill="#b1bad3"
              />
              {isMarket ? (
                <div className="absolute left-[50%] -translate-x-1/2  z-[100] top-[50px]   bg-white rounded-[.25rem] shadow-lg  max-w-fit">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>
                  <div className="flex flex-col p-[.25rem_0] [max-height:inherit]">
                    <div className="flex flex-col">
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-sm leading-none hover:text-black  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setisMarketValue("Ganador");
                          setMarket(false);
                        }}
                      >
                        <span
                          className={`${isMarketValue == "Ganador" ? "text-[#1475e1]" : ""}`}
                        >
                          Ganador
                        </span>
                      </button>
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] hover:text-black bg-transparent text-sm leading-none  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setisMarketValue("Winner");
                          setMarket(false);
                        }}
                      >
                        <span
                          className={`${isMarketValue == "Winner" ? "text-[#1475e1]" : ""}`}
                        >
                          Winner
                        </span>
                      </button>
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] hover:text-black bg-transparent text-sm leading-none  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setisMarketValue("Handicap");
                          setMarket(false);
                        }}
                      >
                        <span
                          className={`${isMarketValue == "Handicap" ? "text-[#1475e1]" : ""}`}
                        >
                          Handicap
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </button>
          </div>
        </div>
      </div>
      {/* live event header  */}
    </div>
  )
}

export default DMatchDetails
