import React from 'react'

export default function InputComponent({titleLabel,typeInput,inputVal,onChangeInput,placeholder}) {
    return (
        <>
            <div className='flex flex-col w-full'>
                <label htmlFor='' className='mt-2'>{titleLabel}</label>
                <input type={typeInput} name="" id="" value={inputVal} onChange={onChangeInput} placeholder={placeholder} className='bg-bgBox border-2 focus:outline-2 outline-primary border-colorBorder p-2 my-2 rounded-md text-sm'  />
            </div>
        </>
    )
}
