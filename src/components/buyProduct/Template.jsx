import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';
import Navbar from '../navbar/Navbar';
import Aside from './Aside';
import Payments from './Payments';
import Shipping from './Shipping';

export default function Template() {
    const {products} = useContext(globalContext);
    const [product, setProduct] = useState();
    const [view, setView] = useState('shipping');

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
                    {view === 'shipping' && <Shipping setView={setView}/>}
                    {view === 'payments' && <Payments setView={setView}/>}
                    <Aside product={product}/>
                </div>
            }
        </>
    )
}
