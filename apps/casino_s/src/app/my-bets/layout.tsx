"use client";

import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function MyBetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { href: "/my-bets/casino", label: "Casino" },
    { href: "/my-bets/sports", label: "Sports" },
    { href: "/my-bets/archive", label: "Archive" },
  ];

  const activeLink = links.find((link) => pathname === link.href);

  return (
    <div className="w-full px-[3dvw] flex justify-center">
      <div className="w-full max-w-[1200px]">
        <div className="pb-8">
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Header */}
            <div className="pt-6">
              <div className="flex justify-between w-full items-center">
                <div className="flex gap-2 h-[36px] items-center">
               <Icon name={"myBet"} className="inline-block shrink-0 text-[rgb(177,186,211)] h-6 w-6"/>
                  <span className="text-[24px] text-white font-bold">
                    My Bets
                  </span>
                </div>
                <div>
                  <Link href="/">
                    <Icon
                      name="closeIcon"
                      className="w-5 h-5 fill-[#b1bad3ff] hover:fill-white"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar + Content */}
            <div className="flex flex-col [@media(min-width:915px)]:flex-row gap-2 [@media(min-width:915px)]:gap-6">
              {/* Desktop Sidebar */}
              <div className=" sticky top-6 h-fit self-start min-w-[180px] max-w-full bg-[rgb(15,33,46)] text-grey-100 rounded-md">
                <div className="hidden [@media(min-width:915px)]:block">
                  <div className="py-2 w-full">
                    {links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link key={link.href} href={link.href}>
                          <div
                            className={`py-[10px] w-full px-5 cursor-pointer transition-colors font-semibold text-white ${
                              isActive
                                ? "bg-[#071824] pr-5 pl-[17px] border-l-[3px] border-[#1475E1]"
                                : "hover:bg-[#071824]"
                            }`}
                          >
                            {link.label}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile Dropdown */}
              <div className="flex [@media(min-width:915px)]:hidden relative  gap-2">
                <div className="py-3 px-5 bg-[#0f212e] cursor-pointer rounded-md h-[44px] flex justify-center items-center hover:bg-[#071824]">
                  <Icon name="arrowDown" className="w-5 h-5 rotate-90" />
                </div>
                <div className="relative inline-block" ref={dropdownRef}>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-fit bg-[#0f212e] cursor-pointer text-white py-[10px] px-5 h-[44px] rounded-md leading-[24px] md:min-w-[117.86px] font-semibold flex items-center gap-2  transition-colors hover:bg-[#071824]"
                  >
                    <span>
                      {links.find((l) => l.href === pathname)?.label || "Menu"}
                    </span>
                    <Icon
                      name="arrowDown"
                      className={` w-5 h-5 text-[#b1bad3]  ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20">
                      {/* Tooltip Arrow */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-200"></div>

                      {/* Menu */}
                      <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden w-max max-w-[78.19px]">
                        {links.map((link, index) => {
                          const isActive = pathname === link.href;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-3 px-3 font-semibold border-b border-gray-100 last:border-0 transition-colors ${
                                isActive
                                  ? "text-[#1475E1] bg-blue-50"
                                  : "text-gray-700 hover:bg-gray-50"
                              } ${index === 0 ? "rounded-t-md" : ""} ${
                                index === links.length - 1 ? "rounded-b-md" : ""
                              }`}
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Content Box */}
              <div className="rounded-md bg-[#0f212eff] w-full h-full p-6 overflow-x-hidden">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
