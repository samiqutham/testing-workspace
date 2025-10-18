"use client";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import React, { useState, useRef, useEffect } from "react";

// --- Icons ---
const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block shrink-0"
  >
    <path
      fill="currentColor"
      d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10v2l3.54-2.66C19.31 18.91 22 15.27 22 11c0-5.52-4.48-10-10-10m-.5 3c.83 0 1.5.67 1.5 1.5S12.33 7 11.5 7 10 6.33 10 5.5 10.67 4 11.5 4M15 17H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-5H9c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1v6h2c.55 0 1 .45 1 1s-.45 1-1 1"
    />
  </svg>
);

const SortIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block shrink-0 text-gray-300"
  >
    <path
      fill="currentColor"
      d="M20 3H4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4m-8 7H4a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4m-4 7H4a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4m10.75 3.71 3.96-3.96a.996.996 0 1 0-1.41-1.41l-2.25 2.25V10a1.003 1.003 0 0 0-1.71-.71c-.18.18-.29.43-.29.71v7.59l-2.25-2.25a.996.996 0 1 0-1.41 1.41l3.96 3.96c.39.39 1.02.39 1.41 0z"
    />
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[rgb(177,186,211)]">
    <path fill="currentColor" d="M22 3H2l7 10.5V21h6v-7.5z"></path>
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      d="M20 19H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1m-8.71-2.29c.09.09.2.17.33.22.12.05.25.08.38.08s.26-.03.38-.08.23-.12.33-.22l4-4a.996.996 0 1 0-1.41-1.41l-2.29 2.29V4c0-.55-.45-1-1-1s-1 .45-1 1v9.59L8.72 11.3a.996.996 0 1 0-1.41 1.41l4 4z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      d="M11 18v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 1 1 2 0v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      d="M4.293 4.293a1 1 0 0 1 1.338-.069l.076.069L12 10.586l6.293-6.293.076-.069a1 1 0 0 1 1.407 1.407l-.069.076L13.414 12l6.293 6.293.069.076a1 1 0 0 1-1.407 1.406l-.076-.068L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707l-.068-.076a1 1 0 0 1 .068-1.338"
    />
  </svg>
);

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block shrink-0 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
      }`}
  >
    <path
      fill="currentColor"
      d="M17.293 8.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6-.068-.076A1 1 0 0 1 6.63 8.225l.076.068L12 13.586z"
    />
  </svg>
);

const CopyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      d="M14 8H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2"
    />
    <path
      fill="currentColor"
      d="M22 4v10c0 1.1-.9 2-2 2h-2v-6c0-2.21-1.79-4-4-4H8V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block shrink-0 text-[rgb(177,186,211)]"
  >
    <path
      fill="currentColor"
      d="m22.71 21.29-4.82-4.82a9.47 9.47 0 0 0 2.12-5.97c0-5.25-4.25-9.5-9.5-9.5S1 5.25 1 10.5 5.25 20 10.5 20c2.26 0 4.34-.79 5.97-2.12l4.82 4.82c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 0 0 0-1.41M3 10.5C3 6.36 6.36 3 10.5 3S18 6.36 18 10.5 14.64 18 10.5 18 3 14.64 3 10.5"
    />
  </svg>
);

// --- Sort Dropdown Component ---
function SortDropdown({
  selectedSort,
  onSortChange,
  isOpen,
  onToggle,
  isMobile = false,
}: {
  selectedSort: string;
  onSortChange: (sort: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    "Date Created: New to Old",
    "Date Created: Old to New",
    "Overall Commission: High to Low",
    "Overall Commission: Low to High",
    "Referred Users: High to Low",
    "Referred Users: Low to High",
    "First Time Depositor Count: High to Low",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div
      className={`relative ${isMobile ? "w-full" : "flex-1 min-[1200px]:flex-none"}`}
      ref={dropdownRef}
    >
      <button
        onClick={onToggle}
        className={`bg-[#2f4553] text-white px-4 py-2 rounded-md flex items-center justify-between w-full ${isMobile ? "" : "min-[1200px]:w-[280px]"
          } hover:bg-[#3a5a6b] whitespace-nowrap`}
      >
        <span className="truncate font-semibold">{selectedSort}</span>
        <ChevronDownIcon open={isOpen} />
      </button>

      {isOpen && (
        <div
          className={`absolute ${isMobile ? "left-0 w-full" : "left-1/2 -translate-x-1/2 w-max"
            } top-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50`}
        >
          {/* Tooltip Arrow */}
          {!isMobile && (
            <div
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-200"
              style={{
                clipPath: "polygon(0% 0%, 100% , 0% )",
              }}
            ></div>
          )}

          {/* Options */}
          <div className="py-1 max-h-72 overflow-y-auto font-semibold relative top z-10 bg-white rounded-md">
            {sortOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onSortChange(option);
                  onToggle();
                }}
                className={`block w-full text-left px-3 py-2 ${selectedSort === option
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
  );
}

// --- Filter Modal Component ---
function FilterModal({ onClose }: { onClose: () => void }) {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
   const modalRef = useRef<HTMLDivElement>(null);
  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);


  const campaigns = [
    { id: "all", name: "All (2)" },
    { id: "448ec592-e8f1-433b-9528-c52da4975c23", name: "saad (O8rrCZee)" },
    {
      id: "3515e956-76e0-4b5e-b85e-22b0201ad288",
      name: "Flynnmccarthy (SEUfEkrD)",
    },
  ];

  const handleCheckboxChange = (id: string) => {
    if (id === "all") {
      setSelectedCampaigns(
        selectedCampaigns.length === campaigns.length - 1
          ? []
          : campaigns.filter((c) => c.id !== "all").map((c) => c.id)
      );
    } else {
      setSelectedCampaigns((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const clearSelection = () => {
    setSelectedCampaigns([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[99999]">
      <div ref={modalRef} className="bg-[#1a2c38] rounded-md shadow-lg w-full max-w-[500px] mx-4 max-h-[calc(100%-4em)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FilterIcon />
            <h3 className="text-white text-lg font-semibold">Filter</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form className="flex flex-col flex-1">
            <div className="flex flex-col px-4">
              <label className="inline-flex relative flex-col-reverse items-start">
                <div className="relative w-full mt-2">
                  <div className="before-icon absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Campaign Name or Campaign ID"
                    className="w-full bg-[rgb(15,33,46)] border border-[#2f4553] rounded-md p-2 pl-10 text-white
             focus:outline-none focus:ring-2 focus:ring-gray-400
             hover:border-gray-600 transition-colors duration-200"
                  />

                </div>
                <span className="text-[16px] font-semibold text-[#B1BAD3] mb-2">
                  Filter by Campaign Name or Campaign ID
                </span>
              </label>
            </div>
            <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto px-4 mt-4">
              {campaigns.map((campaign) => {
                const isChecked =
                  campaign.id === "all"
                    ? selectedCampaigns.length === campaigns.length - 1
                    : selectedCampaigns.includes(campaign.id);

                return (
                  <label
                    key={campaign.id}
                    className="inline-flex items-center flex-row-reverse cursor-pointer"
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(campaign.id)}
                      className="hidden"
                    />
                    <span
                      className={`w-6 h-6 border-2 rounded mt-0.5 mr-2 flex-shrink-0 flex items-center justify-center
             border-[rgb(47,69,83)]
            hover:border-gray-500 transition-colors duration-200`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[16px] font-semibold text-gray-300 text-ellipsis whitespace-nowrap overflow-hidden max-w-[428px]">
                      {campaign.name}
                    </span>
                  </label>
                );
              })}
            </div>


            <div className="flex gap-2 px-4 pb-4 pt-2 mt-4">
              <button
                type="button"
                onClick={clearSelection}
                className="bg-[#4b5563] text-white px-4 py-2 rounded-md hover:bg-[#6b7280] transition-colors w-full font-semibold"
              >
                Clear Selection
              </button>
              <button
                type="submit"
                onClick={onClose}
                className="bg-[#1475e1] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full font-semibold"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- Export Modal Component ---
function ExportModal({ onClose }: { onClose: () => void }) {
  const [selectedCampaign, setSelectedCampaign] = useState("");
   const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[99999]">
      <div ref={modalRef} className="bg-[#1a2c38] rounded-md shadow-lg w-full max-w-[500px] mx-4 max-h-[calc(100%-4em)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DownloadIcon />
            <h3 className="text-white text-lg font-semibold">Export</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-4">
            <form className="flex flex-col">
              <div className="flex flex-col pb-4">
                <label className="inline-flex relative flex-col-reverse items-start">
                  <select
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full bg-[rgb(15,33,46)] border border-[#2f4553] rounded-md p-2 text-white appearance-none pr-10 focus:outline-none focus:border-[#2f4553] focus:ring-0"
                  >
                    <option value="">All Campaigns</option>
                    <option value="448ec592-e8f1-433b-9528-c52da4975c23">
                      saad
                    </option>
                    <option value="3515e956-76e0-4b5e-b85e-22b0201ad288">
                      Flynnmccarthy
                    </option>
                  </select>
                  <div className="dropdown-icon-wrap absolute right-3  transform -translate-y-1/2 pointer-events-none">
                    <ChevronDownIcon open={false} />
                  </div>
                  <span className="text-[14px] font-semibold text-[#B1BAD3] mb-2">
                    Select Export Campaign
                  </span>
                </label>
              </div>

              <button
                type="submit"
                onClick={onClose}
                className="bg-[#1475e1] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1a2c38]"
              >
                Export as CSV
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Create Campaign Modal ---
function CreateCampaignModal({ onClose }: { onClose: () => void }) {
  const [campaignName, setCampaignName] = useState("");
  const [campaignId, setCampaignId] = useState("HC1ffe3");
  const referralLink = `stake.com/r?c=${campaignId}`;
  const modalRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[99999]">
      <div ref={modalRef} className="bg-[#1a2c38] rounded-md shadow-lg w-full max-w-lg mx-4">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PlusIcon />
            <h3 className="text-white text-lg font-semibold">
              Create Campaign
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Campaign Name */}
            <div className="flex flex-col gap-2">
              <div className="text-[16px] font-semibold text-gray-300">
                Campaign Name <span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="bg-[#2f4553] border border-[#2f4553] rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter campaign name"
              />
            </div>

            {/* Campaign ID */}
            <div className="flex flex-col gap-2">
              <div className="text-[16px] font-semibold text-gray-300">
                Campaign ID <span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="bg-[#2f4553] border border-[#2f4553] rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Referral Link */}
            <div className="flex flex-col gap-2">
              <div className="text-[16px] font-semibold text-gray-300">
                Referral Link
              </div>
              <input
                type="text"
                value={referralLink}
                readOnly
                className="bg-[#2f4553] border border-[#2f4553] rounded-md p-2 text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors font-semibold shadow-md"
            >
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Campaign Accordion Component ---
function CampaignAccordion({
  campaign, compareMode
}: {
  campaign: {
    name: string;
    code: string;
    created: string;
    hits: number;
    referred: number;
    ftd: number;
    deposits: number;
    rate: number;
    commission: string;
    available: string;
    link: string;
  };
  compareMode: boolean;
}) {
  const [open, setOpen] = useState(false);

  const [affiliateLink] = useState("stake.com/?c=SEUEkrD");
  const [copied, setCopied] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };
  const handleCheckboxClick = (e: any) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
  };

  //main-list
  return (
    <div className="flex w-full" onClick={() => setOpen(!open)}>
      <>
        {compareMode && (
          <div className="flex items-center">
            {/* Hidden checkbox (accessible but invisible) */}
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxClick}
              className="hidden"
            />

            {/* Custom styled checkbox span */}
            <span
              onClick={handleCheckboxClick}
              className={`w-6 h-6 border-2 rounded mr-2 flex-shrink-0 flex items-center justify-center cursor-pointer
               border-gray-500 hover:border-gray-400 transition-colors duration-200
              ${isChecked ? "bg-[#2f4553] " : ""}`}
            >
              {isChecked && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
          </div>
        )}
      </>


<div className="border justify-between border-[#2f4553] rounded-md overflow-hidden w-full">
       
  <div
    className={`flex justify-between items-center bg-[#213743] px-4 py-3 cursor-pointer  
    ${open ? " border-b border-solid border-[#2f4553] " : ""}`}
    onClick={(e) => { setOpen(!open); e.stopPropagation(); }}
  >

    {/* Left Section with Checkbox + Campaign Info */}
    <div className="flex items-center gap-3 w-full">
      <div className="flex w-full gap-2 justify-between items-center flex-col md:flex-row">
        <div className="flex-shrink-0 w-full md:w-auto">
          <span className="text-white font-medium break-all text-sm md:text-base">
            {campaign.name} ({campaign.code})
          </span>
        </div>
        
        <div className="flex gap-2 items-center flex-shrink-0 w-full md:w-auto justify-between md:justify-start">
          <span className="text-neutral-subtle ds-body-md-strong whitespace-nowrap text-sm md:text-base" data-ds-text="true">
           First Time Deposits:
          </span>
          <span className="text-neutral-subtle ds-body-md whitespace-nowrap text-sm md:text-base" data-ds-text="true">
            {campaign.ftd}
          </span>
        </div>
      </div>
    </div>

    {/* Chevron Icon */}
    <div className="flex items-center flex-shrink-0 ml-2">
      <ChevronDownIcon open={open} />
    </div>
  </div>
{/* Body */}
        {open && (
          <>
          <div onClick={(e) => e.stopPropagation()}>
            <div className="p-4 bg-[#213743]">
              <div className="bg-[#213743]  flex flex-col md:flex-row gap-6">
                {/* Left: Performance Summary */}
                <div className="flex-1 flex flex-col gap-4">
                  <h4 className="text-white font-semibold">Performance Summary</h4>
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#b1bad3]">Campaign Created Date</span>
                    <span className="text-white">{campaign.created}</span>
                  </div>
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#b1bad3]">Campaign Hits</span>
                    <span className="text-white font-semibold">{campaign.hits}</span>
                  </div>
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#b1bad3]">Referred Users</span>
                    <span className="text-white font-semibold">
                      {campaign.referred}
                    </span>
                  </div>
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#b1bad3]">First Time Deposits</span>
                    <span className="text-white font-semibold">{campaign.ftd}</span>
                  </div>
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#b1bad3]">Total Deposits</span>
                    <span className="text-white font-semibold">
                      {campaign.deposits}
                    </span>
                  </div>
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#b1bad3]">Commission Rate</span>
                    <span className="text-white font-semibold">{campaign.rate}%</span>
                  </div>
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#b1bad3]">Overall Commission</span>
                    <span className="text-white font-semibold">
                      {campaign.commission} USD
                    </span>
                  </div>
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#b1bad3]">
                      Overall Available Commission
                    </span>
                    <span className="text-white">{campaign.available}</span>
                  </div>
                </div>
                <span

                  className="ds-body-md border-l-2 border-solid border-[#2f4553] pl-2 "
                  data-ds-text="true"
                >
                </span>

                {/* Right: Share Campaign */}
                <div className="flex-1 flex flex-col gap-4">
                  <h4 className="text-white font-semibold">Share Campaign</h4>
                  <span className="text-gray-400 text-[16px]">Campaign Link</span>
                  {/* <div className="flex">
      <input
        type="text"
        value={campaign.link}
        readOnly
        className="flex-1 bg-[#2f4553] border border-[#2f4553] rounded-l-md p-2 text-white text-[16px] truncate"
      />
      <button
        onClick={handleCopy}
        className="bg-[#2f4553] px-3 flex items-center justify-center rounded-r-md hover:bg-[#3a5a6b]"
      >
        <CopyIcon />
      </button>
    </div> */}

                  <TooltipProvider>
                    <Tooltip open={copied}>
                      <TooltipTrigger asChild>
                        <div className="flex relative">
                          <input
                            type="text"
                            value={affiliateLink}
                            readOnly
                            className="flex-1 bg-[#2f4553] border-2 border-[#2f4553] rounded-l-md p-2 text-white text-sm font-semibold focus:outline-none " />
                          <button
                            type="button"
                            onClick={handleCopy}
                            className="bg-[#2f4553] px-3 flex items-center justify-center rounded-r-md hover:bg-[#3a5a6b]"
                          >
                            <CopyIcon />
                          </button>
                        </div>
                      </TooltipTrigger>

                      <TooltipContent
                        side="top"
                        align="end"
                        sideOffset={4}
                        className="bg-white relative text-[#0F212E] text-[14px] px-3 py-2 rounded-sm shadow-md"
                      >
                        Copied!
                        <TooltipArrow className="fill-white   absolute left-[28px] visible" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* <div className="flex justify-end">
      <button className="bg-[#2f4553] text-white px-4 py-2 rounded-md hover:bg-[#3a5a6b]">
        Export CSV
      </button>
    </div> */}
                </div>

              </div>

            </div>
            <div className="px-4 bg-[#213743]">
              <hr className="border-t-2 border-solid border-[#2f4553]" />
            </div>
            <div className="p-4 bg-[#213743]">
              <div className="flex justify-end">
                <button className="bg-[#2f4553] text-white px-[20px] py-[10px] rounded-md hover:bg-[#3a5a6b] w-full lg:w-auto">
                  Export CSV
                </button>
              </div>

            </div>
            </div>
          </>

        )}
</div>
    </div>
  );
}

// --- Main Campaigns Component ---
export default function Campaigns() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);


  const [selectedSort, setSelectedSort] = useState(
    "First Time Depositor Count: High to Low"
  );

  const campaigns = [
    {
      name: "Flynnmccarthy",
      code: "SEUfEkrD",
      created: "9/24/2025",
      hits: 0,
      referred: 0,
      ftd: 0,
      deposits: 0,
      rate: 10,
      commission: "$0.00",
      available: "No Commission Available",
      link: "https://example.com/flynn",
    },
    {
      name: "saad",
      code: "O8rrCZee",
      created: "9/25/2025",
      hits: 0,
      referred: 0,
      ftd: 0,
      deposits: 0,
      rate: 10,
      commission: "$0.00",
      available: "No Commission Available",
      link: "https://example.com/saad",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-white font-bold text-[20px] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] " >Campaigns</h2>
        <span className="text-[#d5dceb] text-base font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
          See the performance of all your campaigns in one simple view below.
        </span>
      </div>

     {/* Campaign Overview Stats */}
      <div className="flex flex-col rounded-md bg-[#213743] p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {/* Campaign Hits */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-[rgb(213,220,235)] font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]">
                Campaign Hits
              </span>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button className="inline-flex items-center text-[#9ca3af] hover:text-white">
                      <InfoIcon />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="bg-white text-[#0F212E] text-[14px] font-normal px-3 py-3 rounded-lg shadow-lg max-w-xs"
                  >
                 <p>
  <span className="font-semibold"></span> Campaign Hits:This refers to the number of hits (all clicks or visits from users) from specific campaign.
</p>
<p className="text-sm  mt-2">
  *All data featured across this overview is updated at least once every hour.
</p>
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-white font-bold text-base">0</span>
          </div>

          {/* Referred Users */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold text-[rgb(213,220,235)]">
                Referred Users
              </span>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button className="inline-flex items-center text-[#9ca3af] hover:text-white">
                      <InfoIcon />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="bg-white text-[#0F212E] text-[14px] font-normal px-3 py-3 rounded-lg shadow-lg max-w-xs"
                  >
                 <p>
  <span className="font-semibold text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]"></span>{" "}
 Referred Users: This refers to all users referred through the specific campaign.
</p>
<p className="text-sm mt-2">
  *All data featured across this overview is updated at least once every hour.
</p>
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-white font-bold text-base">0</span>
          </div>

          {/* First Time Deposits */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold text-[rgb(213,220,235)]">
                First Time Deposits
              </span>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button className="inline-flex items-center text-[#9ca3af] hover:text-white">
                      <InfoIcon />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="bg-white text-[#0F212E] text-[14px] font-normal px-3 py-3 rounded-lg shadow-lg max-w-xs"
                  >
                    <p>
  <span className="font-semibold text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]"></span>{" "}
  First Time Deposits (FTD): This shows new depositors who make their first deposit with Stake through your campaign.
</p>
<p className="text-sm  mt-2">
  *All data featured across this overview is updated at least once every hour.
</p>
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-white font-bold text-base">0</span>
          </div>

          {/* Total Deposits */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold text-[rgb(213,220,235)]">
                Total Deposits
              </span>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button className="inline-flex items-center text-[#9ca3af] hover:text-white">
                      <InfoIcon />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="bg-white text-[#0F212E] text-[14px] font-normal px-3 py-3 rounded-lg shadow-lg max-w-xs"
                  >
                    <p>
                      <span className="font-semibold"></span> <p>
  <span className="font-semibold text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]"></span>{" "}
 Total Deposits:This refers to all the deposits made across your currently active campaigns.
</p>
<p className="text-sm  mt-2">
  *All data featured across this overview is updated at least once every hour.
</p>
                    </p>
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-white font-bold text-base">0</span>
          </div>

          {/* Overall Commission */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold text-[rgb(213,220,235)]">
                Overall Commission
              </span>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button className="inline-flex items-center text-[#9ca3af] hover:text-white">
                      <InfoIcon />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="bg-white text-[#0F212E] text-[14px] font-normal px-3 py-3 rounded-lg shadow-lg max-w-xs"
                  >
                    <p>
                      <span className=" text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif] font-semibold"></span>{" "}
                    <p>
  <span className="font-semibold text-sm font-[proxima-nova,ui-sans-serif,-apple-system,system-ui,sans-serif]"></span>{" "}
  Overall Commission:This refers to the total overall commission (estimated in USD) across your currently active campaigns.
</p>
<p className="text-sm  mt-2">
  *All data featured across this overview is updated at least once every hour.
</p>
                    </p>
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="inline-flex items-center gap-1 text-white font-bold text-base">
              <span>$0.00</span>
              <span className="text-[16px] font-semibold text-white">
                USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Toolbar (for screens above 915px) */}
      <>
        {/*  Desktop Toolbar */}
        <div className="hidden min-[1201px]:flex min-[1201px]:flex-row gap-4 min-[916px]:justify-between min-[916px]:items-center">
          {compareMode ? (
            <div className="flex items-center justify-between w-full   ">
              <span className="text-base text-[#ffff] font-semibold">
                Select up to five campaigns to compare
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCompareMode(false)}
                  className="px-[20px] py-[10px] rounded-md bg-[#2f4553]  text-[#ffff] hover:bg-[#2f4553]"
                >
                  Cancel
                </button>
                <button disabled className="px-[20px] py-[10px] disabled rounded-md bg-blue-500 text-white hover:bg-blue-600">
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Sort Section */}
              <div className="flex">
                <div className="flex mr-2 mt-1 flex-row gap-2 items-center">
                  <span className="flex items-center gap-2 text-[#b1bad3] font-semibold">
                    <SortIcon /> Sort
                  </span>
                </div>
                <div>
                  <SortDropdown
                    selectedSort={selectedSort}
                    onSortChange={setSelectedSort}
                    isOpen={isSortDropdownOpen}
                    onToggle={() =>
                      setIsSortDropdownOpen(!isSortDropdownOpen)
                    }
                    isMobile={false}
                  />
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="bg-[#2f4553] text-white px-[20px] py-[10px] rounded-md hover:bg-[#3a5a6b] flex-shrink-0"
                >
                  <FilterIcon />
                </button>
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="bg-[#2f4553] text-white px-[20px] py-[10px] rounded-md hover:bg-[#3a5a6b] flex-shrink-0"
                >
                  <DownloadIcon />
                </button>
                <button
                  onClick={() => setCompareMode(true)}
                  className="bg-[#2f4553] text-white px-[20px] py-[10px] rounded-md hover:bg-[#3a5a6b] flex-shrink-0"
                >
                  Compare
                </button>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-blue-500 text-white px-[20px] py-[10px] rounded-md hover:bg-blue-600 flex-shrink-0"
                >
                  Create Campaign
                </button>
              </div>
            </>
          )}
        </div>


      </>

      {/* Mobile Toolbar (for screens 915px and below) */}
    <div className="flex flex-col gap-3 max-[1200px]:block min-[1201px]:hidden">
  {compareMode ? (
    // ✅ Compare Mode (Mobile)
    <div className="flex flex-col gap-3">
      <span className="text-sm text-white font-semibold text-center">
        Select up to five campaigns to compare
      </span>

      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setCompareMode(false)}
          className="px-[20px] py-[10px] rounded-md bg-[#2f4553] text-white hover:bg-[#3a5a6b] w-1/2"
        >
          Cancel
        </button>
        <button
          disabled
          className="px-[20px] py-[10px] rounded-md bg-blue-500 text-white hover:bg-blue-600 w-1/2 disabled:opacity-60"
        >
          Apply
        </button>
      </div>
    </div>
  ) : (
    <>
      {/* First Row: Compare Button with Filter and Export Icons */}
      <div className="flex mb-2 gap-2 items-center">
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="bg-[#2f4553] text-white p-3 rounded-md hover:bg-[#3a5a6b] flex-shrink-0"
        >
          <FilterIcon />
        </button>
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="bg-[#2f4553] text-white p-3 rounded-md hover:bg-[#3a5a6b] flex-shrink-0"
        >
          <DownloadIcon />
        </button>
        <button
          onClick={() => setCompareMode(true)}
          className="bg-[#2f4553] text-white px-4 py-2 rounded-md hover:bg-[#3a5a6b] flex-1 flex items-center justify-center gap-2"
        >
          Compare
        </button>
      </div>

      {/* Second Row: Create Campaign Button */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 w-full flex items-center justify-center gap-2 font-semibold"
      >
        <PlusIcon />
        Create Campaign
      </button>

      {/* Third Row: Sort Section */}
      <div className="flex mt-2 gap-2 w-[200px] min-[500px]:w-full">
        <div className="flex items-center gap-2 text-white font-semibold">
          <SortIcon />
          <span>Sort</span>
        </div>
        <SortDropdown
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          isOpen={isSortDropdownOpen}
          onToggle={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
          isMobile={true}
        />
      </div>
    </>
  )}
</div>


      {/* Campaigns Accordion Section */}
      <div className="flex flex-col gap-4">
        {campaigns.map((campaign, index) => (
          <CampaignAccordion key={index} campaign={campaign} compareMode={compareMode} />
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center">
        <div className="flex flex-row gap-4">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#2f4553] text-white hover:bg-[#3a5a6b] focus-visible:outline-white text-[16px] shadow-md py-[0.625rem] px-[1.25rem]"
          >
            Previous
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#2f4553] text-white hover:bg-[#3a5a6b] focus-visible:outline-white text-[16px] shadow-md py-[0.625rem] px-[1.25rem]"
          >
            Next
          </button>
        </div>
      </div>


      {/* Modals */}
      {isCreateModalOpen && (
        <CreateCampaignModal onClose={() => setIsCreateModalOpen(false)} />
      )}
      {isFilterModalOpen && (
        <FilterModal onClose={() => setIsFilterModalOpen(false)} />
      )}
      {isExportModalOpen && (
        <ExportModal onClose={() => setIsExportModalOpen(false)} />
      )}
    </div>
  );
}