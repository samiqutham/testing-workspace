"use client";
import responsible from "@workspace/ui/assets/responsible-gambling/self-exclution.svg";
import BreakInPlay from "@workspace/ui/common/modal/responsible-gambling-modals/BreakInPlay";
import SelfExclusion from "@workspace/ui/common/modal/responsible-gambling-modals/SelfExclusion";
import { useState } from "react";

export default function DSelfExclusion() {
  const [isSelfExclusionOpen, setIsSelfExclusionOpen] = useState<any>(false);
  const [isBreakInPlay, setIsBreakInPlay] = useState<any>(false);
  return (
    <>
      <div>
        <div className="overflow-hidden rounded-lg">
          <img className="object-cover w-full h-[136px]" src={responsible.src} />
        </div>

        {" "}
        <div className=" mx-auto bg-[#1A2C38] mt-5 text-white rounded-[8px] border border-slate-700 ">
          <h2 className="text-xl font-bold px-6 pt-[32px]">Break In Play</h2>

          <p className="text-[#D5DCEB] px-6 mt-[20px] leading-relaxed">
            If you want to take a short break from betting and gaming with us, you
            can do so by taking a Time-Out for a period of 24 hours, 48 hours, 7
            days, 30 days, 2 months, 3 months. Once you begin your Time-Out, you
            will not be able to use your account for betting and gaming, although
            you will still be able to log in to withdraw any remaining balance. It
            will not be possible to reactivate your account until your chosen
            period has ended.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-700 mt-5 p-4">
            <p className="text-[#D5DCEB] mb-4 sm:mb-0">
              Learn more about{" "}
              <span className="font-semibold text-white">Break In Play</span>
            </p>
            <button
            onClick={() => setIsBreakInPlay(true)}
            className="bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg px-5 py-[10px] font-semibold">
              Request Break In Play
            </button>
          </div>
        </div>
        <div className=" mx-auto bg-[#1A2C38] text-white mt-[32px] rounded-[8px] border border-slate-700 ">
          <h2 className="text-xl font-bold px-6 pt-[32px]">Self Exclusion</h2>

          <p className="text-[#D5DCEB] px-6 mt-[20px] leading-relaxed">
            If you feel you are at risk of developing a gambling problem or
            believe you currently have a gambling problem, please consider using
            Self-Exclusion which prevents you gambling with Stake for a specified
            period of 6 months, 1 year, 2 years, 3 years, 4 years, 5 years, 10
            years or indefinitely. If you want to stop playing for other reasons,
            please consider a Time-Out or using Account Closure.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-700 mt-5 p-4">
            <p className="text-[#D5DCEB] mb-4 sm:mb-0">
              Learn more about{" "}
              <span className="font-semibold text-white">Self Exclusion</span>
            </p>
            <button
            onClick={() => setIsSelfExclusionOpen(true)}
            className="bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg px-5 py-[10px] font-semibold">
              Request Self Exclusion
            </button>
          </div>
        </div>
      </div>


      {isSelfExclusionOpen && (
        <SelfExclusion
          open={isSelfExclusionOpen}
          onClose={() => setIsSelfExclusionOpen(false)}
        />
      )}
      {isBreakInPlay && (
        <BreakInPlay
          open={isBreakInPlay}
          onClose={() => setIsBreakInPlay(false)}
        />
      )}
    </>

  );
}
