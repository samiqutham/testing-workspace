"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";
import { useState } from "react";

const DepositLimit = ({ open, onClose }: any) => {
  const [value, setValue] = useState("0");

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    if (val === "") {
      setError(
        'limitAmount must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
      );
    } else {
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="p-0 min-w-[200px] !max-w-[500px] w-[95%] border-0 bg-[#1a2c38] rounded-[8px] text-white font-sans shadow-lg !gap-0
      [&>button]:mt-[6px] animate-modal-popover"
      >
        <DialogHeader className="flex !flex-row h-[60px] justify-between items-center !bg-[#1A2C38] text-white !p-4 !border-none rounded-[8px] !outline-none !shahdow-none">
          <DialogTitle className="font-bold text-[18px] leading-[28px] !min-h-[28px] flex items-center gap-2">
            <div className="text-[18px] font-bold font-[proxima-nova] relative flex items-center">
              <Icon name={"clockicon"} className="text-[#B1BAD3] mr-2" /> Add
              Limit
            </div>
          </DialogTitle>
          <DialogClose asChild>
            <button className="text-xl leading-none cursor-pointer outline-0">
              <Icon
                name={"closeIcon"}
                className="w-5 h-5 hover:fill-[white]"
                fill="#b1bad3"
              />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col flex-1 relative !font-[proxima-nova]">
          <div className="flex flex-col px-4 pb-4 gap-2">
            <div className="text-[14px] text-[#B1BAD3] font-semibold">
              {" "}
              Limit Period
            </div>
            <div className="flex items-center bg-[#304553] border border-[#2E4351] rounded-md overflow-hidden">
              <input
                type="text"
                step="0.01"
                value={"Daily"}
                readOnly
                className="flex-1 bg-transparent px-2 py-2 text-white focus:outline-none"
              />
              <div className="px-2 text-green-400 font-bold">
                {" "}
                {/* <Icon name={"gamblingcoin"} /> */}
              </div>
            </div>

            <div className="">
              <label className="flex justify-between  text-[#D5DCEB] mb-1">
                <div className="flex text-[14px] font-semibold">
                  {" "}
                  Limit Amount <div className="text-red-500 pl-1">*</div>
                </div>
              </label>
              <div
                className={`flex items-center bg-[#0E212E] border-[2px] rounded-lg overflow-hidden
    ${error ? "border-[#ED4263]" : "border-[#2E4351]"}
    active:border-[#567086] hover:border-[#567086]`}
              >
                <input
                  type="number"
                  value={value}
                  onChange={handleChange}
                  className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-white focus:outline-none"
                />
                <div className="px-4 text-green-400 text-lg font-bold">
                  <Icon name={"gamblingcoin"} />
                </div>
              </div>
              {error && (
                <p className="text-[#F26F8A] text-sm mt-1">
                  <Icon name={"gamblingValidation"} />
                  {error}
                </p>
              )}
            </div>
            <span className="w-full mt-4 text-[16px] leading-[24px] text-[#B1BAD3]">
              Please allow for up to 30 seconds for the update to take effect.
            </span>
            <button
              type="button"
              className="inline-flex relative items-center gap-2 justify-center text-white whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50  mt-4   active:scale-[0.98] bg-[#1375E1] text-neutral-black  shadow-md py-[0.875rem] px-[1.75rem] min-w-[12ch] cursor-pointer rounded-[8px] font-[600] leading-5 text-black text-[14px] h-[49px]"
            >
              <div className="contents relative top-[1px]">Add Limit</div>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositLimit;
