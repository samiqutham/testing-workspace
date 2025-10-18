"use client";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { cn } from "@workspace/ui/lib/utils";

export default function CookieModal() {
  const [showModal, setShowModal] = useState(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    let initialIsMobile:boolean;

    initialIsMobile = window.innerWidth < 768;

    setIsMobile(initialIsMobile);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowModal(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <Dialog modal={false} open={showModal} onOpenChange={setShowModal}>
      <DialogContent
        showCloseButton={false}
        showOverlay={false}
        className={cn(
          "border-none bg-[#213743] flex items-center !h-auto !max-w-[500] px-4 py-3 rounded-sm",
          isMobile ? "top-[82.2%] flex-col" : "top-[93.7%] gap-[0px] pb-[0.9rem] pt-[0.6rem]"
        )}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden"></DialogTitle>
        <p className={cn("text-white text-sm w-full text-center font-semibold leading-none",  !isMobile && 'inline-flex relative left-[6.5px] top-[1.5px]'  )}>
          🍪 We use cookies for functional and analytical purpose.
        </p>
        <DialogClose asChild>
          <button
            onClick={acceptCookies}
            className={` inline-flex relative outline-none items-center cursor-pointer gap-2 justify-center rounded-[0.25rem] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-[#557086] hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem]  bg-[#2f4553] 
            ${isMobile ? "w-full" : "w-[102px] top-[2px]"}
            `}
          >
            Accept
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
