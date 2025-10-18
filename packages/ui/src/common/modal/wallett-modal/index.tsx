"use client";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import React, { ReactNode, useEffect, useState } from "react";
import walletimg from "@workspace/ui/assets/browse/wallet-modal.jpg";
import { useAppStore } from "@workspace/ui/store/store";
import Icon from "@workspace/ui/icons/icons";

interface WalletModalProps {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
}

const WalletModal = ({ children, open, onClose }: WalletModalProps) => {
  const [imgpop] = React.useState<any>(walletimg);
  const [isOpen, setIsOpen] = useState(open);
  const setIsSetupWalletModalOpen = useAppStore(
    (state) => state.setIsSetupWalletModalOpen
  );
  const isSetupWalletModalOpen = useAppStore(
    (state) => state.isSetupWalletModalOpen
  );

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (isSetupWalletModalOpen) {
      setIsOpen(false);
    }
  }, [isSetupWalletModalOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setIsSetupWalletModalOpen(false);
    } else {
      onClose?.();
    }
  };

  return (
    <>
    
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent  showCloseButton={false} className="p-0 overflow-hidden gap-0 min-w-[200] !max-w-[500] border-0 bg-[#1a2c38] rounded-[8px] w-[95%] animate-modal-popover min-[320px]:w-[90%] min-[350px]:w-[91.5%] sm:w-[95%] min-[400px]:w-[92.5%]">
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <img
            src={imgpop.src}
            width={1000}
            height={1000}
            alt="wallet modal"
            className="w-full h-[260] object-cover"
          />
                <DialogClose asChild>
              <button  className="text-xl absolute right-[16px] top-[16px] leading-none cursor-pointer outline-0">
                <Icon
                  name={"closeIcon"}
                  className="w-5 h-5 hover:fill-[white]"
                  fill="#b1bad3"
                />
              </button>
            </DialogClose>
        </DialogHeader>
        <div className="p-4 pt-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[20px] text-white leading-[28px]">
              Set Up Your Wallet and Start Playing!
            </h1>
            <p className="text-[16px] text-[#b1bad3] leading-[24px]">
              Verify your email and account details to unlock full access to
              StakeFair. Once verified, you'll be able to deposit and withdraw
              funds quickly and securely.
            </p>
          </div>
          <Button
            onClick={() => setIsSetupWalletModalOpen(true)}
            className="bg-[#1475E1] h-11 text-[16px] leading-[24px] font-semibold cursor-pointer hover:bg-[#105eb4] text-white rounded-md">
            Setup Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default WalletModal;
