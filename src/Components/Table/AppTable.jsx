import React from 'react'
export default function AppTable({ columns, data, renderButton, statusColor }) {
    return (
        <div className='overflow-x-auto'>
            <table className='w-full border-spacing-2 border-separate min-w-max whitespace-nowrap rounded-md text-colorText bg-bgBox'>
                <thead>
                    <tr>
                        {columns.map((col) =>
                            <th key={col.key} className='p-1'>{col.title}</th>
                        )}
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {data.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                            {columns.map((col) => (
                                <td key={col.key} className='p-1 truncate'>
                                    <div className='flex justify-center items-center text-center'>
                                        {col.type === 'image' ? (
                                            <img className=' w-full max-w-[100px] max-h-[100px]  h-full object-cover' src={item[col.key]} alt="" />
                                        ) : col.type == 'status' ? (
                                            <div className={` w-full px-4 py-2 rounded-md text-white  ${statusColor[item[col.key]] || "bg-transparent text-black"}`}><span>{item[col.key]}</span></div>
                                        ) : col.type == 'number' ? (
                                            <span>{itemIndex + 1}</span>
                                        )
                                            : (
                                                <span className='w-full max-w-[120px] text-wrap'>{item[col.key]}</span>
                                            )}
                                    </div>
                                </td>
                            ))}
                            <td>
                                <div className='flex gap-2 justify-center'>
                                    {renderButton && renderButton(item)}
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div >
    )
}
