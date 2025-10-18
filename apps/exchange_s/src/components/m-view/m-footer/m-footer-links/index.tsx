import React from 'react'

export default function MFooterLinks() {
    return (
        <>
            <div className="px-[10px] py-[20px] text-[13px] leading-normal w-full m-0 font-bold md:hidden">
                <ul className="flex flex-col items-center leading-normal gap-[5px] w-full mx-[10px] list-none">
                    <li>
                        <a className='leading-normal cursor-pointer'>Privacy Policy</a> 
                    </li>
                    <li>
                        <a className='leading-normal cursor-pointer'>Cookie Policy</a>
                    </li>
                    <li>
                        <a className='leading-normal cursor-pointer'>Privacy Preference Centre </a>
                    </li>
                    <li>
                        <a className='leading-normal cursor-pointer'>Rules &amp; Regulations</a>
                    </li>
                    <li>
                        <a className='leading-normal cursor-pointer'>Terms &amp; Conditions </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
