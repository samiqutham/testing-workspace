"use client";

import * as React from "react";

import Icon from "@workspace/ui/icons/icons";
import { useState } from "react";
import styles from "./m-header.module.css";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import WalletSetting from "@workspace/ui/common/modal/wallet-setting-modal/index";
import WalletModal from "@workspace/ui/common/modal/wallett-modal/index";

const coins = [
  { value: "btc", label: "BTC", icon: "btc", currency: "0.00000000" },
  { value: "eth", label: "ETH", icon: "tabInr", currency: "0.00045001" },
  { value: "ltc", label: "LTC", icon: "dollar", currency: "0.00000000" },
  { value: "usdt", label: "USDT", icon: "dollar", currency: "0.00000000" },
  { value: "sol", label: "SOL", icon: "dollar", currency: "0.00000000" },
  { value: "sogr", label: "DOGE", icon: "dollar", currency: "0.00000000" },
  { value: "sogr", label: "DOGE", icon: "dollar", currency: "0.00000000" },
  { value: "sogr", label: "DOGE", icon: "dollar", currency: "0.00000000" },
  { value: "sol", label: "SOL", icon: "dollar", currency: "0.00000000" },
  { value: "sogr", label: "DOGE", icon: "dollar", currency: "0.00000000" },
  { value: "sogr", label: "DOGE", icon: "dollar", currency: "0.00000000" },
  { value: "sogr", label: "DOGE", icon: "dollar", currency: "0.00000000" },
];

export function SearchableDropdown() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("0.00000000");
  const [icon, setIcon] = React.useState("dollar");
    const [isWalletSetting, setIsWalletSetting] = useState(false);
    const [walletModalOpen, setWalletModalOpen] = useState(false);


    const handleWalletModalOpen = () => {
 
 
        setIsWalletSetting(false); 
        setWalletModalOpen(true); 
    };
  return (  <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* Custom button */}
        <button
          type="button"
          className={`
      ${styles.arrowDrop}
      bg-[#0f212e] inline-flex cursor-pointer relative items-center gap-2 justify-center 
      font-semibold whitespace-nowrap ring-offset-background transition 
      disabled:pointer-events-none disabled:opacity-50 
      focus-visible:outline-2 focus-visible:outline-offset-2 
      active:scale-[0.98] bg-grey-700 text-white 
      hover:bg-grey-900 hover:text-white focus-visible:outline-white 
      text-sm leading-none 
      [&_svg]:text-grey-200 [&:hover>svg]:text-white 
      py-[0.8125rem] px-[1rem] max-w-full rounded-r-none h-[48px] 
      rounded-bl-[.5rem] rounded-tl-[.5rem] w-[168px] md:w-[184px] 
      ${open ? styles.open : ""}
    `}
        >
          <div className="inline-flex items-center justify-center min-w-0 w-full">
            <span
              className="font-semibold overflow-hidden text-ellipsis text-base whitespace-nowrap tabular-nums block"
              style={{ maxWidth: "16ch" }}
            >
              {value}
            </span>

            {/* icon */}
            <span className="ml-1 flex-shrink-0">
              <Icon name={icon} className="w-[20px] h-[20px]" />
            </span>
          </div>

          <span className="inline-flex items-center flex-shrink-0">
            <Icon
              name="searcharrow"
              className={` transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"
                }`}
              fill="#b1bad3"
            />
          </span>
        </button>
      </PopoverTrigger>

      {/*  Dropdown Content */}
      <PopoverContent className="w-[263.562px]  left-[44px] p-0 !top-[3px] relative rounded-[.5rem] ">
        <div className={styles.dropdownWrapper}>
          <Command className=" pt-3 pb-1 top-10">
            <CommandInput
              placeholder="Search Currencies"
              className={`border-2 border-[#d5dceb] !pl-[40px] pr-[8px] py-[8px] h-[44px] rounded-[.5rem] placeholder:text-base !placeholder:font-light  text-base ${styles.customInput}`}
            />
            <CommandList className="scrollbar-hide">
              <CommandEmpty
                className="text-[12px] font-semibold text-[#2f4553] 
               font-['Proxima_Nova',sans-serif] text-center p-2"
              >
                Currency not available
              </CommandEmpty>
              <CommandGroup className="px-0 ">
                {coins.map((coin, idx) => (
                  <CommandItem
                    className=""
                    key={idx}
                    value={coin.value}
                    onSelect={() => {
                      setValue(coin.currency);
                      setOpen(false);
                      setIcon(coin.icon);
                    }}
                  >
                    <button
                      type="button"
                      className="inline-flex w-full relative items-center gap-2 font-semibold whitespace-nowrap ring-offset-background transition h-[35px] hover:bg-[#b1bad3] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#2f4553] hover:bg-grey-200 hover:text-neutral-black focus-visible:outline-grey-300 text-xs leading-none [&amp;_svg]:text-[#2f4553] [&amp;:hover&gt;svg]:text-[#2f4553] rounded-none justify-start px-3 py-[6px] shadow-none"
                    >
                      <div className="inline-flex gap-10 justify-between  items-center min-w-0">
                        <span
                          className="font-semibold overflow-hidden text-left text-ellipsis whitespace-nowrap tabular-nums block text-base"
                          style={{ maxWidth: "16ch", minWidth: "12ch" }}
                        >
                          {coin.currency}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="ml-1  flex-shrink-0 ">
                            <Icon
                              name={coin.icon || "dollar"}
                              className="!w-[18px] !h-[18px]"
                            />
                          </span>

                          <span className="ml-1 font-semibold line-height-default align-left  text-base variant-inherit  with-icon-space ">
                            {coin.label}
                          </span>
                        </div>
                      </div>
                    </button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="bg-[#d5dceb] h-[2px] w-full"></div>
            <div className="pt-1 text-center ">
              <button onClick={() => {
                  setOpen(false);
                  setIsWalletSetting(true);
                }}
                className="inline-flex   hover:bg-[#b1bad3]  relative items-center gap-2 justify-center font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-400 hover:bg-grey-200 hover:text-neutral-black focus-visible:outline-grey-300 text-sm leading-none  rounded-none w-full px-3 py-[6px] h-9 cursor-pointer">
                <svg
                  data-ds-icon="Settings"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  {" "}
                  <path
                    fill="#2f4553"
                    d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                  ></path>
                  <path
                    fill="#2f4553"
                    d="m20.26 11.08 1.84-1.69L19 4.25l-2.22.8a.994.994 0 0 1-1.32-.74L15 2H9l-.52 2.59c-.12.58-.71.94-1.28.76l-2.52-.79-2.9 5.26 1.91 1.61c.46.39.48 1.09.03 1.5l-1.84 1.69 3.1 5.14 2.22-.8c.58-.21 1.2.14 1.32.74l.46 2.31h6l.52-2.59c.12-.58.71-.94 1.28-.76l2.52.79 2.9-5.26-1.91-1.61a.995.995 0 0 1-.03-1.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5"
                  ></path>
                </svg>
                <span className="weight-semibold h-[35px] flex items-center  text-[#2f4553] line-height-default align-left size-default text-base text-size-default variant-subtle with-icon-space svelte-1f6lug3">
                  Wallet Settings
                </span>
              </button>
            </div>
            
          </Command>
        </div>

  
         
      </PopoverContent>
    </Popover>
  
    {isWalletSetting && (
        <WalletSetting
          open={isWalletSetting}
          onClose={() => setIsWalletSetting(false)}
          onWalletModalOpen={handleWalletModalOpen} 
        />
      )}

      <WalletModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}/> 
        </>
     
  );
}
