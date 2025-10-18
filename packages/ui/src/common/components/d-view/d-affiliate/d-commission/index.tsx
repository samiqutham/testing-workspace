"use client";
import React, { useEffect, useRef, useState } from "react";
import Icon from "@workspace/ui/icons/icons";
import '../../d-footer/footer.css'
import { Search } from "lucide-react";
import { Skeleton } from "@workspace/ui/components/skeleton";
   
interface ToggleState {
  ghostMode: boolean;
  hideStats: boolean;
  hideRaceStats: boolean;
 
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  disabled?: boolean;
}

const ToggleSwitch = ({ checked, onChange, id, disabled = false }: ToggleSwitchProps) => (
  <div className="inline-flex items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only peer"
      id={id}
      disabled={disabled}
    />
    <div
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onChange}
      className={`
        relative w-10 h-6 rounded-full transition-all duration-300 ease-in-out mr-2
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${checked ? "bg-[#00b801]" : "bg-[#2f4553]"}
        after:content-[''] after:absolute after:top-[2px] after:start-[1px]
        after:bg-white after:rounded-full after:h-5 after:w-5
        after:transition-all after:duration-300 after:ease-in-out
        after:shadow-md
        ${checked ? "after:translate-x-[18px]" : "after:translate-x-0"}
      `}
    ></div>
  </div>
);

const ToggleExample = () => {
  const [toggles, setToggles] = useState<ToggleState>({
    ghostMode: false,
    hideStats: false,
    hideRaceStats: false,
   
  });

  const handleToggle = (key: keyof ToggleState) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
function FilterModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center  z-[9999999] w-full   p-4"
      onClick={onClose}
    >
      <div
        className="rounded-md bg-[#1a2c38] text-[#b1bad3] w-full min-w-[200px] max-w-[500px] max-h-[calc(100%-4em)] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            {/* <Icon
                    name="filter"
                    className="inline-block shrink-0 text-[rgb(177,186,211)] w-5 h-5"
                  /> */}
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[rgb(177,186,211)]">
    <path fill="currentColor" d="M22 3H2l7 10.5V21h6v-7.5z"></path>
  </svg>
       <h3 className="text-white font-bold text-[1.125rem] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">Filter</h3>
          </div>
          <button type="button"  onClick={onClose}
            className="inline-flex relative items-center gap-2 justify-center rounded-[0.25rem] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#b1bad3]  hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-none "
            aria-label="Close Modal"
            data-modal-close="true">
     <Icon name="FilterCross"/>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 relative">
        <div className="p-4 pt-0">
<div className="flex flex-col mb-6 gap-4 pt-0.5">
    <div className="inline-flex items-start position-relative">
      
        <ToggleSwitch
          checked={toggles.ghostMode}
          onChange={() => handleToggle("ghostMode")}
          id="ghostMode"
        />
        <div className="flex flex-col ">
  <span className="text-sm font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-white">
    Only Show Crypto Currencies
  </span>
 <span className="text-sm text-[#B1BAD3] font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
    Display all crypto currency commissions.
  </span>
</div>

      </div>
      <div className="flex items-start position-relative">
      
        <ToggleSwitch
          checked={toggles.hideStats}
          onChange={() => handleToggle("hideStats")}
          id="hideStats"
        />
        <div className="flex flex-col ">
  <span className="text-sm font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-white">
    Only Show Local Currencies
  </span>

  <span className="text-sm text-[#B1BAD3] font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
    Display all local currency commissions.
  </span>
</div>

      </div>
       <div className="flex items-start position-relative">
      
        <ToggleSwitch
          checked={toggles.hideRaceStats}
          onChange={() => handleToggle("hideRaceStats")}
          id="hideRaceStats"
        />
        <div className="flex flex-col ">
  <span className="text-sm font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-white">
    Hide Zero Lifetime Commission
  </span>

  <span className="text-sm text-[#B1BAD3] font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
    Lifetime Commission for zero balances won't appear.
  </span>
