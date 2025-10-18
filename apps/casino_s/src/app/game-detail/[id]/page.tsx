"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import GameDesc from "@casino_s/components/common/game-desc";
import { CurrencyDropdown } from "@casino_s/components/common/currency-dropdown";
import { CasinoLobby } from "@casino_s/components/common/lobby/casino-lobby";

export default function GameDetail({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const img = searchParams.get("img") ?? undefined;

  const [checked, setChecked] = useState(false);
  const [showLobby, setShowLobby] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegister = () => {
    setShowLobby(true);
  };

  if (!isMobile) {
    return (
      <>
        <CasinoLobby />
        <GameDesc img={img} />
      </>
    );
  }

  return (
    <>
      {showLobby ? (
        <CasinoLobby />
      ) : (
        <div className="px-[3vw] mt-[3vw] text-white pb-8">
          <div className="rounded-[8px] bg-[rgb(15,33,46)] bg-cover [background-position:center] overflow-x-hidden grid gap-4 p-4">
            <div className="grid gap-x-4 mb-1 [grid-template-columns:minmax(100px,40%)auto]">
              {img && (
                <Image
                  src={img}
                  alt={title || "Game"}
                  width={600}
                  height={300}
                  className="rounded-sm"
                />
              )}
              <div className="flex flex-col justify-between h-auto min-h-[60%] [align-self:end]">
                <div className="flex flex-col">
                  <h1 className="text-lg text-white leading-[1.5] text-left font-semibold">
                    {title}
                  </h1>
                  <h2 className="text-[rgb(177,186,211)] text-base font-bold leading-[0.875]">
                    {title}
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid gap-2 items-center justify-start grid-flow-col">
              <p className="text-[rgb(177,186,211)] text-left text-sm font-medium">
                Balance displayed in
              </p>
              <CurrencyDropdown usePortal />
            </div>

            <label className="flex items-center cursor-pointer gap-4 select-none">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="sr-only peer"
              />
              <div
                className={`relative w-10 h-6 rounded-full transition-colors duration-300 
                ${checked ? "bg-[rgb(0,184,1)]" : "bg-[rgb(47,69,83)]"}
                peer-focus:outline-[2px] peer-focus:outline-[rgb(177,186,211)]`}
              >
                <div
                  className={`absolute top-1/2 -translate-y-1/2 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300
                  ${checked ? "translate-x-[15.5px]" : "translate-x-0"}`}
                />
              </div>
              <span className="font-semibold text-[rgb(177,186,211)] text-sm">
                Play in Fullscreen
              </span>
            </label>

            <button
              type="button"
              onClick={handleRegister}
              className="cursor-pointer inline-flex relative items-center gap-2 justify-center rounded font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white bg-blue-600 hover:bg-blue-700 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem] w-full"
            >
              <span>Register</span>
            </button>
          </div>
          <GameDesc img={img} />
        </div>
      )}
    </>
  );
}
