"use client"
import Icon from '@workspace/ui/icons/icons'
import React from 'react'

export default function DCasino() {
    return (
        <>
            <div className="overflow-hidden relative bg-[#1A2C38] text-[#d5dceb] rounded-md bg-cover bg-center">
                <div className="overflow-hidden"> 
                    <div className="rounded-md border border-[#2f4553] pt-8 bg-grey-600 flex flex-col">
                        <div className="flex flex-col w-full px-[22px] py-0">
                            <div className="relative max-w-full overflow-x-auto">
                                <table className="w-full relative z-2 [transform-style:preserve-3d] border-separate overflow-x-scrol">
                                    <thead className='relative [transform:translateZ(1px)]'>
                                        <tr>
                                            <th className="h-[1.7em] first:text-left first:rounded-tl-md first:rounded-bl-md pt-0 px-4 py-4 text-center align-middle text-[#b1bad3] whitespace-nowrap break-words relative -top-[2px]">
                                                <span className="font-semibold text-base">Game</span>
                                            </th>
                                            <th className="h-[1.7em] pt-0 px-4 py-4 text-left align-middle text-[#b1bad3] whitespace-nowrap break-words relative -top-[2px]">
                                                <span className="font-semibold text-base">Bet ID</span>
                                            </th>
                                            <th className="h-[1.7em] pt-0 px-4 py-4 text-right align-middle text-[#b1bad3] whitespace-nowrap break-words relative -top-[2px] hidden lg:table-cell">
                                                <span className="font-semibold text-base ">Date</span>
                                            </th>
                                            <th className="h-[1.7em] pt-0 px-4 py-4 text-right align-middle text-[rgb(177,186,211)] whitespace-nowrap break-words relative -top-[2px] hidden lg:table-cell">
                                                <span className="font-semibold text-base relative lg:left-[-1px] max-[120px]:left-[-2px]">Bet Amount</span>
                                            </th>
                                            <th className="h-[1.7em] pt-0 px-4 py-4 text-right align-middle text-[#b1bad3] whitespace-nowrap break-words relative -top-[2px] hidden min-[700px]:table-cell">
                                                <span className="font-semibold text-base relative max-[120px]:left-[-2px]">Multiplier</span>
                                            </th>
                                            <th className="h-[1.7em] pt-0 px-4 py-4 text-right align-middle text-[#b1bad3] whitespace-nowrap break-words relative -top-[2px]">
                                                <span className="font-semibold text-base">Payout</span>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        <div className="flex flex-col items-center p-4 mt-[16px] mx-auto text-grey-200">
                            <div className="text-[6rem] text-[#557086] relative min-[329px]:left-[1px] min-[700px]:left-[0px]">
                                <Icon name={"mybetsCasino"} />
                            </div>
                            <span className="block text-base text-[#b1bad3] mt-1">No Casino Bets</span>
                            <span className="block mt-1">
                                <a className="font-semibold cursor-pointer text-white">
                                    Start Playing Now!
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
