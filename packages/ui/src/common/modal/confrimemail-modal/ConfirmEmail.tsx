"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";
import { useRef, useState } from "react";

const VerifyEmailModal = ({ open, onClose }: any) => {
   
      const [code, setCode] = useState("");
    
 const isInvalid = code.length !== 6;
  const [email, setEmail] = useState("aqeelanwar5268@gmail.com");

  const handlePaste = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const text = await navigator.clipboard.readText();
      const input = document.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >("#myInput");
      if (input) {
        input.value = text;
      }
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {open && <div className="fixed inset-0 bg-[#000000bf] z-40" />}
      <DialogContent
        showCloseButton={false}
        className="p-0 min-w-[200px] !max-w-[500px] border-0 bg-[#1a2c38] rounded-[8px] text-white font-sans shadow-lg !gap-0
      [&>button]:mt-[6px] animate-modal-popover min-[320px]:w-[90%] min-[350px]:w-[91.5%] sm:w-[95%] min-[400px]:w-[92.5%]"
      >
        <DialogHeader className="flex !flex-row h-[60px] justify-between items-center !bg-[#1A2C38] text-white  !border-none rounded-[8px] !outline-none !shahdow-none">
          <DialogTitle className="font-bold text-[18px] leading-[28px] !min-h-[28px] flex items-center gap-2"></DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
          <div className="bg-[#1A2C38]  shadow-xl w-full  text-white rounded-[8px] shadow-xl w-full  text-white">
            {/* Title */}
            <div className="flex justify-between p-4">
              {" "}
              <h2 className="text-lg font-semibold  flex">
                <Icon
                  className="w-5 h-5 mt-1 !text-[#B1BAD3]  mr-2 "
                  name={"usericonModal"}
                />
                Verify Email
              </h2>
                <DialogClose asChild>
              <button className="text-xl leading-none cursor-pointer outline-0">
                <Icon
                  name={"closeIcon"}
                  className="w-5 h-5 hover:fill-[white]"
                  fill="#b1bad3"
                />
              </button></DialogClose>
            </div>
            <div className="px-4 pb-4">
              {" "}
              <div className="flex flex-col gap-6">
                {" "}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-[700] leading-[28px]">
                    Confirm Your Email
                  </h3>
                  <p className="text-[16px] text-[#b1bad3]">
                    Please check your email for the verification code we sent
                    and enter it in the form below to confirm your email
                    address.
                  </p>
                </div>
                {/* Email Field */}
                <div className="flex flex-col gap-4">
                  {" "}
                  <div className="">
                    <label className="block text-[#B1BAD3]  text-sm font-[600] mb-1">
                      Email <span className="text-[#ed4163]">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full bg-[#0E212E] text-white border-[2px] focus:border-[#567085] focus:border-[2px] border-[#2F4652] rounded-md  p-2  text-gray-300 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                  {/* Email Code Field */}
                  <div className="">
                    <label className="block text-sm text-[#B1BAD3] font-medium mb-1">
                      Email Code <span className="text-[#ed4163]">*</span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        id="myInput"
                             value={code}
                                onChange={(e) => setCode(e.target.value)}
                        placeholder=""
                        className="flex-1 bg-[#0E212E] border-[2px] border-[#2F4652] rounded-l-md p-2  text-gray-200 focus:border-[#567085] focus:border-[2px] focus:outline-none"
                      />
                      <button
                        onClick={handlePaste}
                        className="bg-[#2F4652] px-4 h-11 py-[8px] rounded-r-md hover:bg-[#3a3e46] transition"
                      >
                        <Icon name={"pasteicon"} />
                      </button>
                    </div>
                         {isInvalid && code.length > 0 && (
                      <span className=" text-[#f2708a] text-[14px] leading-[20px] flex gap-2 items-center py-1">
                        <Icon
                          name={"Caution"}
                          className="relative w-5 h-5"
                          fill="rgb(237,65,99)"
                        />
                        <span>emailCode must be exactly 6 characters</span>
                      </span>
                    )}
                  </div>
                
                </div>
                {/* Resend Email */}
                <div className="flex justify-end">
                  <button className=" text-[white] font-[600] px-5 py-[15px] text-[14px] hover:underline">
                    Resend email
                  </button>
                </div>
              </div>
              {/* Submit Button */}
            <button
                  type="submit"
                  disabled={isInvalid}
                  className={`w-full inline-flex mt-4  justify-center rounded-[8px]  whitespace-nowrap transition disabled:opacity-50 font-semibold disabled:hover:bg-[#1475e1] bg-[#1475e1] text-white hover:bg-blue-600 text-[14px] py-2.5 px-5 min-w-[12ch] ${!code ? "cursor-default" : "cursor-pointer"
                    }`}>
                  Submit
                </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailModal;
