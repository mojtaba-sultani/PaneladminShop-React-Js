import React from 'react'
import { FaShoppingCart, FaStore, FaChartLine, FaWallet, FaTag } from 'react-icons/fa';
import { GiTakeMyMoney, GiCash } from 'react-icons/gi';
import { MdSell, MdMonetizationOn, MdTrendingUp } from 'react-icons/md';
export default function Card({titleCard,valueCard,bgCard,icons}) {
    return (
        <div className={`flex ${bgCard} rounded-md px-3 py-2 justify-between items-center h-full max-h-[182px] shadow-lg`}>
            <div className="flex flex-col gap-1">
                <h4 className='text-sm font-thin'>{titleCard}</h4>
                <h6 className='md:text-xl font-bold'>{valueCard}</h6>
            </div>
            <div>{icons}</div>
        </div>
    )
}
