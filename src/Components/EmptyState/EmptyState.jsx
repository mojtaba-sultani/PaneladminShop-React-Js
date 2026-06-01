import React from 'react'
import { MdSentimentVeryDissatisfied } from 'react-icons/md';
export default function EmptyState() {
    return (
        <>
            <div className='flex justify-center items-center w-full h-screen flex-col'>
                <MdSentimentVeryDissatisfied className='w-full h-full max-w-40 max-h-40' />
                <span className='text-2xl'>هیچ موردی یافت شد</span>
            </div>
        </>
    )
}
