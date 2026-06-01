import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { BiTrash } from 'react-icons/bi';
import { BsCloudUploadFill } from 'react-icons/bs'
import { LuFocus } from 'react-icons/lu';
import InputComponent from '../../../Components/InputComponent/InputComponent.jsx';
import TextAreaComponent from '../../../Components/TextAreaComponent/TextAreaComponent.jsx';
import AppButton from '../../../Components/AppButton/AppButton.jsx'
import RouteButton from '../../../Components/RouteButton/RouteButton.jsx';
import ModalValidation from '../../../Components/ModalValidation/ModalValidation.jsx';
import Loading from '../../../Components/Loading/Loading.jsx';
import Toast from '../../../Components/Toast/Toast.jsx';
export default function EditProduct() {
    const [loading, setLoading] = useState(true);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams();
    let id = params.productId
    const [formData, setFormData] = useState({
        nameProduct: "",
        codeProduct: "",
        priceProduct: "",
        descriptionProduct: "",
        inventoryProduct: "",
        image: "",
    })
    useEffect(() => {
        const postFetch = async () => {
            try {
                const response = await fetch(`http://localhost:3000/allProducts/${id}`)
                if (!response.ok) {
                    throw new Error(`خطا در ارسال اطلاعات ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        postFetch()
    }, [id])
    const [selectedImage, setSelectedImage] = useState(null);
    const [btnSubmited, setBtnSubmited] = useState(null);

    const Navigate = useNavigate()

    const changeImg = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file)
        if (file) {
            const render = new FileReader();
            render.onload = () => {
                setFormData(prevImage => ({ ...prevImage, image: render.result }))
            }
            render.readAsDataURL(file)
        }
    }
    const submitForm = async (e) => {
        e.preventDefault()
        setBtnSubmited(true)
        if (formData.image == null ||
            formData.nameProduct.length == 0 ||
            formData.codeProduct.length == 0 ||
            formData.priceProduct.length == 0 ||
            formData.inventoryProduct.length == 0) {
            setBtnSubmited(true)
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/allProducts/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`خطا در  آپدیدت محصول ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setBtnSubmited(false);
            setShowToast(true);
            setTimeout(() => {
                Navigate('/product')
            }, 3000);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return <Loading />
    }
    if (error) {
    return <div><span className='text-3xl text-red-500 flex justify-center items-center h-screen'>خطا در بارگذاری اطلاعات .... {error.message} </span></div>
    }
    return (
        <>
                <div className='w-full flex flex-col p-3 text-colorText'>
                    <h1 className='text-xl font-bold my-3'>ویرایش محصول</h1>
                    <form action="" className='border bg-boxBg border-colorBorder rounded-md p-3' onSubmit={(e) => submitForm(e)}>
                        <div className=' grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='col-span-1 flex flex-col'>
                                <h4 className='text-lg'>اطلاعات اصلی محصول</h4>
                                <InputComponent titleLabel={"نام محصول"} typeInput={"text"} inputVal={formData.nameProduct} placeholder={'لطفا نام محصول خود را وارد کنید'} onChangeInput={(e) => setFormData({ ...formData, nameProduct: e.target.value })} />
                                {btnSubmited && formData.nameProduct.length === 0 &&
                                    <span className='text-sm text-red-500'>نام محصول خود را وارد کنید</span>
                                }
                                <InputComponent titleLabel={"کد محصول"} typeInput={"number"} inputVal={formData.codeProduct} placeholder={'لطفا کد محصول خود را وارد کنید'} onChangeInput={(e) => setFormData({ ...formData, codeProduct: e.target.value })} />
                                {btnSubmited && formData.codeProduct.length === 0 &&
                                    <span className='text-sm text-red-500'>کد محصول خود را وارد کنید</span>
                                }
                                <InputComponent titleLabel={"قیمت"} typeInput={"number"} inputVal={formData.priceProduct} placeholder={'لطفا قیمت محصول خود را وارد کنید'} onChangeInput={(e) => setFormData({ ...formData, descriptionProduct: e.target.value })} />
                                {btnSubmited && formData.priceProduct.length === 0 &&
                                    <span className='text-sm text-red-500'>قیمت محصول خود را وارد کنید</span>
                                }
                                <TextAreaComponent titleLabel={"توضیحات"} textareaValue={formData.descriptionProduct} onChangeTextArea={(e) => setFormData({ ...formData, descriptionProduct: e.target.value })} />
                            </div>
                            <div className='col-span-1 flex flex-col'>
                                <h4 className='text-lg'>موجودی و تصویر محصول</h4>
                                <InputComponent titleLabel={"موجودی"} typeInput={"number"} inputVal={formData.inventoryProduct} placeholder={'لطفا موجودی محصول خود را وارد کنید'} onChangeInput={(e) => setFormData({ ...formData, inventoryProduct: e.target.value })} />
                                {btnSubmited && formData.inventoryProduct.length === 0 &&
                                    <span className='text-sm text-red-500'>موجودی محصول خود را وارد کنید</span>
                                }
                                <div className='flex flex-col h-full max-h-80'>
                                    <label htmlFor=''>آپلود تصویر  :</label>
                                    <div className='relative flex flex-col h-full border-2   focus:outline-2 outline-primary border-gray-200 p-2 my-2 rounded-md'>
                                        {!formData.image ? (
                                            <>
                                                <span className='absolute right-1/2 transform translate-x-1/2 md:top-1/2 md:-translate-y-1/2'>
                                                    <BsCloudUploadFill className='w-8 h-8  md:w-16 md:h-16' />
                                                </span>
                                                <input type="file" accept='image/*' onChange={(e) => changeImg(e)} name="" id="test" className='h-full opacity-0 cursor-pointer' />
                                            </>
                                        ) : (
                                            <>
                                                <div className='relative'>
                                                    <img src={formData.image} alt='' className='object-cover w-full h-full max-h-[240px] blur' />
                                                    <div className='flex gap-2 absolute bottom-2 left-2 '

                                                    >
                                                        <button type='button' className='bg-red-600  opacity-90 p-1 rounded-md'>
                                                            <BiTrash className='invert' size={30}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setFormData({ ...formData, image: null })
                                                                }}
                                                            />
                                                        </button>
                                                        <button type='button' className='bg-gray-500  opacity-90 p-1 rounded-md'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenModalImage(true)
                                                            }}
                                                        >
                                                            <LuFocus className='invert' size={30} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {btnSubmited && formData.image == null &&
                                        <span className='text-sm text-red-500'>تصویر محصول خود را وارد کنید</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex gap-2 justify-end items-center my-4 text-white flex-col md:flex-row'>
                            <RouteButton to={'/product'} textBtn={'لغو'} bgBtn={'bg-red-500'} hoverBgBtn={"hover:bg-red-600"} />
                            <AppButton typeBtn={"submit"} bgBtn={"bg-blue-500"} hoverBgBtn={"hover:bg-blue-600"} textBtn={"ویرایش محصول"} />
                        </div>
                        {openModalImage && (
                            <>
                                <ModalValidation type={'image'} isOpen={true} content={formData.image} onClose={() => setOpenModalImage(false)} />
                            </>
                        )}
                        <Toast isShowToast={showToast} bgNotifiction={'bg-green-500'} message={'محصول شما با موفقیت ویرایش شد .'} type={'success'} />
                    </form>
                </div>
            </>
    )
}
