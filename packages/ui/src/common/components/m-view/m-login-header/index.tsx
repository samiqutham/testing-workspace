"use client";
import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";
import React from "react";

type MLoginHeaderProps = {
  onClose: () => void;
};

const MLoginHeader = ({ onClose }: MLoginHeaderProps) => {
  return (
    <div className="flex bg-[#1a2c38] justify-between items-center min-h-[60px] py-0 px-[3vw] md:px-4 md:pb-0.5">
      <div className="h-[35.88px] relative min-[768px]:top-[1.5px] min-[768px]:left-[0.5px]">
        <Link href={"/"} className="text-white" onClick={onClose}>
          <Icon
            name={"logo"}
            className="w-[105px] h-[32.5px] relative top-[0.5px]"
            fill="white"
          />
        </Link>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:text-white focus-visible:outline-white text-xs leading-none p-0  rounded-full cursor-pointer"
      >
        <Icon
          name={"searchcross"}
          className="relative top-[0.7px] !text-[#B1BAD3] hover:!text-white transition-colors"
          height={16}
          width={16}
        ></Icon>
      </button>
    </div>
  );
};

export default MLoginHeader;
