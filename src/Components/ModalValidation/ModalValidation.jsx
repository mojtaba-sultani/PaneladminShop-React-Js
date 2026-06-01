import React from 'react'
import { CgClose } from 'react-icons/cg'
import { BiCheckCircle } from 'react-icons/bi'
import { IoCloseCircle } from 'react-icons/io5';


export default function ModalValidation({ isOpen, type, content, onClose }) {
    if (!isOpen) {
        return null;
    }
    return (
        <div className='fixed w-dvw h-dvh bg-black bg-opacity-50 z-20 inset-0'>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full max-w-[700px] h-full max-h-[500px] bg-white rounded-md p-3 flex flex-col'>
                <button
                    onClick={onClose}
                >
                    <CgClose size={30} />
                </button>
                <div className='w-full flex justify-center items-center flex-col gap-5 h-full'>
                    {type === 'image' && (
                        <>
                            <img src={content} alt="" className='w-full h-full max-h-[400px] object-contain' />
                        </>
                    )}
                    {type === 'text' && (
                        <>
                        <span><BiCheckCircle size={100} color='#22c55e'/></span>
                            <p className='text-justify flex-wrap'>{content}</p>
                        </>
                    )}

                </div>
                <button className='mr-auto mt-auto p-2 rounded-md bg-red-500 text-white font-semibold'
                    onClick={onClose}
                >بستن</button>
            </div>
        </div>
    )
}
