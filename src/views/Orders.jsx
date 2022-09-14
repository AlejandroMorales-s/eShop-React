import React, {useContext} from 'react';
import DocumentTitle from 'react-document-title';
import { globalContext } from '../components/globalContext/GlobalContext';
import Navbar from '../components/navbar/Navbar';

export default function Orders() {
    const {orders} = useContext(globalContext);
    return (
        <>
            <DocumentTitle title='Orders'/>
            <Navbar/>
            <h2 className='text-center font-semibold text-title dark:text-gray m-3'>Orders</h2>
            {orders.map((order, index) => {
                return (
                    <div key={index} className='border-2 border-gray bg-white dark:bg-darkBg flex flex-col gap-2 w-[95%] max-w-[1000px] m-auto my-5 dark:border-gray-grayDark p-2 rounded shadow-shadow'>
                        {order.products.map((product, index) => {
                            const {name, price, images} = product.data
                            return (
                                <div key={index} className='border-2 border-gray dark:border-gray-grayDark p-1.5 flex gap-2'>
                                    <div className='h-[100px] w-[100px] rounded overflow-hidden'>
                                        <img src={images[0]} alt={name} className='object-cover w-full h-full'/>
                                    </div>
                                    <div className='flex flex-col gap-1 '>
                                        <h3 className='text-bold font-semibold dark:text-white'>{name}</h3>
                                        <div className='flex gap-2 items-center '>
                                            <p className='text-text dark:text-gray font-medium'>{price}</p>
                                            <p className='text-text dark:text-gray font-medium'>{order.amount}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='flex justify-between'>
                            <p className='text-bold font-medium dark:text-gray'>Arrives: {order.shipping.tomorrow ? 'Tomorrow' : order.shipping.date}</p>
                            <p className='text-bold font-medium dark:text-gray'>Total: ${order.total} MXN</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
