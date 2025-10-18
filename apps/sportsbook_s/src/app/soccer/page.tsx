"use client"
import React from 'react'
import DMatchDetails from '@workspace/ui/common/components/d-view/d-match-details/index'
import MMatchDetails from '@workspace/ui/common/components/m-view/m-match-detail/index'
import { useIsMobile } from '@workspace/ui/hooks/use-mobile'

const Soccer = () => {
    const isMobile = useIsMobile()
    return (
        <>
            {isMobile ? (
                <div className='mt-[32px] px-[3vw] mb-4'>
                    <MMatchDetails />
                </div>
            ) : (
                <>
                    <div className='mt-[32px] mb-4'>
                        <DMatchDetails />
                    </div>

                </>
            )}
        </>
    )
}

export default Soccer