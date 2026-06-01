import React, { useEffect, useMemo, useState } from 'react'
import RouteButton from '../../../Components/RouteButton/RouteButton'
import AppTable from '../../../Components/Table/AppTable';
import Loading from '../../../Components/Loading/Loading';
import AppButton from '../../../Components/AppButton/AppButton';
import EmptyState from '../../../Components/EmptyState/EmptyState';

export default function Discounts() {
    const [inputVal, setInputVal] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [discountsData, setDiscountsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/discounts');
                if (!response.ok) {
                    throw new Error(`خطا در دریافت اطلاعات`);
                }
                const data = await response.json();
                setDiscountsData(data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [])
    const titleTable = [
        { "title": "شماره", key: "number", type: "number" },
        { "title": "کدتخفیف", key: "code" },
        { "title": "عنوان کد تخفیف", key: "description" },
        { "title": "نوع تخفیف", key: "discount_type" },
        { "title": "مقدار تخفیف", key: "discount_value" },
        { "title": "حداقل خرید", key: "minimum_order_amount" },
        { "title": "استفاده شده", key: "usage_count_current" },
        { "title": "حداکثر استفاده", key: "usage_limit_total" },
        { "title": "تاریخ شروع", key: "start_date" },
        { "title": "تاریخ انقضا", key: "expiration_date" },
        { "title": "وضعیت", key: "status", type: "status" },
    ]
    const statusColor = {
        "فعال": "bg-green-500",
        "غیرفعال": "bg-red-500",
        "منقضی شده": "bg-black",
        "در حال بررسی": "bg-amber-500",
    }
    const deleteDiscount = async (orderId) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/discounts/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`خطا در حذف کد تخفیف ${response.status} ${response.statusText}`);
            }
            setDiscountsData(prev =>
                prev.filter(item => item.id !== orderId)
            )
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    const resultDiscounts = useMemo(() => {
        return discountsData.filter(discount =>
            discount.code.toLowerCase().includes(inputVal) ||
            discount.discount_type.toLowerCase().includes(inputVal) ||
            discount.status.toLowerCase().includes(inputVal) ||
            discount.minimum_order_amount.toString().includes(inputVal)
        )
    }, [discountsData, inputVal])
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <span className='text-3xl text-red-500 flex justify-center items-center h-screen'>{error.message}</span>
    }
    return (
        <div className='p-3 w-full h-full relative'>
            <div className='flex mb-5 justify-between items-center flex-col md:flex-row'>
                <h1 className='text-xl font-bold mb-3 md:mb-0 text-colorText'>لیست کدهای تخفیف</h1>
                <div className='flex gap-3 items-center'>
                    <input type="text" placeholder='جستجو ...' className='text-colorText border-2 focus:outline-2 outline-primary border-colorBorder bg-bgBox p-2 my-2 rounded-md text-sm' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <RouteButton to={'/discounts/new'} bgBtn={'bg-green-500'} hoverBgBtn={'bg-green-600'} textBtn={'افزودن کد تخفیف جدید'} colorText={'text-white'} />
                </div>
            </div>
            <div className='border border-colorBorder rounded-md'>
                {resultDiscounts.length ?

                    <AppTable columns={titleTable} data={resultDiscounts} statusColor={statusColor} renderButton={(row) => (
                        <>
                            <RouteButton to={`/discount/edit/${row.id}`} bgBtn={'bg-blue-500'} hoverBgBtn={'hover:bg-blue-600'} textBtn={'ویرایش'} colorText={'text-white'} />
                            <AppButton bgBtn={'bg-red-500'} hoverBgBtn={'hover:bg-red-600'} textBtn={'حذف'} typeBtn={'button'} onClickHandler={() => deleteDiscount(row.id)} colorText={'text-white'} />
                        </>
                    )} />
                    :
                    <EmptyState />
                }
            </div>
        </div>
    )
}
