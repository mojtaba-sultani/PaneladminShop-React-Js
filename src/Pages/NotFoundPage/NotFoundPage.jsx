import React from 'react'
import { Link } from 'react-router'
export default function NotFoundPage() {
  return (
    <div className='h-dvh w-full relative'>
    <img src="/images/404.jpg" alt="" className='h-full w-full object-cover' />
    <Link className='absolute bottom-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in' to={'/'}>بازگشت به صفحه اصلی</Link>
    </div>
  )
}
