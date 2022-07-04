import React from 'react';

export default function AsideCart({product, setTotal}) {
    let price = 0 ;
    let amount = 0;
    product.forEach(item => {
        price += item.price * Number(item.amount);
        amount += Number(item.amount);
        setTotal(price);
    });

    
    return (
        <>
            <div className='flex flex-col items-center p-2 gap-2 border-l-2 border-l-gray dark:border-l-gray-grayDark'>
                {product.map((item, index) => {
                    return (
                        <div key={index} className='flex gap-2 w-full items-center border-2 border-gray p-1 rounded dark:border-gray-grayDark'>
                            <div className='w-[70px] h-[70px] rounded overflow-hidden'>
                                <img src={item.images[0]} alt={item.name} className='object-cover w-full h-full' />
                            </div>
                            <div className='flex flex-col gap-1 w-[85%]'>
                                <p className='text-boldText leading-[17.5px] font-medium text-bold dark:text-white'>{item.name}</p>
                                <div className='flex items-center gap-2 justify-between'>
                                    <p className='text-text font-medium text-bold dark:text-white'>${item.price}</p>
                                    <p className='text-text font-medium text-bold dark:text-white'>{item.amount}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='border-y-2 border-gray w-full p-2 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h3 className='dark:text-white'>Products({amount}):</h3>
                        <p className='font-semibold dark:text-gray'>${price.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <h3 className='dark:text-white'>Shipping</h3>
                        <p className='font-semibold text-green'>FREE</p>
                    </div>
                </div>
                    <div className='flex justify-between items-center w-full px-2'>
                        <h3 className='text-boldText dark:text-white text-bold font-medium'>Total:</h3>
                        <p className='dark:text-gray font-semibold'>${price.toFixed(2)}</p>
                    </div>
            </div>
        </>
    )
}
