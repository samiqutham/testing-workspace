"use client";
import {
    Tooltip,
    TooltipArrow,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useRef, useState } from "react";
import { showGhostToast } from "../../caino_ui/toaster";
import { Skeleton } from "@workspace/ui/components/skeleton";

const BetBoards = () => {
    const [activeMainBetsTab, setActiveMainBetsTab] = useState("My Bets");
    const [value, setValue] = useState("20");
    const [isGhostMode, setIsGhostMode] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(false);


    const containerRef = useRef<HTMLDivElement | null>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // keep refs in sync
    useEffect(() => {
        tabRefs.current = tabRefs.current.slice(0, tabs.length);
    }, []);

    // center active tab
    useEffect(() => {
        const centerActive = () => {
            const idx = tabs.findIndex((t) => t.label === activeMainBetsTab);
            if (idx === -1) return;
            const tab = tabRefs.current[idx];
            const container = containerRef.current;
            if (!tab || !container) return;

            const cRect = container.getBoundingClientRect();
            const tRect = tab.getBoundingClientRect();
            const offset =
                tRect.left - cRect.left - cRect.width / 2 + tRect.width / 2;

            container.scrollTo({
                left: container.scrollLeft + offset,
                behavior: "smooth",
            });
        };

        centerActive();

        const ro = new ResizeObserver(centerActive);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [activeMainBetsTab]);

    // Tabs with dynamic icons
    const tabs = [
        { label: "My Bets" },
        { label: "All Bets" },
        { label: "High Rollers" },
        { label: "Race Leaderboard" }
    ];

    useEffect(() => {
        setShowSkeleton(true);
        setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);
    }, [activeMainBetsTab]);

    const handleClick = () => {
        const newState = !isGhostMode;
        setIsGhostMode(newState);

        showGhostToast(newState ? "on" : "off");
    };

    const betsData = {
        "All Bets": [
            {
                game: "Japanese Salon Privé...",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$7,812.77",
                multiplier: "0.00x",
                payout: "-$7,812.77",
                type: "negative",
            },
            {
                game: "Lightning Baccarat",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$6,000.00",
                multiplier: "7.50x",
                payout: "$45,000.00",
                type: "positive",
            },
            {
                game: "Baccarat",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$1,249.48",
                multiplier: "0.98x",
                payout: "-$31.24",
                type: "negative",
            },
            {
                game: "Crash",
                user: "zaghlala90",
                time: "10:43 AM",
                betAmount: "$2,000.00",
                multiplier: "1.50x",
                payout: "$3,000.00",
                type: "positive",
            },
            {
                game: "Jackpot District: City ...",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$80.82",
                multiplier: "158.57x",
                payout: "$12,815.97",
                type: "positive",
            },
        ],
        "Sports Bets": [
            {
                event: "BEL - MAL",
                odds: "2.17",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$7,812.77",
            },
            {
                event: "BLA - IMA",
                odds: "2.17",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$7,812.77",
            },
            {
                event: "Multi (2)",
                odds: "2.17",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$7,812.77",
            },
            {
                event: "LON - SOU",
                odds: "2.17",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$7,812.77",
            },
            {
                event: "ACT - MEL",
                odds: "2.17",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$7,812.77",
            },
            {
                event: "Multi (8)",
                odds: "2.17",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$7,812.77",
            },
            {
                event: "ACT - MEL",
                odds: "2.17",
                user: "Hidden",
                time: "10:43 AM",
                betAmount: "$7,812.77",
            },
        ],
        "Race Leaderboard": [
            {
                rank: "1st",
                user: "Hidden",
                wagered: "$73,907,647.96",
                prize: "25.00%",
            },
            {
                rank: "2nd",
                user: "Hidden",
                wagered: "$73,907,647.96",
                prize: "12.00%",
            },
            {
                rank: "3rd",
                user: "Hidden",
                wagered: "$213,907,647.96",
                prize: "8.00%",
            },
            {
                rank: "4th",
                user: "Hidden",
                wagered: "$6,3907,647.96",
                prize: "6.00%",
            },
            { rank: "5th", user: "EHE...", wagered: "$6,907,647.96", prize: "5.00%" },
            { rank: "6th", user: "Hidden", wagered: "$4,907,647.96", prize: "3.50%" },
            { rank: "7th", user: "Hidden", wagered: "$4,907,647.96", prize: "2.50%" },
        ],
    };
    return (
        <TooltipProvider>
            <div className="w-full max-w-[1200px] mx-auto mt-2">
                {/* Tabs */}
                <div className="flex justify-between gap-3">
                    <div className="overflow-x-auto overflow-y-hidden no-scrollbar w-fit scrollbar-hide"
                        ref={containerRef}
                    >
                        <div className="flex bg-[#0F212E] rounded-[3rem] p-[6px] flex-shrink-0 min-w-max h-14 ">
                            {tabs.map(
                                (tab, index) => (
                                    <button
                                        key={tab.label}
                                        ref={(el: HTMLButtonElement | null) => {
                                            tabRefs.current[index] = el;
                                        }}
                                        onClick={() => setActiveMainBetsTab(tab.label)}
                                        className={`inline-flex relative items-center  justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] cursor-pointer px-5 py-[15px] text-sm leading-none rounded-full
                                       ${activeMainBetsTab === tab.label
                                                ? "bg-[#2F4553] text-white"
                                                : "bg-transparent text-white hover:bg-[#2F4553] hover:text-white"
                                            }
                                        ${index > 0 ? "ml-[6px]" : ""}
                                        `}
                                    >
                                        <span>{tab.label}</span>

                                        {tab.label === "Race Leaderboard" && (
                                            <div className="font-inherit align-baseline border-0 m-0 p-0">
                                                <span className="inline-block w-2 h-2 rounded-full bg-[#1FFF20]  relative left-[4px]"></span>
                                            </div>
                                        )}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* right content */}
                    <div className="flex gap-2 items-center max-[700px]:hidden">
                        {/* Ghostmode Button */}
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <div className="cursor-pointer inline-flex">
                                    <button
                                        onClick={handleClick}
                                        className="inline-flex relative cursor-pointer items-center gap-2 justify-center rounded-md h-[40px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#0f212E] text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-4 !bg-grey-700 !text-[#b1bad3] [&_svg]:!text-white"
                                    >
                                        <div className="contents">
                                            <Icon
                                                name={"hidden"}
                                                className="h-[14px] w-[14px]"
                                                fill="#fff"
                                            />
                                            <span className="leading-[14px] text-sm text-[#b1bad3ff] group-hover:text-white">
                                                {isGhostMode ? "Ghost Mode On" : "Ghost Mode Off"}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </TooltipTrigger>

                            <TooltipContent
                                side="top"
                                className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-2 rounded-[4px] shadow-lg z-50"
                                sideOffset={6}
                            >
                                <p>{isGhostMode ? "Ghost Mode On" : "Ghost Mode Off"}</p>
                                <TooltipArrow className="fill-white" />
                            </TooltipContent>
                        </Tooltip>

                        {/* dropdown */}
                        <div className="relative inline-block w-[61px] h-[41px]">
                            <select
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="appearance-none bg-[rgb(15,33,46)] border-2 border-[rgb(47,69,83)] text-white font-semibold text-sm transition-all pl-2 py-2 pr-7 rounded-[4px] focus:outline-none hover:border-[rgb(85,112,134)] cursor-pointer shadow-[0_1px_3px_0_rgba(0,_0,_0,_.2),_0_1px_2px_0_rgba(0,_0,_0,_.12)] w-[61px] h-[41px] text-center"
                            >
                                <option className="text-start" value="0">
                                    0
                                </option>
                                <option className="text-start" value="10">
                                    10
                                </option>
                                <option className="text-start" value="20">
                                    20
                                </option>
                                <option className="text-start" value="30">
                                    30
                                </option>
                                <option className="text-start" value="40">
                                    40
                                </option>
                            </select>
                            <span className="absolute top-1/2 -translate-y-1/2 pointer-events-none !text-[rgb(177, 186, 211)] text-sm w-4 h-4 right-2 flex">
                                <svg
                                    fill="rgb(177, 186, 211)"
                                    viewBox="0 0 64 64"
                                    className="!w-4 !h-4 !fill-[rgb(177, 186, 211)]"
                                >
                                    <title></title>
                                    <path d="M32.274 49.762 9.204 26.69l6.928-6.93 16.145 16.145L48.42 19.762l6.93 6.929-23.072 23.07z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>

                </div>

                {/* 1 */}

                {activeMainBetsTab === "My Bets" && (
                    <div className="overflow-x-auto mt-[4.2px]">
                        <table className="w-full table-fixed border-collapse border-spacing-0 relative">
                            {/* Table Head */}
                            <thead className="bg-[#1A2C38] text-sm leading-[23.79px] cursor-default w-full table-fixed">
                                <tr>
                                    <th className="text-left p-4 text-[#b1bad3] font-semibold  w-1/6">
                                        Game
                                    </th>
                                    <th className="text-right p-4  text-[#b1bad3] font-semibold w-1/6 hidden min-[960px]:table-cell">
                                        Time
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[960px]:table-cell">
                                        Bet Amount
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[700px]:table-cell">
                                        Multiplier
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6">
                                        Payout
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="w-full table-fixed">
                                {showSkeleton ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <tr key={index} className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}>
                                            {/* Game Column Skeleton */}
                                            <td className="px-4 py-4 text-left rounded-l w-1/6">
                                                <div className="flex items-center gap-2">
                                                    <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                    <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                                </div>
                                            </td>

                                            {/* Time Skeleton */}
                                            <td className="p-4 text-right w-1/6 hidden min-[960px]:table-cell">
                                                <Skeleton className="h-[14px] w-[70px] ml-auto rounded-[4px] bg-[#b1bad3]" />
                                            </td>

                                            {/* Bet Amount Skeleton */}
                                            <td className="p-4 text-right w-1/6 hidden min-[960px]:table-cell">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                                    <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                </div>
                                            </td>

                                            {/* Multiplier Skeleton */}
                                            <td className="p-4 text-right w-1/6 hidden min-[700px]:table-cell">
                                                <Skeleton className="h-[14px] w-[60px] ml-auto rounded-[4px] bg-[#b1bad3]" />
                                            </td>

                                            {/* Payout Skeleton */}
                                            <td className="p-4 text-right rounded-r w-1/6">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Skeleton className="h-[14px] w-[90px] rounded-[4px] bg-[#b1bad3]" />
                                                    <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    betsData["All Bets"].map((bet, index) => (
                                        <tr key={index} className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}>
                                            {/* Game Column */}
                                            <td className="px-4 py-4 text-left rounded-l  w-1/6">
                                                <button className="active:scale-95 flex items-center gap-2 font-semibold text-white group w-full">
                                                    <Icon
                                                        name={"tab777"}
                                                        className="h-[14px] w-[14px] fill-[rgb(177,186,211)] group-hover:fill-white transition-colors"
                                                    ></Icon>
                                                    <span className="truncate text-[14px] font-semibold font-['Proxima_Nova',sans-serif] leading-[14px]">
                                                        {bet.game}
                                                    </span>
                                                </button>
                                            </td>

                                            {/* Time */}
                                            <td className="p-4 text-right text-[#b1bad3] text-[14px] font-['Proxima Nova'] cursor-default leading-[21px]  w-1/6 hidden min-[960px]:table-cell">
                                                {bet.time}
                                            </td>

                                            {/* Bet Amount */}
                                            <td className="p-4 text-right cursor-default  w-1/6 leading-[20.67px] hidden min-[960px]:table-cell">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#b1bad3] truncate">
                                                                {bet.betAmount}
                                                            </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                            sideOffset={6}
                                                        >
                                                            <div className="flex justify-center items-center gap-1">
                                                                {bet.betAmount}
                                                                <Icon
                                                                    name={"betAmount"}
                                                                    className="h-[14px] w-[14px]"
                                                                    fill="rgb(177, 186, 211)"
                                                                />
                                                            </div>
                                                            <TooltipArrow className="fill-white" />
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <Icon
                                                        name={"betAmount"}
                                                        className="h-[14px] w-[14px]"
                                                        fill="rgb(177, 186, 211)"
                                                    />
                                                </div>
                                            </td>

                                            {/* Multiplier */}
                                            <td className="p-4 text-right text-[#b1bad3] text-[14px]  font-['Proxima Nova'] cursor-default  w-1/6 hidden min-[700px]:table-cell">
                                                {bet.multiplier}33
                                            </td>

                                            {/* Payout */}
                                            <td className="p-4 text-right rounded-r cursor-default  w-1/6 leading-[20.67px]">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#b1bad3] truncate tabular-nums">
                                                                {bet.payout}
                                                            </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                            sideOffset={6}
                                                        >
                                                            <div className="flex justify-center items-center gap-1">
                                                                {bet.payout}
                                                                <Icon
                                                                    name={"dollar"}
                                                                    className="h-[14px] w-[14px]"
                                                                    fill="rgb(177, 186, 211)"
                                                                />
                                                            </div>
                                                            <TooltipArrow className="fill-white" />
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <Icon
                                                        name={"dollar"}
                                                        className="h-[14px] w-[14px]"
                                                        fill="rgb(177, 186, 211)"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* 2 */}

                {activeMainBetsTab === "All Bets" && (
                    <div className="overflow-x-auto mt-[4.2px]">
                        <table className="w-full table-fixed border-collapse border-spacing-0 relative">
                            {/* Table Head */}
                            <thead className="bg-[#1A2C38] text-sm leading-[23.79px] cursor-default w-full table-fixed">
                                <tr>
                                    <th className="text-left p-4 text-[#b1bad3] font-semibold  w-1/6">
                                        Game
                                    </th>
                                    <th className="text-left p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[700px]:table-cell">
                                        User
                                    </th>
                                    <th className="text-right p-4  text-[#b1bad3] font-semibold w-1/6 hidden min-[960px]:table-cell">
                                        Time
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[960px]:table-cell">
                                        Bet Amount
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[700px]:table-cell">
                                        Multiplier
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6">
                                        Payout
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="w-full table-fixed">
                                {showSkeleton ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <tr key={index} className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}>
                                            {/* Game Column Skeleton */}
                                            <td className="px-4 py-4 text-left rounded-l w-1/6">
                                                <div className="flex items-center gap-2">
                                                    <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                    <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                                </div>
                                            </td>

                                            {/* User Skeleton */}
                                            <td className="p-4 text-left w-1/6 hidden min-[700px]:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <Skeleton className="h-[14px] w-[100px] rounded-[4px] bg-[#b1bad3]" />
                                                </div>
                                            </td>

                                            {/* Time Skeleton */}
                                            <td className="p-4 text-right w-1/6 hidden min-[960px]:table-cell">
                                                <Skeleton className="h-[14px] w-[70px] ml-auto rounded-[4px] bg-[#b1bad3]" />
                                            </td>

                                            {/* Bet Amount Skeleton */}
                                            <td className="p-4 text-right w-1/6 hidden min-[960px]:table-cell">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                                    <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                </div>
                                            </td>

                                            {/* Multiplier Skeleton */}
                                            <td className="p-4 text-right w-1/6 hidden min-[700px]:table-cell">
                                                <Skeleton className="h-[14px] w-[60px] ml-auto rounded-[4px] bg-[#b1bad3]" />
                                            </td>

                                            {/* Payout Skeleton */}
                                            <td className="p-4 text-right rounded-r w-1/6">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Skeleton className="h-[14px] w-[90px] rounded-[4px] bg-[#b1bad3]" />
                                                    <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    betsData["All Bets"].map((bet, index) => (
                                        <tr key={index} className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}>
                                            {/* Game Column */}
                                            <td className="px-4 py-4 text-left rounded-l  w-1/6">
                                                <button className="active:scale-95 flex items-center gap-2 font-semibold text-white group w-full">
                                                    <Icon
                                                        name={"tab777"}
                                                        className="h-[14px] w-[14px] fill-[rgb(177,186,211)] group-hover:fill-white transition-colors"
                                                    ></Icon>
                                                    <span className="truncate text-[14px] font-semibold font-['Proxima_Nova',sans-serif] leading-[14px]">
                                                        {bet.game}
                                                    </span>
                                                </button>
                                            </td>

                                            {/* User Column */}
                                            <td className="p-4 text-left text-[#b1bad3] cursor-help  w-1/6 hidden min-[700px]:table-cell">
                                                <div className="flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                                                    <Icon
                                                        name={"hidIc"}
                                                        className="w-[14px] h-[14px] flex-shrink-0"
                                                        fill="#b1bad3"
                                                    />
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="truncate font-semibold text-[14px] font-['Proxima Nova'] cursor-help leading-[20.67px]">
                                                                {bet.user}
                                                            </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                            sideOffset={6}
                                                        >
                                                            <p>This user has privacy enabled</p>
                                                            <TooltipArrow className="fill-white" />
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </td>

                                            {/* Time */}
                                            <td className="p-4 text-right text-[#b1bad3] text-[14px] font-['Proxima Nova'] cursor-default leading-[21px]  w-1/6 hidden min-[960px]:table-cell">
                                                {bet.time}
                                            </td>

                                            {/* Bet Amount */}
                                            <td className="p-4 text-right cursor-default  w-1/6 leading-[20.67px] hidden min-[960px]:table-cell">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#b1bad3] truncate">
                                                                {bet.betAmount}
                                                            </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                            sideOffset={6}
                                                        >
                                                            <div className="flex justify-center items-center gap-1">
                                                                {bet.betAmount}
                                                                <Icon
                                                                    name={"betAmount"}
                                                                    className="h-[14px] w-[14px]"
                                                                    fill="rgb(177, 186, 211)"
                                                                />
                                                            </div>
                                                            <TooltipArrow className="fill-white" />
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <Icon
                                                        name={"betAmount"}
                                                        className="h-[14px] w-[14px]"
                                                        fill="rgb(177, 186, 211)"
                                                    />
                                                </div>
                                            </td>

                                            {/* Multiplier */}
                                            <td className="p-4 text-right text-[#b1bad3] text-[14px]  font-['Proxima Nova'] cursor-default  w-1/6 hidden min-[700px]:table-cell">
                                                {bet.multiplier}33
                                            </td>

                                            {/* Payout */}
                                            <td className="p-4 text-right rounded-r cursor-default  w-1/6 leading-[20.67px]">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#b1bad3] truncate tabular-nums">
                                                                {bet.payout}
                                                            </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                            sideOffset={6}
                                                        >
                                                            <div className="flex justify-center items-center gap-1">
                                                                {bet.payout}
                                                                <Icon
                                                                    name={"dollar"}
                                                                    className="h-[14px] w-[14px]"
                                                                    fill="rgb(177, 186, 211)"
                                                                />
                                                            </div>
                                                            <TooltipArrow className="fill-white" />
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <Icon
                                                        name={"dollar"}
                                                        className="h-[14px] w-[14px]"
                                                        fill="rgb(177, 186, 211)"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}


                {/* 3 */}

                {activeMainBetsTab === "High Rollers" && (
                    <div className="overflow-x-auto mt-[4.2px]">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-[#1A2C38] text-sm leading-[23.79px] cursor-default w-full table-fixed">
                                <tr>
                                    <th className="text-left p-4 text-[#b1bad3] font-semibold  w-1/6">
                                        Game
                                    </th>
                                    <th className="text-left p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[700px]:table-cell">
                                        User
                                    </th>
                                    <th className="text-right p-4  text-[#b1bad3] font-semibold w-1/6 hidden min-[960px]:table-cell">
                                        Time
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[960px]:table-cell">
                                        Bet Amount
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6 hidden min-[700px]:table-cell">
                                        Multiplier
                                    </th>
                                    <th className="text-right p-4 text-[#b1bad3] font-semibold w-1/6">
                                        Payout
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    showSkeleton ? (
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <tr key={index} className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}>
                                                {/* Game Column Skeleton */}
                                                <td className="px-4 py-4 text-left rounded-l w-1/6">
                                                    <div className="flex items-center gap-2">
                                                        <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                        <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                                    </div>
                                                </td>

                                                {/* User Skeleton */}
                                                <td className="p-4 text-left w-1/6 hidden min-[700px]:table-cell">
                                                    <div className="flex items-center gap-2">
                                                        <Skeleton className="h-[14px] w-[100px] rounded-[4px] bg-[#b1bad3]" />
                                                    </div>
                                                </td>

                                                {/* Time Skeleton */}
                                                <td className="p-4 text-right w-1/6 hidden min-[960px]:table-cell">
                                                    <Skeleton className="h-[14px] w-[70px] ml-auto rounded-[4px] bg-[#b1bad3]" />
                                                </td>

                                                {/* Bet Amount Skeleton */}
                                                <td className="p-4 text-right w-1/6 hidden min-[960px]:table-cell">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                                        <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                    </div>
                                                </td>

                                                {/* Multiplier Skeleton */}
                                                <td className="p-4 text-right w-1/6 hidden min-[700px]:table-cell">
                                                    <Skeleton className="h-[14px] w-[60px] ml-auto rounded-[4px] bg-[#b1bad3]" />
                                                </td>

                                                {/* Payout Skeleton */}
                                                <td className="p-4 text-right rounded-r w-1/6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Skeleton className="h-[14px] w-[90px] rounded-[4px] bg-[#b1bad3]" />
                                                        <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                        : (
                                            betsData["All Bets"].map((bet, index) => (
                                                <tr key={index} className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}>
                                                    {/* Game Column */}
                                                    <td className="px-4 py-4 text-left rounded-l  w-1/6">
                                                        <button className="active:scale-95 flex items-center gap-2 font-semibold text-white group w-full">
                                                            <Icon
                                                                name={"tab777"}
                                                                className="h-[14px] w-[14px] fill-[rgb(177,186,211)] group-hover:fill-white transition-colors"
                                                            ></Icon>
                                                            <span className="truncate text-[14px] font-semibold font-['Proxima_Nova',sans-serif] leading-[14px]">
                                                                {bet.game}
                                                            </span>
                                                        </button>
                                                    </td>

                                                    {/* User Column */}
                                                    <td className="p-4 text-left text-[#b1bad3] cursor-help  w-1/6 hidden min-[700px]:table-cell">
                                                        <div className="flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                                                            <Icon
                                                                name={"hidIc"}
                                                                className="w-[14px] h-[14px] flex-shrink-0"
                                                                fill="#b1bad3"
                                                            />
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span className="truncate font-semibold text-[14px] font-['Proxima Nova'] cursor-help leading-[20.67px]">
                                                                        {bet.user}
                                                                    </span>
                                                                </TooltipTrigger>
                                                                <TooltipContent
                                                                    side="top"
                                                                    className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                                    sideOffset={6}
                                                                >
                                                                    <p>This user has privacy enabled</p>
                                                                    <TooltipArrow className="fill-white" />
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </td>

                                                    {/* Time */}
                                                    <td className="p-4 text-right text-[#b1bad3] text-[14px] font-['Proxima Nova'] cursor-default leading-[21px]  w-1/6 hidden min-[960px]:table-cell">
                                                        {bet.time}
                                                    </td>

                                                    {/* Bet Amount */}
                                                    <td className="p-4 text-right cursor-default  w-1/6 leading-[20.67px] hidden min-[960px]:table-cell">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#b1bad3] truncate">
                                                                        {bet.betAmount}
                                                                    </span>
                                                                </TooltipTrigger>
                                                                <TooltipContent
                                                                    side="top"
                                                                    className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                                    sideOffset={6}
                                                                >
                                                                    <div className="flex justify-center items-center gap-1">
                                                                        {bet.betAmount}
                                                                        <Icon
                                                                            name={"betAmount"}
                                                                            className="h-[14px] w-[14px]"
                                                                            fill="rgb(177, 186, 211)"
                                                                        />
                                                                    </div>
                                                                    <TooltipArrow className="fill-white" />
                                                                </TooltipContent>
                                                            </Tooltip>
                                                            <Icon
                                                                name={"betAmount"}
                                                                className="h-[14px] w-[14px]"
                                                                fill="rgb(177, 186, 211)"
                                                            />
                                                        </div>
                                                    </td>

                                                    {/* Multiplier */}
                                                    <td className="p-4 text-right text-[#b1bad3] text-[14px]  font-['Proxima Nova'] cursor-default  w-1/6 hidden min-[700px]:table-cell">
                                                        {bet.multiplier}33
                                                    </td>

                                                    {/* Payout */}
                                                    <td className="p-4 text-right rounded-r cursor-default  w-1/6 leading-[20.67px]">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#b1bad3] truncate tabular-nums">
                                                                        {bet.payout}
                                                                    </span>
                                                                </TooltipTrigger>
                                                                <TooltipContent
                                                                    side="top"
                                                                    className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                                    sideOffset={6}
                                                                >
                                                                    <div className="flex justify-center items-center gap-1">
                                                                        {bet.payout}
                                                                        <Icon
                                                                            name={"dollar"}
                                                                            className="h-[14px] w-[14px]"
                                                                            fill="rgb(177, 186, 211)"
                                                                        />
                                                                    </div>
                                                                    <TooltipArrow className="fill-white" />
                                                                </TooltipContent>
                                                            </Tooltip>
                                                            <Icon
                                                                name={"dollar"}
                                                                className="h-[14px] w-[14px]"
                                                                fill="rgb(177, 186, 211)"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                }

                            </tbody>
                        </table>
                    </div>
                )}


                {/* 4 */}

                {activeMainBetsTab === "Race Leaderboard" && (
                    <div className="overflow-x-auto">
                        {
                            showSkeleton ? (
                                <div className="w-full">
                                    <div className="w-full bg-grey-600 px-2 mt-1 py-4 cursor-pointer border-b-[#213743] border-b-2 border-solid flex flex-col gap-1 items-start md:flex-row md:justify-between md:gap-0 md:items-center">
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                name={"betRace"}
                                                className="h-[14px] w-[14px]  group-hover:fill-white inline-block"
                                                fill="rgb(177, 186, 211)"
                                            ></Icon>
                                            <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                        </div>
                                        <Skeleton className="h-[14px] w-[100px] rounded-[4px] bg-[#b1bad3]" />
                                    </div>

                                    <div className="w-full bg-grey-600 px-2 py-4 cursor-pointer border-b-[#213743] border-b-2 border-solid flex flex-col gap-1 items-start md:flex-row md:justify-between md:gap-0 md:items-center">
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                name={"betRace"}
                                                className="h-[14px] w-[14px]  group-hover:fill-white inline-block"
                                                fill="rgb(177, 186, 211)"
                                            ></Icon>
                                            <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                name={"raceTime"}
                                                className="h-[14px] w-[14px]  group-hover:fill-white"
                                                fill="rgb(177, 186, 211)"
                                            ></Icon>
                                            <Skeleton className="h-[14px] w-[100px] rounded-[4px] bg-[#b1bad3]" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {/* Race start */}
                                    <div className="w-full bg-grey-600 px-2 mt-1 py-4 cursor-pointer border-b-[#213743] border-b-2 border-solid flex flex-col gap-1 items-start md:flex-row md:justify-between md:gap-0 md:items-center">
                                        <button className="inline-flex relative cursor-pointer group items-center gap-2 justify-center  font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                                            <Icon
                                                name={"betRace"}
                                                className="h-[14px] w-[14px]  group-hover:fill-white inline-block"
                                                fill="rgb(177, 186, 211)"
                                            ></Icon>
                                            <span>$100k Race</span>
                                        </button>
                                        <button className="inline-flex relative cursor-pointer group items-center gap-2 justify-center font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                                            Starts in 3 hours
                                        </button>
                                    </div>
                                    {/* Race end */}
                                    <div className="w-full bg-grey-600 px-2 py-4 cursor-pointer border-b-[#213743] border-b-2 border-solid flex flex-col gap-1 items-start md:flex-row md:justify-between md:gap-0 md:items-center">
                                        <button className="inline-flex relative cursor-pointer group items-center gap-2 justify-center  font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                                            <Icon
                                                name={"betRace"}
                                                className="h-[14px] w-[14px]  group-hover:fill-white inline-block"
                                                fill="rgb(177, 186, 211)"
                                            ></Icon>
                                            <span>$100k Race</span>
                                        </button>
                                        <button className="inline-flex relative cursor-pointer group items-center gap-2 justify-center font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none">
                                            <Icon
                                                name={"raceTime"}
                                                className="h-[14px] w-[14px]  group-hover:fill-white"
                                                fill="rgb(177, 186, 211)"
                                            ></Icon>
                                            Ends in 6 hours
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        <table className="min-w-full border-collapse ">
                            <thead className="bg-[#1A2C38] text-sm cursor-default text-[#b1bad3] leading-[20.79px]">
                                <tr>
                                    <th className="text-left p-4 font-semibold w-1/4">Rank</th>
                                    <th className="text-left p-4 font-semibold w-1/4">User</th>
                                    <th className=" text-right p-4 font-semibold w-1/4">
                                        <span className="flex gap-2 items-center justify-end">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Icon
                                                        name={"questions"}
                                                        className="h-[14px] w-[14px] cursor-help"
                                                        fill="#557086ff"
                                                    />
                                                </TooltipTrigger>

                                                <TooltipContent
                                                    side="top"
                                                    className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                    sideOffset={6}
                                                >
                                                    <p>
                                                        Your wager for all currencies is normalised to the
                                                        race currency
                                                    </p>
                                                    <TooltipArrow className="fill-white" />
                                                </TooltipContent>
                                            </Tooltip>

                                            <span className="leading-[21px] -translate-y-[1px]">
                                                Wagered
                                            </span>
                                        </span>
                                    </th>
                                    <th className="text-right p-4 font-semibold w-1/4">Prize</th>
                                </tr>
                            </thead>
                            <tbody className="-mt-1">
                                {showSkeleton ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                                        >
                                            {/* Rank */}
                                            <td className="p-4 text-left rounded-l w-1/4">
                                                <Skeleton className="h-[15px] w-[20px] rounded-[4px] bg-[#b1bad3]" />
                                            </td>

                                            {/* User */}
                                            <td className="p-4 text-left w-1/4">
                                                <Skeleton className="h-[14px] w-[80px] rounded-[4px] bg-[#b1bad3]" />
                                            </td>

                                            {/* Wagered */}
                                            <td className="p-4 text-right w-1/4">
                                                <div className="flex justify-end items-center gap-1">
                                                    <Skeleton className="h-[14px] w-[60px] rounded-[4px] bg-[#b1bad3]" />
                                                    <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                </div>
                                            </td>

                                            {/* Prize */}
                                            <td className="p-4 text-right rounded-r w-1/4">
                                                <div className="flex justify-end items-center gap-1">
                                                    <Skeleton className="h-[14px] w-[60px] rounded-[4px] bg-[#b1bad3]" />
                                                    <Skeleton className="h-[14px] w-[14px] rounded-full bg-[#b1bad3]" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    betsData["Race Leaderboard"].map((entry, index) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 1 ? "bg-[#213743]" : ""}`}
                                        >
                                            {/* Rank */}
                                            <td className="p-4 text-left text-[#b1bad3] rounded-l cursor-default w-1/4">
                                                <Icon name={"guardic"} fill="rgb(177, 186, 211)" />
                                            </td>

                                            {/* User */}
                                            <td className="p-4 text-left text-white cursor-default w-1/4">
                                                <div className="flex items-center gap-1 max-w-[150px] overflow-hidden text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                                                    <Icon
                                                        name={"hidIc"}
                                                        className="w-[14px] h-[14px] flex-shrink-0"
                                                        fill="#b1bad3"
                                                    />
                                                    <span className="truncate font-semibold text-[14px] font-['Proxima Nova']">
                                                        {entry.user}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Wagered */}
                                            <td className="p-4 text-right cursor-default w-1/4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="truncate inline-block font-normal text-[14px] font-['Proxima Nova'] text-[#b1bad3]">
                                                                {entry.wagered}
                                                            </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                            sideOffset={6}
                                                        >
                                                            <div className="flex justify-center items-center gap-1">
                                                                {entry.wagered}
                                                                <Icon
                                                                    name={"dollar"}
                                                                    className="h-[14px] w-[14px]"
                                                                    fill="rgb(177, 186, 211)"
                                                                />
                                                            </div>
                                                            <TooltipArrow className="fill-white" />
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <span className="ml-1 truncate inline-block max-w-[6ch]">
                                                        <Icon
                                                            name="dollar"
                                                            className="w-[14px] h-[14px]"
                                                            fill="#1FFF20"
                                                        />
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Prize */}
                                            <td className="p-4 text-right align-middle whitespace-nowrap cursor-default text-sm text-[#b1bad3] font-medium rounded-r w-1/4">
                                                <div className="flex justify-end items-center gap-1">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="text-[14px] font-['Proxima_Nova',sans-serif] truncate">
                                                                {entry.prize}
                                                            </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-3 rounded-lg shadow-lg"
                                                            sideOffset={6}
                                                        >
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[14px] font-['Proxima_Nova',sans-serif] text-[#0F212E]">
                                                                    {entry.prize}
                                                                </span>
                                                                <Icon
                                                                    name="dollar"
                                                                    className="h-[14px] w-[14px]"
                                                                    fill="#0F212E"
                                                                />
                                                            </div>
                                                            <TooltipArrow className="fill-white" />
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Icon
                                                        name="dollar"
                                                        className="h-[14px] w-[14px]"
                                                        fill="rgb(177, 186, 211)"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>
                )}


            </div>
        </TooltipProvider>
    );
};

export default BetBoards;
