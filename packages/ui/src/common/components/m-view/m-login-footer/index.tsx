"use client";
import Icon from "@workspace/ui/icons/icons";
import React from "react";

const MLoginFooter = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 touch-auto">
      <div className="max-w-[200px] w-full flex items-center touch-auto before:content-[''] before:inline-flex before:h-[1px] before:bg-[#2f4553] before:flex-1 after:content-[''] after:inline-flex after:h-[1px] after:bg-[#2f4553] after:flex-1">
        <span className="text-[#b1bad3] text-center justify-center text-sm px-2 inline-flex items-center font-normal">
          OR
        </span>
      </div>

      <div className="flex gap-4 justify-center touch-auto">
        <button
          type="button"
          className="inline-flex bg-[rgb(47,69,83)] hover:bg-[rgba(85,112,134)] relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem] cursor-pointer"
        >
          <Icon
            name={"facebook"}
            width={14}
            height={14}
            fill="white"
            className="!w-3.5 !h-3.5"
          ></Icon>
        </button>

        <button
          type="button"
          className="inline-flex bg-[rgb(47,69,83)] hover:bg-[rgba(85,112,134)] relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem] cursor-pointer"
        >
          <Icon
            name={"googleIcon"}
            width={14}
            height={14}
            fill="white"
            className="!w-3.5 !h-3.5"
          ></Icon>
        </button>

        <button
          type="button"
          className="inline-flex bg-[rgb(47,69,83)] hover:bg-[rgba(85,112,134)] relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem] cursor-pointer"
        >
          <Icon
            name={"whatsapp"}
            width={14}
            height={14}
            fill="white"
            className="!w-3.5 !h-3.5"
          ></Icon>
        </button>

        <button
          type="button"
          className="inline-flex bg-[rgb(47,69,83)] hover:bg-[rgba(85,112,134)] relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem] cursor-pointer"
        >
          <Icon
            name={"apple"}
            width={14}
            height={14}
            fill="white"
            className="!w-3.5 !h-3.5"
          ></Icon>
        </button>
      </div>
    </div>
  );
};

export default MLoginFooter;
