import React, {useContext} from 'react';
import Navbar from '../navbar/Navbar';
import DocumentTitle from 'react-document-title';
import Template from './Template';
import { globalContext } from '../globalContext/GlobalContext';
import { HiOutlineLocationMarker } from 'react-icons/hi';

export default function Shipping() {
    const {shoppingAddress} = useContext(globalContext);
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    return (
        <>
            <DocumentTitle title='Buy product'/>
            <Navbar/>
            <Template>
                <div className='p-2 flex flex-col gap-4'>
                    <h2 className='font-semibold text-subtitle dark:text-gray'>How would you like to receive or pick up your purchase?</h2>
                    <div className='flex flex-col gap-1'>
                        <p className='text-boldText font-medium text-bold'>Address</p>
                        <div className='flex border-2 border-gray items-center gap-1 dark:border-gray-grayDark bg-white dark:bg-darkBg rounded p-1'>
                            <HiOutlineLocationMarker className='text-[60px] text-primary dark:text-primary-ligth'/>
                            <div>
                                <p className='font-medium text-boldText'>Zip {shoppingAddress.postalCode}</p>
                                <p className='font-medium text-text'>{`${shoppingAddress.streetAndNumber}, ${shoppingAddress.country}`}</p>
                                <p className='font-medium text-text'>{`${shoppingAddress.name} - ${shoppingAddress.phoneNumber}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-boldText font-medium text-bold'>Receive purchase</p>
                        <div className='hover:border-primary dark:hover:border-primary-ligth transition-all ease-in-out delay-50 cursor-pointer p-1 bg-white rounded dark:bg-darkBg flex justify-between border-2 border-gray dark:border-gray-grayDark'>
                            <p className='text-text'>Arrives tomorrow</p>
                            <p className='text-bold text-green font-semibold'>FREE</p>
                        </div>
                        <div className='hover:border-primary dark:hover:border-primary-ligth transition-all ease-in-out delay-50 cursor-pointer p-1 bg-white rounded dark:bg-darkBg flex justify-between border-2 border-gray dark:border-gray-grayDark'>
                            <p className='text-text'>Arrives {day + 2}/{month}/{year} </p>
                            <p className='text-bold text-green font-semibold'>FREE</p>
                        </div>
                    </div>
                    <button className='w-fit shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-ligth dark:text-darkBg dark:border-primary-ligth dark:hover:bg-transparent dark:hover:text-primary-ligth'>Continue</button>
                </div>
            </Template>
        </>
    )
}
