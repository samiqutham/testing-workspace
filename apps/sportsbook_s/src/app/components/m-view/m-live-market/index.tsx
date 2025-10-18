import Icon from "@workspace/ui/icons/icons";
import React, { useState } from "react";

const MLiveMarket = () => {
  const initialOpen = [0, 1, 2, 3, 4, 5].reduce(
    (acc, idx) => {
      acc[idx] = true;
      return acc;
    },
    {} as { [key: number]: boolean }
  );

  const [open, setOpen] = useState<{ [key: number]: boolean }>(initialOpen);
  const toggle = (idx: number) => {
    setOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };
  return (
    <>
      {[0, 1, 2].map((idx) => (
        <div
          key={idx}
          className="bg-[#213743] rounded-[4px] shadow-md text-white mb-3 mt-3">
          {/* Header */}
          <div
            className="flex justify-between items-center px-4 py-3  cursor-pointer "
            onClick={() => toggle(idx)}>
            <span className="font-semibold text-[#D5DCEB] text-[14px]">
              {/* Japan / NPB */}
              WTA 125K / WTA 125K Guadalajara, Mexico Women Singles
            </span>

            <Icon
              name="questionArrow"
              fill="#D5DCEB"
              className={`w-[16.78px] h-[16px] 
                transition-transform duration-200 ease-out 
                ${open[idx] ? "rotate-180" : "rotate-0"}`}
            />
          </div>

          {/* Body */}
          {open[idx] && (
            <div className="divide-y divide-[#2f4553] border-t-2 border-[#2f4553]">
              {/* Match 1 */}
              {/* <div className="px-4 pb-4 pt-[18px]  "> */}
              <div className="px-4 pb-4 pt-[18px] border-b-[3px] border-[#2f4553]">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="bg-[#e9113c] text-white text-xs font-semibold px-1 py-[1px] rounded-[2px]">
                    Live
                  </span>
                  <span className="text-[#b1bad3] text-[12px]">
                    Break Top El Bottom 9
                  </span>
                  <svg
                    fill="#b1bad3"
                    viewBox="0 0 64 64"
                    className="w-3.5 h-3.5 ml-[4px]">
                    <title></title>
                    <path d="M16 64H5.332V35.172L16 28.215zm21.332 0H26.668V38.828l3.039 3.52 4.852-3.094 2.773-1.762zm21.336 0H48V30.719l10.668-6.797zM64 12.64 30.988 33.626 18.133 18.852 0 30.692V17.944L20.106 4.852l12.906 14.855L64 0z"></path>
                  </svg>
                  <span className="ml-auto text-[#fff] font-semibold">+1</span>
                </div>
                <div className="mb-3 mt-[14px] flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-between gap-[7px]">
                    <div className="flex items-center gap-1">
                      <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                        <Icon name={"flag1"} className="w-[14px] h-[14px]" />
                      </div>

                      <span className="text-[14px] font-semibold">
                        Hokkaido Nippon-Ham Fighters
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                        <Icon name={"flag2"} className="w-[14px] h-[14px]" />
                      </div>
                      <span className="text-[14px] font-semibold">
                        Tohoku Rakuten Golden Eagles
                      </span>
                    </div>
                  </div>

                  <div className="flex  items-center font-semibold gap-[6px]">
                    <div className="px-1">
                      <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                        <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                          1
                        </span>
                        <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                          1
                        </span>
                      </div>
                    </div>
                    <div className="px-1">
                      <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                        <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                          2
                        </span>
                        <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                          3
                        </span>
                      </div>
                    </div>

                    <div className="  min-w-[26px] px-1  flex flex-col items-center justify-between border-2 bg-[#2f4553] border-[#557086] rounded">
                      <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                        <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                          0
                        </span>
                        <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                          0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full relative z-[2] px-2 my-1  text-center items-center">
                  <span
                    className="font-normal  text-[12px] leading-[18px] text-[#b1bad3] relative bottom-[1px]"
                    style={{ maxWidth: "100%" }}>
                    Winner
                  </span>
                </div>
                <div className="flex gap-2 overflow-hidden mt-[10px]">
                  <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                    <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                      Hokkaido Nippon-Ham
                    </span>
                    <div className="flex justify-center items-center relative">
                      <span className="text-blue-400">1.55</span>
                      {/* <div
                        className="arrow-odds align-right left-[27px] w-0 h-0 
                       border-l-[4px] border-r-[4px] border-t-[6px]
                       border-l-transparent border-r-transparent border-t-[#1FFF20]"></div> */}
                    </div>
                  </button>

                  <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                    <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                      Tohoku Rakuten Golden
                    </span>
                    <span className="text-blue-400">2.45</span>
                  </button>
                </div>
              </div>

              {/* Match 2 */}
              {/* <div className="px-4 pb-[24px] pt-[18px] border-b-[3px] border-[#2f4553]">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="bg-[#e9113c] text-white text-xs px-1 py-[1px] rounded-[2px]">
                    Live
                  </span>
                  <span className="text-[#b1bad3] text-[12px]">
                    Break Top El Bottom 9
                  </span>
                  <svg
                    fill="#b1bad3"
                    viewBox="0 0 64 64"
                    className="w-3.5 h-3.5 ml-[4px]">
                    <title></title>
                    <path d="M16 64H5.332V35.172L16 28.215zm21.332 0H26.668V38.828l3.039 3.52 4.852-3.094 2.773-1.762zm21.336 0H48V30.719l10.668-6.797zM64 12.64 30.988 33.626 18.133 18.852 0 30.692V17.944L20.106 4.852l12.906 14.855L64 0z"></path>
                  </svg>
                  <span className="ml-auto text-[#fff] font-semibold">+1</span>
                </div>
                <div className="mb-4 mt-[14px] flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                        <Icon name={"flag2"} className="w-[14px] h-[14px]" />
                      </div>
                      <span className="text-[14px] font-semibold">
                        Hokkaido Nippon-Ham Fighters
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                        <Icon name={"flag2"} className="w-[14px] h-[14px]" />
                      </div>
                      <span className="text-[14px] font-semibold">
                        Tohoku Rakuten Golden Eagles
                      </span>
                    </div>
                  </div>
            
                  <div className="flex flex-col items-center justify-between border-2 bg-[#2f4553] border-[#557086] rounded">
                    <div className="flex items-center gap-1">
                      <span className="px-[6.5px] py-[3px]   text-sm">0</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="px-[6.5px] py-[3px]  text-sm">0</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-[#b1bad3] text-xs mb-3.5">
                  Winner (Incl. Extra Innings)
                </p>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                    <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                      Hokkaido Nippon-Ham
                    </span>
                    <span className="text-blue-400">1.55</span>
                  </button>
                  <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                    <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                      Tohoku Rakuten Golden
                    </span>
                    <span className="text-blue-400">2.45</span>
                  </button>
                </div>
              </div> */}
              {/* Match 3 */}
              <div className="px-4 pb-4 pt-[18px]  border-[#2f4553]">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="bg-[#e9113c] text-white text-xs font-semibold px-1 py-[1px] rounded-[2px]">
                    Live
                  </span>
                  <span className="text-[#b1bad3] text-[12px]">
                    Break Top El Bottom 9
                  </span>
                  <svg
                    fill="#b1bad3"
                    viewBox="0 0 64 64"
                    className="w-3.5 h-3.5 ml-[4px]">
                    <title></title>
                    <path d="M16 64H5.332V35.172L16 28.215zm21.332 0H26.668V38.828l3.039 3.52 4.852-3.094 2.773-1.762zm21.336 0H48V30.719l10.668-6.797zM64 12.64 30.988 33.626 18.133 18.852 0 30.692V17.944L20.106 4.852l12.906 14.855L64 0z"></path>
                  </svg>
                  <span className="ml-auto text-[#fff] font-semibold">+1</span>
                </div>
                <div className="mb-3 mt-[14px] flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-between gap-[7px]">
                    <div className="flex items-center gap-1">
                      <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                        <Icon name={"flag1"} className="w-[14px] h-[14px]" />
                      </div>

                      <span className="text-[14px] font-semibold">
                        Hokkaido Nippon-Ham Fighters
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                        <Icon name={"flag2"} className="w-[14px] h-[14px]" />
                      </div>
                      <span className="text-[14px] font-semibold">
                        Tohoku Rakuten Golden Eagles
                      </span>
                    </div>
                  </div>

                  <div className="flex  items-center font-semibold gap-[6px]">
                    <div className="px-1">
                      <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                        <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                          1
                        </span>
                        <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                          1
                        </span>
                      </div>
                    </div>
                    <div className="px-1">
                      <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                        <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                          2
                        </span>
                        <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                          3
                        </span>
                      </div>
                    </div>

                    <div className="  min-w-[26px] px-1  flex flex-col items-center justify-between border-2 bg-[#2f4553] border-[#557086] rounded">
                      <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                        <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                          0
                        </span>
                        <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                          0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full relative z-[2] px-2 my-1  text-center items-center">
                  <span
                    className="font-normal  text-[12px] leading-[18px] text-[#b1bad3] relative bottom-[1px]"
                    style={{ maxWidth: "100%" }}>
                    Winner
                  </span>
                </div>
                <div className="flex gap-2 overflow-hidden mt-[10px]">
                  <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                    <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                      Hokkaido Nippon-Ham
                    </span>
                    <div className="flex justify-center items-center relative">
                      <span className="text-blue-400">1.55</span>
                      {/* <div
                        className="arrow-odds align-right left-[27px] w-0 h-0 
                       border-l-[4px] border-r-[4px] border-t-[6px]
                       border-l-transparent border-r-transparent border-t-[#1FFF20]"></div> */}
                    </div>
                  </button>

                  <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                    <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                      Tohoku Rakuten Golden
                    </span>
                    <span className="text-blue-400">2.45</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* view all button  */}
      <div className="mt-3 pl-3 flex">
        <a className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#b1bad3] hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none">
          View All
        </a>
      </div>
      <div className="mt-6 flex flex-col w-full">
        <div className="pt-4">
          <span className="font-semibold  align-left text-lg flex  items-center ">
            <svg
              fill="currentColor"
              viewBox="0 0 96 96"
              className="h-[18px] w-[18px] fill-[#b1bad3] mr-2">
              <path d="m92.603 40.12-14.92-9.32-.68-17.56-17.4 2.44-11.8-13-11.76 13.04-17.4-2.36-.6 17.56-14.84 9.4 10.84 13.84-5.36 16.72 17.2 3.64 6.68 16.24 15.52-8.24 15.56 8.16 6.56-16.28 17.16-3.72-5.44-16.72 10.76-13.88zM56.163 53.4l5.24 16.12-13.72-9.96-13.72 9.96 5.24-16.12-13.72-9.96h16.92l5.24-16.12 5.24 16.12h16.92l-13.72 9.96z"></path>
            </svg>
            <span>Popular Events</span>
          </span>
        </div>
      </div>

      <div className="mt-3">
        {[3, 4, 5].map((idx) => (
          <div
            key={idx}
            className="bg-[#213743]  rounded-[4px] shadow-md text-white mb-3 mt-3">
            {/* Header */}
            <div
              // className={`flex justify-between items-center px-4 py-3 h-[45px]  cursor-pointer ${open[idx] ? "bg-[#286984] blink-bg" : "bg-[#213743] blink-bg"}`}
              className="flex justify-between items-center px-4 py-3 h-[45px]  cursor-pointer"
              onClick={() => toggle(idx)}>
              <span className="font-semibold text-[#D5DCEB] text-[14px]">
                Japan / NPB
              </span>

              <Icon
                name="questionArrow"
                fill="#D5DCEB"
                className={`w-[16px] h-[16px] relative top-[1px]
                transition-transform duration-200 ease-out 
                ${open[idx] ? "rotate-180" : "rotate-0"}`}
              />
            </div>

            {/* Body */}
            {open[idx] && (
              <div className="divide-y divide-[#2f4553] border-t-2 border-[#2f4553]">
                {/* Match 1 */}
                <div className="px-4 pb-4 pt-[18px] border-b-[3px] border-[#2f4553]">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="bg-[#e9113c] text-white text-xs font-semibold px-1 py-[1px] rounded-[2px]">
                      Live
                    </span>
                    <span className="text-[#b1bad3] text-[12px]">
                      Break Top El Bottom 9
                    </span>
                    <svg
                      fill="#b1bad3"
                      viewBox="0 0 64 64"
                      className="w-3.5 h-3.5 ml-[4px]">
                      <title></title>
                      <path d="M16 64H5.332V35.172L16 28.215zm21.332 0H26.668V38.828l3.039 3.52 4.852-3.094 2.773-1.762zm21.336 0H48V30.719l10.668-6.797zM64 12.64 30.988 33.626 18.133 18.852 0 30.692V17.944L20.106 4.852l12.906 14.855L64 0z"></path>
                    </svg>
                    <span className="ml-auto text-[#fff] font-semibold">
                      +1
                    </span>
                  </div>
                  <div className="mb-3 mt-[14px] flex flex-row items-center justify-between">
                    <div className="flex flex-col items-start justify-between gap-[7px]">
                      <div className="flex items-center gap-1">
                        <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                          <Icon name={"flag1"} className="w-[14px] h-[14px]" />
                        </div>

                        <span className="text-[14px] font-semibold">
                          Hokkaido Nippon-Ham Fighters
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                          <Icon name={"flag2"} className="w-[14px] h-[14px]" />
                        </div>
                        <span className="text-[14px] font-semibold">
                          Tohoku Rakuten Golden Eagles
                        </span>
                      </div>
                    </div>

                    <div className="flex  items-center font-semibold gap-[6px]">
                      <div className="px-1">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            1
                          </span>
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            1
                          </span>
                        </div>
                      </div>
                      <div className="px-1">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            2
                          </span>
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            3
                          </span>
                        </div>
                      </div>

                      <div className="  min-w-[26px] px-1  flex flex-col items-center justify-between border-2 bg-[#2f4553] border-[#557086] rounded">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                            0
                          </span>
                          <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                            0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative z-[2] px-2 my-1  text-center items-center">
                    <span
                      className="font-normal  text-[12px] leading-[18px] text-[#b1bad3] relative bottom-[1px]"
                      style={{ maxWidth: "100%" }}>
                      Winner
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-hidden mt-[10px]">
                    <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                      <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                        Hokkaido Nippon-Ham
                      </span>
                      <div className="flex justify-center items-center relative">
                        <span className="text-blue-400">1.55</span>
                        {/* <div
                        className="arrow-odds align-right left-[27px] w-0 h-0 
                       border-l-[4px] border-r-[4px] border-t-[6px]
                       border-l-transparent border-r-transparent border-t-[#1FFF20]"></div> */}
                      </div>
                    </button>

                    <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                      <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                        Tohoku Rakuten Golden
                      </span>
                      <span className="text-blue-400">2.45</span>
                    </button>
                  </div>
                </div>

                {/* Match 2 */}
                <div className="px-4 pb-4 pt-[18px] border-b-[3px] border-[#2f4553]">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="bg-[#e9113c] text-white text-xs font-semibold px-1 py-[1px] rounded-[2px]">
                      Live
                    </span>
                    <span className="text-[#b1bad3] text-[12px]">
                      Break Top El Bottom 9
                    </span>
                    <svg
                      fill="#b1bad3"
                      viewBox="0 0 64 64"
                      className="w-3.5 h-3.5 ml-[4px]">
                      <title></title>
                      <path d="M16 64H5.332V35.172L16 28.215zm21.332 0H26.668V38.828l3.039 3.52 4.852-3.094 2.773-1.762zm21.336 0H48V30.719l10.668-6.797zM64 12.64 30.988 33.626 18.133 18.852 0 30.692V17.944L20.106 4.852l12.906 14.855L64 0z"></path>
                    </svg>
                    <span className="ml-auto text-[#fff] font-semibold">
                      +1
                    </span>
                  </div>
                  <div className="mb-3 mt-[14px] flex flex-row items-center justify-between">
                    <div className="flex flex-col items-start justify-between gap-[7px]">
                      <div className="flex items-center gap-1">
                        <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                          <Icon name={"flag1"} className="w-[14px] h-[14px]" />
                        </div>

                        <span className="text-[14px] font-semibold">
                          Hokkaido Nippon-Ham Fighters
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                          <Icon name={"flag2"} className="w-[14px] h-[14px]" />
                        </div>
                        <span className="text-[14px] font-semibold">
                          Tohoku Rakuten Golden Eagles
                        </span>
                      </div>
                    </div>

                    <div className="flex  items-center font-semibold gap-[6px]">
                      <div className="px-1">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            1
                          </span>
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            1
                          </span>
                        </div>
                      </div>
                      <div className="px-1">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            2
                          </span>
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            3
                          </span>
                        </div>
                      </div>

                      <div className="  min-w-[26px] px-1  flex flex-col items-center justify-between border-2 bg-[#2f4553] border-[#557086] rounded">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                            0
                          </span>
                          <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                            0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative z-[2] px-2 my-1  text-center items-center">
                    <span
                      className="font-normal  text-[12px] leading-[18px] text-[#b1bad3] relative bottom-[1px]"
                      style={{ maxWidth: "100%" }}>
                      Winner
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-hidden mt-[10px]">
                    <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                      <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                        Hokkaido Nippon-Ham
                      </span>
                      <div className="flex justify-center items-center relative">
                        <span className="text-blue-400">1.55</span>
                        {/* <div
                        className="arrow-odds align-right left-[27px] w-0 h-0 
                       border-l-[4px] border-r-[4px] border-t-[6px]
                       border-l-transparent border-r-transparent border-t-[#1FFF20]"></div> */}
                      </div>
                    </button>

                    <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                      <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                        Tohoku Rakuten Golden
                      </span>
                      <span className="text-blue-400">2.45</span>
                    </button>
                  </div>
                </div>
                {/* Match 3 */}
                <div className="px-4 pb-4 pt-[18px]">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="bg-[#e9113c] text-white text-xs font-semibold px-1 py-[1px] rounded-[2px]">
                      Live
                    </span>
                    <span className="text-[#b1bad3] text-[12px]">
                      Break Top El Bottom 9
                    </span>
                    <svg
                      fill="#b1bad3"
                      viewBox="0 0 64 64"
                      className="w-3.5 h-3.5 ml-[4px]">
                      <title></title>
                      <path d="M16 64H5.332V35.172L16 28.215zm21.332 0H26.668V38.828l3.039 3.52 4.852-3.094 2.773-1.762zm21.336 0H48V30.719l10.668-6.797zM64 12.64 30.988 33.626 18.133 18.852 0 30.692V17.944L20.106 4.852l12.906 14.855L64 0z"></path>
                    </svg>
                    <span className="ml-auto text-[#fff] font-semibold">
                      +1
                    </span>
                  </div>
                  <div className="mb-3 mt-[14px] flex flex-row items-center justify-between">
                    <div className="flex flex-col items-start justify-between gap-[7px]">
                      <div className="flex items-center gap-1">
                        <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                          <Icon name={"flag1"} className="w-[14px] h-[14px]" />
                        </div>

                        <span className="text-[14px] font-semibold">
                          Hokkaido Nippon-Ham Fighters
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
                          <Icon name={"flag2"} className="w-[14px] h-[14px]" />
                        </div>
                        <span className="text-[14px] font-semibold">
                          Tohoku Rakuten Golden Eagles
                        </span>
                      </div>
                    </div>

                    <div className="flex  items-center font-semibold gap-[6px]">
                      <div className="px-1">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            1
                          </span>
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            1
                          </span>
                        </div>
                      </div>
                      <div className="px-1">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            2
                          </span>
                          <span className="font-normal  align-center inline-flex leading-[20px] text-[#b1bad3] text-[14px]">
                            3
                          </span>
                        </div>
                      </div>

                      <div className="  min-w-[26px] px-1  flex flex-col items-center justify-between border-2 bg-[#2f4553] border-[#557086] rounded">
                        <div className="flex flex-col justify-end pt-0.5 pb-0.5 gap-2">
                          <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                            0
                          </span>
                          <span className="font-normal  align-center text-[0.875rem] inline-flex leading-[20px]">
                            0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative z-[2] px-2 my-1  text-center items-center">
                    <span
                      className="font-normal  text-[12px] leading-[18px] text-[#b1bad3] relative bottom-[1px]"
                      style={{ maxWidth: "100%" }}>
                      Winner
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-hidden mt-[10px]">
                    <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                      <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                        Hokkaido Nippon-Ham
                      </span>
                      <div className="flex justify-center items-center relative">
                        <span className="text-blue-400">1.55</span>
                        {/* <div
                        className="arrow-odds align-right left-[27px] w-0 h-0 
                       border-l-[4px] border-r-[4px] border-t-[6px]
                       border-l-transparent border-r-transparent border-t-[#1FFF20]"></div> */}
                      </div>
                    </button>

                    <button className="flex-1 bg-[#071824] rounded-[4px] px-3 py-[9px] text-sm flex flex-col justify-between items-start min-w-0">
                      <span className="truncate whitespace-nowrap text-ellipsis w-full text-start">
                        Tohoku Rakuten Golden
                      </span>
                      <span className="text-blue-400">2.45</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MLiveMarket;
