import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Card from '../../Components/Card/Card.jsx'
import Loading from '../../Components/Loading/Loading.jsx'
import { BsBoxSeam } from 'react-icons/bs';
import { MdAccessTime } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import AppTable from '../../Components/Table/AppTable.jsx'
import AppBarChart from '../../Components/AppBarChart/AppBarChart.jsx';
import LatestStatus from '../../Components/LatestStatus/LatestStatus.jsx';
import RouteButton from '../../Components/RouteButton/RouteButton.jsx';
export default function Dashborad() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lengthProducts, setLengthProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [dataOrders, setDataOrders] = useState([]);
  const [lengthOrders, setLengthOrders] = useState(0);
  const [lengthStatusPending, setLengthStatusPendig] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [ordersDataChart, setOrderDataChart] = useState(0);
  const tableTitleProduct = [
    { title: 'شماره', type: "number" },
    { title: 'تصویر', key: "image", type: "image" },
    { title: 'نام محصول', key: "nameProduct" },
    { title: 'کد محصول', key: "codeProduct" },
    { title: 'موجودی فعلی', key: "inventoryProduct" },
    { title: 'قیمت', key: "priceProduct" },
  ]
  const tableTitleOrders = [
    { title: 'شماره', type: "number" },
    { title: 'شماره سفارش', key: "order_id" },
    { title: 'مشتری', key: "customer_name" },
    { title: 'تاریخ ثبت', key: "order_date" },
    { title: 'مبلغ کامل', key: "total_amount" },
    { title: 'وضعیت پرداخت', key: "payment_method" },
    { title: 'وضعیت سفارش', key: "order_status" },
  ]
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch('http://localhost:3000/allProducts')
        if (!response.ok) {
          throw new Error(`خطا در دریافت محصولات: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setLengthProducts(data.length)
        }
        const fiveFirstDataProduct = data.slice(0, 5)
        setProducts(fiveFirstDataProduct)

        const response2 = await fetch('http://localhost:3000/salesData')
        if (!response2.ok) {
          throw new Error(`خطا در دریافت اطلاعات فروش و هزینه : ${response2.status} ${response2.statusText}`);

        }
        const data2 = await response2.json();
        const total = data2.map(item => item.sales).reduce((result, currentVal) => { return result + currentVal }, 0)
        setTotalSales(total.toLocaleString())
        setSalesData(data2)
        const response3 = await fetch('http://localhost:3000/monthly_orders')
        if (!response3.ok) {
          throw new Error(`خطا در دریافت اطلاعات سفارشات ${response3.status} ${response3.statusText}`);

        }
        const data3 = await response3.json();
        setOrderDataChart(data3)
        const response4 = await fetch('http://localhost:3000/orders')
        if (!response4.ok) {
          throw new Error(`خطا در دریافت اطلاعات سفارشات ${response4.status} ${response4.statusText}`);
        }
        const data4 = await response4.json()
        if (data && Array.isArray(data4)) {
          setLengthOrders(data4.filter(order => order.order_status == 'تحویل داده شده').length)
          setLengthStatusPendig(data4.filter(order => order.order_status == 'درحال بررسی').length)
        }
        const fiveFirstDataOrders = data4.slice(0, 11)
        setDataOrders(fiveFirstDataOrders)

      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllData()
  }, [])
  if (loading) {
    return <div><Loading /></div>
  }
  if (error) {
    return <div><span className='text-3xl text-red-500 dark:text-red-400 flex justify-center items-center h-screen'>خطا در بارگذاری اطلاعات .... {error.message} </span></div>
  }
  return (
    <div className='flex flex-col w-full gap-4 p-3'>
      <h1 className='text-2xl font-semibold my-3 text-colorText'>داشبورد</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-4'>
        <div className='col-span-1 text-white'>
          <Card bgCard={'bg-blue-500'} titleCard={'فروش کل'} icons={<FaMoneyBillWave className='w-6 h-6 md:w-10 md:h-10' />} valueCard={totalSales} />
        </div>
        <div className='col-span-1 text-white '>
          <Card bgCard={'bg-emerald-500'} titleCard={'محصولات'} icons={<BsBoxSeam className='w-6 h-6 md:w-10 md:h-10' />} valueCard={lengthProducts} />
        </div>
        <div className='col-span-1 text-white'>
          <Card bgCard={'bg-sky-500'} titleCard={'سفارشات تحویل داده شده'} icons={<FaRegCheckCircle className='w-6 h-6 md:w-10 md:h-10' />} valueCard={lengthOrders} />
        </div>
        <div className='col-span-1 text-white'>
          <Card bgCard={'bg-amber-500'} titleCard={'سفارشات در حال بررسی ...'} icons={<MdAccessTime className='w-6 h-6 md:w-10 md:h-10' />} valueCard={lengthStatusPending} />
        </div>
      </div>
      <div className='bg-bgBox rounded-md lg:p-5 border border-colorBorder'>
        <h1 className='text-xl text-colorText'>گزارش ماهانه فروش</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-1'>
          <div className='col-span-1'>
            <ResponsiveContainer width='100%' height={400}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke='#DC2626' strokeWidth={3} name='هزینه' />
                <Line type="monotone" dataKey='expenses' stroke='#10B981' strokeWidth={3} name='فروش' />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className='col-span-1'>
            <AppBarChart data={ordersDataChart} barDatakey={'orders'} XaxisData={'month'} color={'#818CF8'} name={'سفارشات'} />
          </div>
        </div>
      </div>
      <div className=''>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='col-span-1'>
            <LatestStatus title={'جدیدترین سفارشات ثبت شده'} borderColor={'border-amber-500'} icon={HiOutlineShoppingBag} colorIcon={'#f59e0b'}>
              <AppTable columns={tableTitleOrders} data={dataOrders} renderButton={(row) => (
                <>
                  <RouteButton to={`/orders/view/${row.id}`} bgBtn={'bg-amber-500'} hoverBgBtn={'hover:bg-amber-600'} textBtn={'جزئیات سفارش'} colorText={'text-white'} />
                </>
              )} />
            </LatestStatus>
          </div>
          <div className='col-span-1'>
            <LatestStatus title={'جدیدترین محصولات'} borderColor={'border-green-500'} icon={BsBoxSeam} colorIcon={'#22c55e'}>
              <AppTable columns={tableTitleProduct} data={products} renderButton={(row) => (
                <>
                  <RouteButton to={`/product/${row.id}`} bgBtn={'bg-green-500'} hoverBgBtn={'hover:bg-green-600'} textBtn={'جزئیات محصول'} colorText={'text-white'} />
                </>
              )} />
            </LatestStatus>
          </div>
        </div>
      </div>
    </div>
  )
}