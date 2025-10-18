"use client";

import Icon from "@workspace/ui/icons/icons";
import React, { useRef, useState } from "react";
import { CasinoCards } from "../casino-cards";
import { CurrencyDropdown } from "../../currency-dropdown";

const items = [
  { id: 1, label: "For You", icon: "faqPrimeDice" },
  { id: 2, label: "Top Games", icon: "faqPrimeDice" },
  { id: 3, label: "Stake Tables", icon: "faqPrimeDice" },
  { id: 4, label: "Local Tables", icon: "localTable" },
  { id: 5, label: "Baccarat & Sic Bo", icon: "casino" },
  { id: 6, label: "Game Shows", icon: "faqPrimeDice" },
  { id: 7, label: "Roulette", icon: "roullet" },
  { id: 8, label: "Blackjack", icon: "blackjack" },
  { id: 9, label: "Poker", icon: "poker" },
  { id: 10, label: "First Person", icon: "faqPrimeDice" },
];

export const CasinoLobby = () => {
  const [active, setActive] = useState<number>(items[0].id);
  const [isSticky, setIsSticky] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const containerRef = useRef<HTMLUListElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleClick = (id: number, index: number) => {
    setActive(id);

    if (containerRef.current) {
      const listItems = containerRef.current.querySelectorAll("li");
      const listItem = listItems[index] as HTMLElement;

      if (listItem) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemLeft = listItem.offsetLeft;
        const itemWidth = listItem.offsetWidth;
        const scrollPosition = itemLeft - containerWidth / 2 + itemWidth / 2;
        containerRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      setIsSticky(scrollAreaRef.current.scrollTop < 50);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-[3vw]">
      <div className="relative max-w-[1200px] w-full mt-[3vw] flex flex-col pb-8">
        <div className="rounded h-[calc(100dvh-6vw)] relative bg-[#1D1D27] flex flex-col overflow-hidden">
          <div
            ref={scrollAreaRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto relative pb-10 no-scrollbar"
          >
            <div
              className={`sticky top-0 z-20 w-full flex items-center py-2 px-5 lg:px-7 xl:px-10 xl:py-4 justify-between transition-transform duration-300 ease-in-out bg-[linear-gradient(180deg,#1d1d27cc_0%,#1d1d2766_60%,#1d1d2703_100%)] bg-[rgba(29,29,39,0.98)] ${
                isSticky ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <Icon
                name={"logo"}
                className="w-[105px] h-[32.5px] relative top-[0.7px]"
                fill="white"
              />
              <div className="flex items-center gap-1 xl:w-full xl:justify-end">
                <span className="p-[.375rem] ml-1 xl:hidden">
                  <Icon
                    name="casinoSearch"
                    className="w-[24px] h-[24px]"
                    fill="white"
                  />
                </span>
                <span className="p-[.375rem] ml-1 cursor-pointer hover:bg-[#ffffff1a] hover:rounded-full">
                  <Icon
                    name="heart"
                    className="w-[24px] h-[24px] scale-[1.6] xl:scale-[1.4]"
                    fill="white"
                  />
                </span>
                <div className="relative max-w-2xs w-full h-full overflow-hidden xl:block hidden mx-3">
                  <div className="bg-[#d9d9d917] shadow-[inset_0_0_0_.1rem_#fff3] hover:shadow-[inset_0_0_0_.1rem_#fff6] transition-[background,box-shadow] duration-200 rounded-[0.5rem] ">
                    <div className="w-full relative flex items-center">
                      <Icon
                        name="casinoSearch"
                        className="w-[18px] h-[18px] absolute top-[7px] left-0 translate-x-3 flex items-center justify-center"
                        fill="white"
                      />
                      <input
                        className="text-xs focus:!text-xs leading-[1rem] py-2 px-9 focus:ring-0 focus:border-0 focus:outline-none h-full w-full max-h-[32px] box-border appearance-none"
                        placeholder="Search"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <span
                  className="p-[.375rem] ml-1 cursor-pointer hover:bg-[#ffffff1a] hover:rounded-full w-[36px] h-[36px] flex items-center justify-center
                "
                >
                  <Icon
                    name="menucasino"
                    className="w-[20px] h-[20px] xl:w-[15px] xl:h-[15px]"
                    fill="white"
                  />
                </span>
              </div>
            </div>

            <div className="grid relative">
              <ul
                ref={containerRef}
                className="pt-4 pb-1 flex items-start overflow-x-auto no-scrollbar xl:justify-center font-[sans-serif] xl:after:content-[''] xl:after:flex-[0_0_2.5rem] xl:before:content-[''] xl:before:flex-[0_0_2.5rem]"
              >
                <div className="hidden xl:flex justify-start h-[1px] translate-y-[calc(2.5rem/2+.25rem)] w-full">
                  <span className="w-[calc(100%-1.75rem)] bg-[#ffffff1a]"></span>
                </div>
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    onClick={() => handleClick(item.id, index)}
                    className={`cursor-pointer group inline-flex relative mx-[2.25px] xl:mx-[calc(0.375rem/2)] ${index === 0 ? "ml-0 pl-5 lg:pl-7 xl:pl-0" : ""} ${index === items.length - 1 ? "xl:!mr-0" : ""}`}
                  >
                    <div
                      className={`flex flex-col text-center gap-1 w-[4.75rem] xl:w-[5.625rem] items-center transition-opacity ${
                        active === item.id
                          ? "opacity-100"
                          : "opacity-60 group-hover:opacity-80"
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        className={`w-[40px] h-[40px] transition-[transform_0.3s_ease-in-out] ${
                          active === item.id
                            ? "scale-[1.4] translate-y-[-16%]"
                            : "scale-100"
                        }`}
                        fill="white"
                      />
                      <span className="text-[.75rem] leading-[1rem] font-semibold px-0.5">
                        {item.label}
                      </span>
                    </div>
                  </li>
                ))}
                <div className="hidden xl:flex justify-end h-[1px] translate-y-[calc(2.5rem/2+.25rem)] w-full">
                  <span className="w-[calc(100%-1.75rem)] bg-[#ffffff1a]"></span>
                </div>
              </ul>
            </div>

            <section className="main h-full py-3 relative w-full">
              <div className="flex flex-col relative gap-4 xl:flex-row xl:px-10 px-5 lg:px-7">
                <span className="text-[1.25rem] text-white leading-[1.5rem] whitespace-nowrap font-semibold">
                  Game Title
                </span>
                <div className="flex items-center justify-start w-full xl:justify-end no-scrollbar">
                  <div className="grid relative">
                    <ul className="gap-x-2 auto-cols-max grid-flow-col list-none overflow-x-auto overflow-y-hidden no-scrollbar">
                      <li className="inlin-flex relative whitespace-nowrap select-none">
                        <div
                          className="rounded shadow-[inset_0_0_0_1px_#8e8e93] hover:shadow-[inset_0_0_0_1px_#fff] cursor-pointer flex justify-center min-w-[3rem] relative transition-[background-color,box-shadow] duration-300 ease-in-out
"
                        >
                          <span className="py-1 px-3 text-[.625rem] leading-[1rem] text-white transition-[color_.3s_ease]">
                            New
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="py-4 pb-14 relative">
                <CasinoCards />
              </div>
            </section>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-10 bg-[#1d1d27fa] flex justify-between items-center py-3 px-5 lg:px-7 xl:px-10 z-30">
            <div className="flex min-h-4 items-center opacity-80">
              <span className="text-white text-[.75rem] lg:text-sm">
                Balance:
              </span>
              <span className="text-[.625rem] text-[#fc0] font-semibold lg:text-xs">
                &nbsp;$0
              </span>
            </div>
            <div className="flex min-h-4 items-center opacity-80">
              <span className="text-white text-[.75rem]">
                <Icon
                  className="text-[#ffffff]"
                  width="11"
                  height="11"
                  name="user"
                />
              </span>
              <span className="text-[.625rem] lg:text-xs font-semibold">
                &nbsp;66,945
              </span>
            </div>
          </div>

          {showOverlay && (
            <div className="absolute inset-0 bg-[#0e1224e6] z-[9999999] flex items-center justify-center flex-col text-[rgb(177,_186,_211)]">
              <div className="grid items-center justify-start grid-flow-col">
                <p className="text-[rgb(177,186,211)] text-left text-sm font-semibold leading-[1.5] py-1">
                  Balance displayed in
                </p>
                <CurrencyDropdown />
              </div>
              <div className="w-auto p-4">
                <button
                  type="button"
                  onClick={() => setShowOverlay(false)}
                  className="inline-flex items-center gap-2 justify-center rounded font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#00e701] text-black hover:bg-[#1fff20] text-sm leading-none shadow-md py-[.8125rem] px-4 cursor-pointer"
                >
                  Real Play
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex min-h-[63px] p-2 items-center justify-between w-full bg-[rgb(15,_33,_46)] rounded-bl rounded-br relative z-[999] bottom-[1px]">
          <div className="w-auto border-r border-[rgb(47,_69,_83)] items-center justify-between grid-flow-col grid pr-2">
            <div className="inline-flex">
              <button
                type="button"
                className="cursor-pointer inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-gray-200 hover:text-white focus-visible:text-white text-sm leading-none py-3 px-4"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 64 64"
                  className="w-[14px] h-[14px]"
                >
                  <path d="M8 56h17v8H0V39h8zm56 8H39v-8h17V39h8zM25 8H8v17H0V0h25zm39 17h-8V8H39V0h25z"></path>
                </svg>
              </button>
            </div>
            <div className="inline-flex">
              <button
                type="button"
                className="cursor-pointer inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-gray-200 hover:text-white focus-visible:text-white text-sm leading-none py-3 px-4"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 64 64"
                  className="w-[14px] h-[14px]"
                >
                  <path d="M64 58.5H0v-53h64zm-56-8h48v-37H8z"></path>
                </svg>
              </button>
            </div>
            <div className="inline-flex">
              <button
                type="button"
                className="cursor-pointer inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-gray-200 hover:text-white focus-visible:text-white text-sm leading-none py-3 px-4"
              >
                <Icon name="raceTime" className="w-[14px] h-[14px]" />
              </button>
            </div>
            <div className="inline-flex">
              <button
                type="button"
                className="cursor-pointer inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-gray-200 hover:text-white focus-visible:text-white text-sm leading-none py-3 px-4"
              >
                <Icon name="starSilver" className="w-[14px] h-[14px]" />
              </button>
            </div>

            {!showOverlay && <CurrencyDropdown />}
          </div>
          <Icon name="logo" fill="#1A2C38" className="w-[68px] h-[35px]" />
          <div className="pr-6"></div>
        </div>
      </div>
    </div>
  );
};
