"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import style from "./style.module.css";
import DUserProgress from "../d-user-progress";
import { useAppStore } from "@workspace/ui/store/store";
import { useIsTab } from "@workspace/ui/hooks/use-tab";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import Icon from "@workspace/ui/icons/icons";
import casinoPlay from "@workspace/ui/assets/start-playing/casino-play.webp";
import exchangePlay from "@workspace/ui/assets/start-playing/sports-play.webp";
import {
  casino_sLiveUrl,
  exchange_sLiveUrl,
  sportsbook_sLiveUrl,
} from "@workspace/ui/config/config";

export default function DHeaderWrapper() {
  const isAuthUser = useAppStore((state) => state.isAuthUser);
  const setIsRegisterOpen = useAppStore((state) => state.setIsRegisterOpen);
  const trendingList = useAppStore((state) => state.trendingList);
  const { exchangeTypes } = trendingList;
  const isTablet = useIsTab();

  useEffect(() => {
    const storedValue = localStorage.getItem("registerModal");
    if (storedValue === "true") {
      setIsRegisterOpen(true);
    }
  }, [setIsRegisterOpen]);

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    localStorage.setItem("registerModal", "true");
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    if (!isAuthUser) return; // 👈 only run for auth users
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setIsNarrow(entry.contentRect.width <= 718); // check width
    });

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [isAuthUser]);

  const extraData = {
    Exchange: {
      border: "#FF9401",
      link: exchange_sLiveUrl,
      iconName: "casino",
    },
    Casino: { border: "#22c55e", link: casino_sLiveUrl, iconName: "sports" },
    Sports: {
      border: "#3b82f6",
      link: sportsbook_sLiveUrl,
      iconName: "casino",
    },
  } as any;

  const { open } = useSidebar();
  const filteredTypes = exchangeTypes?.filter(
    (item: any) => item?.name !== "Sports"
  );
  return (
    <div
      className={cn(
        'bg-[url("/wrapper-bg.jpeg")] flex justify-center w-full bg-cover',
        open ? "py-[32.27px]" : "py-[32.87px]",
        isTablet && "pt-[30.87px]",
        isTablet && isAuthUser && "pt-[2.9vw] pb-[30px]",
        isAuthUser && "max-[828px]:!pt-[32px]",
        isAuthUser && "max-[828px]:!pb-[32px]"
      )}
    >
      <div className="px-[3vw] w-full self-center">
        {/* <div className={cn( 'relative w-full mx-auto max-w-[1200px] text-white grid grid-cols-[40%_55%] max-[828px]:grid-cols-[95%_0%]  justify-between items-center',
        isAuthUser && "max-[828px]:grid-cols-[99%_0%]"
        )}> */}
        <div
          ref={wrapperRef}
          className={cn(
            "relative w-full mx-auto max-w-[1200px] text-white grid justify-between items-center",
            "grid-cols-[40%_55%]",
            isAuthUser && isNarrow && "grid-cols-[99%_0%]",
            !isAuthUser && "max-[827px]:grid-cols-[95%_0%]"
          )}
        >
          {/* left */}
          {!isAuthUser && (
            <div className="grid grid-flow-row grid-rows-[1fr_auto] gap-y-3 md:gap-y-8 lg:max-w-[478px] w-full items-center">
              {/* title , register */}
              <div>
                <div
                  className={cn(
                    "sm:px-24 md:px-0 lg:pr-20 relative top-[1px] max1200:top-[1.5px]"
                  )}
                >
                  <h1
                    className={cn(
                      "font-bold block  align-left size-3xl text-[2rem] -translate-y-[1px] cursor-default max-[805px]:text-center max-[805px]:relative max-[805px]:left-[37px] max-[805px]:top-[0.5px]",
                      open
                        ? "mt-[1px] leading-[120%]"
                        : "mt-[0.5px] leading-[120%]"
                    )}
                  >
                    World's Largest Online Exchange and Casino
                  </h1>
                </div>
                <button
                  onClick={() => openRegisterModal()}
                  className="signup cursor-pointer mt-[16.5px] relative top-0.5 flex justify-center items-center text-white whitespace-nowrap font-semibold leading-none px-5 py-[15px] w-auto text-[14px] rounded bg-[#1475e1] border-0 -translate-y-[2px] transition  hover:bg-[#105EB4] transform duration-100 shadow-md max-[805px]:mt-[17px]"
                >
                  <span>Register</span>
                </button>
              </div>
              {/* sign up options */}
              <div className="h-full w-full flex flex-col justify-end md:items-start relative top-0.5 -translate-y-[2px]">
                <div className="mb-2">
                  <p className="font-bold align-left text-[#b1bad3ff] text-[12px] cursor-default">
                    Or sign up with
                  </p>
                </div>

                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    className="bg-[#2f4553] border-0 rounded h-[44px]  text-white hover:bg-[#557086]  p-3 flex items-center justify-center flex-1 cursor-pointer"
                  >
                    <Icon
                      name={"facebook"}
                      width={20}
                      height={20}
                      fill="white"
                      className=" !w-5 !h-5"
                    ></Icon>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-[#2f4553] border-0 rounded h-[44px]  text-white hover:bg-[#557086]  p-3  flex items-center justify-center flex-1 cursor-pointer"
                  >
                    <Icon
                      name={"googleIcon"}
                      width={20}
                      height={20}
                      fill="white"
                      className=" !w-5 !h-5"
                    ></Icon>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-[#2f4553] border-0 rounded h-[44px]  text-white hover:bg-[#557086]  p-3  flex items-center justify-center flex-1 cursor-pointer"
                  >
                    <Icon
                      name={"whatsapp"}
                      width={20}
                      height={20}
                      fill="white"
                      className=" !w-5 !h-5"
                    ></Icon>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-[#2f4553] border-0 rounded h-[44px]  text-white hover:bg-[#557086]  p-3  flex items-center justify-center flex-1 cursor-pointer"
                  >
                    <Icon
                      name={"apple"}
                      width={20}
                      height={20}
                      fill="white"
                      className=" !w-5 !h-5 !fill-white hover:!fill-white"
                    ></Icon>
                  </Button>
                </div>
              </div>
            </div>
          )}
          {isAuthUser && <DUserProgress isNarrow={isNarrow} />}
          {/* right cards */}
          <div className="flex gap-1.5 md:gap-4 xl:gap-2.5 justify-start overflow-x-auto flex-nowrap scroll-width-none pt-2">
            {filteredTypes?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/2 md:w-[48%] xl:w-[47%]" // 👈 har card half width lega (2 per row)
              >
                <div className="flex flex-col p-0.5 rounded-[4px] transition-transform cursor-pointer duration-300 ease-out hover:-translate-y-2">
                  <a
                    href={extraData[item?.name]?.link}
                    className="inline-flex relative items-center gap-2 justify-center overflow-hidden rounded-[4px]"
                  >
                    <div className="w-full overflow-hidden">
                      <div
                        className={cn(
                          "flex-1 border-2 border-b-0 rounded-t-[4px] overflow-hidden",
                          item?.name === "Fantasy" && style.fantasyGradient
                        )}
                        style={{
                          borderColor: extraData[item?.name]?.border,
                        }}
                      >
                        <Image
                          // src={item?.name === "Casino" ? casinoPlay : item?.image}
                          src={
                            item?.name === "Casino"
                              ? casinoPlay
                              : item?.name === "Exchange"
                              ? exchangePlay
                              : item?.image
                          }
                          alt={item?.name}
                          width={1000}
                          height={1000}
                          priority
                          className="w-full h-auto object-cover"
                          style={{
                            aspectRatio: "1.52174 / 1", // 👈 height auto adjust karega
                          }}
                        />
                      </div>
                      <div className="py-3 px-4 text-left bg-[#213743]">
                        <div className="flex justify-between items-center gap-1.5 h-[18px] leading-[18px]">
                          <span className="font-bold flex items-center gap-2 w-full">
                            <span className="hidden md:flex items-center">
                              <Icon
                                name={extraData[item?.name]?.iconName}
                                width={20}
                                height={20}
                                fill="#b1bad3ff"
                                className="!w-[14px] !h-[14px]"
                              />
                            </span>
                            {item?.name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <div className="bg-green-400 w-1.5 h-1.5 rounded-full"></div>
                            <span className="font-semibold text-sm">
                              49,914
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
