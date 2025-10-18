"use client";
import responsible from "@workspace/ui/assets/responsible-gambling/responsible-gambling-deposit-limit-en.svg";
import DepositLimit from "@workspace/ui/common/modal/responsible-gambling-modals/DepositLimit";
import { useState } from "react";

export default function DDepositLimit() {
      const [isDepositLimit, setIsDepositLimit] = useState<any>(false);
  
  return (<>
    <div>   <div className="overflow-hidden  rounded-lg mb-5">
            <img className="object-cover w-full h-[136px] " src={responsible.src} />
          </div>
    <div className="bg-[#1A2C38] p-6 rounded-[8px] border border-[#304553] text-[#D5DCEB]">
   
      {/* Heading */}
      <h2 className="text-xl font-bold mb-4">Set Your Deposit Limits</h2>

      {/* Description */}
      <p className="mb-3 text-[16px] leading-relaxed">
        Stay in control by setting a deposit limit—the maximum amount you can
        add to your account within a set time period. For example, if you set a
        daily limit and make your deposit at 2:45 PM, your limit will reset at
        2:45 PM the next day.
      </p>
      <p className="mb-3 text-[16px] leading-relaxed">
        If you deposit more than your limit, the extra amount will be withheld
        and only released when your limit resets.
      </p>
      <p className="mb-6 text-[16px] leading-relaxed">
        To increase or remove your limit, a 24-hour waiting period applies
        before the change takes effect. Learn more in{" "}
        <span className="font-semibold text-white cursor-pointer hover:underline">
          Stake Smart.
        </span>
      </p>

      {/* Header + Button */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-[20px] text-white">
          Your Deposit Limits
        </h3>
        <button     onClick={() => setIsDepositLimit(true)} className="bg-[#1375E1] cursor-pointer active:scale-[.98] text-white px-4 py-2 rounded-lg font-medium transition hover:bg-[#105eb4]">
          Add Limit
        </button>
      </div>

      {/* Table Header */}
      <div className="flex justify-between text-[16px] font-semibold text-[#B1BAD3]  mb-2">
        <div className="flex-1 p-4">Amount</div>
        <div className="flex-3 p-4">Progress</div>
        <div className="flex-1 p-4">Period</div>
        <div className="flex-1 p-4">Resets at</div>
        <div className="flex-1 p-4 flex items-center gap-1 justify-end">
          Withholding
          <svg
            data-ds-icon="Info"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="inline-block  shrink-0"
          >
            <path
              fill="currentColor"
              d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10v2l3.54-2.66C19.31 18.91 22 15.27 22 11c0-5.52-4.48-10-10-10m-.5 3c.83 0 1.5.67 1.5 1.5S12.33 7 11.5 7 10 6.33 10 5.5 10.67 4 11.5 4M15 17H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-5H9c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1v6h2c.55 0 1 .45 1 1s-.45 1-1 1"
            ></path>
          </svg>
        </div>
      </div>

      {/* Empty Row */}
      <div className="bg-[#213743] text-[#B1BAD3] px-4 py-4 rounded-lg text-[16px]">
        You have no limits set
      </div>
    </div></div>
      {isDepositLimit && (
        <DepositLimit
          open={isDepositLimit}
          onClose={() => setIsDepositLimit(false)}
        />
      )}</>
  );
}
