import MPickMeeting from "@exchange_s/modals/m-pick-meeting";
import { cn } from "@workspace/ui/lib/utils";
import React from "react";

export default function MHorseRacingDetails() {
  return (
    <>
      <div className="h-[87px]">
        <div className="bg-[#071824] w-full z-[4] block">
          <div className="flex border-b border-[#304553] p-2">
            <button className="bg-[#2F4553] px-[10px] rounded-[2px] text-[#303030] font-bold text-[12px] font-sans min-w-0 w-full h-[26px] touch-manipulation appearance-button normal-case overflow-visible m-0 border-0">
              <span className="flex justify-between items-center">
                <span className="truncate"></span>
                <MPickMeeting>
                  <span className="ml-[5px] bg-no-repeat w-[10px] h-[10px] bg-[url('@workspace/ui/assets/sprite/hamburger.png')] bg-[-95px_-36px] invert brightness-0"></span>
                </MPickMeeting>
              </span>
            </button>
          </div>
          <div className="flex">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <button className="h-[42px] w-[44px] shrink-0 !flex !justify-center !items-center">
                  <div
                    className={cn(
                      " bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[-58px_-802px] bg-no-repeat rotate-90 w-4 h-4 align-middle"
                    )}
                  />
                </button>
                <div className="flex items-center justify-center w-full min-w-0">
                  <div className="flex flex-col items-start w-full">
                    <div className="flex text-white font-bold text-[14px]">
                      <span></span>
                    </div>
                    <div className="block text-[#dcdcdc] text-[13px] font-sans">
                      <h1 className="inline"></h1>
                    </div>
                  </div>
                </div>
                <button className="h-[42px] w-[44px] shrink-0 !flex !items-center !justify-center">
                  <div
                    className={cn(
                      " bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[-58px_-802px] bg-no-repeat rotate-[-90deg] w-4 h-4 align-middle"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center h-[40px] mt-[2px] px-[12px] bg-[#2F4553] text-white mb-[5px]">
          <div className="mr-2 w-7 h-7 bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-no-repeat  bg-[-29px_-547px]"></div>
          <span className="flex flex-col flex-grow flex-shrink self-center text-[12px]">
            <span className="font-bold text-[12px]">
              {" "}
              Live Video is available
            </span>
            <span className="text-[11px]">Please login</span>
          </span>
        </div>
      </div>
    </>
  );
}
