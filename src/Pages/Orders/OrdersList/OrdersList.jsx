import React, { useEffect, useMemo, useState } from 'react'
import RouteButton from '../../../Components/RouteButton/RouteButton.jsx'
import Loading from '../../../Components/Loading/Loading.jsx';
import AppTable from '../../../Components/Table/AppTable.jsx';
import AppButton from '../../../Components/AppButton/AppButton.jsx'
import EmptyState from '../../../Components/EmptyState/EmptyState.jsx';
export default function OrdersList() {
    const [inputVal, setInputVal] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ordersData, setOrdersData] = useState([]);
    const statusColor = {
        "درحال بررسی": "bg-gray-500",
        "ارسال شده": "bg-blue-500",
        "تحویل داده شده": "bg-green-500",
        "لغو شده": "bg-red-500",
    }
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders');
                if (!response.ok) {
                    throw new Error(`خطا در بارگذاری اطلاعات ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setOrdersData(data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders();
    }, [])
    const removeHandler = async (orderID) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                throw new Error(`خطا در حذف سفارش مورد نظر ${response.status} ${response.statusText}`);
            }
            setOrdersData(prev => {
                return prev.filter(item => item.id !== orderID)
            })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false)
        }
    }
    const tableTitle = [
        { title: "شماره", key: "number", type: "number" },
        { title: "شماره سفارش", key: "order_id" },
        { title: "تاریخ ثبت", key: "order_date" },
        { title: "نام مشتری", key: "customer_name" },
        { title: "مبلغ کل", key: "total_amount" },
        { title: "وضعیت", key: "order_status", type: "status" },
        { title: "نحوه پرداخت", key: "payment_method" },
    ]
    const resultOrders = useMemo(() => {
        return ordersData.filter(item =>
            item.order_id.toLowerCase().includes(inputVal) ||
            item.customer_name.toLowerCase().includes(inputVal) ||
            item.order_status.toLowerCase().includes(inputVal) ||
            item.payment_method.toLowerCase().includes(inputVal) ||
            item.order_date.includes(inputVal)
        )
    }, [ordersData, inputVal])
    if (loading) {
        return <span><Loading /></span>
    }
    if (error) {
        return <div><span className='text-3xl  text-red-500 flex justify-center items-center h-screen'>خطا در بارگذاری اطلاعات .... {error.message} </span></div>
    }
    return (
        <div className='w-full relative h-full p-3'>
            <div className='flex mb-5 justify-between items-center flex-col md:flex-row'>
                <h1 className='text-xl font-bold mb-3 md:mb-0 text-colorText'>لیست سفارشات</h1>
                <div className='flex gap-3 items-center'>
                    <input type="text" placeholder='جستجو ...' className='text-colorText border-2 focus:outline-2 outline-primary border-colorBorder bg-bgBox p-2 my-2 rounded-md text-sm' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <RouteButton to={'/orders/new'} bgBtn={'bg-green-500'} hoverBgBtn={'bg-green-600'} textBtn={'افزودن سفارش جدید'} colorText={'text-white'} />
                </div>
            </div>
            <div className=' rounded-md w-full border border-colorBorder'>
                {resultOrders.length ?

                    <AppTable columns={tableTitle} data={resultOrders} statusColor={statusColor} renderButton={(row) => (
                        <>
                            <RouteButton to={`/orders/view/${row.id}`} bgBtn={'bg-orange-500'} hoverBgBtn={'hover:bg-orange-600'} textBtn={'مشاهده جزئیات'} colorText={'text-white'} />
                            <RouteButton to={`/orders/edit/${row.id}`} bgBtn={'bg-blue-500'} hoverBgBtn={'hover:bg-blue-600'} textBtn={'ویرایش'} colorText={'text-white'} />
                            <AppButton bgBtn={'bg-red-500'} hoverBgBtn={'hover:bg-red-600'} textBtn={'حذف'} typeBtn={'button'} onClickHandler={() => removeHandler(row.id)} colorText={'text-white'} />
                        </>
                    )}
                    />
                    :
                    <EmptyState />
                }
            </div>
        </div>
    )
}
