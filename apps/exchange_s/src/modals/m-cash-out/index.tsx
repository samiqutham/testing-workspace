import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";

export default function MCashOut({ children }: { children: React.ReactNode }) {
    return (
        <Dialog >
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="p-0 overflow-hidden !gap-0 !border-none outline-0 bg-white w-auto md:max-w-[378px] transform scale-[0.965] !ml-[12%] !mr-[12%] translate-x-[0] !left-0 !rounded-none shadow-lg [&>button]:hidden data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:fade-in-0-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-full data-[state=closed]:fade-out-0 duration-600 
            min-[576px]:!ml-0 min-[576px]:!mr-0 min-[576px]:!left-1/2 min-[576px]:top-1/2 min-[576px]:-translate-x-1/2 md:-translate-y-1/2">
                <DialogHeader className="flex !flex-row h-[44px] justify-between items-center bg-[#071824] text-white px-[12px]">
                    <DialogTitle className="font-bold text-sm leading-[16px]">Cash Out</DialogTitle>
                </DialogHeader>
                <div className="p-[10px] space-y-4 bg-[#1A2C38]">
                    <div className="space-y-2 text-[13px] text-white">
                        <div className="flex justify-between !mb-[10px]">
                            <span className="">Liability</span>
                            <span className="font-bold ">$25.00</span>
                        </div>
                        <div className="flex justify-between !mb-[10px]">
                            <span className="">Cash Out</span>
                            <span className="font-bold ">$24.76</span>
                        </div>
                        <div className="flex justify-between !mb-[10px]">
                            <span className="">Profit</span>
                            <span className="font-bold text-[#ff0000]">- $0.24</span>
                        </div>
                    </div>
                    <p className="text-[13px] text-white mb-[10px]">
                        If the odds change during submission, the amount may be increased,
                        rejected or partially accepted.
                    </p>
                    <div className="flex w-full !justify-center">

                        <DialogClose asChild>
                            <Button className="bg-[#2f4553] w-[45%] min-h-[34px] outline-0 mr-[5px] !text-[12px] !leading-[18px] !font-bold text-white rounded-none">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button className="bg-[#105EB4] !w-[45%] min-h-[34px] outline-0 !text-[12px] !leading-[18px] !font-bold text-white rounded-none ml-[5px]">
                            Confirm
                        </Button>
                    </div>
                </div>
                <div className="flex items-center bg-[#213743] h-[44px] justify-between pl-[10px]">
                    <span className="text-[13px] text-white">
                        Show Cash Out confirmation screen
                    </span>
                    <div className="flex justify-center items-center pr-2">
                        <label className="relative inline-block w-[42px] h-[25px]">
                            <input type="checkbox" className="opacity-0 w-0 h-0 peer
        focus:[&+span]:shadow-[0_0_1px_#4cb276]
        checked:[&+span]:bg-[#4cb276]"/>
                            <span className="absolute inset-0 cursor-pointer bg-[#ccc] transition duration-400 
        rounded-[34px] before:content-[''] before:absolute before:h-[22px] before:w-[22px]
        before:left-[4px] before:bottom-[3.5px] before:top-[2px] before:bg-white before:transition-transform 
        before:rounded-full peer-checked:before:translate-x-[14px]"></span>
                        </label>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
