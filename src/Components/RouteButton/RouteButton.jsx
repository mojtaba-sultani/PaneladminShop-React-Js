import React from 'react'
import { Link } from 'react-router'

export default function RouteButton({to,bgBtn,hoverBgBtn,textBtn,colorText}) {
  return (
    <>
            <Link to={to} className={`${bgBtn} ${colorText} min-w-fit text-center  px-4 py-2 flex items-center justify-center rounded-md transition duration-200 ease-in whitespace-nowrap ${hoverBgBtn}`}>{textBtn}</Link>
    </>
  )
}
