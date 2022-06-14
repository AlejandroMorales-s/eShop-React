import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';
//* Components
import Navbar from '../navbar/Navbar';
import Aside from './Aside';
import ConfirmDetails from './ConfirmDetails';
import Payments from './Payments';
import Shipping from './Shipping';

export default function Template() {
    const {products} = useContext(globalContext);
    const [product, setProduct] = useState();
    const [view, setView] = useState('shipping');
    const [quantity, setQuantity] = useState(1);
    const [shipping, setShipping] = useState(0);

    const {id} = useParams();
    
    useEffect(() => {
        setProduct(products.find(product => product.id === parseInt(id)));
    }, [id, products]);
    
    return (
        <>
            <Navbar/>
            {product === undefined ? 
                <div>Loading...</div> 
            :
                <div className='grid grid-cols-product m-auto w-95 max-w-[1000px] my-5 bg-white dark:bg-darkBg border-2 border-white dark:border-gray-grayDark shadow-containersShadow rounded'>
                    {view === 'shipping' && <Shipping setView={setView} product={product} shipping={shipping} quantity={quantity}/>}
                    {view === 'payments' && <Payments setView={setView}/>}
                    {view === 'confirmDetails' && <ConfirmDetails setView={setView}/>}
                    <Aside product={product} setQuantity={setQuantity} quantity={quantity} setShipping={setShipping} shipping={shipping}/>
                </div>
            }
        </>
    )
}
