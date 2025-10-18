import React from 'react'

export default function MFooterDetails() {
    return (

        <div className='md:hidden'>
            <div className="bg-[#213743] py-[10px] gap-[10px] flex items-center justify-center font-bold text-[12px]">
                <a className="inline-block w-[36px] aspect-square bg-gradient-to-b from-[#e1e1e1] to-[silver] text-[#1e1e1e] rounded-[2px] py-[10px] px-[17px] h-[36px] bg-[position:-89px_-490px] bg-[url('https://eka247.com/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')] bg-no-repeat bg-[length:1280px_1024px]"></a>
                <p className='text-[#c4c4c4] m-0 leading-normal'>Please Gamble Responsibly</p>
                <a className='bg-[#2f4553] py-[10px] px-[17px] text-[white] rounded-[2px]'>
                    <button className="leading-normal">More details</button>
                </a>
            </div>


            <div className="py-[20px] leading-[1.4] text-[#fff] text-center px-[10px] text-[12px] lead">
                <p>
                    <strong>Warning</strong>  : Although the current score, time elapsed, video and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other StakeFair customers may have access to data that is faster and/or more accurate than the data shown on the StakeFair site. If you rely on this data to place bets, you do so entirely at your own risk. StakeFair provides this data AS IS with no warranty as to the accuracy, completeness or timeliness of such data and accepts no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.  
                </p>
            </div>
        </div>
    )
}
