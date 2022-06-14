import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Aside({product, setQuantity, quantity, setShipping, shipping}) {
    let price = product.price * quantity;
    useEffect(() => {
        if (price < 100) {
            setShipping(99);
        } else {
            setShipping(0);
        }
    }, [quantity]);
    
    return (
        <>
            <div className='flex flex-col items-center p-2 gap-2 border-l-2 border-l-gray dark:border-l-gray-grayDark'>
                <div className='rounded-full h-[150px] overflow-hidden w-[150px]'>
                    <img src={product.image} alt="" srcSet="" className='object-cover w-full h-full'/>
                </div>
                <div>
                    <p className='text-boldText font-medium text-subtitle text-center dark:text-white'>{product.name}</p>
                    <div>
                        <p className='text-text font-medium text-bold text-center dark:text-white'>Quantity: {quantity}</p>
                        
                    </div>
                </div>
                <div className='border-y-2 border-y-gray py-2 w-full flex flex-col gap-2 dark:border-y-gray-grayDark'>
                    <div className='flex items-center justify-between'>
                        <p className='text-text font-medium text-bold dark:text-gray'>Product:</p> 
                        <p className='text-text font-medium text-bold dark:text-gray'>${product.price * quantity} MXN</p> 
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-text font-medium text-bold dark:text-gray'>Shipping:</p> 
                        <p className='text-text font-medium text-bold dark:text-gray'>${shipping} MXN</p> 
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
