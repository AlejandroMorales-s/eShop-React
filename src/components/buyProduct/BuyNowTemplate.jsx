import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
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
    const {products} = useContext(globalContext);

    //* States
    const [product, setProduct] = useState();
    const [view, setView] = useState('shipping');

    const {id} = useParams();
    
    useEffect(() => {
        const productToBuyNow = products.find(product => product.id === id)
        setProduct(productToBuyNow)
    }, [id]);
    
    return (
        <>
            <Navbar/>
            {product === undefined ? 
                <Loader/>
            :
                <div className='flex flex-col-reverse gap-2 sm:grid sm:grid-cols-product m-auto w-95 max-w-[1000px] my-5 bg-white dark:bg-darkBg border-2 border-white dark:border-gray-grayDark shadow-containersShadow rounded'>
                    {view === 'shipping' && <Shipping setView={setView} product={product}/>}
                    {view === 'payments' && <Payments setView={setView}/>}
                    {view === 'confirmDetails' && <ConfirmDetails setView={setView}/>}
                    <Aside product={product}/>
                </div>
            }
        </>
    )
}
