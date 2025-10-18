import Icon from "@workspace/ui/icons/icons";
import { useAppStore } from "@workspace/ui/store/store";
import React, { useEffect, useRef, useState } from "react";
import { SearchableDropdown } from "@workspace/ui/common/components/m-view/m-header/SearchWallet";
import WalletModal from "@workspace/ui/common/modal/wallett-modal/index";
import { useSidebar } from "@workspace/ui/components/sidebar";
import LogoutModal from "@workspace/ui/common/modal/logout-modal/index";
import VaultModal from "@workspace/ui/common/modal/vault-modal/index";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Link from "next/link";
import DHeaderSearch from "@workspace/ui/common/components/d-view/d-header-search/index";
import VIPModal from "@workspace/ui/common/modal/vip-modal/index";
import StatisticsModal from "@workspace/ui/common/modal/statistics-modal/index";
import { usePathname } from "next/navigation";
import { stakefairLiveUrl } from "@workspace/ui/config/config";

const DHeader = () => {
  const isAuthUser = useAppStore((state) => state.isAuthUser);
  const setIsLoginOpen = useAppStore((state) => state.setIsLoginOpen);
  const setIsRegisterOpen = useAppStore((state) => state.setIsRegisterOpen);
  const setSideBarTabs = useAppStore((state) => state.setSideBarTabs);
  const openDrawer = useAppStore((state) => state.openDrawer);
  const activeDrawer = useAppStore((state) => state.activeDrawer);
  const setIsHeaderOverlayOpen = useAppStore(
    (state) => state.setIsHeaderOverlayOpen
  );
  const [openNotification, setOpenNotification] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const isHeaderOverlayOpen = useAppStore((state) => state.isHeaderOverlayOpen);
  const [openPopover, setOpenPopover] = useState(false);
  const { open, openTab, isTablet } = useSidebar();
  const [activeLabel, setActiveLabel] = useState("");

  const [headerSearch, setHeaderSearch] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);
  const [smallLogo, setSmallLogo] = useState(false);
  const [isVipOpen, setIsVipOpen] = useState<any>(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState<any>(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState<any>(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const { openLiveSupport } = useAppStore();
  const [userPopoverOpen, setUserPopoverOpen] = useState(false);
  const walletButtonRef = useRef<HTMLButtonElement>(null);
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

  const hostPort = typeof window !== "undefined" ? window.location.port : "";
  const routeMap: Record<string, string> = {
    "My Bets": hostPort === "3003" ? "/my-bets/sports" : "/my-bets/casino",
    "Stake Smart": "/responsible-gambling/stakesmart",
    Transactions: "/transactions/deposits",
    Affiliate: "/affiliate",
    Settings: "/settings",
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLabel(window.location.pathname);
    }

    //  Update active route when user navigates via Link
    const handleRouteChange = (): any =>
      setActiveLabel(window.location.pathname);

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushstate", handleRouteChange);
    window.addEventListener("replacestate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushstate", handleRouteChange);
      window.removeEventListener("replacestate", handleRouteChange);
    };
  }, [routeMap]);

  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width < 850) {
          setIsNarrow(true);
        } else {
          setIsNarrow(false);
        }

        if (width < 600) {
          setSmallLogo(true);
        } else {
          setSmallLogo(false);
        }
      }
    });

    observer.observe(headerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

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

  const handleChatOpen = () => {
    if (activeDrawer === "chat") {
      openDrawer("");
    } else {
      openDrawer("chat");
    }
    setOpenPopover(false);
  };
  const handleBetSlipOpen = () => {
    if (activeDrawer === "betslip") {
      openDrawer("");
    } else {
      openDrawer("betslip");
    }
    setOpenPopover(false);
  };

  useEffect(() => {
    if (!isHeaderOverlayOpen) {
      setHeaderSearch(false);
    }
  }, [isHeaderOverlayOpen]);

  const handleClickLogo = () => {
    localStorage.setItem("itemId", "home");
    setSideBarTabs("home");
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
    } else if (label === "Wallet") {
      walletButtonRef.current?.click();
    } else if (label === "Live Support") {
      openLiveSupport(true);
    } else if (label === "Transactions") {
      setIsTransactionOpen(true);
    }

    setUserPopoverOpen(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { port, origin } = window.location;

    // 🎯 Casino env
    if (port === "3001" || origin.includes("stakefair.vercel.app")) {
      setIsBase(true);
    } else setIsBase(false);
  }, []);

  return (
    <header ref={headerRef}>
      <div className="max-w-[1200] flex justify-between mx-auto items-center h-[60px]">
        <div className="w-[120px]">
          {!(isTablet ? openTab : open) && (
            <>
              {isBase || (!isBase && pathName !== "/") ? (
                <Link
                  href="/"
                  onClick={() => handleClickLogo()}
                  className="text-white relative cursor-pointer bottom-[1px] left-[0.5px]"
                >
                  {!smallLogo ? (
                    <Icon
                      name={"logo"}
                      className="w-[105px] h-[32.47px]"
                      fill="white"
                    />
                  ) : (
                    <Icon name={"smallLogo"} fill="white" />
                  )}
                </Link>
              ) : (
                <a
                  href={stakefairLiveUrl}
                  onClick={() => handleClickLogo()}
                  className="text-white relative cursor-pointer bottom-[1px] left-[0.5px]"
                >
                  {!smallLogo ? (
                    <Icon
                      name={"logo"}
                      className="w-[105px] h-[32.47px]"
                      fill="white"
                    />
                  ) : (
                    <Icon name={"smallLogo"} fill="white" />
                  )}
                </a>
              )}
            </>
          )}
        </div>

        {isAuthUser && (
          <div className="">
            <div className="grid grid-cols-[minmax(100px,1fr)_minmax(min-content,auto)] svelte-17vz5au">
              <div className="">
                <div className="flex flex-col justify-center items-start rounded-4xl">
                  <div className=" max-w-full relative">
                    <SearchableDropdown />
                  </div>
                </div>
              </div>

              <WalletModal>
                <button
                  ref={walletButtonRef}
                  type="button"
                  className="inline-flex  cursor-pointer relative items-center gap-2 justify-center font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-[16px] leading-none shadow-md py-[.75rem] px-[20px] rounded-br-[.5rem] rounded-tr-[.5rem] h-[48px] w-[86.25px]"
                >
                  {isNarrow ? (
                    <Icon
                      name={"wallet"}
                      className="w-[14px] h-[14px]"
                      fill="#fff"
                    />
                  ) : (
                    <>Wallet</>
                  )}
                </button>
              </WalletModal>
            </div>
          </div>
        )}

        {!isAuthUser ? (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="cursor-pointer login flex justify-center px-5 py-[15px] whitespace-nowrap items-center text-white font-semibold leading-none pt-[16px] pb-[14px] h-[44px] w-auto text-[14px] rounded bg-[#2f4553] border-0 transition hover:bg-[#557086]"
            >
              <span className="relative bottom-[1px]">Login</span>
            </button>
            <button
              onClick={openRegisterModal}
              className="cursor-pointer signup flex justify-center px-5 py-[15px] whitespace-nowrap items-center text-white font-semibold leading-none pt-[16px] pb-[14px] h-[44px] w-auto text-[14px] rounded bg-[#1475e1] border-0 transition hover:bg-[#105EB4]"
            >
              <span className="relative bottom-[1px]">Register</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <div
              className="flex gap-2 cursor-pointer items-center text-white"
              onClick={() => {
                setIsHeaderOverlayOpen(true);
                setHeaderSearch(true);
              }}
            >
              <Icon name={"searchverified"} className=" ml-3.5" fill="#fff" />
            </div>
            <div>
              <Popover open={userPopoverOpen} onOpenChange={setUserPopoverOpen}>
                <PopoverTrigger asChild>
                  <Icon
                    name={"usericon"}
                    className=" cursor-pointer"
                    fill="#fff"
                  />
                </PopoverTrigger>

                <PopoverContent
                  sideOffset={12}
                  className="w-[146px] rounded-0 shadow-lg bg-white p-0 overflow-hidden  overflow-y-auto"
                >
                  {/* Cone cap */}
                  <PopoverPrimitive.Arrow className="fill-white shadow-md" />

                  <div className="flex flex-col py-1 border-0">
                    {menuItems.map(({ lable, icon }) => {
                      const route = routeMap[lable];
                      const isActive =
                        route &&
                        (activeLabel === route ||
                          activeLabel.startsWith(route));

                      const baseClasses =
                        "flex items-center gap-2 h-12 p-3 cursor-pointer w-full text-left transition-colors group";
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
                              setActiveLabel(route);
                            }}
                            className={`${baseClasses} ${activeClasses}`}
                          >
                            <Icon
                              name={icon}
                              className={`!w-[20px] !h-[20px]   ${isActive ? "text-[#2563eb]" : "text-[#2f4553]"}`}
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
                            className={`!w-[20px] !h-[20px]   ${isActive ? "text-[#2563eb]" : "text-[#2f4553]"}`}
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
            <Popover open={openNotification} onOpenChange={setOpenNotification}>
              {/* Notification icon */}
              <PopoverTrigger asChild>
                <Icon
                  name={"notificationbell"}
                  className="cursor-pointer"
                  fill="#fff"
                  onClick={() => setOpenNotification(!openNotification)}
                />
              </PopoverTrigger>

              {/* Notification content */}
              <PopoverContent
                align="end"
                side="bottom"
                sideOffset={10}
                className="!w-[375px] border-none translate-x-[34px] translate-y-[19px] max-h-[400px] 
        bg-[#0f212e] rounded-lg shadow-lg  pt-0 z-[901] px-4 pb-4"
              >
                {/* Header */}
                <div className="flex justify-between items-center relative py-1 -mr-3">
                  <div className="inline-flex items-center gap-2">
                    <Icon
                      name="notificationbellsvg"
                      className="inline-block shrink-0"
                      fill="#b1bad3"
                    />
                    <h3 className="text-white font-bold text-lg leading-7 font-[proxima-nova]">
                      Notifications
                    </h3>
                  </div>

                  {/* Tooltip on hover */}
                  <TooltipProvider>
                    <Tooltip open={showTooltip}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setOpenNotification(false)}
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                          className="inline-flex relative items-center gap-2 justify-center rounded-md transition 
                  focus-visible:outline-none text-gray-400 hover:text-white bg-transparent text-base p-4 cursor-pointer"
                        >
                          <Icon
                            name="notificatiocross"
                            className="inline-block shrink-0"
                          />
                        </button>
                      </TooltipTrigger>

                      <TooltipContent
                        side="top"
                        sideOffset={6}
                        className="bg-white z-[99999] text-[#0F212E] text-[14px] font-normal 
                font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] 
                px-3 py-2 rounded-lg shadow-lg max-w-xs"
                      >
                        <p>Close Notification</p>
                        <TooltipArrow className="fill-white" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* notification section */}
                <div
                  className="h-full px-4 mx-[-1rem] min-h-0 overflow-y-auto overflow-x-hidden 
        [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [scrollbar-color:#2f4553_transparent]"
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center p-4 text-[#b1bad3] mx-auto my-0">
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
              </PopoverContent>
            </Popover>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger asChild>
                <Icon
                  name={"headerchat"}
                  className=" mr-3.5  cursor-pointer"
                  fill="#fff"
                  onClick={() => setOpenPopover(true)}
                />
              </PopoverTrigger>
              <PopoverContent className="w-[107.7px] p-0 py-1 overflow-hidden rounded-[4px] border-none !top-[-10px]">
                <PopoverPrimitive.Arrow className="fill-white" />
                <button
                  onClick={handleChatOpen}
                  className="w-full h-[48px] flex gap-2 items-center border-0 outline-0 text-left px-3 py-3 cursor-pointer text-[#2f4553] hover:bg-[#b1bad3] text-base font-semibold hover:text-black"
                >
                  <Icon name="chaticon" className="text-[#2f4553]" />
                  Chat
                </button>
                <button
                  onClick={handleBetSlipOpen}
                  className="w-full h-[48px] flex gap-2 items-center border-0 outline-0 text-left px-3 py-3 cursor-pointer text-[#2f4553] hover:bg-[#b1bad3] text-base font-semibold hover:text-black"
                >
                  <Icon name="betslipchat" className="text-[#2f4553]" />
                  Bet Slip
                </button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      {isHeaderOverlayOpen && headerSearch && <DHeaderSearch />}
    </header>
  );
};

export default DHeader;
