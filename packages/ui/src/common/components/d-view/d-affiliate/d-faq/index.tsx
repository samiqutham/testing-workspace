"use client";
import React, { useEffect, useRef, useState } from "react";
import Icon from "@workspace/ui/icons/icons";


export default function DFaq() {
 const [expandedAccordion, setExpandedAccordion] = useState<string | null>("");
  const [activeTab, setActiveTab] = useState<string>("General");

  const toggleAccordion = (item: string) => {
    // console.log(item, "item");
    setExpandedAccordion(expandedAccordion === item ? null : item);
  };

  const tabs = [
    { label: "General" },
    { label: "Affiliate Program" },
    { label: "Earnings" },
  ];

  const accordionData = {
    "General": [
      {
        label: "What is the Stake Affiliate Program?",
        links: [
          { name: "The Stake Affiliate Program allows individuals, businesses, and influencers to earn commissions by referring new players to Stake.com.", routerLink: "" },
        ],
      },
      {
        label: "Who can join the Stake Affiliate Program?",
        links: [
          { name: "The Stake Affiliate Program is open to anyone who has a network or audience to which they can promote Stake.", routerLink: "" },
        ],
      },
      {
        label: "How do I join the Stake Affiliate Program?",
        links: [
          { name: "To begin, you need to sign up for an account on Stake.com. Once you have an account, you'll be able to start promoting your referral link and earn commission. Once you've done this, you can also get in touch with the affiliate team via the contact form to discuss personalised deals based on your audience and network.", routerLink: "" },
        ],
      },
      {
        label: "What are the benefits of joining the Stake Affiliate Program?",
        links: [
          { name: "Affiliates can enjoy competitive commission rates, real-time tracking, promotional materials, and dedicated affiliate support. As a world leading casino & sportsbook, Stake offers an exciting product that you can earn from by promoting it.", routerLink: "" },
        ],
      },
    ],
    "Affiliate Program": [
      {
        label: "How can I promote Stake as an affiliate?",
        links: [
          { name: "Affiliates can promote Stake through various channels, including social media networks, live streaming, websites & any other traffic sources they may have. We provide a range of banners, links, and other marketing promotions to help you succeed.", routerLink: "" },
        ],
      },
      {
        label: "How can I create new campaigns?",
        links: [
          { name: "Visit the campaigns section of your affiliate dashboard to effortlessly create new campaigns and optimise your results for enhanced analysis.", routerLink: "" },
        ],
      },
      {
        label: "How do I check the performance of my campaigns?",
        links: [
          { name: "You can monitor your campaign performance by visiting the campaigns section for an overview of your active campaigns and results, and by reviewing the referred users section for detailed insights into player activity and conversions.", routerLink: "" },
        ],
      },
      {
        label: "Where can I find banners & creatives to promote my campaigns?",
        links: [
          { 
            name: (
              <span>
                You can find marketing materials{" "}
                <a 
                  href="/marketing-materials" 
                  className="text-[#b1bad3] hover:text-[#FFFFF3] inline-flex items-center gap-1"
                >
                  here
                 <Icon
                  name="Share"
                  
                />
                </a>
                {" "}to use in your campaigns. Additionally, check our casino and sports promotions{" "}
                <a 
                  href="" 
                  className="text-[#b1bad3] underline-offset-2 hover:text-[#FFFFF3] underline inline-flex items-center gap-1"
                >
                  here
                
                </a>
                {" "}to boost traffic and enhance your campaign effectiveness.
              </span>
            ), 
            routerLink: "" 
          },
        ],
      },
      {
  label: "What countries can I target through my campaigns?",
  links: [
    { 
      name: (
        <span>
          You can promote Stake.com in all countries except those listed in our prohibited jurisdictions. 
          For more information, refer to the{" "}
          <a 
            href="" 
            className="text-[#b1bad3] underline underline-offset-2 hover:text-[#FFFFF3] inline-flex items-center gap-1"
          >
            Stake Terms of Service
          </a>.
        </span>
      ), 
      routerLink: "" 
    },
  ],
}

    ],
    "Earnings": [
         {
  label: "What countries can I target through my campaigns?",
  links: [
    { 
      name: (
        <span>
          As a default, the commission is set to 10% wager share commission which is calculated as {" "}
          <a 
            href="" 
            className="text-[#b1bad3] underline underline-offset-2 hover:text-[#FFFFF3] inline-flex items-center gap-1"
          >
          follows
          </a>.
        </span>
      ), 
      routerLink: "" 
    },
  ],
},

      {
        label: "How much commission can I earn by becoming an affiliate?",
        links: [
          { name: "There’s no limit to your earnings; it depends on the number of referrals you generate and their wagering activity.", routerLink: "" },
        ],
      },
    {
  label: "When and how do I get paid?",
  links: [
    { 
      name: (
        <span>
          As a wager share affiliate, you can claim your commission instantly from the{" "}
          <a 
            href="/funds" 
            className="text-[#b1bad3] underline underline-offset-4 hover:text-[#FFFFF3] inline-flex items-center gap-1"
          >
            funds tab
          </a>. 
          The commission will continue to generate as long as there is wagering activity under your campaigns, 
          and you can transfer any available balance to your Stake wallet at any time.
        </span>
      ), 
      routerLink: "" 
    },
  ],
},
{
  label: "Can I track my earnings in real-time?",
  links: [
    { 
      name: (
        <span>
          Yes, you can track your earnings in real-time using the{" "}
          <a 
            href="/campaigns" 
            className="text-[#b1bad3] underline underline-offset-4 hover:text-[#FFFFF3] inline-flex items-center gap-1"
          >
            campaigns tab
          </a>, 
          which provides data on your available commission, withdrawn commission, 
          and lifetime commissions earned through your campaigns.
        </span>
      ), 
      routerLink: "" 
    },
  ],
}
],
  };


  const currentAccordionData = accordionData[activeTab as keyof typeof accordionData] || [];

  return (
    <div>
      <div className="flex flex-col w-full pb-0 ">
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-thin [scrollbar-color:#2f4553_transparent] translate-x-0 translate-y-0 transform [transform:none]">
          <div className="flex bg-[rgb(26,44,56)] rounded-[3rem] py-[0.375rem] px-[6px] shrink-0">
            <div className="flex font-semibold">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`inline-flex items-center gap-2 justify-center 
                     font-semibold whitespace-nowrap transition font-["proxima-nova",ui-sans-serif,-apple-system,system-ui,sans-serif]
                     disabled:pointer-events-none disabled:opacity-50
                     focus-visible:outline-2 focus-visible:outline-offset-2 
                     active:scale-95 
                     ${activeTab === tab.label 
                       ? 'bg-[#2f4553] text-white' 
                       : 'bg-[#0000] text-white hover:bg-[#2f4553]'
                     } 
                    focus-visible:outline-white 
     py-2.5 px-5 rounded-full 
     ${index > 0 ? 'ml-[6px]' : 'ml-0'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-[1rem] mt-[1.5rem]">
          <div className="grid w-full gap-3">
            {currentAccordionData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-full relative z-0 border-none !rounded-[8px] overflow-hidden bg-[#213743ff]
                [box-shadow:0_1px_3px_0_rgba(0,0,0,.2),0_1px_2px_0_rgba(0,0,0,.12),inset_0_1px_rgba(255,255,255,.04)]"
              >
                <button
                  onClick={() => toggleAccordion(item.label)}
                  className="flex justify-between items-center text-left w-full z-4 bg-transparent 
                py-[0.75rem] px-[1rem] text-[rgb(213,220,235)] cursor-pointer rounded-[8px] hover:bg-[rgba(47,69,83,0.3)] "
                >
                  <div className="w-full">
                    <span className="text-white font-semibold leading-[21px] text-[16px]">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Icon
                      name="questionArrow"
                      className={`w-[16px] h-[16px] shrink-0 inline-block text-[#d5dcebff] ${
                        expandedAccordion === item.label ? "rotate-180" : ""
                      }`}
                      fill="#d5dceb"
                    />
                  </div>
                </button>
                {expandedAccordion === item.label && (
                  <div className="flex flex-col w-full bg-[rgb(33,55,67)] border-t-2 border-[#2f4553]">
                    <div className="">
                      <div className="w-full p-4">
                        <div className="flex flex-col w-full">
                          <div className="flex flex-col gap-2">
                            {item.links.map((ele: any, index) => (
                              <div
                                className="text-[#D5DCEB] mt-0 hover:text-white text-[16px] font-normal cursor-pointer"
                                key={index}
                              >
                                {typeof ele.name === 'string' ? ele.name : ele.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}