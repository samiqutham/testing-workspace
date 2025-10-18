"use client";
import { useState } from "react";
import responsible from "@workspace/ui/assets/responsible-gambling/responsible-gambling-limits-en.svg";
import Icon from "@workspace/ui/icons/icons";

export default function DGamblingLimit() {
  const [value, setValue] = useState("0.00");

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    if (val === "") {
      setError(
        "amount must be a `number` type, but the final value was: `NaN`."
      );
    } else {
      setError("");
    }
  };
  const handleLimitBlur = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    let num = parseFloat(value);

    if (!value || value.trim() === "" || isNaN(num)) {
      setter("0.00");
      setError(null);
      return;
    }

    setter(num.toFixed(2));
    setError(null);
  };

  return (
    <div>  <div className="overflow-hidden mb-5 rounded-lg">
      <img className="object-cover w-full h-[136px]" src={responsible.src} />
    </div>

      <div className=" mx-auto bg-[#1A2C38] text-white rounded-[8px] border-[1px] border-[#2E4351]  space-y-6">
        {/* Heading */}
        <div className="px-[24px] pt-[32px] mb-4">
          <h2 className="text-xl font-bold mb-4">Set Your Gambling Limits</h2>
          <p className="text-[#D5DCEB] ">
            Gain control over your play or betting by using loss or wagering
            limits. These limits allow you to control the maximum loss or wagered
            amount over a daily, weekly or monthly period. Your limit will apply
            immediately and will reset when that time is reached. E.g. If you set
            a $100 daily loss limit at 2pm today, the limit will reset at 2pm
            tomorrow. Any changes to remove your limits requires a 24-hour cool
            off period.
          </p>
          <p className="text-[#D5DCEB] mt-4">
            Further information and details about the limits can be found in{" "}
            <span className="font-semibold text-white">Stake Smart.</span>
          </p>
        </div>
        <div className="px-6 mb-4">
          <hr className="border-[#2E4351]" />
        </div>

        {/* Form */}
        <form className="space-y-[18px] ">
          {/* Limit Type */}
          <div className="w-full px-6 ">
            <label className="block text-[14px] font-semibold text-[#b1bad3] mb-1">Limit Type</label>
            <div className="relative">
              <select className="w-full appearance-none text-white bg-[#0E212E] hover:border-[#567086] active:border-[#567086]  border-[2px] border-[#2E4351] rounded-lg pl-2 py-2 pr-10 focus:outline-none ">
                <option>Loss</option>
                <option>Wager</option>
              </select>

              {/* Custom Chevron Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <Icon name={"gamblinglimit"} />
              </div>
            </div>
          </div>

          {/* Limit Amount */}
          <div className="px-6">
            <label className="flex justify-between text-[14px] font-semibold text-[#b1bad3] mb-1">
              <div className="flex">
                {" "}
                Limit Amount <div className="text-red-500 pl-1">*</div>
              </div>
              <div className="text-[#D5DCEB] text-[12px] font-semibold">
                ${value}
              </div>
            </label>
            <div className="flex hover:border-[#567086] active:border-[#567086]  items-center bg-[#0E212E] border-[2px] mt-[6px] border-[#2E4351] rounded-lg overflow-hidden">
              <input
                type="number"
                value={value}
                onChange={handleChange}
                onBlur={() => handleLimitBlur(value, setValue, setError)}
                className="flex-1 bg-transparent pl-2 py-2 text-white placeholder:text-white focus:outline-none"
              />
              <div className="px-[10px] pb-[4px] text-green-400 text-lg font-bold">
                <Icon name={"gamblingcoin"} />
              </div>
            </div>
            {error && (
              <p className="text-[#F26F8A] text-sm mt-1">
                <Icon name={"gamblingValidation"} />
                {error}
              </p>
            )}

            {/* Limit Period */}
            <div className="w-full mt-[18px]">
              <label className="block mb-[2px] text-[14px] font-semibold text-[#b1bad3]">Limit Period</label>

              <div className="relative ">
                <select className="w-full hover:border-[#567086] active:border-[#567086]  appearance-none text-white bg-[#0E212E] border-[2px] border-[#2E4351] rounded-lg px-2 py-2 pr-10 focus:outline-none ">
                  <option>Day</option>
                  <option>Week</option>

                  <option>Month</option>
                </select>

                {/* Custom Chevron Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <Icon name={"gamblinglimit"} />
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-between text-[#D5DCEB] p-4 mt-4 text-[16px] border-t border-[#304553]">
            <p className="">
              Please allow up to 30 seconds for update to take effect.
            </p>

            <button
              type="button"

              className="bg-[#1475e1] active:scale-[.98]  transition-colors text-white font-semibold px-5 py-[10px] rounded-[8px]"
            >
              Add Limit
            </button>
          </div>
        </form>
      </div></div>
  );
}
