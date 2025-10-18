"use client";
import { Search, ChevronDown } from "lucide-react";
import Icon from "@workspace/ui/icons/icons";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import { useEffect, useRef, useState } from "react";
export default function DReferredUsers() {
 const [isOpen, setIsOpen] = useState(false);
const modalRef = useRef<HTMLDivElement>(null);

// Second dropdown ke liye - SEPARATE ref
const [dropdownOpen, setDropdownOpen] = useState(false);
const [selectedSort, setSelectedSort] = useState("Total Deposits: High to Low");
const sortDropdownRef = useRef<HTMLDivElement>(null);


// ref
// const sortDropdownRef = useRef<HTMLDivElement>(null);
useEffect(() => { 
  function handleClickOutside(event: MouseEvent) {
    // First dropdown check
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
    // Second dropdown check
    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  return (
 <div className="">
                   <div className="flex flex-col w-full pb-0">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
       <h2 className="text-white text-[20px] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-bold">Referred Users</h2>
       <span className=" text-[rgb(213,220,235)] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-[16px] font-normal">Track all the users who joined through your referral link. Here you can see their activity and gameplay - making it easy to monitor the growth of your network and the benefits you're gaining from referrals.
     </span>

                      </div>
         <div className="max-w-[300px] min-w-0 flex-1">
       <div className="relative inline-block" ref={modalRef}>
      {/* Button */}
      <div className="flex relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex relative items-center gap-2 justify-center whitespace-nowrap 
                     font-semibold text-base bg-[#2f4553] text-white 
                     hover:bg-[#557086] hover:text-white shadow-md py-2 px-4 rounded-md transition 
                     ring-offset-background disabled:pointer-events-none disabled:opacity-50 
                     focus-visible:outline-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] focus-visible:outline-offset-2 focus-visible:outline-white 
                     active:scale-[0.98]"
        >
          <span className="truncate font-semibold text-[16px]">
            Scarlettt9870 (wflzHQCQ)
          </span>
         
          <Icon
                            name="Arrowicon"
                       className={`inline-block shrink-0 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
                          />
        </button>
      </div>

      {/* Modal Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200 z-50">
          {/* Arrow */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                          w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200"></div>

          {/* Search Input */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 
                                 text-gray-400 w-4 h-4" />
              <input
                type="search"
                placeholder="Campaign Name"
                className="w-full pl-[32px] pr-[8px] py-[6px] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-sm border-[2px] border-[rgb(177,186,211)] 
                           rounded-md focus:outline-none
                            text-[rgb(47,69,83)] placeholder-gray-400"
              />
            </div>
          </div>

          {/* Dropdown Items */}
          <div className="flex flex-col pb-2">
            <button
              type="button"
              className="w-full text-left text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] px-3 py-2 font-semibold 
                         text-[#1475e1] hover:bg-[#B1BAD3] hover:text-black"
            >
              Scarlettt9870 (wflzHQCQ)
            </button>
           
          </div>
        </div>
      )}
    </div>
         </div>
         <div className="flex flex-col gap-4">
         <div className="flex flex-col gap-4 p-4 bg-[#213743] rounded-[8px]">
          <div className="flex justify-between items-center">
            <span className="text-white text-base font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
  Total Referred Users: <span className="text-white text-base font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]" >0</span>
</span>


          </div>
          <hr className="border border-[#2f4553] h-0.5"/>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-[rgb(213,220,235)]">First Time Deposits (FTD)</span>
                <div className="inline-flex relative">
<TooltipProvider>
  <Tooltip delayDuration={0}>
    <TooltipTrigger asChild>
      <button
        type="button"
        className="inline-flex relative items-center gap-2 justify-center 
           [border-radius:0.25rem] font-semibold whitespace-nowrap
           ring-offset-background transition font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] disabled:pointer-events-none disabled:opacity-50
           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-none
           focus-visible:text-white active:scale-[0.98] bg-transparent text-[#e5e7eb]
            hover:text-white text-sm  lining-nums tabular-nums
           [font-feature-settings:'salt'_on]"
      >
       <Icon
          name="Info"
          fill="#b1bad3"
          className="inline-block shrink-0 hover:fill-white group-hover:fill-white transition-colors"
        />
      </button>
    </TooltipTrigger>

    <TooltipContent
      side="top"
      sideOffset={6}
      className="bg-white z-[99999] text-[#0F212E] text-[14px] font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] px-3 py-3 rounded-lg shadow-lg max-w-xs"
    >
      <p className="font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] mb-2">
        First Time Deposits (FTD):
        <span className="font-normal"> This shows new depositors who make their first deposit with Stake through your campaign.</span>
      </p>

      <p className="mt-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
        *All data featured across this page is updated at least once a day.
      </p>

      <p className="mt-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
        *Only currently active users are displayed for each campaign. Users who have left the campaign will no longer be shown.
      </p>

      <TooltipArrow className="fill-white" />
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


                </div>

              </div>
             
              <span className="text-[#fff] text-base font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]" >0</span>

            </div>
             {/* 2nd name */}
                 <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-[rgb(213,220,235)]">Monthly FTD</span>
                <div className="inline-flex relative">
<TooltipProvider>
  <Tooltip delayDuration={0}>
    <TooltipTrigger asChild>
      <button
        type="button"
        className="inline-flex relative items-center gap-2 justify-center 
           [border-radius:0.25rem] font-semibold whitespace-nowrap
           ring-offset-background transition disabled:pointer-events-none disabled:opacity-50
           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-none
           focus-visible:text-white active:scale-[0.98] bg-transparent text-[#e5e7eb]
           hover:bg-transparent hover:text-white text-sm font-sans lining-nums tabular-nums
           [font-feature-settings:'salt'_on]"
      >
    <Icon
          name="Info"
          fill="#b1bad3"
          className="inline-block shrink-0 hover:fill-white group-hover:fill-white transition-colors"
        />
      </button>
    </TooltipTrigger>

    <TooltipContent
      side="top"
      sideOffset={6}
      className="bg-white z-[99999] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-[#0F212E] text-[14px] font-normal px-3 py-3 rounded-lg shadow-lg max-w-xs"
    >
     <p className="font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] mb-2">
            Monthly FTD:
            <span className="font-normal"> This shows a total of all new depositors who made their first deposits with Stake through your campaign in the past month.</span>
          </p>

          <p className="mt-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
            *All data featured across this page is updated at least once a day.
          </p>

          <p className="mt-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
            *Only currently active users are displayed for each campaign. Users who have left the campaign will no longer be shown.
          </p>

      <TooltipArrow className="fill-white" />
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                </div>

              </div>
             
              <span className="text-[#fff] text-base font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]" >0</span>

            </div>
             {/* 3rd name */}
                     <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-[rgb(213,220,235)]">Total Deposits</span>
                <div className="inline-flex relative">
<TooltipProvider>
  <Tooltip delayDuration={0}>
    <TooltipTrigger asChild>
      <button
        type="button"
        className="inline-flex relative items-center gap-2 justify-center 
           [border-radius:0.25rem] font-semibold whitespace-nowrap
           ring-offset-background transition disabled:pointer-events-none disabled:opacity-50
           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-none
           focus-visible:text-white  font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] active:scale-[0.98] bg-transparent text-[#e5e7eb]
           hover:bg-transparent hover:text-white text-sm lining-nums tabular-nums
           [font-feature-settings:'salt'_on]"
      >
        <Icon
          name="Info"
          fill="#b1bad3"
          className="inline-block shrink-0 hover:fill-white group-hover:fill-white transition-colors"
        />
      </button>
    </TooltipTrigger>

    <TooltipContent
      side="top"
      sideOffset={6}
      className="bg-white z-[99999] text-[#0F212E] text-[14px] font-normal px-3 py-3 rounded-lg shadow-lg max-w-xs"
    >
     <p className="font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] mb-2">
        Total Deposits:
        <span className="font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]"> This refers to all the deposits made across your currently active campaigns.</span>
      </p>

      <p className="mt-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
        *All data featured across this page is updated at least once a day.
      </p>

      <p className="mt-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
        *Only currently active users are displayed for each campaign. Users who have left the campaign will no longer be shown.
      </p>

      <TooltipArrow className="fill-white" />
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                </div>

              </div>
             
              <span className="text-[#fff] text-base font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]" >0</span>

            </div>
            {/* 4th name */}
                      <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-[rgb(213,220,235)] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">VIP Users</span>
                <div className="inline-flex relative">
<TooltipProvider>
  <Tooltip delayDuration={0}>
    <TooltipTrigger asChild>
     <button
  type="button"
  className="group inline-flex relative items-center gap-2 justify-center 
     [border-radius:0.25rem] font-semibold whitespace-nowrap
     ring-offset-background transition disabled:pointer-events-none disabled:opacity-50
     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-none
     focus-visible:text-white active:scale-[0.98] bg-transparent 
     text-[#b1bad3]  font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] hover:text-white text-sm  lining-nums tabular-nums
     [font-feature-settings:'salt'_on]"
>
 <Icon
          name="Info"
          fill="#b1bad3"
          className="inline-block shrink-0 hover:fill-white group-hover:fill-white transition-colors"
        />
</button>

    </TooltipTrigger>

    <TooltipContent
      side="top"
      sideOffset={6}
      className="bg-white z-[99999] text-[#0F212E] text-[14px] font-normal px-3 py-3 rounded-lg shadow-lg max-w-xs"
    >
       <p className="font-semibold mb-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
        VIP Users:
        <span className="font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]"> VIP users represent players with VIP levels higher than Platinum 1.</span>
      </p>

      <p className="mt-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
        *All data featured across this page is updated at least once a day.
      </p>

      <p className="mt-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
        *Only currently active users are displayed for each campaign. Users who have left the campaign will no longer be shown.
      </p>

      <TooltipArrow className="fill-white" />
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                </div>

              </div>
             
              <span className="text-[#fff] text-base font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]" >0</span>

            </div>
          </div>

         </div>
         {/* Sort section */}
         <div className="flex flex-col w-full gap-3">
          <div className="flex gap-2">
            <span className="flex items-center gap-2 text-white text-base font-semibold" >
  <svg data-ds-icon="Sort" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="rgb(177,186,211)"
       className="inline-block shrink-0 [color:rgb(177,186,211)]">
    <path fill="rgb(177,186,211)" d="M20 3H4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4m-8 7H4a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4m-4 7H4a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4m10.75 3.71 3.96-3.96a.996.996 0 1 0-1.41-1.41l-2.25 2.25V10a1.003 1.003 0 0 0-1.71-.71c-.18.18-.29.43-.29.71v7.59l-2.25-2.25a.996.996 0 1 0-1.41 1.41l3.96 3.96c.39.39 1.02.39 1.41 0z"></path>
  </svg>
  <span className="text-base  font-normal" >Sort</span>
</span>
<div className="max-w-[300px] min-w-0 flex-1">
 <div className="relative flex" ref={sortDropdownRef}>
  {/* Button */}
  <button
    type="button"
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="inline-flex relative items-center gap-2 justify-between w-full
     font-semibold text-sm text-white bg-[#2f4553] hover:bg-[#557086] hover:text-white
      whitespace-nowrap py-[0.5rem] px-[1rem] shadow-md [border-radius:0.25rem]
      lining-nums tabular-nums [font-feature-settings:'salt'_on]
      ring-offset-background transition disabled:pointer-events-none disabled:opacity-50
      focus-visible:outline-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] focus-visible:outline-offset-2 focus-visible:outline-white
      active:scale-[0.98]"
  >
    <span className="ds-body-md-strong truncate font-semibold text-base leading-6">
      {selectedSort}
    </span>
   
      <Icon
                            name="Arrowicon"
           className={`inline-block shrink-0 transition-transform ${
        dropdownOpen ? "rotate-180" : "rotate-0"
      }`}
                          />
  </button>

  {/* Dropdown Menu */}
  {dropdownOpen && (
    <div className="absolute mt-2 w-full left-1/2 -translate-x-1/2 top-10  rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
      {/* Tooltip Arrow */}
      <div
        className="arrow"
        style={{
          position: "absolute",
          top: "-6px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      ></div>

      {/* Options */}
      <div className="py-1 overflow-y-auto relative z-10">
        {[
        "Total Deposits: High to Low",
  "Total Deposits: Low to High",
  "Overall Commission: High to Low",
  "Overall Commission: Low to High",
  "Registered: New to Old",
  "Registered: Old to New",
  "Last Deposit Date: New to Old",
  "Last Deposit Date: Old to New"
        ].map((option) => (
          <button
            key={option}
            onClick={() => {
              setSelectedSort(option);
              setDropdownOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 ${
              selectedSort === option
                ? "text-[#1475E1] text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold hover:text-black hover:bg-[#B1BAD3]"
                : "text-[#2f4553] text-base font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] hover:bg-[#B1BAD3] hover:text-black"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )}
</div>
</div>
 </div>
          <div className="grid w-full gap-3">
            <div className="flex flex-col items-center m-0 mx-auto p-4 text-[#e5e7eb]">
<div className="[font-size:6rem] text-[rgb(85,112,134)]">
    <Icon
                    name="profitloss"
                    
                  />
</div>

  <span className="text-[#B1BAD3]  font-normal mt-6 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]" >No Referred Users.</span>
</div>

          </div>
         </div>
         <div className="flex justify-center">
          <div className="flex flex-row gap-4">
            <button type="button"  disabled
  className="inline-flex relative items-center gap-2 justify-center w-full
         font-semibold text-base text-[#D5DCEB] bg-[#2f4553] hover:bg-[#d1d5db] hover:text-white
         whitespace-nowrap py-[0.625rem] px-[1.25rem] shadow-md rounded-[8px]
         lining-nums tabular-nums [font-feature-settings:'salt'_on]
         ring-offset-background font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] transition disabled:pointer-events-none disabled:opacity-50
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
         active:scale-[0.98]"

>
  Previous
</button>
<button type="button"  disabled
  className="inline-flex relative items-center gap-2 justify-center w-full
          font-semibold text-base text-[#D5DCEB] bg-[#2f4553] hover:bg-[#d1d5db] hover:text-white
         whitespace-nowrap py-[0.625rem] px-[1.25rem] shadow-md rounded-[8px]
         lining-nums tabular-nums [font-feature-settings:'salt'_on]
         ring-offset-background transition disabled:pointer-events-none disabled:opacity-50
         focus-visible:outline-2 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] focus-visible:outline-offset-2 focus-visible:outline-white
         active:scale-[0.98]"
  
>
  Next
</button>


          </div>
         </div>

         </div>
                    </div>
                   </div>

                  </div>

);
}