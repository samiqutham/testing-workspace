"use client";

import * as React from "react";

import Icon from "@workspace/ui/icons/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";

type MenuItem = {
  label: string;
  href?: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const footerMenus: MenuGroup[] = [
  {
    title: "Safer Gambling",
    items: [
      { label: "Safer Gambling Information", href: "#" },
      { label: "Gamcare", href: "#" },
      { label: "Gordon Moody", href: "#" },
      { label: "Safer Gambling Tools", href: "#" },
    ],
  },
  {
    title: "About StakeFair",
    items: [
      { label: "Resolve a Dispute", href: "#" },
    ],
  },
];

const staticLinks: MenuItem[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Privacy Preference Centre", href: "#" },
  { label: "Help", href: "#" },
  { label: "Rules & Regulations", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Developers", href: "#" },
  { label: "B2B Partnerships", href: "#" },
];

export default function DFooter() {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  return (
    <footer className="text-xs pb-8 text-[#B1BAD3]">
      {/* <div className="max-w-[1200px] mx-auto"> */}
      {/* Caution Banner */}
      <div className="flex items-center justify-center gap-3 bg-[#213743] py-[10px] text-[12px] leading-[12px]">
        <div
          className="w-9 h-9 bg-[url('/age.webp')] bg-contain bg-no-repeat"
          aria-label="18+"
        />
        <p className="m-0 font-bold text-[12px] leading-[12px]">Please Gamble Responsibly</p>
        <a
          href="#"
          className="bg-[#2f4553] px-[17px] py-[10px] rounded-[2px] font-medium text-white leading-normal"
        >
          More details
        </a>
      </div>

      {/* Warning */}
      <div className="text-center px-[10px] pt-[30px] pb-[15px] text-[12px] leading-[12px]">
        <p className="">
          <strong className="text-white">Warning: </strong>
          Although the current score, time elapsed, video and other data
          provided on this site is sourced from live feeds provided by third
          parties, you should be aware that this data may be subject to a time
          delay and/or be inaccurate. Please also be aware that other
          customers may have access to faster and/or more accurate data. If
          you rely on this data to place bets, you do so entirely at your own
          risk. We provide this data AS IS with no warranty as to accuracy,
          completeness or timeliness, and accept no responsibility for any
          loss suffered as a result.
        </p>
      </div>

      {/* Links with Clickable Popovers */}
      <div className="w-full max-w-[1247px] mx-auto text-center py-4">
        <ul className="inline-flex flex-wrap justify-center items-center gap-x-2 text-[12px] leading-[13px] font-bold">
          {footerMenus.map((menu, index) => (
            <li key={menu.title} className="relative cursor-pointer">
              <Popover
                open={openMenu === menu.title}
                onOpenChange={(open) =>
                  setOpenMenu(open ? menu.title : null)
                }
              >
                <PopoverTrigger asChild>
                  <button className="flex items-center text-[12px] leading-[16px] gap-1 pr-2 border-r border-gray-700 cursor-pointer ">
                    <span className='hover:underline'>{menu.title}</span>
                    <span>{openMenu === menu.title ? "−" : "+"}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  align="center"
                  className={`absolute z-50 bg-[#e1e1e1] text-black rounded shadow-md p-[10px] w-max max-w-xs
                     ${index === 0 ? "left-[-58px] top-[-58px]" : ""}
          ${index === 1 ? "left-[-58px] top-[-44px]" : ""}`
                  }
                >
                  {/* Tooltip Arrow / Cap */}
                  <span
                    className="absolute -bottom-[6px] left-[37px] -translate-x-1/2 
    w-0 h-0 border-l-[6px] border-l-transparent 
    border-r-[6px] border-r-transparent 
    border-t-[6px] border-t-[#e1e1e1] drop-shadow-md"
                  ></span>

                  {/* Tooltip Content */}
                  <div className={`grid gap-x-12
                    ${index === 0 ? "grid-cols-2" : ""}`}>
                    {menu.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block text-[12px] pr-[7px] pl-[4px] w-full leading-[16px] text-left text-nowrap whitespace-nowrap hover:underline"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </PopoverContent>

              </Popover>
            </li>
          ))}

          {staticLinks.map((link, idx) => (
            <li
              key={link.label}
              className={`${idx !== staticLinks.length - 1 ? "pr-2 border-r border-gray-700" : ""
                }`}
            >
              <a href={link.href} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t-1 border-[#213743]"></div>

      {/* Brand */}
      <div className="flex justify-center py-[18px]">
        <a href="/" className="text-white cursor-pointer">
          <Icon
            name={"logo"}
            className="w-[105px] h-[33.47px]"
            fill="white"
          />
        </a>
      </div>
      {/* </div> */}
    </footer>
  );
}
