
import Icon from "@workspace/ui/icons/icons";
import { useAppStore } from "@workspace/ui/store/store";
import React, { useEffect } from "react";

export default function VerificationNotice({
  onClose,
  isClosing = false,
}: {
  onClose: () => void;
  isClosing: boolean;
}) {
  const isAuthUser = useAppStore((state:any) => state.isAuthUser);
  useEffect(() => {}, [isAuthUser]);
  if (!isAuthUser) return null;
  const handleClose = () => {
    onClose?.();
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-200 ease-in-out: ${
        isClosing
          ? "max-h-0 opacity-0"
          : "max-h-[200px] opacity-100 min-h-[60px]"
      }`}
    >
      <div className="flex items-center justify-between bg-[#071824ff] pr-[6px] w-full min-h-[60px]">
        <div className="w-full flex justify-center py-4 pl-8 pr-0 text-wrap cursor-default">
          <span className="text-[#b1bad3ff] leading-[21px] text-sm font-semibold text-left">
            Withdrawal Only Mode - Please submit Level 2 verification to
            activate Deposit and Buy Crypto functions.
          </span>
        </div>

        {/* Close icon  */}
        <button
          type="button"
          onClick={handleClose}
          className="inline-flex relative cursor-pointer items-center gap-2 justify-center font-semibold transition active:scale-[0.98] bg-transparent text-white hover:text-white focus:outline-none text-sm leading-none py-[0.9375rem] px-[1.25rem] rounded-full"
        >
          <Icon
            name={"searchcross"}
            width={14}
            height={14}
            fill="#B1BAD3"
            className="transition-transform duration-300 hover:fill-white"
          />
        </button>
      </div>
    </div>
  );
}
