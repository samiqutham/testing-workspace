import { ReactNode } from "react";
import MFooterNavbar from "@workspace/ui/common/components/m-view/m-footer-navbar/index";
import MHeader from "@workspace/ui/common/components/m-view/m-header/index";
import MFooter from "@workspace/ui/common/components/m-view/m-footer/index";
import { useAppStore } from "@workspace/ui/store/store";
import SetupWalletModal from "@workspace/ui/common/modal/setup-wallet-modal/index";
export default function MobileLayout({ children }: { children: ReactNode }) {
    const isSetupWalletModalOpen = useAppStore(
      (state:any) => state?.isSetupWalletModalOpen
    );
    const setIsSetupWalletModalOpen = useAppStore(
      (state:any) => state?.setIsSetupWalletModalOpen
    );
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {isSetupWalletModalOpen && (
                <SetupWalletModal
                  isOpen={isSetupWalletModalOpen}
                  onClose={() => setIsSetupWalletModalOpen(false)}
                />
              )}
      <MHeader />
      <div className=" h-[60] mainMbl"></div>
      <main
        className={`relative z-10 flex flex-col transition-all duration-300 ease-in-out`}
      >
        {children}
        <MFooter />
      </main>
      <div className="h-[68px] mainMbl"></div>
      <MFooterNavbar />
    </div>
  );
}
