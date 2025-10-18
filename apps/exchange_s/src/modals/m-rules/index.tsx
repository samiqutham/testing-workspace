"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";

const MRules = ({
  children,
  market,
}: {
  children: React.ReactNode;
  market?: any;
}) => {
  const [show, setShow] = useState<string>();
  useEffect(() => {
    if (!!show) {
      setShow("");
    }
    if (market?.length === 1) {
      setShow(market[0]?.marketName);
    }
  }, [market]);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showOverlay={false}
        className="p-0 overflow-hidden overflow-y-auto h-[calc(100dvh-58px)] min-[500px]:!min-w-[100vw] bg-[#1A2C38] top-0 left-0 translate-x-[0%] translate-y-[0%] !gap-0 !border-0 !max-w-lg !rounded-none shadow-lg [&>button]:hidden  "
      >
        <DialogHeader className="flex !flex-row  max-h-[44px]  justify-between items-center bg-[#071824] text-white px-3 ">
          <DialogTitle className="font-bold text-sm">Rules</DialogTitle>
          <DialogClose asChild>
            <button className="text-xl leading-none cursor-pointer">
              <Icon name={"close"} className="w-5 h-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div
          className={`flex-1 overflow-y-auto absolute top-[44px] w-full left-0 right-0`}
        >
          {market?.map((rules: any, idx: number) => (
            <Fragment key={idx}>
              <div
                onClick={() =>
                  setShow((ele) =>
                    ele !== rules?.marketName ? rules?.marketName : ""
                  )
                }
                className="bg-[#213743] text-white px-3 py-2 gap-3 text-[12px] flex  items-center"
              >
                <div
                  className={cn(
                    `h-[10px] w-[6px] bg-[url('@workspace/ui/assets/sprite/icons.svg')] bg-[length:708px_672 px] bg-no-repeat bg-[-686px_-526px] ${show === rules?.marketName ? "rotate-[270deg]" : " rotate-90"}`
                  )}
                />
                <span>{rules?.marketName}</span>
              </div>

              {show === rules?.marketName && (
                <div
                  className="p-[10px] text-[13px] text-white bg-[#1A2C38] !leading-[14px]"
                  dangerouslySetInnerHTML={{
                    __html: rules?.description?.rules,
                  }}
                ></div>
              )}
            </Fragment>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MRules;
