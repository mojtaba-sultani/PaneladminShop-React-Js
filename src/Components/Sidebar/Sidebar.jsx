import React, { useContext, useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { Link } from 'react-router'
import { BiClipboard, BiPlusCircle, BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { MdAddBox, MdDashboard, MdDiscount, MdInventory, MdKeyboardArrowDown, MdKeyboardArrowUp, MdShoppingCart } from 'react-icons/md'
import { GrAnalytics } from 'react-icons/gr'
import { CiViewList } from 'react-icons/ci'
import { IoPencilOutline } from 'react-icons/io5'
import { GiPresent } from 'react-icons/gi'
import './Sidebar.css'
import { ThemeContext } from '../../Contexts/ThemeContext'
export default function Sidebar() {
  const { isShowSidebar } = useContext(ThemeContext)
  const [isShowDropDown, setIsShowDropDown] = useState(null)
  const showDropDown = (itemID) => {
    if (itemID == null) {
      setIsShowDropDown(null)
    }
    else if (itemID == isShowDropDown) {
      setIsShowDropDown(null)
    }
    else {

      setIsShowDropDown(itemID)
    }
  }
  return (
    <div className={`${isShowSidebar ? "hidden" : "flex"}  hidden md:flex flex-col w-full max-w-[230px]  bg-[#222d32] text-white`}>
      <div className='flex flex-col h-full overflow-y-auto hide-scrollbar '>
        <div className='flex gap-2 p-3'>
          <img src="/images/Profile.jpg" alt="" className='w-11 h-11 rounded-full object-cover' />
          <div className='flex flex-col gap-1'>
            <h5 className='text-sm'>لئوناردو دیکاپریو</h5>
            <div className="flex">
              <GoDotFill className='text-green-600' />
              <span className='text-xs'>آنلاین</span>
            </div>
          </div>
        </div>
        <form className='input-icon relative  p-3'>
          <input type="text" name="" id="" placeholder='جستجو' className='text-xs p-2 rounded-sm w-full bg-[#374850] pl-6' />
        </form>
        <h5 className='bg-[#1a2226] text-[#4b646f] py-2 px-4'>منو</h5>
        <ul className='list-none'>
          <li className='flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer'>
            <Link to='/dashborad' className='flex gap-1 items-center'>
              <MdDashboard size={16} />
              <span className='text-sm'>داشبورد</span>
            </Link>
          </li>
          <li className='flex flex-col items-center w-full'
            onClick={() => showDropDown('product')}
          >
            <button className='w-full flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer'>
              <div className='flex gap-1 items-center'>
                <MdInventory size={16} />
                <span className='text-sm text-gray-400'>محصولات</span>
              </div>
              {isShowDropDown === "product" ? (

                <MdKeyboardArrowUp size={18} className='mr-auto' />
              )
                : (
                  <MdKeyboardArrowDown size={18} className='mr-auto' />
                )
              }
            </button>
            <ul className={`w-full bg-gray-800 ${isShowDropDown === "product" ? "block" : "hidden"}`}>
              <li className='flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer w-full'>
                <Link to='/product' className='w-full flex items-center'>
                  <div className='flex gap-1 items-center'>
                    <CiViewList size={16} />
                    <span className='text-sm text-gray-400'>لیست محصولات</span>
                  </div>
                </Link>
              </li>
              <li className='flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer w-full'>
                <Link to='/product/new' className='w-full flex items-center'>
                  <div className='flex gap-1 items-center'>
                    <MdAddBox size={16} />
                    <span className='text-sm text-gray-400'>افزودن محصول جدید</span>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
          {/* شروع روت سفارشات */}
          <li className='flex flex-col items-center  w-full'>
            <button className='w-full flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer'
              onClick={() => showDropDown('orders')}
            >
              <div className='flex gap-1 items-center'>
                <MdShoppingCart size={16} />
                <span className='text-sm text-gray-400'>سفارشات</span>
              </div>
              {isShowDropDown === "orders" ? (

                <MdKeyboardArrowUp size={18} className='mr-auto' />
              )
                : (
                  <MdKeyboardArrowDown size={18} className='mr-auto' />
                )
              }
            </button>
            <ul className={`list-none w-full bg-gray-800 ${isShowDropDown === "orders" ? "block" : "hidden"}`}>
              <li className='flex items-center'>
                <Link to='/orders' className='w-full flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer'>
                  <div className='flex gap-1 items-center'>
                    <BiClipboard size={16} />
                    <span className='text-sm text-gray-400'>لیست سفارشات</span>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
          {/* پایان روت سفارشات */}

          {/* شروع روت کد تخفیف */}
          <li className='flex flex-col items-center w-full'
            onClick={() => showDropDown("discount-code")}
          >
            <div className='w-full flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer'>
              <div className='flex gap-1 items-center'>
                <MdDiscount size={14} />
                <span className='text-sm text-gray-400'>کدتخفیف</span>
              </div>
              {isShowDropDown === "discount-code" ? (

                <MdKeyboardArrowUp size={18} className='mr-auto' />
              )
                : (
                  <MdKeyboardArrowDown size={18} className='mr-auto' />
                )
              }
            </div>
            <ul className={`w-full bg-gray-800 ${isShowDropDown === "discount-code" ? "block" : "hidden"}`}>
              <li className='flex items-center w-full'>
                <Link to='/discounts' className='w-full flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer'>
                  <div className='flex gap-1 items-center'>
                    <GiPresent size={14} />
                    <span className='text-sm text-gray-400'>لیست کد های تخفیف</span>
                  </div>
                </Link>
              </li>
              <li className='flex items-center w-full'>
                <Link to='/discounts/new' className='w-full flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer'>
                  <div className='flex gap-1 items-center'>
                    <BiPlusCircle size={14} />
                    <span className='text-sm text-gray-400'>افزودن کد تخفیف</span>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
          {/*  پایان روت کد تخفیف */}
          <li className='flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer w-full'>
            <Link to='/' className='w-full flex items-center'>
              <div className='flex gap-1 items-center'>
                <FiSettings size={16} />
                <span className='text-sm text-gray-400'>تنظیمات</span>
              </div>
            </Link>
          </li>
          <li className='flex items-center py-3 pr-4 pl-2 hover:bg-[#1a2226] cursor-pointer w-full'>
            <Link to='/' className='w-full flex items-center'>
              <div className='flex gap-1 items-center'>
                <BiUser size={16} />
                <span className='text-sm text-gray-400'>پروفایل</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
