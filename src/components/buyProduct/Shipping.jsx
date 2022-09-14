import React, {useContext, useState} from 'react';
import DocumentTitle from 'react-document-title';
import { globalContext } from '../globalContext/GlobalContext';
import { HiOutlineLocationMarker } from 'react-icons/hi';

export default function Shipping({setView, product}) {
    const {shoppingAddress} = useContext(globalContext);
    const {buyDetails, setBuyDetails} = useContext(globalContext);
    const {shippingCost} = buyDetails

    const [arrives, setArrives] = useState('');
    const [inactiveButton, setInactiveButton] = useState(true);

    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const modifyView = () => {
        setBuyDetails({
            ...buyDetails,
            shippingAddress: shoppingAddress,
            shipping: arrives,
            products: [
                {...product},
            ]
        });
        setView('payments');
    };

    const arrivesTomorrow = () => {
        if (arrives.tomorrow) {
            setArrives({});
            setInactiveButton(true);
        } else {
            setArrives({
                date: `${day + 1}/${month}/${year}`,
                tomorrow: true
            });
            setInactiveButton(false);
        }
    };
    
    const arrivesLater = () => {
        if (!arrives.tomorrow) {
            setArrives({});
            setInactiveButton(true);
        } else {
            setArrives({
                date: `${day + 2}/${month}/${year}`,
                tomorrow: false
            });
            setInactiveButton(false);
        } 
    };
    
    return (
        <>
            <DocumentTitle title='Shipping'/>
            <div className='p-2 flex flex-col gap-4'>
                <h2 className='font-semibold text-subtitle dark:text-gray'>How would you like to receive or pick up your purchase?</h2>
                <div className='flex flex-col gap-1'>
                    <p className='text-boldText font-medium text-bold dark:text-white'>Address</p>
                    <div className='flex border-2 border-gray items-center gap-1 dark:border-gray-grayDark bg-white dark:bg-darkBg rounded p-1'>
                        <HiOutlineLocationMarker className='text-[60px] text-primary dark:text-primary-light'/>
                        <div>
                            <p className='font-medium text-boldText dark:text-white'>Zip {shoppingAddress.postalCode}</p>
                            <p className='font-medium text-text dark:text-gray'>{`${shoppingAddress.streetAndNumber}, ${shoppingAddress.country}`}</p>
                            <p className='font-medium text-text dark:text-gray'>{`${shoppingAddress.name} - ${shoppingAddress.phoneNumber}`}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-boldText font-medium text-bold dark:text-white'>Receive purchase</p>
                    <div onClick={arrivesTomorrow} className={`${arrives.tomorrow && 'border-green hover:border-green dark:border-green hover:dark:border-green'} hover:border-primary dark:hover:border-primary-light transition-all ease-in-out delay-50 cursor-pointer p-1 bg-white rounded dark:bg-darkBg flex justify-between border-2 border-gray dark:border-gray-grayDark`}>
                        <p className='text-text dark:text-gray'>Arrives tomorrow</p>
                        <p className={`${arrives.tomorrow ? 'text-green' : 'text-boldText'} text-bold font-semibold`}>{shippingCost === 0 ? 'FREE' : `$${shippingCost} MXN`}</p>
                    </div>
                    <div onClick={arrivesLater} className={`${!arrives.tomorrow && 'border-green hover:border-green dark:border-green hover:dark:border-green'} hover:border-primary dark:hover:border-primary-light transition-all ease-in-out delay-50 cursor-pointer p-1 bg-white rounded dark:bg-darkBg flex justify-between border-2 border-gray dark:border-gray-grayDark`}>
                        <p className='text-text dark:text-gray'>Arrives {day + 2}/{month}/{year} </p>
                        <p className={`${!arrives.tomorrow ? 'text-green' : 'text-boldText'} text-bold font-semibold`}>{shippingCost === 0 ? 'FREE' : `$${shippingCost} MXN`}</p>
                    </div>
                </div>
                <button disabled={inactiveButton} onClick={modifyView} className={`${inactiveButton ? 'opacity-50' : 'opacity-100'} w-fit shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`}>Continue</button>
            </div>
        </>
    )
}
