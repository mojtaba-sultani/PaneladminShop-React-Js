import React, { useState } from 'react'
import { BiTrash } from 'react-icons/bi';
import { BsCloudUploadFill } from 'react-icons/bs'
import { LuFocus } from 'react-icons/lu';
import { Link } from 'react-router';
import InputComponent from '../InputComponent/InputComponent';
import TextAreaComponent from '../TextAreaComponent/TextAreaComponent';
import AppButton from '../AppButton/AppButton';
import ModalValidation from '../ModalValidation/ModalValidation';
import Toast from '../Toast/Toast';
export default function AddProduct() {
    const [errorLoadData, setErrorLoadData] = useState(null);
    const [errorSubmitdata, setErorSubmitData] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [informationProduct, setInformationProduct] = useState({
        nameProduct: "",
        codeProduct: "",
        priceProduct: "",
        descriptionProduct: "",
        inventoryProduct: "",
        photoProduct: "",
        image: "",
        status: "درحال بررسی",
    })
    const [textBtnSubmit, setTextBtnSubmit] = useState('افزودن محصول');
    const [btnSubmited, setBtnSubmited] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const changeImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            const render = new FileReader();
            render.onloadend = () => {
                setInformationProduct(prev => ({
                    ...prev,
                    image: render.result,
                }))
            }
            render.readAsDataURL(file)
        }
    }
    const submitForm = async (e) => {
        e.preventDefault()
        if (!informationProduct.image ||
            !informationProduct.nameProduct ||
            !informationProduct.codeProduct ||
            !informationProduct.priceProduct ||
            !informationProduct.inventoryProduct) {
            setBtnSubmited(true)
            return;
        } else {
            // const formdata = new FormData();
            // formdata.append("nameProduct", informationProduct.nameProduct);
            // formdata.append("image", informationProduct.image);
            // formdata.append("codeProduct", informationProduct.codeProduct);
            // formdata.append("priceProduct", informationProduct.priceProduct);
            // formdata.append("inventoryProduct", informationProduct.inventoryProduct);

            try {
                setTextBtnSubmit('درحال ثبت ...')
                const response = await fetch('http://localhost:3000/allProducts', {
                    method: 'POST',
                    body: JSON.stringify(informationProduct)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.status);
                }
                const data = await response.json()
                setBtnSubmited(false)
                setShowToast(true)
                setInformationProduct({ nameProduct: "", priceProduct: "", image: "", codeProduct: "", imagePreview: "", inventoryProduct: "", descriptionProduct: "",status:"درحال بررسی" })
                setTimeout(() => {
                    setShowToast(false)
                }, 3000);
            } catch (error) {
                setErorSubmitData(error);
            } finally {
                setTextBtnSubmit('افزودن محصول')
            }
        }
    }
    const removeImage = (e) => {
        e.stopPropagation();
        if (informationProduct.imagePreview) {
            URL.revokeObjectURL(informationProduct.imagePreview)
        }
        setInformationProduct(prev => ({
            ...prev,
            image: "",
            imagePreview: "",
        }))
    }
    const resetForm = () => {
        setInformationProduct({ nameProduct: "", codeProduct: "", priceProduct: "", inventoryProduct: "", image: "", imagePreview: "", descriptionProduct: "" })
        setBtnSubmited(false)
    }
    if (errorLoadData) {
        return <div><span className='text-3xl text-red-500 flex justify-center items-center h-screen'>خطا در بارگذاری اطلاعات .... {errorLoadData.message} </span></div>
    }
    if (errorSubmitdata) {
        return <div><span className='text-3xl text-red-500 flex justify-center items-center h-screen'>خطا در ارسال اطلاعات .... {errorSubmitdata.message} </span></div>
    }
    return (
        <div className='w-full flex flex-col p-3 relative'>
            <h1 className='text-xl font-bold my-3 text-colorText'>افزودن محصول جدید</h1>
            <form action="" className='bg-bgBox border border-colorBorder rounded-md p-3 text-colorText' onSubmit={(e) => submitForm(e)}>
                <div className=' grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='col-span-1 flex flex-col'>
                        <h4 className='text-lg'>اطلاعات اصلی محصول</h4>
                        <InputComponent titleLabel={"نام محصول"} typeInput={"text"} inputVal={informationProduct.nameProduct} placeholder={'لطفا نام محصول خود را وارد کنید'} onChangeInput={(e) => setInformationProduct({ ...informationProduct, nameProduct: e.target.value })} />
                        {btnSubmited && !informationProduct.nameProduct &&
                            <span className='text-sm text-red-500'>نام محصول خود را وارد کنید</span>
                        }
                        <InputComponent titleLabel={"کد محصول"} typeInput={"number"} inputVal={informationProduct.codeProduct} placeholder={'لطفا کد محصول خود را وارد کنید'} onChangeInput={(e) => setInformationProduct({ ...informationProduct, codeProduct: e.target.value })} />
                        {btnSubmited && !informationProduct.codeProduct &&
                            <span className='text-sm text-red-500'>کد محصول خود را وارد کنید</span>
                        }
                        <InputComponent titleLabel={"قیمت"} typeInput={"number"} inputVal={informationProduct.priceProduct} placeholder={'لطفا قیمت محصول خود را وارد کنید'} onChangeInput={(e) => setInformationProduct({ ...informationProduct, priceProduct: e.target.value })} />
                        {btnSubmited && !informationProduct.priceProduct &&
                            <span className='text-sm text-red-500'>قیمت محصول خود را وارد کنید</span>
                        }
                        <TextAreaComponent titleLabel={"توضیحات"} textareaValue={informationProduct.descriptionProduct} onChangeTextArea={(e) => setInformationProduct({ ...informationProduct, descriptionProduct: e.target.value })} />
                    </div>
                    <div className='col-span-1 flex flex-col'>
                        <h4 className='text-lg'>موجودی و تصویر محصول</h4>
                        <InputComponent titleLabel={"موجودی"} typeInput={"number"} inputVal={informationProduct.inventoryProduct} placeholder={'لطفا موجودی محصول خود را وارد کنید'} onChangeInput={(e) => setInformationProduct({ ...informationProduct, inventoryProduct: e.target.value })} />
                        {btnSubmited && !informationProduct.inventoryProduct &&
                            <span className='text-sm text-red-500'>موجودی محصول خود را وارد کنید</span>
                        }
                        <div className='flex flex-col h-full max-h-80'>
                            <label htmlFor='' className='mt-2'>آپلود تصویر  :</label>
                            <div className='relative flex flex-col h-full border-2   focus:outline-2 outline-primary border-colorBorder p-2 my-2 rounded-md'>
                                {!informationProduct.image ? (
                                    <>
                                        <span className='absolute right-1/2 transform translate-x-1/2 md:top-1/2 md:-translate-y-1/2'>
                                            <BsCloudUploadFill className='w-8 h-8  md:w-16 md:h-16' />
                                        </span>
                                        <input type="file" accept='image/*' onChange={(e) => changeImg(e)} name="" id="test" className='h-full opacity-0 cursor-pointer' />
                                    </>
                                ) : (
                                    <>
                                        <div className='relative'>
                                            <img src={informationProduct.image} alt='' className='object-cover w-full h-full max-h-[240px] blur' />
                                            <div className='flex gap-2 absolute bottom-2 left-2 '

                                            >
                                                <button type='button' className='bg-red-600  opacity-90 p-1 rounded-md'>
                                                    <BiTrash className='invert' size={30}
                                                        onClick={(e) => removeImage(e)}
                                                    />
                                                </button>
                                                <button type='button' className='bg-gray-500  opacity-90 p-1 rounded-md'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenModal(true)
                                                    }}
                                                >
                                                    <LuFocus className='invert' size={30} />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            {btnSubmited && !informationProduct.image &&
                                <span className='text-sm text-red-500'>تصویر محصول خود را وارد کنید</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full gap-2 justify-end items-center my-4 text-white flex flex-wrap text-center'>
                    <AppButton typeBtn={"reset"} bgBtn={"bg-red-500"} hoverBgBtn={"hover:bg-red-600"} textBtn={"لغو"} onClickHandler={() => resetForm()} />
                    <AppButton typeBtn={"submit"} bgBtn={"bg-green-600"} hoverBgBtn={"hover:bg-green-700"} textBtn={textBtnSubmit} />
                    <Link to='/product' className='bg-blue-500 px-4 py-2 rounded-md transition duration-200 ease-in hover:bg-blue-600 min-w-fit'>صفحه لیست محصولات</Link>
                </div>
                {openModal && (
                    <>
                        <ModalValidation type={'image'} isOpen={true} content={informationProduct.image} onClose={() => setOpenModal(false)} />
                    </>
                )}
            </form>
            {/* Show Toast Add New Product */}
            <Toast isShowToast={showToast} bgNotifiction={'bg-green-500'} message={'محصول شما با موفقیت ثبت شد .'} type={'success'} />
            {/* Show Toast Add New Product */}
        </div>
    )
}
