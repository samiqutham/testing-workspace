"use client";

import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function StakeSmartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
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
    { href: "/responsible-gambling/stakesmart", label: "Stake Smart" },
    {
      href: "/responsible-gambling/recognise-the-sign",
      label: "Recognise the Signs",
    },
    {
      href: "/responsible-gambling/gambling-faqs",
      label: "Responsible Gambling FAQ's",
    },
    { href: "/responsible-gambling/self-exclusion", label: "Self Exclusion" },
    { href: "/responsible-gambling/gambling-limits", label: "Gambling Limits" },
    { href: "/responsible-gambling/deposit-limit", label: "Deposit Limits" },
    { href: "/responsible-gambling/self-assessment", label: "Self-Assessment" },
    {
      href: "/responsible-gambling/budget-calculator",
      label: "Budget Calculator",
    },
  ];

  const activeLink = links.find((link) => pathname === link.href);

  return (
    <div className="w-full px-[3dvw] flex justify-center">
      <div className="w-full max-w-[1200px]">
        <div className="pb-8">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="pt-6">
              <div className="flex justify-between w-full items-center">
                <div className="flex gap-2 h-[36px] items-center">
                  <svg
                    data-ds-icon="Security"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="inline-block shrink-0 text-[rgb(177,186,211)]"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M11.18 3a2.12 2.12 0 0 1 1.64 0l7.08 2.57c.73.31 1.2 1 1.2 1.77v1.65c0 8.62-4.98 11.2-7.57 12.61-.95.52-2.11.52-3.06 0C7.88 20.18 2.9 17.61 2.9 8.99V7.34c0-.76.47-1.46 1.2-1.77zM12 7a2.5 2.5 0 0 0-2.5 2.5c0 1.03.62 1.9 1.5 2.29V15c0 .55.45 1 1 1s1-.45 1-1v-3.21c.88-.39 1.5-1.27 1.5-2.29A2.5 2.5 0 0 0 12 7"
                      clipRule="evenodd"
                    ></path>
                  </svg>{" "}
                  <span className="text-[24px] text-white font-bold">
                    Responsible Gambling
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

              {pathname === "/responsible-gambling" ? (
                <></>
              ) : (
                <>
                  <div className="sticky top-8 h-fit self-start min-w-[248px] max-w-full whitespace-nowrap bg-[rgb(15,33,46)] text-grey-100 rounded-md">
                    <div className="hidden [@media(min-width:915px)]:block ">
                      <div className="py-2   w-full">
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
                </>
              )}

              {/* Mobile Dropdown */}
              {pathname.startsWith("/responsible-gambling") &&
              pathname !== "/responsible-gambling" ? (
                <div className="flex [@media(min-width:915px)]:hidden relative gap-2">
                  <div
                    onClick={() => router.push("/responsible-gambling")}
                    className="py-3 px-5 bg-[#0f212e] cursor-pointer rounded-md h-[44px] flex justify-center items-center hover:bg-[#071824]"
                  >
                    <Icon name="arrowDown" className="w-5 h-5 rotate-90" />
                  </div>
                  <div className="relative inline-block" ref={dropdownRef}>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-fit bg-[#0f212e] cursor-pointer text-white py-[10px] px-5 h-[44px] rounded-md leading-[24px] font-semibold flex items-center gap-2  transition-colors hover:bg-[#071824]"
                    >
                      <span>
                        {links.find((l) => l.href === pathname)?.label ||
                          "Menu"}
                      </span>
                      <Icon
                        name="arrowDown"
                        className={`w-5 h-5  ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-200"></div>
                        <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden w-max min-w-[8rem]">
                          {links.map((link, index) => {
                            const isActive = pathname === link.href;
                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block py-3 px-4 font-medium border-b border-gray-100 last:border-0 transition-colors ${
                                  isActive
                                    ? "text-[#1475E1] bg-blue-50"
                                    : "text-gray-700 hover:bg-gray-50"
                                } ${index === 0 ? "rounded-t-md" : ""} ${
                                  index === links.length - 1
                                    ? "rounded-b-md"
                                    : ""
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
              ) : (
                <></>
              )}

              {/* Main Content Box */}
              <div
                className={`rounded-md bg-[#0f212eff] w-full h-full overflow-hidden  ${
                  pathname === "/responsible-gambling" ? "p-0" : "p-6"
                }`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
