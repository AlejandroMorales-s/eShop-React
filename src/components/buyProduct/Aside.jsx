import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {globalContext} from '../globalContext/GlobalContext';

export default function Aside() {
    const {products} = useContext(globalContext);
    const [product, setProduct] = useState();

    const {id} = useParams();
    
    useEffect(() => {
        setProduct(products.find(product => product.id === parseInt(id)));
    }, [id, products]);
    
    return (
        <>
            {product === undefined ? 
                <div>Loading...</div> 
            :
                <div className='flex flex-col items-center p-2 gap-2 border-l-2 border-l-gray dark:border-l-gray-grayDark'>
                    <div className='rounded-full h-[150px] overflow-hidden w-[150px]'>
                        <img src={product.image} alt="" srcSet="" className='object-cover w-full h-full'/>
                    </div>
                    <div>
                        <p className='text-boldText font-medium text-bold text-center dark:text-white'>{product.name}</p>
                        <p className='text-boldText font-medium text-bold text-center dark:text-white'>Quantity: 1</p>
                    </div>
                    <div className='border-y-2 border-y-gray py-2 w-full flex flex-col gap-2 dark:border-y-gray-grayDark'>
                        <div className='flex items-center justify-between'>
                            <p className='text-text font-medium text-bold dark:text-gray'>Product:</p> 
                            <p className='text-text font-medium text-bold dark:text-gray'>{product.price} MXN</p> 
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-text font-medium text-bold dark:text-gray'>Shopping:</p> 
                            <p className='text-text font-medium text-bold dark:text-gray'>$0 MXN</p> 
                        </div>
                    </div>
                    <div className='flex justify-between w-full'>
                        <p className='text-boldText text-bold font-semibold dark:text-white'>Total:</p>
                        <p className='text-boldText text-bold font-semibold dark:text-white'>$100 MXN</p>
                    </div>
                </div>
        }
        </>
    )
}
