import React, { useEffect, useMemo, useState } from 'react'
import EmptyState from '../../../Components/EmptyState/EmptyState';
import AppButton from '../../../Components/AppButton/AppButton';
import RouteButton from '../../../Components/RouteButton/RouteButton';
import AppTable from '../../../Components/Table/AppTable';
import Loading from '../../../Components/Loading/Loading';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function AllProductPage() {
    const selectStyles = {
        bgcolor: '#6366f1',
        color: '#FFFF',
        borderRadius: '8px',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
        '& .MuiSelect-select': { py: '8px', px: '16px' },
        '& .MuiSelect-icon': { color: '#FFFF', fontSize: "30px" },
    };
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null);
    const [statusInput, setStatusInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [inputVal, setInputVal] = useState('');
    const tableTitle = [
        { title: 'شماره', key: "number", type: "number" },
        { title: 'تصویر', key: "image", type: "image" },
        { title: 'نام محصول', key: "nameProduct" },
        { title: 'کد محصول', key: "codeProduct" },
        { title: 'قیمت', key: "priceProduct" },
        { title: 'توضیحات', key: "descriptionProduct" },
        { title: 'موجودی', key: "inventoryProduct" },
        { title: 'وضعیت', key: "status", type: "status" },
    ];

    const statusColor = {
        "فعال": "bg-green-500",
        "غیر فعال": "bg-gray-500",
        "درحال بررسی": "bg-orange-500",
        "رد شده": "bg-red-500",
        "حذف شده": "bg-black",
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/allProducts')
                if (!response.ok) {
                    throw new Error(`Network response was not ok${response.status} ${response.statusText}`);
                }
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    const resultProducts = useMemo(() => {
        return products.filter(item => 
            item.nameProduct.toLowerCase().includes(inputVal) ||
            item.codeProduct.toLowerCase().includes(inputVal) ||
            item.status.toLowerCase().includes(inputVal)
        )
    }, [products, inputVal])
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div><span className='text-3xl text-red-500 dark:text-red-400 flex justify-center items-center h-screen'>خطا در بارگذاری اطلاعات ....{error.message}</span></div>
    }
    const removeHandler = async (ProductID) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/allProducts/${ProductID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                throw new Error(`خطا در حذف: ${response.status}`);
            }
            setProducts(prev => {
                return prev.filter(item => item.id !== ProductID)
            })
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    if (products.length <= 0) {
        return <div><EmptyState /></div>
    }
    const changeStatus = async (event, ProductID) => {
        let newValue = event.target.value;
        let findProduct = products.find(product => product.id == ProductID)
        try {
            const response = await fetch(`http://localhost:3000/allProducts/${ProductID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...findProduct,
                    status: newValue
                })
            })
            if (!response.ok) {
                throw new Error(`خطا در update محصول ${response.status} ${response.statusText}`);

            }
        } catch (error) {
            setError(error)
        }
        setProducts(prev =>
            prev.map(item =>
                item.id == ProductID
                    ? { ...item, status: newValue }
                    : item
            )
        )
    }
    return (
        <div className='w-full relative h-full p-3'>
            <div className='flex mb-5 justify-between items-center flex-col md:flex-row'>
                <h1 className='text-xl font-bold mb-3 md:mb-0 text-colorText'>لیست محصولات</h1>
                <div className='flex gap-3 items-center'>
                    <input type="text" placeholder='جستجو ...' className='text-colorText bg-bgBox border-2 focus:outline-2 outline-primary border-colorBorder p-2 my-2 rounded-md text-sm' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <RouteButton to={'/product/new'} bgBtn={'bg-green-500'} hoverBgBtn={'bg-green-600'} textBtn={'افزودن محصول جدید'} colorText={'text-white'} />
                </div>
            </div>
            <div className='w-full border rounded-md border-colorBorder'>
                {resultProducts.length ?

                    <AppTable columns={tableTitle} statusColor={statusColor} data={resultProducts} renderButton={(row) => (
                        <>
                            <RouteButton to={`/product/edit/${row.id}`} bgBtn={'bg-blue-500'} hoverBgBtn={'hover:bg-blue-600'} textBtn={'ویرایش'} colorText={'text-white'} />
                            <AppButton bgBtn={'bg-red-500'} hoverBgBtn={'hover:bg-red-600'} textBtn={'حذف'} typeBtn={'button'} onClickHandler={() => removeHandler(row.id)} colorText={'text-white'} />
                            <FormControl size='small' color='#000'>
                                <Select
                                    defaultValue='تغییر وضعیت'
                                    value={statusInput}
                                    onChange={(e) => changeStatus(e, row.id)}
                                    sx={selectStyles}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        if (selected == null || selected == "") {
                                            return <em>تغییر وضعیت</em>
                                        }
                                        return selected;
                                    }}
                                >
                                    <MenuItem value='فعال'>فعال</MenuItem>
                                    <MenuItem value='غیر فعال'>غیر فعال</MenuItem>
                                    <MenuItem value='درحال بررسی'>درحال بررسی</MenuItem>
                                    <MenuItem value='رد شده'>رد شده</MenuItem>

                                </Select>
                            </FormControl>
                        </>
                    )}
                    />
                    : <EmptyState />
                }
            </div>
        </div>
    )
}
