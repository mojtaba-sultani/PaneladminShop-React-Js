import React from 'react'

export default function Buttons({bgBtn,hoverBgBtn,textBtn,typeBtn,onClickHandler, colorText}) {
    return (
        <>
            <button onClick={onClickHandler} type={typeBtn} className={`${bgBtn} ${colorText} h-max flex items-center justify-center min-w-fit  px-4 py-2 rounded-md transition duration-200 ease-in ${hoverBgBtn}`}>{textBtn}</button>
        </>
    )
}
