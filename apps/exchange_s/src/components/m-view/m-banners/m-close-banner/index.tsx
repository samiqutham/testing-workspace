"use client";

import { useState } from "react";

export default function MCloseBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative">
      <div className="relative h-[180px] overflow-hidden rounded-lg p-3 shadow-md">
        <img
          src="./mbanner/m-closebanner.jpg"
          alt="StakeFair Exchange"
          className="absolute inset-0 h-full w-full "
        />

        <button
          onClick={() => setOpen(false)}
          className="absolute right-[6px] top-[6px] grid h-6 w-6 place-items-center  text-gray-700"
          aria-label="Close banner"
        >
          <span className="text-[14px] font-bold text-white">✕</span>
        </button>

        <div className="absolute top-11 left-3 text-[#303030]"></div>
      </div>
    </div>
  );
}
