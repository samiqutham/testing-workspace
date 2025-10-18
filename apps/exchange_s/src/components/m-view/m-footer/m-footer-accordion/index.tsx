"use client";
import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function MFooterAccordion() {
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);
  const footerMenu = [
    {
      label: "Safer Gambling ",
      links: [
        { name: "Safer Gambling information", routerLink: "#" },
        { name: "Gordon Moody", routerLink: "#" },
        { name: "Gamcare", routerLink: "#" },
        { name: "Safer Gambling Tools", routerLink: "#" },
      ],
    },
    {
      label: "About StakeFair ",
      links: [
        { name: "About StakeFair ", routerLink: "#" },
        { name: "StakeFair Corporate", routerLink: "#" },
        { name: " Resolve a Dispute", routerLink: "#" },
      ],
    },
  ];

  const footerLinks = [
    { name: "Help", link: "#" },
    { name: "Affiliates", link: "#" },
    { name: "18+", link: "#" },
    { name: "Developers", link: "#" },
    { name: "StakeFair Exchange Sitemap name ", link: "#" },
    { name: "B2B Partnerships", link: "#" },
  ];

  const toggleAccordion = (item: string) => {
    if (expandedAccordions.includes(item)) {
      setExpandedAccordions(expandedAccordions.filter((i) => i !== item));
    } else {
      setExpandedAccordions([...expandedAccordions, item]);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-[5px] mx-[10px] mt-2">
        {footerMenu.map((item, index) => (
          <div
            key={index}
            className="border-none rounded overflow-hidden bg-[#213743ff]"
            style={{
              boxShadow:
                "rgba(0,0,0,0.2) 0px 1px 3px 0px, rgba(0,0,0,0.12) 0px 1px 2px 0px, rgba(255,255,255,0.04) 0px 1px 0px 0px inset",
            }}
          >
            <button
              onClick={() => toggleAccordion(item.label)}
              className="w-full flex items-center justify-between px-5 py-2 text-left transition-colors rounded"
            >
              <span
                className={`text-white font-semibold leading-[21px] text-sm ${expandedAccordions.includes(item.label) ? "underline" : ""}`}
              >
                {item.label}
              </span>
              <Icon
                name="questionArrow"
                className={`w-[16px] h-[16px] text-[#d5dcebff] transform transition-transform duration-300 ${
                  expandedAccordions.includes(item.label) ? "" : "-rotate-180"
                }`}
                fill="#d5dceb"
              />
            </button>
            {expandedAccordions.includes(item.label) && (
              <div className="border-t-2 border-[#2f4553]">
                <div className="flex flex-col ">
                  {item.links.map((ele: any, index) => (
                    <div key={index}>
                      <div
                        key={index}
                        className="flex justify-between items-center  w-full px-5 py-2  text-[13px] font-bold"
                      >
                        <Link
                          prefetch={true}
                          href={ele.routerLink}
                          className="flex items-center justify-between py-[5px] px-0"
                        >
                          {ele.name}
                        </Link>
                        <Icon name={"arrowNext"} className="w-5 h-5" />
                      </div>
                      {index !== item.links.length - 1 && (
                        <div
                          key={ele}
                          className="w-full h-[1px] bg-[#2f4553]"
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="space-y-[5px]">
          {footerLinks.map((link, index) => (
            <div
              key={index}
              className="border-none rounded overflow-hidden bg-[#213743ff]"
              style={{
                boxShadow:
                  "rgba(0,0,0,0.2) 0px 1px 3px 0px, rgba(0,0,0,0.12) 0px 1px 2px 0px, rgba(255,255,255,0.04) 0px 1px 0px 0px inset",
              }}
            >
              <Link
                prefetch={true}
                href={link.link}
                className="w-full flex items-center justify-between px-5 py-2 text-left transition-colors rounded"
              >
                <span className="text-white font-semibold leading-[21px] text-sm">
                  {link.name}
                </span>
                <Icon name={"arrowNext"} className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#2f4553] mt-[15px] mx-[10px]"></div>
    </>
  );
}
