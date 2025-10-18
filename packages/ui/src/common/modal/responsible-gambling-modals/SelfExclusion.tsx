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

const SelfExclusion = ({ open, onClose }: any) => {
    const [nextModal, setNextModal] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent showCloseButton={false}
                className="p-0 min-w-[200px] !max-w-[500px] w-[95%] border-0 bg-[#1a2c38] rounded-[8px] text-white font-sans shadow-lg !gap-0
      [&>button]:mt-[6px] animate-modal-popover">
                <DialogHeader className="flex !flex-row h-[60px] justify-between items-center !bg-[#1A2C38] text-white !p-4 !border-none rounded-[8px] !outline-none !shahdow-none">
                    <DialogTitle className="font-bold text-[18px] leading-[28px] !min-h-[28px] flex items-center gap-2">
                        <div className="text-[18px] font-bold font-[proxima-nova] relative -top-px">Self Exclusion</div>
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


                {nextModal ? (
                    <div className="flex flex-col flex-1 relative !font-[proxima-nova]">
                        <div className="flex flex-col px-4 pb-4 gap-4">
                            <div className="flex w-full flex-col justify-center">

                                <span className="w-full text-[16px] leading-[24px] text-[#D5DCEB]">
                                    Are you sure you want to self exclude yourself from stake.com? Any decision made here is final and irreversible. By confirming your exclusion, you will not be able to play on stake.com.

                                </span>

                                <button type="button"
                                    className="inline-flex relative items-center gap-2 justify-center whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 mt-4  focus-visible:outline-offset-2 active:scale-[0.98] bg-[#00e701] text-neutral-black hover:bg-[#1fff20] shadow-md py-[0.875rem] px-[1.75rem] min-w-[12ch] cursor-pointer rounded-[8px] font-[600] leading-5 text-black text-[14px] h-[49px]">
                                    <div className="contents relative top-[1px]">Confirm</div>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (<div className="flex flex-col flex-1 relative !font-[proxima-nova]">
                    <div className="flex flex-col px-4 pb-4 gap-4">
                        <form className="flex w-full flex-col justify-center">
                            <label className="inline-flex relative flex-col-reverse items-start w-full">
                                <div className="w-full flex flex-shrink-0">
                                    <div className="relative flex flex-grow w-full">
                                        <select className=" px-8 py-2 pl-2 w-full bg-[#0F212E] text-input shadow-input font-bold border-2 border-[#2f4553] rounded-md transition-all outline-none m-0 cursor-pointer appearance-none text-base">
                                            <option value="6 months" className="font-semibold">6 Months</option>
                                            <option value="1 year">1 Year</option>
                                            <option value="2 years">2 Years</option>
                                            <option value="3 years">3 Years</option>
                                            <option value="4 years">4 Years</option>
                                            <option value="5 years">5 Years</option>
                                            <option value="10 years">10 Years</option>
                                            <option value="indefinite">Indefinite</option>
                                        </select>
                                        <div className="absolute right-[10px] top-1/2 -translate-y-1/2 inline-flex pointer-events-none text-current">
                                            <Icon name="ChevronDown" />
                                        </div>
                                    </div>
                                </div>
                                <span className="w-full inline-flex items-center justify-start font-semibold text-sm text-current pb-1 transition-all relative -top-px">
                                    <span className="font-semibold text-sm leading-5 text-[#D5DCEB] ">
                                        Duration
                                    </span>
                                </span>
                            </label>

                            <button type="button"
                                onClick={() => setNextModal(true)}
                                className="inline-flex relative items-center gap-2 justify-center whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 mt-4  focus-visible:outline-offset-2 active:scale-[0.98] bg-[#00e701] text-neutral-black hover:bg-[#1fff20] shadow-md py-[0.875rem] px-[1.75rem] min-w-[12ch] cursor-pointer rounded-[8px] font-[600] leading-5 text-black text-[14px] h-[49px]">
                                <div className="contents relative top-[1px]">Next</div>
                            </button>

                            <span className="w-full mt-4 text-[16px] leading-[24px] text-[#D5DCEB]">
                                Disclaimer: Any decision made here is final and not reversible. Please
                                withdraw any remaining balance from your account before submitting your
                                self exclusion request.
                            </span>
                        </form>
                    </div>
                </div>)}


            </DialogContent>
        </Dialog>
    );
};

export default SelfExclusion;
