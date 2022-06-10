import React, {useContext} from 'react';
import { globalContext } from '../globalContext/GlobalContext';
import ProductCard from '../productCard/ProductCard';

export default function Products() {
    const {products} = useContext(globalContext);
    return (
        <>
            <div className='grid grid-cols-4 gap-2 w-95 max-w-[1000px] m-auto'>
                {products.map(product => {
                        return <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} desc={product.desc} id={product.id} />
                    })
                }
            </div>
        </>
    )
}
