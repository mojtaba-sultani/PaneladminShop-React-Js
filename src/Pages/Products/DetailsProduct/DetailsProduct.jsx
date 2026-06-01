import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loading from '../../../Components/Loading/Loading';
import RouteButton from '../../../Components/RouteButton/RouteButton';
import AppButton from '../../../Components/AppButton/AppButton';

export default function DetailsProduct() {
    const { detailsProduct } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/allProducts/${detailsProduct}`)
                if (!response.ok) {
                    throw new Error(`خطا در دریافت اطلاعات ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setProduct(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [detailsProduct])
    const deleteProduct = (ProductID) => {
        console.log(ProductID);
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className='p-3 flex flex-col gap-4'>
            <div className='border border-gray-300 p-3 rounded-md flex flex-col justify-center gap-4'>
                <h1>جزئیات محصول : <b>{product.nameProduct}</b></h1>
                <div className='flex justify-between items-center'>
                    <RouteButton to={'/'} bgBtn={'bg-blue-500'} hoverBgBtn={'hover:bg-blue-600'} textBtn={'بازگشت'} colorText={'text-white'} />
                    <AppButton bgBtn={'bg-red-500'} hoverBgBtn={'hover:bg-red-600'} textBtn={'حذف'} typeBtn={'button'} onClickHandler={() => deleteProduct(detailsProduct)} colorText={'text-white'} />
                </div>
            </div>
            <div className=' border border-gray-300 p-3 rounded-md'>
            <div className='flex items-center gap-3'>
            <div className=' flex flex-col gap-3'>
                <img className='w-full h-full max-w-[150px] max-h-[150px] object-cover' src={product.image} alt=""/>
                <h4>نام محصول : <b>{product.nameProduct}</b></h4>
                <h4>قیمت : <b>{product.priceProduct}</b> تومان</h4>
                <h4>موجودی انبار : {product.inventoryProduct}</h4>
                <h4>وضعیت محصول : {product.status}</h4>

                <h4>تاریخ ثبت : --</h4>
                <h4>کد محصول : <b>{product.codeProduct}</b></h4>
                <h4>توضیحات : <b>{product.codeProduct}</b></h4>
            </div>
            </div>
            </div>
        </div>
    )
}
// "nameProduct": "محصول 1",
//       "codeProduct": "2",
//       "priceProduct": "3",
//       "descriptionProduct": "400",
//       "inventoryProduct": "555",
//       "photoProduct": "",
//       "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMVFRUXGBUVGBUWFhcVFxcYGBcXGBcVFhYYHSggGBolGxgVIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0fHyUvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIASsAqAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAgMEBgcAAQj/xABGEAABAwEFAwkECQAKAQUAAAABAAIRAwQFEiExQVFhBhMicYGRobHBMlLR8AcjQmJygpKi4RQVJDNDU2OywvFzo7PD0tP/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAJBEAAgICAgEFAAMAAAAAAAAAAAECESExAxJRBBMiMkFhgfD/2gAMAwEAAhEDEQA/ADF5VKdYA1HZicJI0nWO4LropCnScJxdNrhsABhvqm6tJppgEZ/JT1BkUnAbp7s/OFglR0BoOgD+F6GdSh86IB3a/PYiNhqYpzCoBVOllr4Ju12TENiJil0UNs1qGMsdl18E6AqV6XfhdkhfKWy4OZqxocJ6j/Eq73vZJe0b+Cj8prpx2YiOkII7FPUaZRnMhIrVms1zOxo2bi47OrU8Ml1eo5jQMJxDadBG2NpQ+iYPSkzrOpnaVBaVhGhe9YGWPwRphAEdup7UcH1jBUyk+1GUO1OXHXtQAWbLE3MeI3ozyYYHOqsAgFmICZggiI/UVM1cS4umGbtJjaqfy7tJdam7hTA7cTifNWuzEtnhKo/Kt01mk74WXHsuYuxOOqvXJa/NKVQ9HRjj9k+6funw6lQrKCMip9F+EzsWtGbVo1Z6acVCue1GpRYTn0QA46nLOeo5TwUslQ1TMBt5UeoUI5O3g+s+0lwy50gGc4bLQI6gitUqU7G1RDrLl5UXKySCAZie1EbIyThKiUWYmtPdxRCiyC2di2NKIZf0O6cuxOXRbIdmYTNVkc4073ZbhMqNaKeGli0OqXah9S+2V0hAL2pYXkgdyVyWvbGwYjmFK5QARM8VpdogVddYVIxDMIla6ALSEF5MjMqwvdmmhMot53SCTkqzeN1YdAtQtlnzQe3XaCNPBJxGpGb2ephDmdo9fRH+RtUCsQdXMIA2HNrj1ZNKFX7ZuarM3EkfPgrncVyhjOdIhzgIHutO3rOXyVm06ZpeUdaKEF0bVQeVdmIfijTpdxz81o1obmq1fNEPqBsTDXE9pAA8D3LGJowR/RpLdxGRXUqLuc5tkkk4QN+caJ27h0A0603OpnqzLfBT7jtvN1g4gdFxInjqOEgkdq1QmWW+Wus1OjSaYlzGB28NGJ3aY/cUQJRfDTrUZPSYYI3jceDhmhFdmEka8eGxLkhTv8OeyqckMnWobq7/ADcjF42kU6bnnRoJ7tiC8nX4bRbGn/OMdpJU3lE/+z1fw+oWMdMuW0dZrRzjA6CJAyIjZOU7FybsJ+rb1DyC8VRyiJYYYs1hLWBsZj51TlRpZkRKbu++AWhzvZP2tneiD6rHgEEEFbYZqAa/tug+0Ae8QB4FDr3qxROfV896LWylheCNCTHVs8yqzfdXJrNxz+fnVZlEnk/asJCudeuKlPXPRUCwmO5WC77VlHFXGRDRZOTlKJOiK87n4+qG2KrDU8x+q1iyGic8z5JmpZwvGGd29PR1q0SZ3y6upzhjaNN3n4KzXByhpWpoMBtQiKlM/ZI2je07DsRW30cQzE9izrlByfdSfztElpBkFpgjqUP4uylnBb74srmeyxzgZIIw5RsMkZ8UGs1gIxF/tOMkbsoA7E1yf5agjmrZkDkKoGh2FwGnWPBG6kAnQ7QRmCDmCDtBCxml+Gkb0yoXdQ/ttah/mNa4fi2HvaO9c66XCSRoczuUO+bXzV40ngxoPGfTxWkW2xB0EDJ5xDdJGQ8StIJSQSlQnkkSbPgO9wGzQpN7PDGMeR9sU3HdiMNP6iB2onddmwUmdbiesuJULlhSix13D7OCp+h7X+iuUfgY3bKFYTFstY/1KR7y34qVylrRZ38cI73BD6FSLZajsJoHxYveUlSaRH3m/wC4Lijpmj2jy03uKDaLcOLHM5xAA145+q5Bb+PSpcGH/n8FycXgGlZaLpe2j0CZs9WcJOZpv0LXdRy7jtSrS51BxjTdqCuttnDXOZ9h/g4aHtzHduQu8Lww0odJLTgEakR0fAEditmoVdegqNB2hwkbtUDtpxVT2IXYK1TGXOyB+yNm5FWVQCTOqNCZJbACkWOtnHWoZrAr2hVgygRcrJbJGqmWauqzY7Tpn85opZbVmOxaRZDRYWVc4UumUGs1TER5opSqgrZMhoerlDbTSDtgMolUzGSgtdn2psSKDykuDCS5gyOcBJ5N3gQ3mXHSSye8t6tT371fryoDCS7NpCo18XWaLxVZmAZWUo+DSMipcsXnncQ1EEHiDktquC0ipQZOoDe+JWM8p2TVbuOGOokR4LReSFty8PQeCXE6Y+VWkXii3KNyHcrHNbYbUXaczV7ZpujxRCg6YO9V36Ua5bd72t1qFtOdwzcfBsdq3n9Wc62ZvdFbFVqu306B7g2fJLvl8sI+83/cEJ5M1HY34QIwAnPYNyIXkZAH32+a86OmdMtoFX+488wTlzf/AOi9TV/Caw/A7/5FyYF5tdTE0lrXugFxIaXBoAkkkaaKkXnbjVOkNBmN53lbdZLIym3A0ZbZzneTvWQcp7n/AKNaH046M4mcWHMd2n5StUJTsg0shl8/PopdKpKi0WpxhzTKJtPNPMKhNyUilV396QBChWKJ2euhFEbQp1IEbUJhRZrDW8f5Rmi5VmwZRuGxGaFdaxkiGg0xM1KOpCRZLQDkdqk1AW8QtNkEKlWDw6m7aCOpCq9mPN1ZILWOw4SOA29s9SXaXQ7JSmubUZByccidp3SpTvBTXgy7llTDbRTA0w047APgjfJq2QwAay6eM4QB4HvQjl3QLbTT3c2Y7HP/AIUvkWwvtFNuycR6m9L0A7VnHEi3mJr9lyaBuAHcFUfpWrDm6DJzLy6OERJ7z4q10iqN9Jz/AKxgP+U0jicb8Xdl3rXllUDCKuRn3J0YalUbqbx3T8FPthnD+Nvqot2Mi0VRvY897ZS7YJwZkdJunUVwrHZG7z1IN7ma35T51FyTeLJqxuwjvc74rlMpVRSRvIVd5c3QK1nLwPrKUvHFv2292fWFYwF7G9dBzWYbZxBT9ajtCl39dn9HtD6WwGWcWHNvdp1gpVj6QgqjZMg0lIZRldabKWnTJIp1CEih6kSw8NyL2Kq122FDs1Vrsj/KkG79rM+pLqFhqyVIMIqGZZfPd2qpUqtSnrmNyN3ZfDDAOXWkMKsqEIvYraHCHIHUrtOY0SqNYTkfnJXGTiJxTJl8WYjpNhAqlvLYyzVks9rEYX5goFylsmBheNM8/irpSyiU2sMofKi1GtaWg/YZHaXE+QHerp9HV1YWurke10G9QMuPfA/KVRrqoG0V3Yc3Pc2m3wE9W1bXZLG2lTbTbowBo7NvaZPaiEbdhN0qOc9Vz6RLt5yiyuBPNYmHg18Z/qA/UrFVIAlOOa2rSdSdo9pafzCPNaOPZNGV00zELB/fzvov8Glc4dKn+NvkUixSKxByIp1QesNclUPapD7y4HuRutRIj6WO0hpzDsPm5eqVd7ZtFM/i8HFcsJt2aI2tKC8Xq7jjKh9Il34mMrgZsOB34XadzsvzKj2Z8Fa9etk56jUp+81wHXHRPfCx8CDu2RuKZpDQfpNFQQepDrbdxZsyU6zMcKYcFLo2trhheO1PBWUV0M2qZZbY5h2opXuvKW5hDq1jKlxaKTQesVsp1BDx2j1Tz7kDulTIVWbiactdUTsd7R7UjiPUJqXlB18BmnZajRBGS51mPHRP2O+QYxQ4e8NnZsRgUmuAc3Q8VajF6Iba2AA17dCU863nCW1WYmkQRsIROrSChWizYgRon0rQdr2BPo1sLBaLQ9sltM9GdQX5a9TXDtWkPokjJUn6PKIp2m20dDFB44j6yfEt71fmZLSC+JlySyVm9XubDdrj4an070QuukSQTGWzVBuUltBtQYD7DQPzO6R8C1FbqtbTAkT1ie5UqB21Zj9oLxbq/OCXzXxQBGI4p7JTFkPSpdZPgrVy1sHNXi549mtSdUG7FhLXjvE/mVRsDs6fAOPgF508SkjojlRFXTWOPFEhrHnXi5co1gdFCs77gb+ogeq5YPZZu7HSJCWFGLCz2Yj3dB/Cfo1g7gdx1XouNHG0OBZVyrsXNWqq3Y4843qfn4HEOxauqZ9It3ktp2gD2eg/gCZaTwmR+YKS4PIF5P2gOaWFOW+wkZjRA7K8tOWuqtF23g2q3C7XzSw8GuVkH2K3up5aj3SUWpVKVXTI7iFGtt1bW+qEPpPYd6LcQpMOWq7oEgbPgo9kujG1zjoPEqLZr7c3J8wrFc9vpuaWyMJ27AeO5NSiwpop9aiWOOE9ytvJ59RrBjnNJZc5Y7EIdtBOaffaao1AI3RHkpzHSHhhSo+dF62iQMRQ+x28EwcjuPoiNttQDMUZeSr3GxdKANN/NXpZ3j/GZVou6g3nGnvaFfRVG1ZTyWtbrbeIqQQyzhzuALg5jR1kkn8pVw5SXlzfN6wSSTwaMx4+CuE8ET47ZXL4qc5aq2GR9Y4E/h6MDuRC6rppnMtE74BPeQq7bbyZRpur1TAmeJc45NHEkqu/1neVeXND6bM8LG/V5DbJhzuvSIyV2tg8YRqt83IarGiMYbMEf3lMOEOLT9psRLeAWWtsBoV30XkHADDtA4FowuHWNiXd9vt2LmqtpqUmn36r+kdQAWzGmcbJV6dySZWpOfjfUtTA6mHPiHil0cOgk6dLUzOay5YKf12TGfT7GY02f2Wpxc3wcFyVzRFBwJOsEHYQ4L1cSpHSbhSeCluoTnohNntOnyEQo2kDNxyAmV6KZhR5abzbQbNY9HQECT2j1Q+08rbLhIc17gQQW4AZB1BBMEIbyirmsx7hphLQDAgHfOQ1Q99BhaOiCCBnHDIrCU/Ba4l+lUFoZzrgyQ0OcWYsiWTkDBOYEJ+naC12RzCcvO7QOk3IjMQhdgrY3OnIzHgJUbNKovF2XviEO3IpTszH5zPcqbZd6JWG3upkbRuKtT8kOPgMWm52umAEJq3K9plhIPAqz2K2Co2RCeLBOatxTJUmiuWO9K1HKo3EN+34HwVhsd4Uqu6do08E9Xu8OEwEKtFyxm3LqSqUdFXF7C9puxjxIGfBCrwtZs7ILS8khob7xOQan7Ja6tKA/Mb/AI717yksr7RRa6z4edY5tRrSYD8JnDJyB60Yl/DDMf5Q5c93sslFzGNgl2J7vfqO1j7o9kcB2kZyxc5tKMUfWMOKJkFrpbnv9Ebva0YqArNBAkFzSIcw6Oa4bHNORCpfLy9A5tGmDnBeeoAtb5u7k3Ggi7oGUqzXQIDsBlswSDvG4wfFWSwMxgdHXRZ/cT3jnHO0LuitB5P3hFP6wQdAVndvJu4UsD14XEytTLDtGTtrXAyCOIT3Jq+qlMCjVZLmOJdgBxtEgB2CM2OgxHvRuRWzGcxpkgHLmg1lNtfMOa7YSA6ASA4D2hiAMK7cMo5uSCnhla5VOpur1ubHRdVdGUZ4gX5fiDlyE0bTiwF0k9J7jG0yZPeVy8/kbbN4KkXmlauPzxXV7wJhmjdT6Ao7aOTlFzg5sszBLW+yROYj7PZ3KhXzSNitTqTnlzHfWMJzOFxOR3kEEdi7Z2kZccothW9K0tFIfb12ACdp2CYTzKowwd0daGUbUHOxDdxEDYBntkk5RmEupaB28fioNVnJDvWtAKym8LyqNrvcx7mydnnByWiX1a4a6dgOizKpUHTABklw79O5bcKyY8zwGLFywtDPaDag/S7w+Cs12/SBQMNr03sO8AEfHwWbYDuKfs8nKfyu07Ft0ic6nI2m6+VlixDBaGgnY7on9wVup21r2hzXNcNQQZ+dV86Mt7gDhdhaMg0BuGBvbEOnjOqlWWq4EPpPdRJHSa0mMW0tgggaZZxnsgBdCvcPo6z20NbiOh8VOoWilUGRCwCy8q7dTAArh7R9l7QfME+Kku5ZWkdJrGTtDZG7P2utFSQ+yZvTrJ2hMPsuHNvcspu/6VrQzJ9CRvhzp8kUs/0uH7dkJ4hxb3gtPmnSe0ClWmFbZeVSneNJkSy0nmqtM6OEEY495o27hCpPKB2K0vA1BNJv4aZIxd894U+8eXhfUNWnQw1MOBrnOHQB1iBqTrpoAq5cNCrVqOxHEZAmNdqymuqN+GSciyWCy0wwvnDTpgTi9riQB7We7eFwtj63sgtA9lu3gDxKZtVTni2hS9hp6R994/4jxOewIoyzYBzVM9KOm/YwbQDv3nZ5c7Z0qL0G7mvBzMNInFHSqO2NA0E/OigfSNbsVPANA1rz+d4AHYGnvUQ1GNinOWopjIujPFUOwbh8itVLc+tZ6tSoZc5zOoAOAAA2AAAKJcjaomaR2KKZdua1vaT/ACuTVpaeZYPefPYBkuWKklsnqbwEH5VXC210iAAKrc2O00+wT7p8DmjASwvSo4E6dmN0nOpk03tLHNMFpEEcITtotAhaNym5OMtbJENrAdF+/wC6/e3y8DklTE76sEAyGydmcSeCw6U6OyPIpKwLyovIMAiCSYwzB259WXiqUSSSZ1zRPlTZ3U7XWouMmk91KYicBIJAOwmShYC6oRpHJyT7MUAd571JsRhwcSHAEEtPRkbROo61FIRSlQhoBzO3rVkCXWFp0qjCfea/GOBDQWnsMdSeZViRBiTBjUbDAmF42kN0dWSkUmZa98IoD1lQHTNPU4TbqU6hp8D6r0Ut2Idx80DJPNpQamGucNx7HN+KcbV3tPZn8EAPNarPyTeOkwiCQ7PfvjcYPgqzYqzXzhnIwcozGxGbuqGm4OGwz8QonDuqKhyODtBi8qhsrecpNGRaCMhAOUgwcwm7TeT2hjWw0OBJOpLgdpOqnXtTFSk6Mw5uXaJCCVjNKi/c6D+YLzpOmjtjOTi8iLmJL85J6RJOZ01JUClQ/swOeb2iJy27ERuxnTqaiGuORjYuo0/qKI96qPIlZt1Jj2hy0Ug59KmNgbw4rk/Y24rW87G+gC5c8m1o1RsgSgkBLC9o8oWEEZyPsfPNqmlLmuxtDnOLGumQ4MmDB0mY2QjQSmlAWz5L5S13VLXaKjtXVqzj1l7skMlTLzq461Vw0dUe4drifVQ4WwmP2JsnEdmnWiIeoVLIQpDH7kASWlSKY0+dUPtdXCw7zkirWwB1JiPQltSDoeopdmOJjHb2g9sIAdhJKchcQgZHupuGo9u/C7vkHyHejhyB+d5QOm6LSz7zHDtEO9CjlXRNEhy6LRiplh1bmPwu/me8KFaW/U1GQZacQ75HooVx2rCWnjgd1OyHiGow5udQb2nw/wCl53q4U7/s7PTyvBDsX+I7fTcf2p+xU+hZhxc7uaPioV01JpVDupvb3aeEIpQGFtE7qdQ/7Vxcry/9+HTBYQm5GzVqu4j0XJdwyGudlE69QXKGsspOka0EtqQEsL2TyxYSLQ+GOO5rj3ApQKj3kfqav/jqf7SgD5H3dQ8kpqS05BegLYB5oCksEKNRZGZT7nJiGKjsVRreI81YqiAXYzFXHCT6eqPVUCEu9krrnzoge65ze4royXtxHKq3c+e8JgS2nYuLVz2r2UgIdryfRfuqNB6ndE+aPP0QO8WzTdvAxDrGY8QjWKQDvAKYiBYDqPeHjqPFWmyVcYY73hn1nI+Mqm3fVlk7R6Kz3NWGHqcSOogO9Suf1Ub42bcDqaI11twttIO6oP2hFbZVApNI2UT4kBD6Lwf6SRp0vEN+Kfvx8MDdpbSb+4k+S8mWZHorCJtgcW0BxBJ7cly9YPqncA0ep816nD9JkasEsJCUF6p5osKJfVXDZ67vdpVT3McVJCD8s34bBaz/AKFUd7CPVAHy2wZBOtC8iEsBbiFBdVfAXrUxaSgRO5Pszc7qHqilQ5qNdVPDTHHNPE5piHW6FRuS1TEavEz4p62HDSO8iFE5Ie04fd+CQw44JEJdTVeFACHNkEbwU9Z6v1DHH3Gn9oKQ3fuB8lHtTsFmY3bgaPADylAyLcw6D0duajzgjEWwRmM9+o2jRCLrbFNyI3PXLcXYTwE6rLnt8bovi+6DFO5HtbULajSHNNSMwThgOHXkvLyu+s57TAIbTbUMOEFsEAjftRWw25kNJyAdHW2oId+6E5ZHAGjiIydUsrvwuzY48Mv3Lxu8k8o9GkQWtfzVQauwl5g74jwXqRc1Uiq6k/KadWgSdC5ggeS5V264JavJsK9CSF6vVPOPQq39JVfBdlqO9jW/qe1vqrIFS/phrYbrqj3n0W/+oD/xTWwPnp5S6KQUthWwh1NObLgE5KVYGS6UCCwyAG5KoNkpkuU2xtylMQxeekbgo3JJvTd+E+ift5yK85LMhzvwnzCQwtV1SAU5VTcIGe83iY4bxh/Vl6qBfFSXBo0Hz89aJWipgbG2PFCGMxOkoQMn2VsU1KuYxVjY4EeCZb7MJVkyqMPEKZq4tDjhosbLAHgAQCTE7OHXmI7VJFh6JLS4zS50CdrDD2cIEd66w5xBifPUfub4okwgEEZBtRr8v8uuIcOoOPgvn3Np1Z6tKgVbrJhqRilp5l4cdramU5bQVy6+cQZSjMs52zu39B2Jh/SJXitObWwteDWglpACWAvZPKOWb/TracNjo0/frYj1MY71c1aSAsp+np/Qsjd7qx7hTHqmtgY4lBeL0LUQrYpdkEKLGil0zkgQ/SElFtBCgWJm1S3lAEW2DI9Se5OtjGeAHef4TVqOSmXSyKbjvIHdPxQCJJKU0AdI6DNJAUa9qvs026npHq0Hr3KWUN2ioX9qSBC4dHILwBGWA8xyfs7uk3rUVoU6xsl7etAFmpOjTUEx/uHiPFFWUw9zRJDXh1Pd7Y5ykTwBxBB6TgS6NQMQ625x4FTxVOGGgk5hsbCw87T/AGkhfP8AIvkerF4G7RWHOSY6Qp1CJ0cPq6g64lcpFrDXZ7CT+ms3ED+sELlngpNovbL+o7n9w+KdbfdH73cPiqg2NxTgjivZ91nm+2i2/wBdUfvdyyP6c7eyrVsgZPRZWJkR7Tqf/wBVcpbtnxWYfSlVBtVNo+zSB/U9/wAAr4+RylQpQSRS0oLxegLqMhxuqks2KO0KXZmyUCCNnEBKcUmUklIBJbiRSm2GNG+T89gUJjIgbSf4U55z4DIdiVjSHKYG3RAqlomo5+85cAMgO5T75tOCnA1dl+Ue18O1DAgY+KqW2qoqU0IyAQpOlEruIDgToDJQaz5FFqHskqZPA4rIes1USHDSfAn4EqTRe5pEfZziMy6i6DHXTKGWFs0yOod4jzIU3ncMOAP+FW1nJwwPGeq8Wayz0YvBMrAhrmy2Gy1uzIfWU5M57lyaLob+GW/oOJnewr1ZIthRtqeP+3fFLZank/y74rg0J8U4bxPgP5XbbMKQl1rdPDZ0nfFZT9Idcvtrp+yym3UnZi2/iWrhqx7lq6bdX/E0d1Ng9F0embc8mXMko4AiUxJXrV3HKOtU+xjaoLERoiAkA6XJyk1NNUimEAPUvb6hPw8Sn6Y2lM0Np3mO7/sKJfdoLWBo1fr+EbO30SGDrdaudeXbNANw2fHtTlLQKC0qZROSAHQltTaWxAEqgEXaCKZchdmarnd1na6zgEDImeIOXmPFY88qia8StgywOgnWIkbjlI69FOY4FjN01aJ6ndNigvu6pSM0jib7h1HCdyb/AKyDQW1KT25tdoYlogQuCXH2zE6e1bJd22vnKYO3DBH36RgjrwyOxch1G30W4sOIYnmpAnJxmYz2zouSfp3eENcirZo9npAnZAzKW8Sc16w/Vji509kR5lI2psELaFhvKepitloP+tVH6XFvotyWC3qfr63/AJav/uOXT6VZZhz6REXBergu45iRQbJU6VFsykhIB2mn2lMU04UDJ1jZIB2ZnxP8Kv39WmsR7oDfU+fgrPZvYb+EeSrvK2kG2ysGiAC3LrY0nxJSvIUQKalUj8+HoolNSqezqTAfCdphNBP0VLAIWRqvfJ6mDTpzo7EDwlxg9hgqj2RXe6f7in+H1K5PUv4o34VlkupZ4kHIjI9aYdZwp9XMz91p7YCjAriOkgPs43BcpZXJ2wo//9k=",
//       "status": "فعال",
//       "id": "azm5pbQ7E4M"