</div>
</div>
  </div>
      <button
            type="button"
            onClick={onClose}
            className="bg-[#1475e1] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-[14px] hover:bg-blue-600 text-white py-2.5 px-5 rounded-md shadow-md font-semibold  w-full"
          >
            Apply
          </button>
         </div>
        </div>
      </div>
    </div>
  );
}
function TransferCommissionModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center  z-[9999999] w-full p-4"
      onClick={onClose}
    >
      <div
        className="rounded-md bg-[#1a2c38] text-[#b1bad3] w-full min-w-[200px] max-w-[500px] max-h-[calc(100%-4em)] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <Icon
                    name="ArrowDirectionalVertical"
                  />
            <h3 className="text-white font-bold text-[1.125rem] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">Transfer Commission</h3>
          </div>
          <button type="button"  onClick={onClose}
            className="inline-flex relative items-center gap-2 justify-center rounded-[0.25rem] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#b1bad3]  hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-none "
            aria-label="Close Modal"
            data-modal-close="true" >  
            <Icon
                    name="FilterCross"
                  />
          </button>
        </div>
       {/* Content */}
        <div className="flex flex-col gap-4 px-4 pb-4">
          <div className="flex flex-col bg-[#213743] rounded-[0.5rem_0.25rem] gap-3 p-3">
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-base font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">Estimated Available Commission</span>
              <div className="inline-flex items-center gap-1 max-w-full align-middle">
                <span className="text-white text-base font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] truncate" style={{ maxWidth: '12ch' }}>
                  $0.00
                </span>
                <span className="text-white text-base font-semibold font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] flex items-center">USD</span>
              </div>

            </div>
          </div>

          <div className="flex gap-3 items-start p-3 border-2 border-dashed border-[#ed4163] rounded-md text-[#ed4163] bg-[#0f212e]">
                <Icon
                    name="Caution"
                    className="shrink-0 mt-[3px]"
                  />
            <div>
              <p className="font-semibold font-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">Transfer Not Available</p>
              <p className="text-sm font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
                There is currently no commission available to transfer to your
                balance.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-[#1475e1] text-sm hover:bg-blue-600 font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-white py-2.5 px-5 rounded-[.5rem_.25rem] shadow-md font-semibold mt-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

 {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
const [selectedSort, setSelectedSort] = useState("Available Commission: High to Low");
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [search, setSearch] = useState("");
const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // Simulate loading for 1s
    setShowSkeleton(true);
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  // data

    const cryptoData = [
    {
      crypto: 'BTC',
      column2: { value: '0.00000000', currency: 'VND' },
      column3: { value: '0.00000000', currency: 'TRY' },
      column4: { value: '0.00000000', currency: 'BTC' }
    },
    {
      crypto: 'ETH',
      column2: { value: '0.00000000', currency: 'PEN' },
      column3: { value: '0.00000000', currency: 'ARS' },
      column4: { value: '0.00000000', currency: 'ETH' }
    },
    {
      crypto: 'LTC',
      column2: { value: '0.00000000', currency: 'NGN' },
      column3: { value: '0.00000000', currency: 'CLP' },
      column4: { value: '0.00000000', currency: 'LTC' }
    },
    {
      crypto: 'USDT',
      column2: { value: '0.00000000', currency: 'KES' },
      column3: { value: '0.00000000', currency: 'GHS' },
      column4: { value: '0.00000000', currency: 'USDT' }
    },
    {
      crypto: 'SOL',
      column2: { value: '0.00000000', currency: 'INR' },
      column3: { value: '0.00000000', currency: 'IDR' },
      column4: { value: '0.00000000', currency: 'CAD' }
    },
    {
      crypto: 'DOGE',
      column2: { value: '0.00000000', currency: 'CAD2' },
      column3: { value: '0.00000000', currency: 'JPY' },
      column4: { value: '0.00000000', currency: 'USD' }
    },
    {
      crypto: 'BCH',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
     {
      crypto: 'XRP',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
       {
      crypto: 'TRX',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
       {
      crypto: 'EOS',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
        {
      crypto: 'BNB',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
           {
      crypto: 'USDC',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
             {
      crypto: 'APE',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
              {
      crypto: 'BUSD',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
               {
      crypto: 'CRO',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                 {
      crypto: 'DAI',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                     {
      crypto: 'LINK',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                       {
      crypto: 'SAND',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                         {
      crypto: 'SHIB',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                             {
      crypto: 'UNI',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                 {
      crypto: 'POL',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                    {
      crypto: 'TRUMP',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                        {
      crypto: 'USD',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                            {
      crypto: 'JPY',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                {
      crypto: 'CAD',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                    {
      crypto: 'IDR',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                        {
      crypto: 'INR',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                            {
      crypto: 'MXN',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                                {
      crypto: 'TRY',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                                    {
      crypto: 'VND',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                                     {
      crypto: 'ARS',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                                         {
      crypto: 'PEN',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                                            {
      crypto: 'CLP',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                                                {
      crypto: 'NGN',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                                                {
      crypto: 'GHS',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
                                                                                {
      crypto: 'KES',
      column2: { value: '0.00000000', currency: 'TRUMP' },
      column3: { value: '0.00000000', currency: 'MATIC' },
      column4: { value: '0.00000000', currency: 'UNI' }
    },
  ];


 useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
       <div className="">
                   <div className="flex flex-col w-full pb-0">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
       <h2 className="text-white text-[20px] font-bold !leading-[28px] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">Commission</h2>
       <span className=" text-[rgb(213,220,235)] text-[16px] font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">View and track the earnings you've generated through your referrals. This section provides a clear breakdown of your commissions and payouts — keeping you in control of your earnings.
     </span>
     </div>
<div className="flex flex-col-reverse xl:flex-row justify-between gap-4 items-stretch">
            {/* sort section */}
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-white text-base font-semibold" data-ds-text="true">
              <Icon
                    name="Sorticon"
                    className="inline-block shrink-0 text-[rgb(177,186,211)] w-5 h-5"
                  />
                <span className="text-base  font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-normal">Sort</span>
              </span>
<div className="min-w-0 flex-1 max-w-full" ref={modalRef}>
      <div className="flex relative">
        {/* Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex relative items-center gap-2 justify-between w-full
          font-sans font-semibold text-sm text-white bg-[#2f4553] hover:bg-[#557086] hover:text-white
          whitespace-nowrap py-[0.5rem] px-[1rem] shadow-md [border-radius:0.25rem]
          lining-nums tabular-nums [font-feature-settings:'salt'_on]
          ring-offset-background transition disabled:pointer-events-none disabled:opacity-50
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
          active:scale-[0.98]"
        >
          <span className="ds-body-md-strong truncate font-semibold text-base leading-6">
            {selectedSort}
          </span>
         <Icon
                    name="Arrowicon"
                     className={`inline-block shrink-0 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
                  />
        </button>

        {/* Dropdown Modal */}
        {isOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 top-10 mt-2 w-max rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
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
            <div className="py-1 max-h-72 overflow-y-auto relative top z-10">
              {[
                "Available Commission: High to Low",
                "Available Commission: Low to High",
                "Withdrawn Commission: High to Low",
                "Withdrawn Commission: Low to High",
                "Lifetime Commission: High to Low",
                "Lifetime Commission: Low to High",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedSort(option);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 ${
                    selectedSort === option
                      ? "text-[#1475E1] hover:bg-[#B1BAD3] hover:text-black text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold"
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
            <div className="flex gap-2">
          <button
  type="button"
  onClick={() => setIsFilterModalOpen(true)}
  className="inline-flex relative items-center gap-2 justify-center
     font-sans font-semibold text-sm text-white bg-[#2f4553] hover:bg-[#557086] hover:text-white
     whitespace-nowrap py-[0.625rem] px-[1.25rem] shadow-md [border-radius:0.25rem]
     lining-nums tabular-nums [font-feature-settings:'salt'_on]
     ring-offset-background transition disabled:pointer-events-none disabled:opacity-50
     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
     active:scale-[0.98]"
>
     {/* <Icon
                    name="filter"
                    className="inline-block shrink-0 text-[rgb(177,186,211)] w-5 h-5"
                  /> */}
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[rgb(177,186,211)]">
    <path fill="currentColor" d="M22 3H2l7 10.5V21h6v-7.5z"></path>
  </svg>
</button>
<button type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex relative items-center gap-2 justify-center w-full
 font-sans font-semibold text-sm text-white bg-[#1475e1] hover:bg-blue-600 hover:text-white
         whitespace-nowrap py-[0.625rem] px-[1.25rem] shadow-md [border-radius:0.25rem]
         lining-nums tabular-nums [font-feature-settings:'salt'_on]
         ring-offset-background transition disabled:pointer-events-none disabled:opacity-50
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
         active:scale-[0.98]"
              >
                Transfer to Balance
              </button>


            </div>
          </div>
    {/* table section */}
    <div className="overflow-auto overflow-x-hidden w-full">
      <div className="relative max-w-full overflow-x-auto [overflow-y-hidden] [overflow-anchor:none] 
            [scrolling-touch] [scrollbar-width:thin] [scrollbar-thumb-[#2f4553]] [scrollbar-track-transparent]
            [transform translate-x-0 translate-y-0] [transform-none]  touch-pan-y !min-h-0 ">
              <table className="w-full relative z-[2] [transform-style:preserve-3d]  overflow-x-scroll ">
 <thead className="relative [transform:translateZ(1px)]">
  <tr>
 <th className="p-4 w-1/6 break-words whitespace-nowrap  align-middle first:text-left text-[rgb(177,186,211)]">
  <span className="text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold">Currencies</span>
</th>
<th className="p-4 w-1/6 break-words whitespace-nowrap min-[700px]:table-cell align-middle text-[rgb(177,186,211)] !text-right">
  <span  className="text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold">Available Commission
  </span>
</th>
<th className="p-4 w-1/6 break-words whitespace-nowrap  align-middle min-[960px]:table-cell text-[rgb(177,186,211)] !text-right">
  <span  className="text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold">Withdrawn Commission
  </span>
</th>
<th className="p-4 w-1/6 break-words whitespace-nowrap  align-middle min-[960px]:table-cell text-[rgb(177,186,211)] !text-right">
  <span  className="text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold">Lifetime Commission
  </span>
</th>
</tr>
 </thead>
<tbody className="relative will-change-transform [animation-fill-mode:forwards] [animation-duration:.35s] [animation-timing-function:ease-out]">
      {showSkeleton
        ? Array.from({ length: 6 }).map((_, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-[rgb(33,55,67)]" : ""}
            >
              {/* First Column Skeleton */}
              <td
                className={`p-4 break-words w-1/6 whitespace-nowrap align-middle ${
                  index % 2 === 0 ? "rounded-l" : ""
                }`}
              >
                <div className="inline-flex items-center gap-2">
                  <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                </div>
              </td>

              {/* Second Column Skeleton */}
              <td className="p-4 w-1/6 min-[700px]:table-cell !text-right">
                <div className="inline-flex items-center gap-2 justify-end">
                  <Skeleton className="h-[14px] w-[90px] rounded-[4px] bg-[#b1bad3]" />
                  <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                </div>
              </td>

              {/* Third Column Skeleton */}
              <td className="p-4 w-1/6 min-[960px]:table-cell !text-right">
                <div className="inline-flex items-center gap-2 justify-end">
                  <Skeleton className="h-[14px] w-[90px] rounded-[4px] bg-[#b1bad3]" />
                  <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                </div>
              </td>

              {/* Fourth Column Skeleton */}
              <td
                className={`p-4 w-1/6 !text-right ${
                  index % 2 === 0 ? "rounded-r" : ""
                }`}
              >
                <div className="inline-flex items-center gap-2 justify-end">
                  <Skeleton className="h-[14px] w-[90px] rounded-[4px] bg-[#b1bad3]" />
                  <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                </div>
              </td>
            </tr>
          ))
        : cryptoData.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-[rgb(33,55,67)]" : ""}
            >
              {/* First Column */}
              <td
                className={`p-4 break-words w-1/6 whitespace-nowrap align-middle text-[rgb(177,186,211)] ${
                  index % 2 === 0 ? "rounded-l" : ""
                }`}
              >
                <div className="inline-flex items-center gap-1 max-w-full">
                  <span className="font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] text-[#b1bad3] text-base">
                    {row.crypto}
                  </span>
                </div>
              </td>

              {/* Second Column */}
              <td className="p-4 w-1/6 min-[700px]:table-cell !text-right text-[rgb(177,186,211)]">
                <div className="inline-flex items-center gap-1 max-w-full">
                  <span className="text-[#b1bad3] text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-normal truncate max-w-[12ch]">
                    {row.column2.value}
                  </span>
                  <Icon
                    name={row.column2.currency}
                    className="inline-block shrink-0"
                  />
                </div>
              </td>

              {/* Third Column */}
              <td className="p-4 w-1/6 min-[960px]:table-cell !text-right text-[rgb(177,186,211)]">
                <div className="inline-flex items-center gap-1 max-w-full">
                  <span className="text-[#b1bad3] text-base font-normal font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] truncate max-w-[12ch]">
                    {row.column3.value}
                  </span>
                  <Icon
                    name={row.column3.currency}
                    className="inline-block shrink-0"
                  />
                </div>
              </td>

              {/* Fourth Column */}
              <td
                className={`p-4 w-1/6 !text-right text-[rgb(177,186,211)] ${
                  index % 2 === 0 ? "rounded-r" : ""
                }`}
              >
                <div className="inline-flex items-center gap-1 max-w-full">
                  <span className="text-[#b1bad3] text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-normal truncate max-w-[12ch]">
                    {row.column4.value}
                  </span>
                  <Icon
                    name={row.column4.currency}
                    className="inline-block shrink-0"
                  />
                </div>
              </td>
            </tr>
          ))}
    </tbody>

</table>




</div>



    </div>
     </div>
     </div>
     {/* Commission Modal */}
      {isModalOpen && <TransferCommissionModal onClose={() => setIsModalOpen(false)} />}
      {/* Filter Modal */}
        {isFilterModalOpen && <FilterModal onClose={() => setIsFilterModalOpen(false)} />}

     </div>
  );
}
}
export default ToggleExample;