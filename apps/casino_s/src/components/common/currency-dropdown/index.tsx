"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const currencies = [
  { code: "USD", color: "bg-[#6CDE07]" },
  { code: "EUR", color: "bg-[#0F8FF8]" },
  { code: "ARS", color: "bg-[#FFC800]" },
  { code: "CAD", color: "bg-[#EAA749]" },
  { code: "CLP", color: "bg-[#7C3AED]" },
  { code: "CNY", color: "bg-[#EB0A29]" },
  { code: "DKK", color: "bg-[#DC2626]" },
  { code: "IDR", color: "bg-[#60A5FA]" },
  { code: "INR", color: "bg-[#FACC15]" },
  { code: "JPY", color: "bg-[#000000]" },
  { code: "KRW", color: "bg-[#0F97F8]" },
  { code: "MXN", color: "bg-[#22C55E]" },
];

interface CurrencyDropdownProps {
  usePortal?: boolean;
}

export const CurrencyDropdown = ({
  usePortal = false,
}: CurrencyDropdownProps) => {
  const [selected, setSelected] = useState(currencies[0]);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (usePortal && open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [usePortal, open]);

  const dropdown = (
    <div
      className={`absolute z-50 bg-white rounded shadow-lg ${usePortal ? "" : "left-0 mt-2 w-full"}`}
      style={
        usePortal
          ? { top: position.top, left: position.left, width: position.width }
          : {}
      }
    >
      <span className="relative">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
        <ul className="py-1 max-h-42 overflow-y-auto [scrollbar-width:none] relative z-10">
          {currencies.map((currency) => (
            <li key={currency.code}>
              <button
                onClick={() => {
                  setSelected(currency);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 p-3 text-sm font-semibold text-[#2f4553] hover:text-black hover:bg-[#b1bad3]"
              >
                <span
                  className={`w-[14px] h-[14px] rounded-full ${currency.color}`}
                />
                {currency.code}
              </button>
            </li>
          ))}
        </ul>
      </span>
    </div>
  );

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white font-semibold cursor-pointer px-2 py-1"
      >
        <span className="text-sm flex items-center">
          <span
            className={`w-[14px] h-[14px] mr-1 rounded-full inline-block ${selected.color}`}
          />
          {selected.code}
        </span>
        {open ? (
          <ChevronUp className="w-[14px] h-[14px]" />
        ) : (
          <ChevronDown className="w-[14px] h-[14px]" />
        )}
      </button>

      {open && (usePortal ? createPortal(dropdown, document.body) : dropdown)}
    </div>
  );
};
