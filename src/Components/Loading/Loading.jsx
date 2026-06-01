import React from 'react'
import './Loading.css'
export default function Loading() {
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <div className="flex flex-col items-center space-y-4">
        
        <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin-custom"></div>

        <div className="text-lg font-semibold text-gray-700">در حال بارگذاری...</div>
    </div>
    </div>
  )
}
