import { cn } from '@workspace/ui/lib/utils'
import React from 'react'

export default function MLeftSidebar() {
    return (
        <div className=''>
            <div className=" sm:left-0 sm:bottom-auto sm:w-[50px] sm:h-full bg-[#0F202D]
            fixed right-0 bottom-0 left-0 z-[1030]">
                <div className="h-full">
                    <ul className="grid grid-cols-5 text-[10px] sm:flex sm:justify-center sm:flex-col h-full">
                        <li className="text-white sm:py-[20px] pt-[5px] pb-[3px] list-none hover:bg-[#2F4553]">
                            <a className='flex flex-col items-center text-[#dcdcdc] gap-[1px] first:text-white sm:gap-[4px]'>
                                <span className='p-0 leading-[16px]'>
                                    <div
                                        className={cn(
                                            `h-[20px] w-[20px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat  bg-[-261px_-638px]`
                                        )}
                                    />
                                </span>
                                <span className='p-0 leading-[16px]'>Home</span>
                            </a>
                        </li>
                        <li className="text-white sm:py-[20px] pt-[5px] pb-[3px] list-none hover:bg-[#2F4553]">
                            <a className='flex flex-col items-center text-[#dcdcdc] gap-[1px] first:text-white sm:gap-[4px]'>
                                <span className='p-0 leading-[16px]'>
                                    <div
                                        className={cn(
                                            `h-[20px] w-[20px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat  bg-[-33px_-589px]`
                                        )}
                                    />
                                </span>
                                <span className='p-0 leading-[16px]'>Menu</span>
                            </a>
                        </li>
                        <li className="text-white sm:py-[20px] pt-[5px] pb-[3px] list-none hover:bg-[#2F4553]">
                            <a className='flex flex-col items-center text-[#dcdcdc] gap-[1px] first:text-white sm:gap-[4px]'>
                                <span className='p-0 leading-[16px]'>
                                    <div
                                        className={cn(
                                            `h-[20px] w-[20px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat  bg-[-209px_-589px]`
                                        )}
                                    />
                                </span>
                                <span className='p-0 leading-[16px]'>Cash Out</span>
                            </a>
                        </li>
                        <li className="text-white sm:py-[20px] pt-[5px] pb-[3px] list-none hover:bg-[#2F4553]">
                            <a className='flex flex-col items-center text-[#dcdcdc] gap-[1px] first:text-white sm:gap-[4px]'>
                                <span className='p-0 leading-[16px]'>
                                    <div
                                        className={cn(
                                            "h-[20px] w-[20px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat  bg-[-94px_-589px]"
                                        )}
                                    />
                                </span>
                                <span className='p-0 leading-[16px]'>My Bets</span>
                            </a>
                        </li>
                        <li className="text-white sm:py-[20px] pt-[5px] pb-[3px] list-none hover:bg-[#2F4553]">
                            <a className='flex flex-col items-center text-[#dcdcdc] gap-[1px] first:text-white sm:gap-[4px]'>
                                <span className='p-0 leading-[16px]'>
                                    <div
                                        className={cn(
                                            "h-[20px] w-[20px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat  bg-[-151px_-589px]"
                                        )}
                                    />
                                </span>
                                <span className='p-0 leading-[16px]'>Casino</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
