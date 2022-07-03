import React from 'react';

export default function OrderCard({item}) {
    let price = item.price * item.quantity;
    return (
        <div className='h-[150px] border-2 p-2 flex gap-2 border-gray rounded dark:border-gray-grayDark dark:bg-darkBg'>
            <div className='bg-black w-[12.5%]'></div>
            <div className='w-[57.5%] h-full flex flex-col justify-evenly'>
                <h2 className='font-semibold text-title dark:text-gray'>{item.name}</h2>
                <div className='flex gap-1'>
                    <p>Delete</p>
                    <p>Buy now</p>
                </div>
            </div>
            <div className='w-[15%] gap-1 flex justify-center items-center'>
                <input className='border-2 rounded pl-0.5 w-[40px] border-gray dark:border-gray-grayDark text-[20px] dark:bg-darkBg dark:text-gray' 
                type="number" min='1' max='50' onInput={(e) => item.quantity = e.target.value} defaultValue={item.quantity}/>
            </div>
            <div className='w-[15%] flex items-center justify-center'>
                <p className='text-bold font-medium dark:text-gray'>${price} MXN</p>
            </div>
        </div>
    )
}