"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useRef, useState } from "react";
const DUserProgress = ({ isNarrow }: { isNarrow: boolean }) => {
  return (
    <>
      {/* <div className="authenticated-wrapper  w-full h-full mr-auto max-w-[390px] flex flex-col justify-center items-start self-center max-[828px]:!h-[176px] max-[768px]:!h-full max-[828px]:flex-row max-[828px]:[align-items:unset] max-[828px]:max-w-[unset]  max-[768px]:mt-[2rem] max-[768px]:mb-[3.5rem] max-[768px]:px-[3vw]  max-[330px]:!h-[176px]"> */}
      <div
        className={`authenticated-wrapper w-full h-full mr-auto max-w-[390px] flex flex-col justify-center items-start self-center max-[768px]:!h-full max-[768px]:mt-[2rem] max-[768px]:mb-[3.5rem] max-[768px]:px-[3vw] max-[330px]:!h-[176px] ${
          isNarrow
            ? "max-[828px]:!h-[176px] max-[828px]:flex-row max-[828px]:[align-items:unset] mx-auto max-[828px]:max-w-[unset]"
            : ""
        }`}
      >
        <div className="flex justify-center rounded overflow-hidden relative w-full max-w-96 p-2 bg-gradient-to-b top-[0.5px]  aspect-video   from-[#213743] to-[#0f212e]">
          <div className="flex flex-col justify-center rounded w-full bg-grey-700 border-[2px] border-[#2F4553] bg-[#0f212e]">
            <div
              className="flex flex-col justify-between px-6 py-5 z-10 h-full"
              style={{ ["--colors-positive" as any]: "#2f4553" }}
            >
              <div className="flex justify-between text-lg font-semibold">
                <span className="relative bottom-[0.5px]">bcs02143189</span>
                <svg
                  fill="none"
                  viewBox="0 0 96 96"
                  className="svg-icon"
                  style={{ width: "1.25rem", height: "1.25rem" }}
                >
                  <path
                    fill="#2F4553"
                    d="m48 14.595 8.49 15.75a13.68 13.68 0 0 0 9.66 7.08L84 40.635l-12.39 12.9a13.9 13.9 0 0 0-3.9 9.63q-.069.96 0 1.92l2.46 17.76-15.66-7.56a15 15 0 0 0-6.51-1.53 15 15 0 0 0-6.6 1.5l-15.57 7.53 2.46-17.76q.051-.93 0-1.86a13.9 13.9 0 0 0-3.9-9.63L12 40.635l17.64-3.21a13.62 13.62 0 0 0 9.84-7.02zm0-12.54a5.22 5.22 0 0 0-4.59 2.73l-11.4 21.45a5.4 5.4 0 0 1-3.66 2.67l-24 4.32A5.25 5.25 0 0 0 0 38.385a5.13 5.13 0 0 0 1.44 3.6l16.83 17.55a5.16 5.16 0 0 1 1.47 3.6q.024.435 0 .87l-3.27 24a3 3 0 0 0 0 .72 5.19 5.19 0 0 0 5.19 5.22h.18a5.1 5.1 0 0 0 2.16-.6l21.39-10.32a6.4 6.4 0 0 1 2.76-.63 6.2 6.2 0 0 1 2.79.66l21 10.32c.69.377 1.464.573 2.25.57h.21a5.22 5.22 0 0 0 5.19-5.19q.024-.375 0-.75l-3.27-24q-.025-.375 0-.75a5 5 0 0 1 1.47-3.57l16.77-17.7a5.19 5.19 0 0 0-2.82-8.7l-24-4.32a5.22 5.22 0 0 1-3.69-2.76l-11.4-21.45a5.22 5.22 0 0 0-4.65-2.7"
                  />
                </svg>
              </div>
              <div className="w-full">
                <div className="w-full relative bottom-[0.5px]">
                  <div className="flex justify-between items-center gap-5 relative top-[5.5px]">
                    <div className="slide transition-transform duration-200 hover:translate-x-2">
                      <button
                        type="button"
                        className="cursor-pointer inline-flex relative items-center gap-2 justify-center rounded-[0.25rem] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white focus-visible:outline"
                        data-analytics="homepage-your-vip-progress"
                        data-testid="homepage-your-vip-progress"
                        data-button-root=""
                      >
                        Your VIP Progress
                        <Icon
                          name={"leftarrow"}
                          className="w-[14] h-[14]"
                          fill="#b1bad3"
                        ></Icon>
                      </button>
                    </div>
                    <span className="flex gap-1 items-center relative top-[1px]">
                      <span className="  font-semibold line-height-default align-left text-sm variant-highlighted numeric tabular-nums with-icon-space">
                        0.00%
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="hoverable cursor-pointer">
                            <span className="weight-semibold line-height-default align-left size-default text-size-default variant-subtle">
                              <Icon
                                name={"questions"}
                                className="w-[14px] h-[14px]"
                                fill="#b1bad3ff"
                              />
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="center"
                          className="z-[9999] w-[352px] h-[72px]"
                        >
                          <p className="text-sx">
                            All settle sports and racing bets contribute to
                            progression at a 390x rate, while Casino bets
                            progress at a 1x rate. Voided bets are excluded.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                  </div>
                  <progress
                    max={100}
                    value={0}
                    role="meter"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={0}
                    className="w-full my-2 overflow-hidden rounded-[10px] h-[0.625em] custom-progress relative top-[5px]"
                  />
                  <div className="flex justify-between w-full relative bottom-[1px]">
                    <div className="miletone-wrap flex items-center gap-[6px]">
                      <svg
                        fill="none"
                        viewBox="0 0 96 96"
                        className="svg-icon relative bottom-[0.5px]"
                      >
                        <path
                          fill="#2F4553"
                          d="m48 14.595 8.49 15.75a13.68 13.68 0 0 0 9.66 7.08L84 40.635l-12.39 12.9a13.9 13.9 0 0 0-3.9 9.63q-.069.96 0 1.92l2.46 17.76-15.66-7.56a15 15 0 0 0-6.51-1.53 15 15 0 0 0-6.6 1.5l-15.57 7.53 2.46-17.76q.051-.93 0-1.86a13.9 13.9 0 0 0-3.9-9.63L12 40.635l17.64-3.21a13.62 13.62 0 0 0 9.84-7.02zm0-12.54a5.22 5.22 0 0 0-4.59 2.73l-11.4 21.45a5.4 5.4 0 0 1-3.66 2.67l-24 4.32A5.25 5.25 0 0 0 0 38.385a5.13 5.13 0 0 0 1.44 3.6l16.83 17.55a5.16 5.16 0 0 1 1.47 3.6q.024.435 0 .87l-3.27 24a3 3 0 0 0 0 .72 5.19 5.19 0 0 0 5.19 5.22h.18a5.1 5.1 0 0 0 2.16-.6l21.39-10.32a6.4 6.4 0 0 1 2.76-.63 6.2 6.2 0 0 1 2.79.66l21 10.32c.69.377 1.464.573 2.25.57h.21a5.22 5.22 0 0 0 5.19-5.19q.024-.375 0-.75l-3.27-24q-.025-.375 0-.75a5 5 0 0 1 1.47-3.57l16.77-17.7a5.19 5.19 0 0 0-2.82-8.7l-24-4.32a5.22 5.22 0 0 1-3.69-2.76l-11.4-21.45a5.22 5.22 0 0 0-4.65-2.7"
                        />
                      </svg>
                      <span className="text-[#b1bad3] text-[14px] font-semibold leading-[120%] text-default text-size-default variant-subtle relative top-[0.5px]">
                        None
                      </span>
                    </div>

                    <div className="miletone-wrap flex items-center gap-[6px]">
                      <svg
                        fill="none"
                        viewBox="0 0 96 96"
                        className="svg-icon relative bottom-[0.5px]"
                      >
                        <path
                          fill="#C69C6D"
                          d="m48.002 14.603 8.48 15.757c1.97 3.693 5.495 6.336 9.677 7.068l.08.012 17.64 3.2L71.48 53.56a13.84 13.84 0 0 0-3.884 9.63q0 .978.132 1.922l-.01-.072 2.44 17.758L54.52 75.24c-1.908-.934-4.15-1.48-6.52-1.48s-4.613.546-6.608 1.518l.09-.039-15.637 7.56 2.438-17.759c.078-.555.123-1.197.123-1.85 0-3.741-1.482-7.137-3.887-9.633l.003.003-12.518-12.92 17.638-3.2a13.64 13.64 0 0 0 9.842-7.008l.036-.072zm0-12.521h-.01a5.2 5.2 0 0 0-4.577 2.733l-.015.027L32 26.28a5.3 5.3 0 0 1-3.648 2.675l-.033.006-23.997 4.32C1.853 33.717 0 35.847 0 38.406a5.2 5.2 0 0 0 1.443 3.596L1.44 42l16.837 17.558a5.06 5.06 0 0 1 1.473 3.578q0 .458-.078.894l.006-.03L16.4 87.997a5.2 5.2 0 0 0 5.148 5.918h.012c.045.003.102.003.156.003.834 0 1.623-.207 2.31-.576l-.027.013 21.397-10.32a6.2 6.2 0 0 1 2.76-.638c1.004 0 1.952.236 2.795.653l-.036-.014 21.08 10.319a4.7 4.7 0 0 0 2.249.56h.033-.003c.051.003.111.003.171.003a5.2 5.2 0 0 0 5.144-5.948l.004.027-3.28-23.998a5.06 5.06 0 0 1 1.4-4.32l16.84-17.557a5.18 5.18 0 0 0 1.448-3.6c0-2.55-1.836-4.67-4.257-5.114l-.033-.006-23.997-4.32a5.3 5.3 0 0 1-3.705-2.768l-.015-.03-11.399-21.44a5.2 5.2 0 0 0-4.593-2.759h-.008z"
                        />
                      </svg>
                      <span className="text-[#b1bad3] text-[14px] font-semibold leading-[120%] text-default text-size-default variant-subtle relative top-[0.5px]">
                        Bronze
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DUserProgress;
