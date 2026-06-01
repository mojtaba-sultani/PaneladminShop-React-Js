import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import RouteButton from '../../../Components/RouteButton/RouteButton.jsx';
import Loading from '../../../Components/Loading/Loading.jsx';
import AppTable from '../../../Components/Table/AppTable.jsx'
import { FormControl, Select, MenuItem } from '@mui/material';
export default function OrderEdit() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [statusInput, setStatusInput] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const selectStyles = {
    bgcolor: '#6366f1',
    color: '#FFFF',
    borderRadius: '8px',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
    '& .MuiSelect-select': { py: '8px', px: '16px' },
    '& .MuiSelect-icon': { color: '#FFFF', fontSize: "30px" },
  };
  const bgColor = (text) => {
    if (text === 'در حال پردازش') {
      return 'bg-amber-500'
    }
    if (text === 'ارسال شده') {
      return 'bg-blue-500'
    }
    if (text === 'تحویل داده شده') {
      return 'bg-green-500'
    }
    if (text === 'لغو شده') {
      return 'bg-red-500'
    }
  }
  const titleTable = [
    { title: "نام محصول", key: "product_name" },
    { title: "تعداد سفارش", key: "quantity" },
    { title: "قیمت", key: "price_per_unit" },
  ]
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}`)
        if (!response.ok) {
          throw new Error(`خطا در دریافت اطلاعات ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        let address = `${data.shipping_address.province} - ${data.shipping_address.city} - ${data.shipping_address.address_line}`
        setOrderData(data);
        setAddressData(address)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    }
    fetchOrder()
  }, [orderId])
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <div><span className='text-3xl text-red-500 flex justify-center items-center h-screen'>خطا در بارگذاری اطلاعات ....{error.message}</span></div>
  }
  const changeOrderStatus = async (event) => {
    setLoading(true)
    const newValue = event.target.value;
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderData,
          order_status: newValue
        })
      })
      if (!response.ok) {
        throw new Error(`خطا در ارسال اطلاعات ${response.status} ${response.statusText}`);
      }
      const data = await response.json()
      setOrderData(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='p-3 flex flex-col gap-4 text-colorText'>
      <div className='flex justify-between border border-colorBorder gap-4 items-center p-3 rounded-md bg-bgBox'>
        <RouteButton to={'/orders'} bgBtn={'bg-blue-500'} hoverBgBtn={'hover:bg-blue-600'} textBtn={'بازگشت'} colorText={'text-white'} />
        <h5 className='whitespace-nowrap'>جزئیات سفارش : <b className='text-sm md:text-base'>{orderData.order_id}</b></h5>
      </div>
      <div className='p-5 border border-colorBorder rounded-md grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center bg-bgBox'>
        <div className="col-span-1">
          <h5>سفارش : <b>{orderData.order_id}</b></h5>
        </div>
        <div className="col-span-1">
          <h5>وضعیت : <span className={`p-2 text-sm text-white rounded-md ${bgColor(orderData.order_status)}`}>{orderData.order_status}</span></h5>
        </div>
        <div className="col-span-1">
          <h5>تاریخ ثبت : <b>{orderData.order_date}</b></h5>
        </div>
        <div className="col-span-1">
          <h5>مبلغ کل : <b className='text-green-500'>{orderData.total_amount} تومان</b></h5>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-bgBox border border-colorBorder rounded-md p-3 flex flex-col gap-3'>
          <div className="col-span-1 place-items-start">
            <h2 className='font-bold text-lg'>اطلاعات مشتری</h2>
          </div>
          <div className="col-span-1 place-items-start">
            <h5>نام مشتری : {orderData.customer_name}</h5>
          </div>
          <div className="col-span-1 place-items-start">
            <h5>شماره تماس : {orderData.customer_phone}</h5>
          </div>
          <div className="col-span-1 place-items-start">
            <h5>ایمیل : {orderData.customer_email}</h5>
          </div>
          <div className="col-span-1 place-items-start">
            <h5>آدرس : {addressData}</h5>
          </div>
        </div>
        <div className='bg-bgBox border border-colorBorder rounded-md p-3 flex flex-col gap-3'>
          <AppTable columns={titleTable} data={orderData.products} renderButton={(product) =>
            <RouteButton to={`/product/view /${product.product_id}`} bgBtn={'bg-green-500'} hoverBgBtn={'hover:bg-green-600'} textBtn={'مشاهده محصول'} colorText={'text-white'} />
          } />
        </div>
        <div className='bg-bgBox border border-colorBorder rounded-md p-3 flex flex-col gap-3'>
          <div className="col-span-1 place-items-start">
            <h2 className='font-bold text-lg'>خلاصه مالی</h2>
          </div>
          <div className="col-span-1 place-items-start">
            <h5>نوع پرداخت : {orderData.payment_method}</h5>
          </div>
          <div className="col-span-1 place-items-start">
            <h5>تخفیف : {orderData.discount_amount}</h5>
          </div>
          <div className="col-span-1 place-items-start">
            <h5>جمع کل : <b className='text-green-500'>{orderData.total_amount} تومان</b></h5>
          </div>
        </div>
        <div className='bg-bgBox border border-colorBorder rounded-md p-3 flex flex-col gap-3'>
          <div className="col-span-1 place-items-start">
            <h2 className='font-bold text-lg'>تاریخچه وضعیت</h2>
          </div>
          <div className="col-span-1 place-items-start">
            <h5 className='flex items-center gap-4'><small className={`p-2 text-white rounded-md ${bgColor(orderData.order_status)}`}>{orderData.order_status}</small>{orderData.order_date}</h5>
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-4'>
        <FormControl size='small' color='#000'>
          <Select
            defaultValue='تغییر وضعیت سفارش'
            value={statusInput}
            onChange={(e) => changeOrderStatus(e, orderData.order_id)}
            sx={selectStyles}
            displayEmpty
            renderValue={(selected) => {
              if (selected == null || selected == "") {
                return <em>تغییر وضعیت سفارش</em>
              }
              return selected;
            }}
          >
            <MenuItem value='در حال پردازش'>در حال پردازش</MenuItem>
            <MenuItem value='ارسال شده'>ارسال شده</MenuItem>
            <MenuItem value='تحویل داده شده'>تحویل داده شده</MenuItem>
            <MenuItem value='لغو شده'>لغو شده</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}