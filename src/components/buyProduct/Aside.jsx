import React, {useEffect} from 'react';

export default function Aside({product, setBuyNowQuantity, buyNowQuantity, setShipping, shipping}) {
    let price = product.price * buyNowQuantity;
    useEffect(() => {
        if (price < 100) {
            setShipping(99);
        } else {
            setShipping(0);
        }
    }, [buyNowQuantity]);
    
    return (
        <>
            <div className='flex flex-col items-center p-2 gap-2 border-l-2 border-l-gray dark:border-l-gray-grayDark'>
                <div className='rounded-full h-[150px] overflow-hidden w-[150px]'>
                    <img src={product.images[0]} className='object-cover w-full h-full'/>
                </div>
                <div>
                    <p className='text-boldText font-medium text-subtitle text-center dark:text-white'>{product.name}</p>
                    <div className='flex justify-center items-center'>
                        <p className='text-text font-medium text-bold text-center dark:text-white'>Quantity:</p>
                        <input className='border-2 rounded pl-0.5 w-[40px] border-gray dark:border-gray-grayDark' 
                        onInput={(e)=>{setBuyNowQuantity(e.target.value)}} type="number" min='1' max='50' defaultValue={buyNowQuantity} />
                    </div>
                </div>
                <div className='border-y-2 border-y-gray py-2 w-full flex flex-col gap-2 dark:border-y-gray-grayDark'>
                    <div className='flex items-center justify-between'>
                        <p className='text-text font-medium text-bold dark:text-gray'>Product ({buyNowQuantity}):</p> 
                        <p className='text-text font-medium text-bold dark:text-gray'>${product.price * buyNowQuantity} MXN</p> 
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-text font-medium text-bold dark:text-gray'>Shipping:</p> 
                        <p className='text-text font-medium text-bold dark:text-gray'>{shipping !== 0 ? `$${shipping} MXN` : <span className='text-green text-bold font-semibold'>FREE</span>}</p> 
                    </div>
                </div>
                <div className='flex justify-between w-full'>
                    <p className='text-boldText text-bold font-semibold dark:text-white'>Total:</p>
                    <p className='text-boldText text-bold font-semibold dark:text-white'>${price + shipping} MXN</p>
                </div>
            </div>
        </>
    )
}
