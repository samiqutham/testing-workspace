"use client";

import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import VerificationModal from "@workspace/ui/common/components/d-view/d-settings/verificationmodal";
import AffiliateLoader from "./loader";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

      // Hide loader once route changes
useEffect(() => {
  setLoading(true);
  const timer = setTimeout(() => {
    setLoading(false); 
  }, 300); 

  return () => clearTimeout(timer); 
}, [pathname]);


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
    { href: "/settings/account", label: "Account" },
    { href: "/settings/security", label: "Security" },
    { href: "/settings/preferences", label: "Preferences" },
    { href: "/settings/api", label: "API" },
    { href: "/settings/verification", label: "Verification" },
    { href: "/settings/offers", label: "Offers" },
  ];

  const activeLabel = links.find((l) => l.href === pathname)?.label || "Menu";

  return (
    <div className="w-full px-[3dvw]">
      <div className="w-full max-w-[1200px]">
        <div className="pb-8">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="pt-6">
              <div className="flex justify-between w-full items-center">
                <div className="flex gap-2 h-[36px] items-center">
                  <Icon name="settings" className="w-6 h-6" fill="#b1bad3ff" />
                  <span className="text-[24px] text-white font-bold">
                    Settings
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
              <div className="sticky top-6 h-fit self-start min-w-[180px] max-w-full bg-[rgb(15,33,46)] text-grey-100 rounded-md hidden [@media(min-width:915px)]:block">
                <div className="py-2 w-full">
                  {links.map((link) => {
                    const isActive = pathname === link.href;
                    if (link.label === "Verification") {
                      return (
                        <div
                          key={link.href}
                          onClick={() => {
                            
                            setIsVerificationOpen(true);
                           
                                router.push(link.href);
                          }
                          }
                          
                          className={`py-[10px] w-full px-5 cursor-pointer transition-colors font-semibold text-white ${
                            isActive
                              ? "bg-[#071824] pr-5 pl-[17px] border-l-[3px] border-[#1475E1]"
                              : "hover:bg-[#071824]"
                          }`}
                        >
                          {link.label}
                        </div>
                      );
                    }
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

              {/* Mobile Back Button + Dropdown */}
              {pathname.startsWith("/settings") && pathname !== "/settings" && (
                <div className="flex [@media(min-width:915px)]:hidden relative gap-2">
                  {/* Back button */}
                  <div
                    onClick={() =>
                       {
                      setLoading(true); router.push("/settings")}}
                    className="py-3 px-5 bg-[#0f212e] cursor-pointer rounded-md h-[44px] flex justify-center items-center hover:bg-[#071824]"
                  >
                    <Icon name="arrowDown" className="w-5 h-5 rotate-90" />
                  </div>

                  {/* Dropdown */}
                  <div className="relative inline-block" ref={dropdownRef}>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-fit bg-[#0f212e] text-white py-[10px] px-5 h-[44px] rounded-md font-semibold flex items-center gap-2 hover:bg-[#071824]"
                    >
                      <span>{activeLabel}</span>
                      <Icon
                        name="arrowDown"
                        className={`w-5 h-5 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-200"></div>
                        <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden w-max min-w-[8rem]">
                          {links.map((link, index) => {
                            const isActive = pathname === link.href;

                            // 🔑 Special handling for Verification link
                            if (link.label === "Verification") {
                              return (
                                <div
                                  key={link.href}
                                  onClick={() => {
                                     setLoading(true);
                                    setIsOpen(false);
                                    setIsVerificationOpen(true); // ✅ Open modal
                                  }}
                                  className={`block py-3 px-4 font-medium border-b border-gray-100 last:border-0 transition-colors cursor-pointer ${
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
                                </div>
                              );
                            }

                            // 🔗 Normal links
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
              )}

              {/* Main Content */}
             <div
                className={`relative rounded-md bg-[#0f212eff] w-full h-full ${pathname === "/affiliate" ? "p-0" : "p-6"
                  }`}
              >
                {children}

                {/* Overlay Loader */}
                {loading && (
                  <div className="absolute inset-0 flex rounded-md justify-center z-50 bg-[#1a2c38]/60 bg-opacity-70">
                    <AffiliateLoader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {isVerificationOpen && (
        <VerificationModal onClose={() => setIsVerificationOpen(false)} />
      )}
    </div>
  );
}
