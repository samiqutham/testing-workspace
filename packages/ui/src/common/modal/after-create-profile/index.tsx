import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { ReactNode } from "react";

interface AfterCreateProfileModalProps {
  children: ReactNode;
}

const AfterCreateProfileModal = ({
  children,
}: AfterCreateProfileModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 overflow-hidden !min-w-[200] !max-w-[500] border-0 bg-[#1a2c38] rounded-[4px]">
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <Image
            src={"/wallet-modal.jpg"}
            width={1000}
            height={1000}
            alt="wallet modal"
            className="w-full h-[260] object-cover"
          />
        </DialogHeader>
        <div className="p-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-white leading-[120%]">
              Welcome to Stake!
            </h1>
            <p className="text-sm text-[#b1bad3] leading-[120%]">
              Ready to get started? Set up your wallet now to enjoy smooth,
              secure deposits and withdrawals.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-[#2f4553] h-11 font-semibold text-white rounded-[4]">
              Setup Wallet
            </Button>
            <Button className="bg-[#1475E1] h-11 font-semibold text-white rounded-[4]">
              Setup Wallet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AfterCreateProfileModal;
