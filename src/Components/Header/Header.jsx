import React, { useContext, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { GrNotification } from 'react-icons/gr'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router'
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from '../../Contexts/ThemeContext'

export default function Header() {
    const { theme, toogleTheme, sidebarHandler } = useContext(ThemeContext);
    return (
        <nav className={`flex md:flex-row whitespace-nowrap text-white bg-blue-500 md:p-2 md:gap-16 w-full flex-col`}>
            <div className=' h-12 text-center flex items-center justify-center'>
                <h1 className='md:text-xl font-semibold'> کنترل پنل مدیریت</h1>
            </div>
            <aside className='h-12 w-full flex justify-between'>
                <button className='mr-4'>
                    <BiMenu size={22} onClick={sidebarHandler} />
                </button>
                <div className='flex items-center'>
                    <button onClick={toogleTheme}>
                        {theme == 'light' ? (
                            <FiMoon size={20} />
                        ) : (
                            <FiSun size={20} />
                        )
                        }
                    </button>
                    <Link to='/' className='relative  p-3 h-full'>
                        <span className='absolute top-1 left-2 bg-green-600 p-0.5 text-xs rounded-sm z-10'>2</span>
                        <MdEmail size={18} className='relative top-1' />
                    </Link>
                    <Link to='/' className='relative  p-3 h-full'>
                        <span className='absolute top-1 left-2 bg-yellow-400 p-0.5 text-xs rounded-sm z-10'>2</span>
                        <GrNotification size={18} className='relative top-1' />
                    </Link>
                    <Link className="flex gap-2 items-center p-3 h-full ">
                        <img src="/images/Profile.jpg" alt="" className='w-8 h-8 rounded-full object-cover' />
                        <h5 className='hidden md:block text-sm'>لئوناردو دیکاپریو</h5>
                    </Link>
                </div>
            </aside>
        </nav>
    )
}
