"use client";
import React, { useEffect, useState } from "react";
import style from "./m-header.module.css";
import { cn } from "@workspace/ui/lib/utils";
import Icon from "@workspace/ui/icons/icons";
// import LoginModal from "@workspace/ui/common/modal/LoginModal";
import { RegisterModal } from "@workspace/ui/common/modal/RegisterModal";
import { useAppStore } from "@workspace/ui/store/store";
import { SearchableDropdown } from "@workspace/ui/common/components/m-view/m-header/SearchWallet";
import WalletModal from "@workspace/ui/common/modal/wallett-modal/index";
import LoginModal from "@workspace/ui/common/modal/LoginModal";
import ForgotPasswordModal from "@workspace/ui/common/modal/ForgotModal";
import LogoutModal from "@workspace/ui/common/modal/logout-modal/index";
import VaultModal from "@workspace/ui/common/modal/vault-modal/index";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import Link from "next/link";
import VIPModal from "@workspace/ui/common/modal/vip-modal/index";
import StatisticsModal from "@workspace/ui/common/modal/statistics-modal/index";
import { usePathname } from "next/navigation";
import { stakefairLiveUrl } from "@workspace/ui/config/config";

const MHeader = () => {
  const isAuthUser = useAppStore((state) => state.isAuthUser);
  const [showNotification, setShowNotification] = useState(false);
  const setIsLoginOpen = useAppStore((state) => state.setIsLoginOpen);
  const setIsRegisterOpen = useAppStore((state) => state.setIsRegisterOpen);
  const isRegisterOpen = useAppStore((state) => state.isRegisterOpen);
  const isLoginOpen = useAppStore((state) => state.isLoginOpen);
  const [modalVisible, setModalVisible] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [isVipOpen, setIsVipOpen] = useState<any>(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState<any>(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState<any>(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const { openLiveSupport } = useAppStore();
  const [userPopoverOpen, setUserPopoverOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState("");
  const [isBase, setIsBase] = useState(false);
  const pathName = usePathname();

  const menuItems: any[] = [
    { lable: "Wallet", icon: "popwallet" },
    { lable: "Vault", icon: "vault" },
    { lable: "VIP", icon: "vip" },
    { lable: "Affiliate", icon: "popAffiliate" },
    { lable: "Statistics", icon: "popStats" },
    { lable: "Transactions", icon: "popList" },
    { lable: "My Bets", icon: "myBet" },
    { lable: "Settings", icon: "settings" },
    { lable: "Stake Smart", icon: "responsible" },
    { lable: "Live Support", icon: "support" },
    { lable: "Logout", icon: "logout" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { port, origin } = window.location;

    // 🎯 Casino env
    if (port === "3001" || origin.includes("stakefair-hazel.vercel.app")) {
      setIsBase(true);
    } else setIsBase(false);
  }, []);

  const hostPort = typeof window !== "undefined" ? window.location.port : "";
  const routeMap: Record<string, string> = {
    "My Bets": hostPort === "3003" ? "/my-bets/sports" : "/my-bets/casino",
    "Stake Smart": "/responsible-gambling",
    Transactions: "/transactions",
    Affiliate: "/affiliate",
    Settings: "/settings",
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("registerModal");
    if (storedValue === "true") {
      setIsRegisterOpen(true);
    }
  }, [setIsRegisterOpen]);

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    localStorage.setItem("registerModal", "true");
  };

  const handleForgetPassword = () => {
    setModalVisible(true);
  };

  const handleOpenModals = (label: string) => {
    if (label === "Logout") {
      setIsLogoutOpen(true);
    } else if (label === "VIP") {
      setIsVipOpen(true);
    } else if (label === "Statistics") {
      setIsStatisticsOpen(true);
    } else if (label === "Vault") {
      setIsVaultOpen(true);
    } else if (label === "Live Support") {
      openLiveSupport(true);
    } else if (label === "Transactions") {
      setIsTransactionOpen(true);
    }

    setUserPopoverOpen(false);
  };

  const { closeDrawer } = useAppStore();

  useEffect(() => {
    if (!userPopoverOpen) return;

    const applyZIndex = () => {
      const popperEls = document.querySelectorAll(
        "[data-radix-popper-content-wrapper]"
      );
      popperEls.forEach((el: any) => {
        el.style.zIndex = "2147483647"; // highest safe z-index
        el.style.pointerEvents = "auto";
      });
    };

    // run initially
    applyZIndex();

    // optional observer to handle Radix re-renders
    const observer = new MutationObserver(applyZIndex);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [userPopoverOpen]);
  return (
    <>
      {isAuthUser ? (
        <header
          onClick={() => closeDrawer()}
          className={cn(
            "flex justify-between mainMbl fixed w-full items-center bg-[#1a2c38] top-0 h-[60px] px-[3vw] py-0 z-[999]",
            style.headerShadow
          )}
        >
          <div className="block max-[420px]:hidden h-[35.88px]">
            {isBase || (!isBase && pathName !== "/") ? (
              <Link href={"/"} className="text-white">
                <Icon
                  name={"logo"}
                  className="w-[105px] h-[32.5px] relative top-[0.7px]"
                  fill="white"
                ></Icon>
              </Link>
            ) : (
              <a href={stakefairLiveUrl} className="text-white">
                <Icon
                  name={"logo"}
                  className="w-[105px] h-[32.5px] relative top-[0.7px]"
                  fill="white"
                ></Icon>
              </a>
            )}
          </div>

          <div
            className="hidden max-[420px]:block   wrap normal svelte-abzx6q min-[340px]:w-[53px]"
            data-content=""
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="25"
              className="svelte-md2ju7"
            >
              <path
                d="M3.1361,6.9505 C3.1241,3.7165 5.1921,1.9235 8.9901,1.9095 C11.7261,1.8995 12.2131,3.6885 12.2161,4.3385 C12.2201,5.5835 10.4541,6.9045 10.4541,6.9045 C10.4541,6.9045 10.5521,7.6795 12.0641,7.6735 C13.5751,7.6685 15.0481,6.6695 15.0391,4.1715 C15.0281,1.3015 12.0241,-0.0105 9.0521,0.0005 C6.5671,0.0095 -0.0239,0.3585 0.0001,6.9035 C0.0211,12.7185 10.9851,13.2305 10.9981,16.9535 C11.0131,20.9955 6.4751,22.0845 4.9471,22.0905 C3.4191,22.0965 2.7891,20.9985 2.7871,20.3965 C2.7751,17.1225 6.0321,16.2105 6.0321,16.2105 C6.0311,15.9695 5.8411,14.8785 4.5801,14.8835 C1.3311,14.8945 0.0361,17.6895 0.0461,20.4195 C0.0541,22.7395 1.6951,24.1895 4.1721,24.1795 C8.9071,24.1635 14.2471,21.8505 14.2281,16.7175 C14.2111,11.9175 3.1501,10.6625 3.1361,6.9505"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <div className="">
            <div className="grid grid-cols-[minmax(100px,1fr)_minmax(min-content,auto)] svelte-17vz5au">
              <div className="">
                <div className="flex flex-col justify-center items-start">
                  <div className=" max-w-full relative">
                    <SearchableDropdown />
                  </div>
                </div>
              </div>

              <WalletModal>
                <button
                  type="button"
                  className="inline-flex cursor-pointer relative items-center gap-2 justify-center font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-[16px] leading-none shadow-md py-3 px-5 rounded-br-[0.5rem] rounded-tr-[0.5rem] h-12 w-12"
                >
                  <Icon
                    name={"walletsearch"}
                    className="w-[20px] h-[20px] min-w-[20px] min-h-[20px]"
                    fill="#fff"
                  />
                </button>
              </WalletModal>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="dropdown svelte-11iwinh transparent">
              <div>
                <Popover
                  open={userPopoverOpen}
                  onOpenChange={setUserPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex  relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none py-[0.8125rem] px-[1rem]"
                    >
                      <Icon name={"usericon"} className="" fill="#fff" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    sideOffset={6}
                    className="w-[144px] rounded-0 shadow-lg max-h-[484px] bg-white p-0 overflow-hidden  mr-[2px] overflow-y-auto scroll-width-none"
                  >
                    {/* Cone cap */}
                    <PopoverPrimitive.Arrow className="fill-white shadow-md right-2" />

                    <div className="flex flex-col py-1 border-0">
                      {menuItems.map(({ lable, icon }) => {
                        const route = routeMap[lable];
                        const isActive = activeLabel === lable;

                        const baseClasses =
                          "flex items-center gap-2 h-12 p-3 cursor-pointer w-full text-left text-nowrap transition-colors group";
                        const activeClasses = isActive
                          ? "text-[#1874E1] "
                          : "text-[#2f4553] hover:bg-[#b1bad3] hover:text-black";

                        if (route) {
                          return (
                            <Link
                              key={lable}
                              href={route}
                              onClick={() => {
                                setUserPopoverOpen(false);
                                setActiveLabel(lable);
                              }}
                              className={`${baseClasses} ${activeClasses}`}
                            >
                              <Icon
                                name={icon}
                                className="!w-[20px] !h-[20px]"
                                fill={isActive ? "#2563eb" : "#2f4553"}
                              />
                              <span
                                className={`font-semibold text-[16px] !whitespace-nowrap !overflow-hidden text-ellipsis ${
                                  isActive
                                    ? "text-blue-600"
                                    : "text-[#2f4553] group-hover:text-black"
                                }`}
                              >
                                {lable}
                              </span>
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={lable}
                            onClick={() => {
                              handleOpenModals(lable);
                              setActiveLabel(lable);
                            }}
                            className={`${baseClasses} ${activeClasses}`}
                          >
                            <Icon
                              name={icon}
                              className="!w-[20px] !h-[20px]"
                              fill={isActive ? "#2563eb" : "#2f4553"}
                            />
                            <span
                              className={`font-semibold text-[16px] ${
                                isActive
                                  ? "text-blue-600"
                                  : "text-[#2f4553] group-hover:text-black"
                              }`}
                            >
                              {lable}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* modals */}
                {isLogoutOpen && (
                  <LogoutModal
                    open={isLogoutOpen}
                    onClose={() => setIsLogoutOpen(false)}
                  />
                )}
                {isVipOpen && (
                  <VIPModal
                    open={isVipOpen}
                    onClose={() => setIsVipOpen(false)}
                  />
                )}
                {isStatisticsOpen && (
                  <StatisticsModal
                    open={isStatisticsOpen}
                    onClose={() => setIsStatisticsOpen(false)}
                  />
                )}
                {isVaultOpen && (
                  <VaultModal
                    open={isVaultOpen}
                    onClose={() => setIsVaultOpen(false)}
                  />
                )}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowNotification(true)}
                type="button"
                className="inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none p-3"
                id="notifications-nav-button"
              >
                <Icon name={"notificationbell"} className="" />
              </button>

              {/* Notification Panel */}
              {showNotification && (
                <div
                  className="fixed top-[60px] right-0 bottom-0 w-full
          bg-[#0f212e] z-[99999] shadow-lg
           flex flex-col
          animate-slideIn pb-4 px-4"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center relative py-1 -mr-3">
                    <div className="inline-flex items-center gap-2">
                      <Icon
                        name="notificationbellsvg"
                        className="inline-block shrink-0"
                      />
                      <h3 className="text-white font-bold text-lg leading-7 font-[proxima-nova]">
                        Notifications
                      </h3>
                    </div>

                    <button
                      onClick={() => setShowNotification(false)}
                      type="button"
                      className="inline-flex relative items-center gap-2 justify-center rounded-md transition focus-visible:outline-none text-gray-400 hover:text-white bg-transparent text-base p-4"
                    >
                      <Icon
                        name="notificatiocross"
                        className="inline-block shrink-0"
                        fill="#b1bad3"
                      />
                    </button>
                  </div>

                  {/* Notification Content */}
                  <div className="h-[100%]  px-4 mx-[-1rem] min-h-0 overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [scrollbar-color:#2f4553_transparent]">
                    <div className="flex items-center justify-center h-[100%]">
                      <div className="flex bottom-[34px] relative flex-col items-center p-4 text-[#b1bad3] mx-auto my-0">
                        <div className="text-[6rem] text-[#557086]">
                          <Icon
                            name="emptynotifications"
                            className="rotate-90 mb-4"
                          />
                        </div>
                        <span className="text-white mt-1 font-semibold text-base">
                          No Notifications Available
                        </span>
                        <span className="text-sm mt-1">
                          Your interactions will be visible here
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      ) : (
        <header
          onClick={() => closeDrawer()}
          className={cn(
            "flex justify-between mainMbl fixed w-full gap-[10px] items-center bg-[#1a2c38] h-[60px] px-[3vw] py-0 z-[9999]",
            style.headerShadow
          )}
        >
          {isRegisterOpen && (
            <RegisterModal
              onClose={() => {
                localStorage.removeItem("registerModal");
                setIsRegisterOpen(false);
              }}
              isOpen={isRegisterOpen}
            />
          )}
          {isLoginOpen}
          {isLoginOpen && (
            <LoginModal
              onClose={() => setIsLoginOpen(false)}
              onForgotPassword={handleForgetPassword}
            />
          )}
          <div className="h-[35.88px]">
            {isBase || (!isBase && pathName !== "/") ? (
              <Link href={"/"} className="text-white">
                <Icon
                  name={"logo"}
                  className="w-[105px] h-[32.5px] relative top-[0.7px]"
                  fill="white"
                ></Icon>
              </Link>
            ) : (
              <a href={stakefairLiveUrl} className="text-white">
                <Icon
                  name={"logo"}
                  className="w-[105px] h-[32.5px] relative top-[0.7px]"
                  fill="white"
                ></Icon>
              </a>
            )}
          </div>

          {modalVisible && (
            <ForgotPasswordModal
              onClose={() => setModalVisible(false)}
              onBackToLogin={() => {
                return;
              }}
            />
          )}

          <div className="flex justify-center gap-2">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="login flex justify-center items-center  text-white font-semibold px-5 py-[15px] pt-4 h-[44px] w-auto whitespace-normal sm:whitespace-nowrap text-sm rounded bg-[#2f4553] border-0"
            >
              <span className="relative bottom-[0.5px]">Login</span>
            </button>
            <button
              onClick={openRegisterModal}
              className="signup flex justify-center  items-center text-white font-semibold px-5 py-[15px] pt-4 h-[44px] w-auto whitespace-normal sm:whitespace-nowrap text-sm rounded bg-[#1475e1] border-0"
            >
              <span className=" relative bottom-[0.5px]">Register</span>
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default MHeader;
