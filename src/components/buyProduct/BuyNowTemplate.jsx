import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../api';
import { globalContext } from '../globalContext/GlobalContext';
import Loader from '../loader/Loader';
//* Components
import Navbar from '../navbar/Navbar';
import Aside from './Aside';
import ConfirmDetails from './ConfirmDetails';
import Payments from './Payments';
import Shipping from './Shipping';

export default function Template() {

    //* Context
    const {buyNowQuantity, setBuyNowQuantity} = useContext(globalContext);

    //* States
    const [product, setProduct] = useState();
    const [view, setView] = useState('shipping');
    const [shipping, setShipping] = useState(0);

    const {id} = useParams();
    
    useEffect(() => {
        get(`/api/products/one/${id}`)
        .then((data) => setProduct(data))
        .catch(error => console.log(error));
    }, [id]);
    
    return (
        <>
            <Navbar/>
            {product === undefined ? 
                <Loader/>
            :
                <div className='flex flex-col-reverse gap-2 sm:grid sm:grid-cols-product m-auto w-95 max-w-[1000px] my-5 bg-white dark:bg-darkBg border-2 border-white dark:border-gray-grayDark shadow-containersShadow rounded'>
                    {view === 'shipping' && <Shipping setView={setView} product={product} shipping={shipping} quantity={buyNowQuantity}/>}
                    {view === 'payments' && <Payments setView={setView}/>}
                    {view === 'confirmDetails' && <ConfirmDetails setView={setView}/>}
                    <Aside product={product} setBuyNowQuantity={setBuyNowQuantity} buyNowQuantity={buyNowQuantity} setShipping={setShipping} shipping={shipping}/>
                </div>
            }
        </>
    )
}
