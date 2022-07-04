import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../api';
import { globalContext } from '../globalContext/GlobalContext';
import Loader from '../loader/Loader';
//* Components
import Navbar from '../navbar/Navbar';
import AsideCart from './AsideCart';
import ConfirmDetails from '../buyProduct/ConfirmDetails';
import Payments from '../buyProduct/Payments';
import Shipping from '../buyProduct/Shipping';

export default function BuyCartTemplate() {

    //* Context
    const {buyNowQuantity, setBuyNowQuantity} = useContext(globalContext);
    const {shoppingCart} = useContext(globalContext);

    //* States
    const [view, setView] = useState('shipping');
    const [total, setTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    
    return (
        <>
            <Navbar/>
            {shoppingCart === undefined ? 
                <Loader/>
            :
                <div className='flex flex-col-reverse gap-2 sm:grid sm:grid-cols-product m-auto w-95 max-w-[1000px] my-5 bg-white dark:bg-darkBg border-2 border-white dark:border-gray-grayDark shadow-containersShadow rounded'>
                    {view === 'shipping' && <Shipping setView={setView} product={shoppingCart} shipping={shipping} quantity={buyNowQuantity} total={total}/>}
                    {view === 'payments' && <Payments setView={setView}/>}
                    {view === 'confirmDetails' && <ConfirmDetails setView={setView}/>}
                    <AsideCart product={shoppingCart} setTotal={setTotal} />
                </div>
            }
        </>
    )
}
