import React from 'react'

export default function TextAreaComponent({titleLabel,textareaValue,onChangeTextArea}) {
    return (
        <>
            <div className='flex flex-col'>
                <label className='mt-2'>{titleLabel} :</label>
                <textarea name="" id="" value={textareaValue} onChange={onChangeTextArea} className='resize-none border-2 border-colorBorder bg-bgBox rounded-md overflow-auto p-2 focus:outline-2 outline-primary my-2'></textarea>
            </div>
        </>
    )
}
