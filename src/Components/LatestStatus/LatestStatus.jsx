import React from 'react'
export default function LatestStatus({title,borderColor,icon:CoustomIcon,colorIcon,children}) {
    return (
        <div className={`border-t-2 ${borderColor} flex flex-col bg-bgBox py-1 px-2 rounded-md`}>
            <div className='flex items-center mt-2 gap-1 border-b-2 pb-2'>
            {CoustomIcon && <CoustomIcon size={22} color={colorIcon} /> }
                <h6 className='text-lg text-colorText'>{title}</h6>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
