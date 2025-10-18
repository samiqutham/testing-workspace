
import Icon from '@workspace/ui/icons/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export default function GameCategoryFilters() {
    const { slug } = useParams();
    const currentSlug = slug as string;
    const [isMarketValue, setisMarketValue] = useState("Popular (7 Days)");
    const [isMarket, setMarket] = useState(false);

    const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);

    const [isPublisher, setPublisher] = useState(false);

    const PopularTitle = ["Popular (7 days)", "Popular (30 days)", "Newest", "Oldest"];
    // const PublisherOptions = ["Publisher 1", "Publisher 2", "Publisher 3"];

    const toggleMarket = () => setMarket((prev) => !prev);
    const togglePublisher = () => setPublisher((prev) => !prev);

    const showViewAll = ["stake-originals"].includes(currentSlug);
    const showPublisherDropdown = ["slots", "live-casino", "game-shows", "stake-exclusives", "burst-games"].includes(currentSlug);

    const marketRef = useRef<HTMLDivElement>(null);
    const PublisherRef = useRef<HTMLDivElement>(null);

    const hasAnyChecked = selectedPublishers.length > 0;

    const PublisherOptions = [
        { label: "Evolution", count: 108 },
        { label: "Live88", count: 5 },
        { label: "Pragmatic Play", count: 46 },
    ];


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (marketRef.current && !marketRef.current.contains(event.target as Node)) {
                setMarket(false);
            }
            if (PublisherRef.current && !PublisherRef.current.contains(event.target as Node)) {
                setPublisher(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="flex justify-between gap-2 h-full">
                    {/* View All Publishers Button */}
                    <div className="flex items-center gap-2">

                        {showViewAll && (
                            <Link href={`/game-category/provider`} prefetch={true}>
                                <button className="bg-[#0F212E] py-[15px] px-5 cursor-pointer hover:bg-[#071824ff] text-white text-sm font-semibold rounded-[4px] leading-[14px]">
                                    View All Publishers
                                </button>
                            </Link>
                        )}

                        {showPublisherDropdown && (
                            <div className='flex items-center gap-2'>
                                <div className=' min-[700px]:flex items-center gap-2 hidden'>
                                    <Icon
                                        name={"filter"}
                                        className={`w-[14px] h-[14px] `}
                                        fill="#b1bad3"
                                    ></Icon>
                                    <span className='text-sm leading-[21px] font-semibold text-[white]'>Filter</span>
                                </div>
                                <div className="relative inline-block" ref={PublisherRef}>
                                    <button
                                        className={`inline-flex bg-[#0f212e] hover:bg-[#071824ff] cursor-pointer items-center gap-2 justify-center border border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition text-white !border-none !py-[13px] !px-4 rounded-[4px] ${selectedPublishers.length > 0 ? 'max-h-[47px]' : 'max-h-[40px]'}`}
                                        onClick={togglePublisher}
                                    >
                                        <div>
                                            Publishers
                                        </div>
                                        {selectedPublishers.length > 0 && (
                                            <div className="bg-[#4391e7ff] px-2 text-center text-[#04172dff] flex items-center justify-center font-semibold min-w-[1.8em] rounded-[9999px] leading-[22.4px]">
                                                {selectedPublishers.length}
                                            </div>
                                        )}
                                        <Icon name="questionArrow" className={`w-[14px] h-[14px] text-[#b1bad3] transition-transform  ${isPublisher ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isPublisher && (
                                        <div className="absolute -left-[3vw] min-[700px]:left-1/2 min-[700px]:-translate-x-1/2 z-[100] top-[50px] bg-white rounded-[.25rem] shadow-lg min-w-[180px]">
                                            <div className="absolute left-[35%] top-0 min-[700px]:left-1/2 min-[700px]:-translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>
                                            <div className="flex flex-col py-1">
                                                <div className='py-3 flex flex-col gap-2'>
                                                    {PublisherOptions.map((option) => {
                                                        const isChecked = selectedPublishers.includes(option.label);
                                                        const shouldShowUnchecked = hasAnyChecked && !isChecked;

                                                        return (
                                                            <label
                                                                key={option.label}
                                                                className="flex items-center justify-start gap-2 px-3 text-sm hover:bg-gray-100 cursor-pointer h-[32.4px]"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={isChecked}
                                                                    onChange={() => {
                                                                        setSelectedPublishers((prev) =>
                                                                            prev.includes(option.label)
                                                                                ? prev.filter((p) => p !== option.label)
                                                                                : [...prev, option.label]
                                                                        );
                                                                    }}
                                                                />

                                                                <span className={`w-6 h-6 flex items-center justify-center border border-[2px] border-[#2f4553] hover:border-[#546F85] rounded-[2px] transition ${isChecked ? 'bg-[#22384A]' : ''
                                                                    }`}>
                                                                    <img
                                                                        src="/checked.svg"
                                                                        alt="tick"
                                                                        className={`w-4 h-4 transition ${isChecked ? 'opacity-100' : 'opacity-0'
                                                                            }`}
                                                                    />
                                                                </span>

                                                                <span className="text-sm font-semibold text-[#213743] leading-[14px] whitespace-nowrap">{option.label}</span>

                                                                <span className={`px-[9px] inline-flex font-semibold min-w-[1.8em] leading-[22.4px] rounded-[9999px] transition-colors ${isChecked
                                                                    ? 'bg-[#4391e7ff] text-[#04172dff]'
                                                                    : shouldShowUnchecked
                                                                        ? 'bg-[#071824] text-[#B1BAD3]'
                                                                        : 'bg-[#4391e7ff] text-[#04172dff]'
                                                                    }`}>
                                                                    {option.count}
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>

                                                {/* Clear All Button */}
                                                <button
                                                    className="text-sm text-center text-[#2f4553] cursor-pointer h-[38.64px] hover:bg-[#B1BAD3] border-t boorder-[#d5dcebff]"
                                                    onClick={() => setSelectedPublishers([])}
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-4">
                        {/* ----- Dropdown (Popular) ----- */}
                        <div className='flex items-center gap-2' ref={marketRef}>
                            <div className=' min-[700px]:flex items-center gap-2 hidden'>
                                <Icon
                                    name={"sort"}
                                    className={`w-[14px] h-[14px] `}
                                    fill="#b1bad3"
                                ></Icon>
                                <span className='text-sm leading-[21px] font-semibold text-[white]'>Sort</span>
                            </div>

                            <div className="relative inline-block">
                                {/* Trigger Button */}
                                <button
                                    className="inline-flex max-h-[40px] cursor-pointer items-center gap-2 justify-center border border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none !py-[13px] !px-4 bg-[#0f212e] hover:bg-[#071824ff] rounded-[4px] relative max-[1025px]:bottom-[1px] bottom-[0.5px]"
                                    onClick={toggleMarket}
                                >
                                    {/* Selected value */}
                                    <span>{isMarketValue}</span>

                                    {/* Dropdown arrow */}
                                    <Icon name="questionArrow" className="w-[14px] h-[14px] text-[#b1bad3]" />

                                </button>

                                {/* Dropdown */}
                                {isMarket && (
                                    <div className="absolute left-1/2 -translate-x-1/2 z-[100] top-[48px] bg-white rounded-[.25rem] shadow-lg w-max min-w-[90px]">
                                        {/* little arrow */}
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>

                                        {/* Options */}
                                        <div className="flex flex-col p-[.25rem_0] [max-height:inherit]">
                                            {PopularTitle.map((option) => (
                                                <button
                                                    key={option}
                                                    className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap text-[rgb(47_69_83)] transition hover:bg-[#B1BAD3] active:scale-[0.98] bg-transparent text-sm leading-none px-3 py-3 rounded-none justify-start hover:text-black"
                                                    type="button"
                                                    onClick={() => {
                                                        setisMarketValue(option);
                                                        setMarket(false); // ✅ closes dropdown
                                                    }}
                                                >
                                                    <span className={isMarketValue === option ? "text-[#1475e1]" : ""}>
                                                        {option}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
