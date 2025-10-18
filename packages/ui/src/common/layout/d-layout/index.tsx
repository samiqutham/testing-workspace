import { ReactNode, useEffect, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import LoginModal from "@workspace/ui/common/modal/LoginModal";
import { RegisterModal } from "@workspace/ui/common/modal/RegisterModal";
import DSidebar from "@workspace/ui/common/components/d-view/d-sidebar/index";
import { cn } from "@workspace/ui/lib/utils";
import DHeader from "@workspace/ui/common/components/d-view/d-header/index";
import { useAppStore } from "@workspace/ui/store/store";
import VerificationNotice from "@workspace/ui/common/components/verificationNotice/index";
import DFooter from "@workspace/ui/common/components/d-view/d-footer/index";
import MChat from "@workspace/ui/common/components/m-view/m-footer-navbar/m-chat/index";
import { AnimatePresence } from "framer-motion";
import ForgotPasswordModal from "@workspace/ui/common/modal/ForgotModal";
import DBetslip from "@workspace/ui/common/components/d-view/d-betslip/index";
import SetupWalletModal from "@workspace/ui/common/modal/setup-wallet-modal/index";

export default function DesktopLayout({ children }: { children: ReactNode }) {
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const { open, openTab } = useSidebar();

  const isLoginOpen = useAppStore((state) => state.isLoginOpen);
  const isRegisterOpen = useAppStore((state) => state.isRegisterOpen);
  const setIsLoginOpen = useAppStore((state) => state.setIsLoginOpen);
  const setIsRegisterOpen = useAppStore((state) => state.setIsRegisterOpen);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // Add this state
  const setIsOverlayOpen = useAppStore((state) => state.setIsOverlayOpen);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const isSetupWalletModalOpen = useAppStore(
    (state) => state.isSetupWalletModalOpen
  );
  const setIsSetupWalletModalOpen = useAppStore(
    (state) => state.setIsSetupWalletModalOpen
  );
  useEffect(() => {});
  const { activeDrawer } = useAppStore();

  const handleForgotPassword = () => {
    setIsLoginOpen(false);
    setIsForgotPasswordOpen(true);
  };

  // Handler to go back to login from forgot password modal
  const handleBackToLogin = () => {
    setIsForgotPasswordOpen(false);
    setIsLoginOpen(true);
  };
  const handleNoticeClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setNoticeVisible(false);
    }, 200);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {isLoginOpen && (
          <LoginModal
            onClose={() => setIsLoginOpen(false)}
            onForgotPassword={handleForgotPassword} // Add this prop
          />
        )}
        {isForgotPasswordOpen && (
          <ForgotPasswordModal
            onClose={() => setIsForgotPasswordOpen(false)}
            onBackToLogin={handleBackToLogin}
          />
        )}
        {isRegisterOpen && (
          <RegisterModal
            onClose={() => {
              localStorage.removeItem("registerModal");
              setIsRegisterOpen(false);
            }}
            isOpen={isRegisterOpen}
          />
        )}
        {isSetupWalletModalOpen && (
          <SetupWalletModal
            isOpen={isSetupWalletModalOpen}
            onClose={() => setIsSetupWalletModalOpen(false)}
          />
        )}

        <DSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          {noticeVisible && (
            <div className="hidden min-[768px]:block !w-full">
              <VerificationNotice
                onClose={handleNoticeClose}
                isClosing={isClosing}
              />
            </div>
          )}

          <div
            className={cn(
              "flex-1 flex flex-col transition-transform duration-200 ease-in-out overflow-y-auto translate-y-0 ",
              noticeVisible && !isClosing
                ? "translate-y-[0px]"
                : "translate-y-0"
            )}>
            <header
              className={cn(
                "px-[3vw] py-0 bg-[#1a2c38] sticky top-0 shadow-[0_4px_6px_-1px_#0003,_0_2px_4px_-1px_#0000001f] h-[60px]",
                openTab ? "z-[0]" : "z-[9999]"
              )}>
              <DHeader />
            </header>
            <main
              className={cn(
                "flex-1 scroll-width-none",
                isOverlayOpen ? "overflow-hidden" : "overflow-auto"
              )}>
              {children}
              <DFooter />
            </main>
          </div>
        </SidebarInset>
        <AnimatePresence>
          {activeDrawer === "chat" && (
            <MChat
              initialAnimation={{ opacity: 0, x: "100%" }}
              animateTo={
                activeDrawer === "chat"
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: "100%" }
              }
            />
          )}

          {activeDrawer === "betslip" && (
            <DBetslip
              initialAnimation={{ opacity: 0, x: "100%" }}
              animateTo={
                activeDrawer === "betslip"
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: "100%" }
              }
            />
          )}
        </AnimatePresence>
      </div>
    </SidebarProvider>
  );
}
