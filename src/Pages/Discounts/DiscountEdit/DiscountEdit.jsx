import React, { useEffect, useState } from 'react'
import { useParams, useNavigate }  from 'react-router'
import Loading from '../../../Components/Loading/Loading';
import InputComponent from '../../../Components/InputComponent/InputComponent';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import AppButton from '../../../Components/AppButton/AppButton';
import '../DiscountNew/DatePicker.css';
import Toast from '../../../Components/Toast/Toast';
import RouteButton from '../../../Components/RouteButton/RouteButton';

export default function DiscountEdit() {
    const { discountEdit } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submited, setSubmited] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const Navigate=useNavigate()
    const [formData, setFormData] = useState({
        code: "",
        description: "",
        discount_type: "",
        discount_value: "",
        minimum_order_amount: "",
        usage_limit_total: "",
        usage_count_current: 0,
        expiration_date: "",
        start_date: "",
        status: "درحال بررسی",
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/discounts/${discountEdit}`)
                if (!response.ok) {
                    throw new Error(`خطا در دریافت اطلاعات ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setFormData(data)

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [discountEdit])
    const changeStartDate = (dateObj) => {
        if (dateObj) {
            setFormData({
                ...formData,
                start_date: dateObj.format("YYYY/MM/DD")
            })
        }
    }
    const changeEndDate = (dateObj) => {
        if (dateObj) {
            setFormData({
                ...formData,
                expiration_date: dateObj.format("YYYY/MM/DD")
            })
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            !formData.code ||
            !formData.description ||
            !formData.discount_type ||
            !formData.discount_value ||
            !formData.minimum_order_amount ||
            !formData.usage_limit_total ||
            !formData.expiration_date ||
            !formData.start_date) {
            setSubmited(true)
            return;
        }
        else {
            try {
                const response = await fetch(`http://localhost:3000/discounts/${discountEdit}`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                })
                if (!response.ok) {
                    throw new Error(`خطا در آپدیدت کد تخفیف ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setSubmited(false)
                setShowToast(true);
                setTimeout(() => {
                    Navigate('/discounts')
                }, 3000);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
    }
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <span className='text-3xl text-red-500 flex justify-center items-center h-screen'>{error.message}</span>
    }
    return (
        <div className='p-3 w-full h-full flex flex-col text-colorText'>
            <h1 className='text-xl font-bold my-3'>ویرایش کد تخفیف جدید</h1>
            <form action="#" className='p-3 rounded-md bg-bgBox border border-colorBorder'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='col-span-1'>
                        <InputComponent titleLabel={'کد تخفیف'} typeInput={'text'} inputVal={formData.code} onChangeInput={(e) => {
                            const cancelPersian = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
                            setFormData({ ...formData, code: cancelPersian })
                        }} placeholder={'کد تخفیف را وارد کنید'} />
                        {submited && formData.code == "" &&
                            <span className='text-red-500 text-sm'>لطفا کد تخفیف را وارد کنید</span>
                        }
                    </div>
                    <div className='col-span-1'>
                        <InputComponent titleLabel={'عنوان کد تخفیف'} typeInput={'text'} inputVal={formData.description} onChangeInput={(e) => setFormData({ ...formData, description: e.target.value })} placeholder={'عنوان کد تخفیف را وارد کنید'} />
                        {submited && formData.description == "" &&
                            <span className='text-red-500 text-sm'>لطفا عنوان کد تخفیف را وارد کنید</span>
                        }
                    </div>
                    <div className='col-span-1 text-center'>
                        <h4 className='mt-2'>نوع تخفیف</h4>
                        <div className='flex items-center justify-around'>
                            <label className='flex items-center gap-1'>
                                <input type='radio' name="discount_type" value='درصد' checked={formData.discount_type === 'درصد'} onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })} className='border-2 focus:outline-2 outline-primary border-gray-200 p-2 my-2 rounded-md text-sm' />
                                <span>درصد</span>
                            </label>
                            <label className='flex items-center gap-1'>
                                <input type='radio' name="discount_type" value='مبلغ' checked={formData.discount_type === 'مبلغ'} onChange={(e) => setFormData({ ...formData, "discount_type": e.target.value })} className='border-2 focus:outline-2 outline-primary border-gray-200 p-2 my-2 rounded-md text-sm' />
                                <span>مبلغ</span>
                            </label>
                        </div>
                        {submited && formData.discount_type == '' &&
                            <span className='text-red-500 text-sm'>لطفا نوع تخفیف را انتخاب کنید</span>
                        }
                    </div>
                    <div className='col-span-1'>
                        <InputComponent titleLabel={'مقدار تخفیف'} typeInput={'number'} inputVal={formData.discount_value} onChangeInput={(e) => setFormData({ ...formData, discount_value: e.target.value })} placeholder={'مقدار کد تخفیف را وارد کنید'} />
                        {submited && formData.discount_value == "" &&
                            <span className='text-red-500 text-sm'>لطفا مقدار کد تخفیف را وارد کنید</span>
                        }
                    </div>
                    <div className='col-span-1'>
                        <InputComponent titleLabel={'حداقل خرید'} typeInput={'number'} inputVal={formData.minimum_order_amount} onChangeInput={(e) => setFormData({ ...formData, minimum_order_amount: e.target.value })} placeholder={' حداقل مقدار خرید برای استفاده از کد تخفیف را وارد کنید'} />
                        {submited && formData.minimum_order_amount == "" &&
                            <span className='text-red-500 text-sm'>لطفا حداقل مقدار خرید برای استفاده از  کد تخفیف را وارد کنید</span>
                        }
                    </div>
                    <div className='col-span-1'>
                        <InputComponent titleLabel={'تعداد مجاز استفاده'} typeInput={'number'} inputVal={formData.usage_limit_total} onChangeInput={(e) => setFormData({ ...formData, usage_limit_total: e.target.value })} placeholder={'تعداد مجازه استفاده از کد تخفیف را وارد کنید'} />
                        {submited && formData.usage_limit_total == '' &&
                            <span className='text-red-500 text-sm'>لطفا تعداد مجاز استفاده از  کد تخفیف را وارد کنید</span>
                        }
                    </div>
                    <div className='col-span-1 md:gap-4 grid md:grid-cols-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='' className='mt-2'>شروع تاریخ</label>
                            <DatePicker
                                className='!w-full'
                                inputClass='!w-full !border-2 !focus:outline-2 !outline-primary !border-colorBorder !bg-bgBox !p-2 !my-2 !rounded-md !text-sm'
                                value={formData.start_date}
                                onChange={changeStartDate}
                                calendar={persian}
                                locale={persian_fa}
                                minDate={new Date()}
                                placeholder='تاریخ شروع استفاده از کد تخفیف'
                            />
                            {submited && formData.start_date == '' &&
                                <span className='text-sm text-red-500'>لطفا تاریخ شروع استفاده از کد تخفیف را وارد کنید</span>
                            }
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='' className='mt-2'>تاریخ انقضا</label>
                            <DatePicker
                                className='!w-full'
                                inputClass='!w-full !border-2 !focus:outline-2 !outline-primary !border-colorBorder !bg-bgBox !p-2 !my-2 !rounded-md !text-sm'
                                value={formData.expiration_date}
                                onChange={changeEndDate}
                                calendar={persian}
                                locale={persian_fa}
                                minDate={new Date()}
                                placeholder='تاریخ انقضای استفاده از کد تخفیف'
                            />
                            {submited && formData.expiration_date == '' &&
                                <span className='text-sm text-red-500'>لطفا تاریخ انقضای استفاده از کد تخفیف را وارد کنید</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='col-span-1 place-items-end flex justify-end gap-3 my-4'>
                    <RouteButton to={'/discounts'} bgBtn={'bg-red-500'} hoverBgBtn={'hover:bg-red-600'} textBtn={'انصراف'} colorText={'text-white'} />
                    <AppButton bgBtn={'bg-blue-500'} hoverBgBtn={'hover:bg-blue-600'} textBtn={'ویرایش کد تخفیف'} typeBtn={'submit'} onClickHandler={(e) => submitHandler(e)} colorText={'text-white'} />
                </div>
                <Toast bgNotifiction={'bg-green-500'} message={'کد تخفیف شما با موفقیت ویرایش شد .'} isShowToast={showToast} type={'success'} />
            </form>
        </div>
    )
}
