import React from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import { BsCheckCircleFill } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
export default function Toast({ bgNotifiction, message, onclose, isShowToast, type }) {
    return (
        <div className={`${isShowToast ? "bg-opacity-50 pointer-events-auto" : "bg-opacity-0 pointer-events-none"} bg-black w-full h-screen top-0 fixed right-0 shadow-lg z-20`}>
            <div className={`${bgNotifiction} w-max p-4 rounded-md  bottom-4 right-6  fixed text-white shadow-lg transition duration-200 ease-in ${isShowToast ? "opacity-100  -translate-x-1" : "opacity-0 translate-x-0"}`}>
                <div className='flex flex-col gap-3'>
                    <CgClose size={18} onClick={onclose} className='cursor-pointer' />
                    <div className='flex gap-2 items-center'>
                        {type == 'success' ? (
                            <BsCheckCircleFill size={22} color='#FFFF' />
                        ) : (
                            <BiErrorCircle size={22} color='#FFFF' />
                        )}
                        <span>{message}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
