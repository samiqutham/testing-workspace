import Icon from "@workspace/ui/icons/icons";
import Image from "next/image";
import React, { useState } from "react";
import style from "./d-live-market.module.css";
export default function DLiveMarket() {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const toggle = (idx: number) => {
    setOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <>
      <div className="mt-3">
        <div className="max-w-[1200] mx-auto w-full ">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="mt-3 flex flex-col w-full relative bg-[#213743] shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.12),inset_0_1px_rgba(255,255,255,0.04)] level-2 rounded svelte-b8z685 is-open">
              <button
                onClick={() => {
                  toggle(idx);
                }}
                className={`header z-[4] flex justify-between w-full items-center bg-transparent px-4 py-3 text-[#d5dceb] cursor-pointer ${open[idx] ? "rounded-t-md" : "rounded-md"} rounded `}>
                <div className="flex justify-between gap-2 items-center w-full">
                  <div className="flex justify-between gap-2 items-center w-full md:max-h-[21px] max-[1400px]:h-auto h-[21px]">
                    <div>
                      <span className="font-semibold text-[#d5dceb]  align-left text-sm leading-[21px]">
                        WTA 125K / WTA 125K Changsha, China Women Singles
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Icon
                    name={"ChevronDown"}
                    className={`w-4 h-4 ${open[idx] ? "rotate-180" : "rotate-0"}`}
                    fill="#d5dceb"
                  />
                </div>
              </button>

              {open[idx] && (
                <div className="border-t-2 border-[#2f4553] flex flex-col bg-[#213743]">
                  <div>
                    <div className="max-[780px]:py-3 min-[781px]:py-2 grid items-center justify-stretch  w-full grid-flow-row  stretch">
                      <div className="fixture-wrapper">
                        <div
                          className={` ${style.gridLayout}  pt-1   grid  [grid-template-rows:repeat(3,auto)]  ,minmax(0,1fr))] [grid-template-areas:var(--areas)]   px-4 pb-3  gap-y-1 min-[781px]:pr-6   w-full
                                  items-center
                                  text-gray-200
                                  gap-x-2 `}>
                          <div className="flex relative z-20 text-sm min-h-[24px] gap-3 [grid-area:misc] items-center ">
                            <div className="flex items-center capitalize  justify-between">
                              <div className="flex gap-2 items-center">
                                <div className="bg-[#E9113C] text-[0.75rem] leading-[18px] font-semibold text-white px-1 rounded-[3px] inline-flex">
                                  Live
                                </div>

                                <span className="leading-none text-[12px] text-[#b1bad3]">
                                  Ended
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-row items-center justify-between gap-3">
                              <div className="inline-flex">
                                <button
                                  type="button"
                                  className="inline-flex relative top-[0.5px] items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none"
                                  data-analytics="sports-stream-button">
                                  <div className=" w-[36px] h-[24px] grid grid-cols-1 grid-rows-1 rounded-[3px] overflow-hidden">
                                    <Image
                                      className=" w-full h-full object-cover col-start-1 col-end-2 row-start-1 row-end-2"
                                      alt="stem"
                                      width={100}
                                      height={100}
                                      src="/livestrem.jpg"
                                    />
                                    <div className="bg-black opacity-30 w-full h-full col-start-1 col-end-2 row-start-1 row-end-2"></div>
                                    <div className="flex items-center justify-center col-start-1 col-end-2 row-start-1 row-end-2 z-10">
                                      <Icon
                                        name={"startPlaying"}
                                        className="w-[14px] h-[14px]"
                                        fill="#fff"
                                      />
                                    </div>
                                  </div>
                                </button>
                              </div>

                              <div className="inline-flex">
                                <button
                                  type="button"
                                  className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                                  <Icon
                                    name={"graph"}
                                    className="w-[14px] h-[14px] hover:fill-white"
                                    fill="#b1bad3"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* for tablet */}
                          <div className="flex w-full justify-between  mt-1 mb-1 col-span-full items-center  min-[780px]:hidden">
                            <div className="self-center grid whitespace-nowrap overflow-hidden gap-2 items-center h-full ">
                              <a
                                className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none inline truncate"
                                href="">
                                <div className="flex gap-2 items-center">
                                  <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                    <svg
                                      fill="none"
                                      viewBox="0 0 96 96"
                                      className="svg-icon w-[14px] h-[14px] m-auto">
                                      <title></title>
                                      <path
                                        fill="#D80027"
                                        d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path>
                                      <path
                                        fill="#FFDA44"
                                        d="m26.269 29.213 4.144 12.75h13.406L32.98 49.856l4.144 12.75-10.856-7.875-10.856 7.875 4.162-12.75-10.856-7.894h13.406zm30.637 45.131-3.169-3.9-4.687 1.819 2.719-4.22-3.169-3.918 4.856 1.294 2.738-4.219.262 5.025 4.875 1.294-4.706 1.8zm6.3-11.438 1.5-4.8L60.6 55.2l5.025-.075 1.481-4.8 1.632 4.762 5.025-.056-4.032 3 1.613 4.763-4.106-2.906zM71.7 35.231l-2.213 4.519 3.6 3.506-4.968-.712-2.213 4.5-.862-4.95-4.988-.713 4.463-2.343-.863-4.97 3.6 3.507zM57.038 21.544l-.375 5.006 4.668 1.894-4.894 1.2-.356 5.025-2.644-4.275-4.893 1.2 3.244-3.844-2.663-4.256 4.669 1.893z"></path>
                                    </svg>
                                  </div>

                                  <span className="truncate text-sm leading-none">
                                    Ma, Yexin
                                  </span>
                                </div>
                              </a>
                              <a
                                className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover&gt;svg]:text-white truncate inline"
                                href="">
                                <div className="flex gap-2 items-center">
                                  <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                    <svg
                                      fill="none"
                                      viewBox="0 0 80 80"
                                      className="svg-icon !w-5 !h-5">
                                      <title></title>
                                      <path
                                        fill="#fff"
                                        d="M40 0C17.89 0 0 17.89 0 40s17.89 40 40 40 40-17.89 40-40S62.11 0 40 0"></path>
                                      <path
                                        fill="#D5DCEB"
                                        d="M40 68c-16.632-5.012-28-20.356-28-37.716v-9.016L40 12l28 9.268v9.016C68 47.644 56.632 62.96 40 68"></path>
                                      <path
                                        fill="#213743"
                                        d="M40 62.456c-13.804-4.088-23.212-16.52-23.212-30.604v-7.308L40 17.012l23.212 7.532v7.308c0 14.084-9.436 26.516-23.212 30.604"></path>
                                    </svg>
                                  </div>

                                  <span className="truncate text-sm leading-none">
                                    Liang, En Shuo
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="flex justify-end min-[780px]:[grid-area:fixtureScore]  flex-shrink-0 ">
                              <div className="flex justify-items-end font-semibold">
                                <div className="flex font-semibold justify-end">
                                  <div className="flex flex-col justify-between items-center px-[4px] py-[6px] max-[780px]:h-[56px] min-[781px]:h-auto transition-[width] duration-200 ease-in-out ">
                                    <span className="font-normal  align-left size-default text-size-default  variant-subtle  with-icon-space  ">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block text-[14px] text-[#B1BAD3] font-normal leading-[20px] w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          2
                                        </div>
                                      </div>
                                    </span>
                                    <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block text-[14px] text-[#B1BAD3] font-normal leading-[20px] w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          1
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ml-[6px]">
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-subtle  with-icon-space   svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px] text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          6
                                        </div>
                                      </div>
                                    </span>
                                    <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px] text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          2
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="flex flex-col justify-between items-center px-1 max-h-[56px] transition-[width] duration-200 ease-in-out border-2 border-[#557086] rounded min-w-[26px] ml-[6px] bg-[#2f4553]">
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-highlighted  with-icon-space pt-[2px]  svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          0
                                        </div>
                                      </div>
                                    </span>
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-highlighted  with-icon-space pb-[2px]  svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          0
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="self-center hidden min-[780px]:grid whitespace-nowrap overflow-hidden  [grid-area:teams] items-center gap-[6px] max-h-[58px] mt-1">
                            <a
                              className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none inline truncate"
                              href="">
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 96 96"
                                    className="svg-icon w-[14px] h-[14px] m-auto">
                                    <title></title>
                                    <path
                                      fill="#D80027"
                                      d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path>
                                    <path
                                      fill="#FFDA44"
                                      d="m26.269 29.213 4.144 12.75h13.406L32.98 49.856l4.144 12.75-10.856-7.875-10.856 7.875 4.162-12.75-10.856-7.894h13.406zm30.637 45.131-3.169-3.9-4.687 1.819 2.719-4.22-3.169-3.918 4.856 1.294 2.738-4.219.262 5.025 4.875 1.294-4.706 1.8zm6.3-11.438 1.5-4.8L60.6 55.2l5.025-.075 1.481-4.8 1.632 4.762 5.025-.056-4.032 3 1.613 4.763-4.106-2.906zM71.7 35.231l-2.213 4.519 3.6 3.506-4.968-.712-2.213 4.5-.862-4.95-4.988-.713 4.463-2.343-.863-4.97 3.6 3.507zM57.038 21.544l-.375 5.006 4.668 1.894-4.894 1.2-.356 5.025-2.644-4.275-4.893 1.2 3.244-3.844-2.663-4.256 4.669 1.893z"></path>
                                  </svg>
                                </div>

                                <span className="truncate text-sm leading-none">
                                  Ma, Yexin
                                </span>
                              </div>
                            </a>
                            <a
                              className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover&gt;svg]:text-white truncate inline"
                              href="">
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 80 80"
                                    className="svg-icon !w-5 !h-5">
                                    <title></title>
                                    <path
                                      fill="#fff"
                                      d="M40 0C17.89 0 0 17.89 0 40s17.89 40 40 40 40-17.89 40-40S62.11 0 40 0"></path>
                                    <path
                                      fill="#D5DCEB"
                                      d="M40 68c-16.632-5.012-28-20.356-28-37.716v-9.016L40 12l28 9.268v9.016C68 47.644 56.632 62.96 40 68"></path>
                                    <path
                                      fill="#213743"
                                      d="M40 62.456c-13.804-4.088-23.212-16.52-23.212-30.604v-7.308L40 17.012l23.212 7.532v7.308c0 14.084-9.436 26.516-23.212 30.604"></path>
                                  </svg>
                                </div>

                                <span className="truncate text-sm leading-none">
                                  Liang, En Shuo
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="min-[780px]:flex hidden justify-end [grid-area:fixtureScore] flex-shrink-0 mr-2 mt-1 relative right-[3px]">
                            <div className="flex justify-items-end font-semibold">
                              <div className="flex font-semibold justify-end">
                                <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ">
                                  <span className="font-normal  align-left size-default text-size-default  variant-subtle  with-icon-space  ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums text-[14px] text-[#B1BAD3] font-normal leading-[20px] "
                                        data-testid="score-ticker-item">
                                        2
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums text-[14px] text-[#B1BAD3] font-normal leading-[20px] "
                                        data-testid="score-ticker-item">
                                        1
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ml-[6px]">
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px]  text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        6
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px] ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div className="block w-full text-[14px] text-[#B1BAD3] text-center tabular-nums">
                                        2
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex flex-col justify-between items-center p-1 max-h-[56px] min-[1400px]:h-auto transition-[width] duration-200 ease-in-out border-2 border-[#557086] rounded min-w-[22px]  ml-[6px] bg-[#2f4553] w-[10.800px]">
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px] ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        0
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        0
                                      </div>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${style.marketName} w-full px-2 items-center text-center max-[780px]:ml-[0] ml-[113px]`}
                            style={
                              { "--area": "marketName0" } as React.CSSProperties
                            }>
                            <span
                              className="font-normal line-height-default align-center text-[12px] text-[#b1bad3] w-full relative bottom-[2px] right-[7px]"
                              style={{ maxWidth: "100%" }}>
                              Winner
                            </span>
                          </div>
                          <div
                            className="outcomes place-items-center w-full grid gap-2 [grid-area:var(--area)] self-stretch [grid-template-columns:repeat(auto-fit,minmax(50px,1fr))]  h-[58px] mt-[4px] pr-[11.5px] relative right-[3px]"
                            style={
                              { "--area": "outcomes0" } as React.CSSProperties
                            }>
                            <button className="card flex rounded-[3.5px] transition-colors duration-100 justify-center w-full relative text-[0.875rem] text-white items-start min-w-0 px-3 py-2 bg-[#071824] hover:bg-[#082f5a] h-[58px]">
                              <div className=" flex-col  items-start w-full flex self-center justify-start ">
                                <span
                                  data-testid="outcome-button-name"
                                  className="truncate max-w-full text-white">
                                  Ma, Yexin
                                </span>

                                <div className="odds svelte-12alzud">
                                  <div className="relative">
                                    <span className="truncate max-w-full text-[#4391e7]">
                                      1.27
                                    </span>

                                    <div className="arrow-odds align-right svelte-14cjdlp"></div>
                                  </div>
                                </div>
                              </div>
                            </button>
                            <button className="card flex rounded-[3.5px] transition-colors duration-100 justify-center w-full relative text-[0.875rem] text-white items-start min-w-0 px-3 py-2 bg-[#071824] hover:bg-[#082f5a] h-[58px]">
                              <div className=" flex-col  items-start w-full flex self-center justify-start">
                                <span
                                  data-testid="outcome-button-name"
                                  className="truncate max-w-full text-white ">
                                  Liang, En Shuo
                                </span>

                                <div className="odds svelte-12alzud">
                                  <div className="relative">
                                    <span className="truncate max-w-full  text-[#4391e7]">
                                      3.65
                                    </span>

                                    <div className="arrow-odds align-right svelte-14cjdlp"></div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>

                          <div className="justify-self-center [grid-area:marketCount]">
                            <a
                              className="inline-flex max-[780px]:ml-[460px] relative items-center  gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none  top-[2px] right-[3px]"
                              href="">
                              +1
                            </a>
                          </div>
                        </div>

                        <hr className="border-[#2f4553] border-b-2 w-full mt-2" />
                        <div
                          className={` ${style.gridLayout}  pt-[13px]    grid  [grid-template-rows:repeat(3,auto)]  ,minmax(0,1fr))] [grid-template-areas:var(--areas)]   px-4 pb-3  gap-y-1 min-[781px]:pr-6   w-full
                                  items-center
                                  text-gray-200
                                  gap-x-2  rounded-b-[5px]`}>
                          <div className="flex relative z-20 text-sm min-h-[24px] gap-3 [grid-area:misc] items-center ">
                            <div className="flex items-center capitalize  justify-between">
                              <div className="flex gap-2 items-center">
                                <div className="bg-[#E9113C] text-[0.75rem] leading-[18px] font-semibold text-white px-1 rounded-[3px] inline-flex">
                                  Live
                                </div>

                                <span className="leading-none text-[12px] text-[#b1bad3]">
                                  Ended
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-row items-center justify-between gap-3">
                              <div className="inline-flex">
                                <button
                                  type="button"
                                  className="inline-flex relative top-[0.5px] items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none"
                                  data-analytics="sports-stream-button">
                                  <div className=" w-[36px] h-[24px] grid grid-cols-1 grid-rows-1 rounded-[3px] overflow-hidden">
                                    <Image
                                      className=" w-full h-full object-cover col-start-1 col-end-2 row-start-1 row-end-2"
                                      alt="stem"
                                      width={100}
                                      height={100}
                                      src="/livestrem.jpg"
                                    />
                                    <div className="bg-black opacity-30 w-full h-full col-start-1 col-end-2 row-start-1 row-end-2"></div>
                                    <div className="flex items-center justify-center col-start-1 col-end-2 row-start-1 row-end-2 z-10">
                                      <Icon
                                        name={"startPlaying"}
                                        className="w-[14px] h-[14px]"
                                        fill="#fff"
                                      />
                                    </div>
                                  </div>
                                </button>
                              </div>

                              <div className="inline-flex">
                                <button
                                  type="button"
                                  className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                                  <Icon
                                    name={"graph"}
                                    className="w-[14px] h-[14px] hover:fill-white"
                                    fill="#b1bad3"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* for tablet */}
                          <div className="flex w-full justify-between  mt-1 mb-1 col-span-full items-center  min-[780px]:hidden">
                            <div className="self-center grid whitespace-nowrap overflow-hidden gap-2 items-center h-full ">
                              <a
                                className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none inline truncate"
                                href="">
                                <div className="flex gap-2 items-center">
                                  <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                    <svg
                                      fill="none"
                                      viewBox="0 0 96 96"
                                      className="svg-icon w-[14px] h-[14px] m-auto">
                                      <title></title>
                                      <path
                                        fill="#D80027"
                                        d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path>
                                      <path
                                        fill="#FFDA44"
                                        d="m26.269 29.213 4.144 12.75h13.406L32.98 49.856l4.144 12.75-10.856-7.875-10.856 7.875 4.162-12.75-10.856-7.894h13.406zm30.637 45.131-3.169-3.9-4.687 1.819 2.719-4.22-3.169-3.918 4.856 1.294 2.738-4.219.262 5.025 4.875 1.294-4.706 1.8zm6.3-11.438 1.5-4.8L60.6 55.2l5.025-.075 1.481-4.8 1.632 4.762 5.025-.056-4.032 3 1.613 4.763-4.106-2.906zM71.7 35.231l-2.213 4.519 3.6 3.506-4.968-.712-2.213 4.5-.862-4.95-4.988-.713 4.463-2.343-.863-4.97 3.6 3.507zM57.038 21.544l-.375 5.006 4.668 1.894-4.894 1.2-.356 5.025-2.644-4.275-4.893 1.2 3.244-3.844-2.663-4.256 4.669 1.893z"></path>
                                    </svg>
                                  </div>

                                  <span className="truncate text-sm leading-none">
                                    Ma, Yexin
                                  </span>
                                </div>
                              </a>
                              <a
                                className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover&gt;svg]:text-white truncate inline"
                                href="">
                                <div className="flex gap-2 items-center">
                                  <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                    <svg
                                      fill="none"
                                      viewBox="0 0 80 80"
                                      className="svg-icon !w-5 !h-5">
                                      <title></title>
                                      <path
                                        fill="#fff"
                                        d="M40 0C17.89 0 0 17.89 0 40s17.89 40 40 40 40-17.89 40-40S62.11 0 40 0"></path>
                                      <path
                                        fill="#D5DCEB"
                                        d="M40 68c-16.632-5.012-28-20.356-28-37.716v-9.016L40 12l28 9.268v9.016C68 47.644 56.632 62.96 40 68"></path>
                                      <path
                                        fill="#213743"
                                        d="M40 62.456c-13.804-4.088-23.212-16.52-23.212-30.604v-7.308L40 17.012l23.212 7.532v7.308c0 14.084-9.436 26.516-23.212 30.604"></path>
                                    </svg>
                                  </div>

                                  <span className="truncate text-sm leading-none">
                                    Liang, En Shuo
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="flex justify-end min-[780px]:[grid-area:fixtureScore]  flex-shrink-0 ">
                              <div className="flex justify-items-end font-semibold">
                                <div className="flex font-semibold justify-end">
                                  <div className="flex flex-col justify-between items-center px-[4px] py-[6px] max-[780px]:h-[56px] min-[781px]:h-auto transition-[width] duration-200 ease-in-out ">
                                    <span className="font-normal  align-left size-default text-size-default  variant-subtle  with-icon-space  ">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block text-[14px] text-[#B1BAD3] font-normal leading-[20px] w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          2
                                        </div>
                                      </div>
                                    </span>
                                    <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block text-[14px] text-[#B1BAD3] font-normal leading-[20px] w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          1
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ml-[6px]">
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-subtle  with-icon-space   svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px] text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          6
                                        </div>
                                      </div>
                                    </span>
                                    <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px] text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          2
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="flex flex-col justify-between items-center px-1 max-h-[56px] transition-[width] duration-200 ease-in-out border-2 border-[#557086] rounded min-w-[26px] ml-[6px] bg-[#2f4553]">
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-highlighted  with-icon-space pt-[2px]  svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          0
                                        </div>
                                      </div>
                                    </span>
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-highlighted  with-icon-space pb-[2px]  svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          0
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="self-center hidden min-[780px]:grid whitespace-nowrap overflow-hidden  [grid-area:teams] items-center gap-[6px] max-h-[58px] mt-1">
                            <a
                              className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none inline truncate"
                              href="">
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 96 96"
                                    className="svg-icon w-[14px] h-[14px] m-auto">
                                    <title></title>
                                    <path
                                      fill="#D80027"
                                      d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path>
                                    <path
                                      fill="#FFDA44"
                                      d="m26.269 29.213 4.144 12.75h13.406L32.98 49.856l4.144 12.75-10.856-7.875-10.856 7.875 4.162-12.75-10.856-7.894h13.406zm30.637 45.131-3.169-3.9-4.687 1.819 2.719-4.22-3.169-3.918 4.856 1.294 2.738-4.219.262 5.025 4.875 1.294-4.706 1.8zm6.3-11.438 1.5-4.8L60.6 55.2l5.025-.075 1.481-4.8 1.632 4.762 5.025-.056-4.032 3 1.613 4.763-4.106-2.906zM71.7 35.231l-2.213 4.519 3.6 3.506-4.968-.712-2.213 4.5-.862-4.95-4.988-.713 4.463-2.343-.863-4.97 3.6 3.507zM57.038 21.544l-.375 5.006 4.668 1.894-4.894 1.2-.356 5.025-2.644-4.275-4.893 1.2 3.244-3.844-2.663-4.256 4.669 1.893z"></path>
                                  </svg>
                                </div>

                                <span className="truncate text-sm leading-none">
                                  Ma, Yexin
                                </span>
                              </div>
                            </a>
                            <a
                              className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover&gt;svg]:text-white truncate inline"
                              href="">
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 80 80"
                                    className="svg-icon !w-5 !h-5">
                                    <title></title>
                                    <path
                                      fill="#fff"
                                      d="M40 0C17.89 0 0 17.89 0 40s17.89 40 40 40 40-17.89 40-40S62.11 0 40 0"></path>
                                    <path
                                      fill="#D5DCEB"
                                      d="M40 68c-16.632-5.012-28-20.356-28-37.716v-9.016L40 12l28 9.268v9.016C68 47.644 56.632 62.96 40 68"></path>
                                    <path
                                      fill="#213743"
                                      d="M40 62.456c-13.804-4.088-23.212-16.52-23.212-30.604v-7.308L40 17.012l23.212 7.532v7.308c0 14.084-9.436 26.516-23.212 30.604"></path>
                                  </svg>
                                </div>

                                <span className="truncate text-sm leading-none">
                                  Liang, En Shuo
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="min-[780px]:flex hidden justify-end [grid-area:fixtureScore] flex-shrink-0 mr-2 mt-1 relative right-[3px]">
                            <div className="flex justify-items-end font-semibold">
                              <div className="flex font-semibold justify-end">
                                <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ">
                                  <span className="font-normal  align-left size-default text-size-default  variant-subtle  with-icon-space  ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums text-[14px] text-[#B1BAD3] font-normal leading-[20px] "
                                        data-testid="score-ticker-item">
                                        2
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums text-[14px] text-[#B1BAD3] font-normal leading-[20px] "
                                        data-testid="score-ticker-item">
                                        1
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ml-[6px]">
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px]  text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        6
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px] ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div className="block w-full text-[14px] text-[#B1BAD3] text-center tabular-nums">
                                        2
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex flex-col justify-between items-center p-1 max-h-[56px] min-[1400px]:h-auto transition-[width] duration-200 ease-in-out border-2 border-[#557086] rounded min-w-[22px]  ml-[6px] bg-[#2f4553] w-[10.800px]">
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px] ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        0
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        0
                                      </div>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${style.marketName} w-full px-2 items-center text-center max-[780px]:ml-[0] ml-[113px]`}
                            style={
                              { "--area": "marketName0" } as React.CSSProperties
                            }>
                            <span
                              className="font-normal line-height-default align-center text-[12px] text-[#b1bad3] w-full relative bottom-[2px] right-[7px]"
                              style={{ maxWidth: "100%" }}>
                              Winner
                            </span>
                          </div>
                          <div
                            className="outcomes place-items-center w-full grid gap-2 [grid-area:var(--area)] self-stretch [grid-template-columns:repeat(auto-fit,minmax(50px,1fr))]  h-[58px] mt-[4px] pr-[11.5px] relative right-[3px]"
                            style={
                              { "--area": "outcomes0" } as React.CSSProperties
                            }>
                            <button className="card flex rounded-[3.5px] transition-colors duration-100 justify-center w-full relative text-[0.875rem] text-white items-start min-w-0 px-3 py-2 bg-[#071824] hover:bg-[#082f5a] h-[58px]">
                              <div className=" flex-col  items-start w-full flex self-center justify-start ">
                                <span
                                  data-testid="outcome-button-name"
                                  className="truncate max-w-full text-white">
                                  Ma, Yexin
                                </span>

                                <div className="odds svelte-12alzud">
                                  <div className="relative">
                                    <span className="truncate max-w-full text-[#4391e7]">
                                      1.27
                                    </span>

                                    <div className="arrow-odds align-right svelte-14cjdlp"></div>
                                  </div>
                                </div>
                              </div>
                            </button>
                            <button className="card flex rounded-[3.5px] transition-colors duration-100 justify-center w-full relative text-[0.875rem] text-white items-start min-w-0 px-3 py-2 bg-[#071824] hover:bg-[#082f5a] h-[58px]">
                              <div className=" flex-col  items-start w-full flex self-center justify-start">
                                <span
                                  data-testid="outcome-button-name"
                                  className="truncate max-w-full text-white ">
                                  Liang, En Shuo
                                </span>

                                <div className="odds svelte-12alzud">
                                  <div className="relative">
                                    <span className="truncate max-w-full  text-[#4391e7]">
                                      3.65
                                    </span>

                                    <div className="arrow-odds align-right svelte-14cjdlp"></div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>

                          <div className="justify-self-center [grid-area:marketCount]">
                            <a
                              className="inline-flex max-[780px]:ml-[460px] relative items-center  gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none  top-[2px] right-[3px]"
                              href="">
                              +5
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* view all button  */}
      <div className="mt-3 pl-3 flex max-w-[1200] mx-auto w-full">
        <a className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#b1bad3] hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none">
          View All
        </a>
      </div>

      <div className="mt-6 flex flex-col max-w-[1200] mx-auto w-full">
        <div className="pt-4">
          <span className="font-semibold  align-left text-lg flex  items-center ">
            <svg
              fill="currentColor"
              viewBox="0 0 96 96"
              className="h-[18px] w-[18px] fill-[#b1bad3] mr-2">
              <path d="m92.603 40.12-14.92-9.32-.68-17.56-17.4 2.44-11.8-13-11.76 13.04-17.4-2.36-.6 17.56-14.84 9.4 10.84 13.84-5.36 16.72 17.2 3.64 6.68 16.24 15.52-8.24 15.56 8.16 6.56-16.28 17.16-3.72-5.44-16.72 10.76-13.88zM56.163 53.4l5.24 16.12-13.72-9.96-13.72 9.96 5.24-16.12-13.72-9.96h16.92l5.24-16.12 5.24 16.12h16.92l-13.72 9.96z"></path>
            </svg>
            <span className="text-white">Popular Events</span>
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="max-w-[1200] mx-auto w-full ">
          {[3, 4, 5].map((idx) => (
            <div
              key={idx}
              className="mt-3 flex flex-col w-full relative bg-[#213743] shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.12),inset_0_1px_rgba(255,255,255,0.04)] level-2 rounded svelte-b8z685 is-open">
              <button
                onClick={() => {
                  toggle(idx);
                }}
                className={`header z-[4] flex justify-between w-full items-center bg-transparent px-4 py-3 text-[#d5dceb] cursor-pointer ${open[idx] ? "rounded-t-md" : "rounded-md"} rounded `}>
                <div className="flex justify-between gap-2 items-center w-full">
                  <div className="flex justify-between gap-2 items-center w-full md:max-h-[21px] max-[1400px]:h-auto h-[21px]">
                    <div>
                      <span className="font-semibold text-[#d5dceb]  align-left text-sm leading-[21px]">
                        WTA 125K / WTA 125K Changsha, China Women Singles
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Icon
                    name={"ChevronDown"}
                    className={`w-4 h-4 ${open[idx] ? "rotate-180" : "rotate-0"}`}
                    fill="#d5dceb"
                  />
                </div>
              </button>

              {open[idx] && (
                <div className="border-t-2 border-[#2f4553] flex flex-col bg-[#213743]">
                  <div>
                    <div className="max-[780px]:py-3 min-[781px]:py-2 grid items-center justify-stretch  w-full grid-flow-row  stretch">
                      <div className="fixture-wrapper">
                        <div
                          className={` ${style.gridLayout}  pt-1   grid  [grid-template-rows:repeat(3,auto)]  ,minmax(0,1fr))] [grid-template-areas:var(--areas)]   px-4 pb-3  gap-y-1 min-[781px]:pr-6   w-full
                                  items-center
                                  text-gray-200
                                  gap-x-2 `}>
                          <div className="flex relative z-20 text-sm min-h-[24px] gap-3 [grid-area:misc] items-center ">
                            <div className="flex items-center capitalize  justify-between">
                              <div className="flex gap-2 items-center">
                                <div className="bg-[#E9113C] text-[0.75rem] leading-[18px] font-semibold text-white px-1 rounded-[3px] inline-flex">
                                  Live
                                </div>

                                <span className="leading-none text-[12px] text-[#b1bad3]">
                                  Ended
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-row items-center justify-between gap-3">
                              <div className="inline-flex">
                                <button
                                  type="button"
                                  className="inline-flex relative top-[0.5px] items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none"
                                  data-analytics="sports-stream-button">
                                  <div className=" w-[36px] h-[24px] grid grid-cols-1 grid-rows-1 rounded-[3px] overflow-hidden">
                                    <Image
                                      className=" w-full h-full object-cover col-start-1 col-end-2 row-start-1 row-end-2"
                                      alt="stem"
                                      width={100}
                                      height={100}
                                      src="/livestrem.jpg"
                                    />
                                    <div className="bg-black opacity-30 w-full h-full col-start-1 col-end-2 row-start-1 row-end-2"></div>
                                    <div className="flex items-center justify-center col-start-1 col-end-2 row-start-1 row-end-2 z-10">
                                      <Icon
                                        name={"startPlaying"}
                                        className="w-[14px] h-[14px]"
                                        fill="#fff"
                                      />
                                    </div>
                                  </div>
                                </button>
                              </div>

                              <div className="inline-flex">
                                <button
                                  type="button"
                                  className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                                  <Icon
                                    name={"graph"}
                                    className="w-[14px] h-[14px] hover:fill-white"
                                    fill="#b1bad3"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* for tablet */}
                          <div className="flex w-full justify-between  mt-1 mb-1 col-span-full items-center  min-[780px]:hidden">
                            <div className="self-center grid whitespace-nowrap overflow-hidden gap-2 items-center h-full ">
                              <a
                                className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none inline truncate"
                                href="">
                                <div className="flex gap-2 items-center">
                                  <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                    <svg
                                      fill="none"
                                      viewBox="0 0 96 96"
                                      className="svg-icon w-[14px] h-[14px] m-auto">
                                      <title></title>
                                      <path
                                        fill="#D80027"
                                        d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path>
                                      <path
                                        fill="#FFDA44"
                                        d="m26.269 29.213 4.144 12.75h13.406L32.98 49.856l4.144 12.75-10.856-7.875-10.856 7.875 4.162-12.75-10.856-7.894h13.406zm30.637 45.131-3.169-3.9-4.687 1.819 2.719-4.22-3.169-3.918 4.856 1.294 2.738-4.219.262 5.025 4.875 1.294-4.706 1.8zm6.3-11.438 1.5-4.8L60.6 55.2l5.025-.075 1.481-4.8 1.632 4.762 5.025-.056-4.032 3 1.613 4.763-4.106-2.906zM71.7 35.231l-2.213 4.519 3.6 3.506-4.968-.712-2.213 4.5-.862-4.95-4.988-.713 4.463-2.343-.863-4.97 3.6 3.507zM57.038 21.544l-.375 5.006 4.668 1.894-4.894 1.2-.356 5.025-2.644-4.275-4.893 1.2 3.244-3.844-2.663-4.256 4.669 1.893z"></path>
                                    </svg>
                                  </div>

                                  <span className="truncate text-sm leading-none">
                                    Ma, Yexin
                                  </span>
                                </div>
                              </a>
                              <a
                                className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover&gt;svg]:text-white truncate inline"
                                href="">
                                <div className="flex gap-2 items-center">
                                  <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                    <svg
                                      fill="none"
                                      viewBox="0 0 80 80"
                                      className="svg-icon !w-5 !h-5">
                                      <title></title>
                                      <path
                                        fill="#fff"
                                        d="M40 0C17.89 0 0 17.89 0 40s17.89 40 40 40 40-17.89 40-40S62.11 0 40 0"></path>
                                      <path
                                        fill="#D5DCEB"
                                        d="M40 68c-16.632-5.012-28-20.356-28-37.716v-9.016L40 12l28 9.268v9.016C68 47.644 56.632 62.96 40 68"></path>
                                      <path
                                        fill="#213743"
                                        d="M40 62.456c-13.804-4.088-23.212-16.52-23.212-30.604v-7.308L40 17.012l23.212 7.532v7.308c0 14.084-9.436 26.516-23.212 30.604"></path>
                                    </svg>
                                  </div>

                                  <span className="truncate text-sm leading-none">
                                    Liang, En Shuo
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="flex justify-end min-[780px]:[grid-area:fixtureScore]  flex-shrink-0 ">
                              <div className="flex justify-items-end font-semibold">
                                <div className="flex font-semibold justify-end">
                                  <div className="flex flex-col justify-between items-center px-[4px] py-[6px] max-[780px]:h-[56px] min-[781px]:h-auto transition-[width] duration-200 ease-in-out ">
                                    <span className="font-normal  align-left size-default text-size-default  variant-subtle  with-icon-space  ">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block text-[14px] text-[#B1BAD3] font-normal leading-[20px] w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          2
                                        </div>
                                      </div>
                                    </span>
                                    <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block text-[14px] text-[#B1BAD3] font-normal leading-[20px] w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          1
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ml-[6px]">
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-subtle  with-icon-space   svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px] text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          6
                                        </div>
                                      </div>
                                    </span>
                                    <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px] text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          2
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="flex flex-col justify-between items-center px-1 max-h-[56px] transition-[width] duration-200 ease-in-out border-2 border-[#557086] rounded min-w-[26px] ml-[6px] bg-[#2f4553]">
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-highlighted  with-icon-space pt-[2px]  svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          0
                                        </div>
                                      </div>
                                    </span>
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-highlighted  with-icon-space pb-[2px]  svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          0
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="self-center hidden min-[780px]:grid whitespace-nowrap overflow-hidden  [grid-area:teams] items-center gap-[6px] max-h-[58px] mt-1">
                            <a
                              className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none inline truncate"
                              href="">
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 96 96"
                                    className="svg-icon w-[14px] h-[14px] m-auto">
                                    <title></title>
                                    <path
                                      fill="#D80027"
                                      d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path>
                                    <path
                                      fill="#FFDA44"
                                      d="m26.269 29.213 4.144 12.75h13.406L32.98 49.856l4.144 12.75-10.856-7.875-10.856 7.875 4.162-12.75-10.856-7.894h13.406zm30.637 45.131-3.169-3.9-4.687 1.819 2.719-4.22-3.169-3.918 4.856 1.294 2.738-4.219.262 5.025 4.875 1.294-4.706 1.8zm6.3-11.438 1.5-4.8L60.6 55.2l5.025-.075 1.481-4.8 1.632 4.762 5.025-.056-4.032 3 1.613 4.763-4.106-2.906zM71.7 35.231l-2.213 4.519 3.6 3.506-4.968-.712-2.213 4.5-.862-4.95-4.988-.713 4.463-2.343-.863-4.97 3.6 3.507zM57.038 21.544l-.375 5.006 4.668 1.894-4.894 1.2-.356 5.025-2.644-4.275-4.893 1.2 3.244-3.844-2.663-4.256 4.669 1.893z"></path>
                                  </svg>
                                </div>

                                <span className="truncate text-sm leading-none">
                                  Ma, Yexin
                                </span>
                              </div>
                            </a>
                            <a
                              className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover&gt;svg]:text-white truncate inline"
                              href="">
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 80 80"
                                    className="svg-icon !w-5 !h-5">
                                    <title></title>
                                    <path
                                      fill="#fff"
                                      d="M40 0C17.89 0 0 17.89 0 40s17.89 40 40 40 40-17.89 40-40S62.11 0 40 0"></path>
                                    <path
                                      fill="#D5DCEB"
                                      d="M40 68c-16.632-5.012-28-20.356-28-37.716v-9.016L40 12l28 9.268v9.016C68 47.644 56.632 62.96 40 68"></path>
                                    <path
                                      fill="#213743"
                                      d="M40 62.456c-13.804-4.088-23.212-16.52-23.212-30.604v-7.308L40 17.012l23.212 7.532v7.308c0 14.084-9.436 26.516-23.212 30.604"></path>
                                  </svg>
                                </div>

                                <span className="truncate text-sm leading-none">
                                  Liang, En Shuo
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="min-[780px]:flex hidden justify-end [grid-area:fixtureScore] flex-shrink-0 mr-2 mt-1 relative right-[3px]">
                            <div className="flex justify-items-end font-semibold">
                              <div className="flex font-semibold justify-end">
                                <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ">
                                  <span className="font-normal  align-left size-default text-size-default  variant-subtle  with-icon-space  ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums text-[14px] text-[#B1BAD3] font-normal leading-[20px] "
                                        data-testid="score-ticker-item">
                                        2
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums text-[14px] text-[#B1BAD3] font-normal leading-[20px] "
                                        data-testid="score-ticker-item">
                                        1
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ml-[6px]">
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px]  text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        6
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px] ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div className="block w-full text-[14px] text-[#B1BAD3] text-center tabular-nums">
                                        2
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex flex-col justify-between items-center p-1 max-h-[56px] min-[1400px]:h-auto transition-[width] duration-200 ease-in-out border-2 border-[#557086] rounded min-w-[22px]  ml-[6px] bg-[#2f4553] w-[10.800px]">
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px] ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        0
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        0
                                      </div>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${style.marketName} w-full px-2 items-center text-center max-[780px]:ml-[0] ml-[113px]`}
                            style={
                              { "--area": "marketName0" } as React.CSSProperties
                            }>
                            <span
                              className="font-normal line-height-default align-center text-[12px] text-[#b1bad3] w-full relative bottom-[2px] right-[7px]"
                              style={{ maxWidth: "100%" }}>
                              Winner
                            </span>
                          </div>
                          <div
                            className="outcomes place-items-center w-full grid gap-2 [grid-area:var(--area)] self-stretch [grid-template-columns:repeat(auto-fit,minmax(50px,1fr))]  h-[58px] mt-[4px] pr-[11.5px] relative right-[3px]"
                            style={
                              { "--area": "outcomes0" } as React.CSSProperties
                            }>
                            <button className="card flex rounded-[3.5px] transition-colors duration-100 justify-center w-full relative text-[0.875rem] text-white items-start min-w-0 px-3 py-2 bg-[#071824] hover:bg-[#082f5a] h-[58px]">
                              <div className=" flex-col  items-start w-full flex self-center justify-start ">
                                <span
                                  data-testid="outcome-button-name"
                                  className="truncate max-w-full text-white">
                                  Ma, Yexin
                                </span>

                                <div className="odds svelte-12alzud">
                                  <div className="relative">
                                    <span className="truncate max-w-full text-[#4391e7]">
                                      1.27
                                    </span>

                                    <div className="arrow-odds align-right svelte-14cjdlp"></div>
                                  </div>
                                </div>
                              </div>
                            </button>
                            <button className="card flex rounded-[3.5px] transition-colors duration-100 justify-center w-full relative text-[0.875rem] text-white items-start min-w-0 px-3 py-2 bg-[#071824] hover:bg-[#082f5a] h-[58px]">
                              <div className=" flex-col  items-start w-full flex self-center justify-start">
                                <span
                                  data-testid="outcome-button-name"
                                  className="truncate max-w-full text-white ">
                                  Liang, En Shuo
                                </span>

                                <div className="odds svelte-12alzud">
                                  <div className="relative">
                                    <span className="truncate max-w-full  text-[#4391e7]">
                                      3.65
                                    </span>

                                    <div className="arrow-odds align-right svelte-14cjdlp"></div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>

                          <div className="justify-self-center [grid-area:marketCount]">
                            <a
                              className="inline-flex max-[780px]:ml-[460px] relative items-center  gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none  top-[2px] right-[3px]"
                              href="">
                              +1
                            </a>
                          </div>
                        </div>

                        <hr className="border-[#2f4553] border-b-2 w-full mt-2" />
                        <div
                          className={` ${style.gridLayout}  pt-[13px]    grid  [grid-template-rows:repeat(3,auto)]  ,minmax(0,1fr))] [grid-template-areas:var(--areas)]   px-4 pb-3  gap-y-1 min-[781px]:pr-6   w-full
                                  items-center
                                  text-gray-200
                                  gap-x-2 `}>
                          <div className="flex relative z-20 text-sm min-h-[24px] gap-3 [grid-area:misc] items-center ">
                            <div className="flex items-center capitalize  justify-between">
                              <div className="flex gap-2 items-center">
                                <div className="bg-[#E9113C] text-[0.75rem] leading-[18px] font-semibold text-white px-1 rounded-[3px] inline-flex">
                                  Live
                                </div>

                                <span className="leading-none text-[12px] text-[#b1bad3]">
                                  Ended
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-row items-center justify-between gap-3">
                              <div className="inline-flex">
                                <button
                                  type="button"
                                  className="inline-flex relative top-[0.5px] items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none"
                                  data-analytics="sports-stream-button">
                                  <div className=" w-[36px] h-[24px] grid grid-cols-1 grid-rows-1 rounded-[3px] overflow-hidden">
                                    <Image
                                      className=" w-full h-full object-cover col-start-1 col-end-2 row-start-1 row-end-2"
                                      alt="stem"
                                      width={100}
                                      height={100}
                                      src="/livestrem.jpg"
                                    />
                                    <div className="bg-black opacity-30 w-full h-full col-start-1 col-end-2 row-start-1 row-end-2"></div>
                                    <div className="flex items-center justify-center col-start-1 col-end-2 row-start-1 row-end-2 z-10">
                                      <Icon
                                        name={"startPlaying"}
                                        className="w-[14px] h-[14px]"
                                        fill="#fff"
                                      />
                                    </div>
                                  </div>
                                </button>
                              </div>

                              <div className="inline-flex">
                                <button
                                  type="button"
                                  className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                                  <Icon
                                    name={"graph"}
                                    className="w-[14px] h-[14px] hover:fill-white"
                                    fill="#b1bad3"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* for tablet */}
                          <div className="flex w-full justify-between  mt-1 mb-1 col-span-full items-center  min-[780px]:hidden">
                            <div className="self-center grid whitespace-nowrap overflow-hidden gap-2 items-center h-full ">
                              <a
                                className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none inline truncate"
                                href="">
                                <div className="flex gap-2 items-center">
                                  <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                    <svg
                                      fill="none"
                                      viewBox="0 0 96 96"
                                      className="svg-icon w-[14px] h-[14px] m-auto">
                                      <title></title>
                                      <path
                                        fill="#D80027"
                                        d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path>
                                      <path
                                        fill="#FFDA44"
                                        d="m26.269 29.213 4.144 12.75h13.406L32.98 49.856l4.144 12.75-10.856-7.875-10.856 7.875 4.162-12.75-10.856-7.894h13.406zm30.637 45.131-3.169-3.9-4.687 1.819 2.719-4.22-3.169-3.918 4.856 1.294 2.738-4.219.262 5.025 4.875 1.294-4.706 1.8zm6.3-11.438 1.5-4.8L60.6 55.2l5.025-.075 1.481-4.8 1.632 4.762 5.025-.056-4.032 3 1.613 4.763-4.106-2.906zM71.7 35.231l-2.213 4.519 3.6 3.506-4.968-.712-2.213 4.5-.862-4.95-4.988-.713 4.463-2.343-.863-4.97 3.6 3.507zM57.038 21.544l-.375 5.006 4.668 1.894-4.894 1.2-.356 5.025-2.644-4.275-4.893 1.2 3.244-3.844-2.663-4.256 4.669 1.893z"></path>
                                    </svg>
                                  </div>

                                  <span className="truncate text-sm leading-none">
                                    Ma, Yexin
                                  </span>
                                </div>
                              </a>
                              <a
                                className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover&gt;svg]:text-white truncate inline"
                                href="">
                                <div className="flex gap-2 items-center">
                                  <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                    <svg
                                      fill="none"
                                      viewBox="0 0 80 80"
                                      className="svg-icon !w-5 !h-5">
                                      <title></title>
                                      <path
                                        fill="#fff"
                                        d="M40 0C17.89 0 0 17.89 0 40s17.89 40 40 40 40-17.89 40-40S62.11 0 40 0"></path>
                                      <path
                                        fill="#D5DCEB"
                                        d="M40 68c-16.632-5.012-28-20.356-28-37.716v-9.016L40 12l28 9.268v9.016C68 47.644 56.632 62.96 40 68"></path>
                                      <path
                                        fill="#213743"
                                        d="M40 62.456c-13.804-4.088-23.212-16.52-23.212-30.604v-7.308L40 17.012l23.212 7.532v7.308c0 14.084-9.436 26.516-23.212 30.604"></path>
                                    </svg>
                                  </div>

                                  <span className="truncate text-sm leading-none">
                                    Liang, En Shuo
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="flex justify-end min-[780px]:[grid-area:fixtureScore]  flex-shrink-0 ">
                              <div className="flex justify-items-end font-semibold">
                                <div className="flex font-semibold justify-end">
                                  <div className="flex flex-col justify-between items-center px-[4px] py-[6px] max-[780px]:h-[56px] min-[781px]:h-auto transition-[width] duration-200 ease-in-out ">
                                    <span className="font-normal  align-left size-default text-size-default  variant-subtle  with-icon-space  ">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block text-[14px] text-[#B1BAD3] font-normal leading-[20px] w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          2
                                        </div>
                                      </div>
                                    </span>
                                    <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block text-[14px] text-[#B1BAD3] font-normal leading-[20px] w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          1
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ml-[6px]">
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-subtle  with-icon-space   svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px] text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          6
                                        </div>
                                      </div>
                                    </span>
                                    <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px] text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          2
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="flex flex-col justify-between items-center px-1 max-h-[56px] transition-[width] duration-200 ease-in-out border-2 border-[#557086] rounded min-w-[26px] ml-[6px] bg-[#2f4553]">
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-highlighted  with-icon-space pt-[2px]  svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          0
                                        </div>
                                      </div>
                                    </span>
                                    <span className="weight-normal line-height-none align-left size-default text-size-default  variant-highlighted  with-icon-space pb-[2px]  svelte-1f6lug3">
                                      <div
                                        className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                        data-testid="score-ticker">
                                        <div
                                          className="block w-full text-center tabular-nums"
                                          data-testid="score-ticker-item">
                                          0
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="self-center hidden min-[780px]:grid whitespace-nowrap overflow-hidden  [grid-area:teams] items-center gap-[6px] max-h-[58px] mt-1">
                            <a
                              className="relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none inline truncate"
                              href="">
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 96 96"
                                    className="svg-icon w-[14px] h-[14px] m-auto">
                                    <title></title>
                                    <path
                                      fill="#D80027"
                                      d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path>
                                    <path
                                      fill="#FFDA44"
                                      d="m26.269 29.213 4.144 12.75h13.406L32.98 49.856l4.144 12.75-10.856-7.875-10.856 7.875 4.162-12.75-10.856-7.894h13.406zm30.637 45.131-3.169-3.9-4.687 1.819 2.719-4.22-3.169-3.918 4.856 1.294 2.738-4.219.262 5.025 4.875 1.294-4.706 1.8zm6.3-11.438 1.5-4.8L60.6 55.2l5.025-.075 1.481-4.8 1.632 4.762 5.025-.056-4.032 3 1.613 4.763-4.106-2.906zM71.7 35.231l-2.213 4.519 3.6 3.506-4.968-.712-2.213 4.5-.862-4.95-4.988-.713 4.463-2.343-.863-4.97 3.6 3.507zM57.038 21.544l-.375 5.006 4.668 1.894-4.894 1.2-.356 5.025-2.644-4.275-4.893 1.2 3.244-3.844-2.663-4.256 4.669 1.893z"></path>
                                  </svg>
                                </div>

                                <span className="truncate text-sm leading-none">
                                  Ma, Yexin
                                </span>
                              </div>
                            </a>
                            <a
                              className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover&gt;svg]:text-white truncate inline"
                              href="">
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center justify-self-stretch rounded-full w-[20px] h-[20px] shrink-0 overflow-hidden bg-white">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 80 80"
                                    className="svg-icon !w-5 !h-5">
                                    <title></title>
                                    <path
                                      fill="#fff"
                                      d="M40 0C17.89 0 0 17.89 0 40s17.89 40 40 40 40-17.89 40-40S62.11 0 40 0"></path>
                                    <path
                                      fill="#D5DCEB"
                                      d="M40 68c-16.632-5.012-28-20.356-28-37.716v-9.016L40 12l28 9.268v9.016C68 47.644 56.632 62.96 40 68"></path>
                                    <path
                                      fill="#213743"
                                      d="M40 62.456c-13.804-4.088-23.212-16.52-23.212-30.604v-7.308L40 17.012l23.212 7.532v7.308c0 14.084-9.436 26.516-23.212 30.604"></path>
                                  </svg>
                                </div>

                                <span className="truncate text-sm leading-none">
                                  Liang, En Shuo
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="min-[780px]:flex hidden justify-end [grid-area:fixtureScore] flex-shrink-0 mr-2 mt-1 relative right-[3px]">
                            <div className="flex justify-items-end font-semibold">
                              <div className="flex font-semibold justify-end">
                                <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ">
                                  <span className="font-normal  align-left size-default text-size-default  variant-subtle  with-icon-space  ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums text-[14px] text-[#B1BAD3] font-normal leading-[20px] "
                                        data-testid="score-ticker-item">
                                        2
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums text-[14px] text-[#B1BAD3] font-normal leading-[20px] "
                                        data-testid="score-ticker-item">
                                        1
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex flex-col justify-between items-center px-[4px] py-[6px] min-h-[56px] transition-[width] duration-200 ease-in-out ml-[6px]">
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-[14px] text-[#B1BAD3] font-normal leading-[20px]  text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        6
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px] ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div className="block w-full text-[14px] text-[#B1BAD3] text-center tabular-nums">
                                        2
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex flex-col justify-between items-center p-1 max-h-[56px] min-[1400px]:h-auto transition-[width] duration-200 ease-in-out border-2 border-[#557086] rounded min-w-[22px]  ml-[6px] bg-[#2f4553] w-[10.800px]">
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px] ">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        0
                                      </div>
                                    </div>
                                  </span>
                                  <span className="font-normal inline-flex align-left leading-[17px] text-[14px]">
                                    <div
                                      className="inline-block relative overflow-hidden leading-[1.2em] h-[1.2em]"
                                      data-testid="score-ticker">
                                      <div
                                        className="block w-full text-center tabular-nums"
                                        data-testid="score-ticker-item">
                                        0
                                      </div>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${style.marketName} w-full px-2 items-center text-center max-[780px]:ml-[0] ml-[113px]`}
                            style={
                              { "--area": "marketName0" } as React.CSSProperties
                            }>
                            <span
                              className="font-normal line-height-default align-center text-[12px] text-[#b1bad3] w-full relative bottom-[2px] right-[7px]"
                              style={{ maxWidth: "100%" }}>
                              Winner
                            </span>
                          </div>
                          <div
                            className="outcomes place-items-center w-full grid gap-2 [grid-area:var(--area)] self-stretch [grid-template-columns:repeat(auto-fit,minmax(50px,1fr))]  h-[58px] mt-[4px] pr-[11.5px] relative right-[3px]"
                            style={
                              { "--area": "outcomes0" } as React.CSSProperties
                            }>
                            <button className="card flex rounded-[3.5px] transition-colors duration-100 justify-center w-full relative text-[0.875rem] text-white items-start min-w-0 px-3 py-2 bg-[#071824] hover:bg-[#082f5a] h-[58px]">
                              <div className=" flex-col  items-start w-full flex self-center justify-start ">
                                <span
                                  data-testid="outcome-button-name"
                                  className="truncate max-w-full text-white">
                                  Ma, Yexin
                                </span>

                                <div className="odds svelte-12alzud">
                                  <div className="relative">
                                    <span className="truncate max-w-full text-[#4391e7]">
                                      1.27
                                    </span>

                                    <div className="arrow-odds align-right svelte-14cjdlp"></div>
                                  </div>
                                </div>
                              </div>
                            </button>
                            <button className="card flex rounded-[3.5px] transition-colors duration-100 justify-center w-full relative text-[0.875rem] text-white items-start min-w-0 px-3 py-2 bg-[#071824] hover:bg-[#082f5a] h-[58px]">
                              <div className=" flex-col  items-start w-full flex self-center justify-start">
                                <span
                                  data-testid="outcome-button-name"
                                  className="truncate max-w-full text-white ">
                                  Liang, En Shuo
                                </span>

                                <div className="odds svelte-12alzud">
                                  <div className="relative">
                                    <span className="truncate max-w-full  text-[#4391e7]">
                                      3.65
                                    </span>

                                    <div className="arrow-odds align-right svelte-14cjdlp"></div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>

                          <div className="justify-self-center [grid-area:marketCount]">
                            <a
                              className="inline-flex max-[780px]:ml-[460px] relative items-center  gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none  top-[2px] right-[3px]"
                              href="">
                              +1
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
