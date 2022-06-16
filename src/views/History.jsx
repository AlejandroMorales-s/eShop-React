import React, {useContext} from 'react';
import Navbar from '../components/navbar/Navbar';
import ReactDocumentTitle from 'react-document-title';
import { globalContext } from '../components/globalContext/GlobalContext';
import ProductCard from '../components/productCard/ProductCard';

export default function History() {
    const {history} = useContext(globalContext);
    return (
        <>
            <ReactDocumentTitle title='History'/>
            <Navbar/>
            <h2 className='text-center font-semibold text-title dark:text-gray m-3'>History</h2>
            <div className='grid grid-cols-4 gap-2 w-95 max-w-[1000px] m-auto'>
                {history.map(product => {
                        return <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} desc={product.desc} id={product.id} />
                    })
                }
            </div>
        </>
    )
}
