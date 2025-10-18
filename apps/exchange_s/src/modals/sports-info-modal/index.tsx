import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import React, { ReactNode, useEffect, useState, Fragment } from "react";
import "./info-modal.css";
import { cn } from "@workspace/ui/lib/utils";

type SportsInfoModalProps = {
  children: ReactNode;
  market?: any;
};

const SportsInfoModal = ({ children, market }: SportsInfoModalProps) => {
  const [show, setShow] = useState<string>();

  useEffect(() => {
    //  console.log("Market Data:1234567890poiuytrewq", market);
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
      <DialogContent className="dialog-slide p-0 overflow-hidden !rounded-[5px] !border-0 bg-[#1a2c38] !max-w-[720px] [&>button]:hidden">
        <DialogHeader className="h-[32px] px-4 flex justify-between flex-row bg-[#071824ff]">
          <DialogTitle className="text-sm font-bold flex items-center">
            {show || "Match Odds - Rules"}
          </DialogTitle>
          <DialogClose asChild>
            <span className="text-[#b1bad3] hover:text-white transition !border-0 cursor-pointer leading-[13px] flex justify-center items-center">
              x
            </span>
          </DialogClose>
        </DialogHeader>

        <div className="p-4 pt-0 text-[11px]">
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

export default SportsInfoModal;
