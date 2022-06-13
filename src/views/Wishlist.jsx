import React, {useContext} from 'react';
import DocumentTitle from 'react-document-title';
import Breadcrumb from '../components/breadcrumbTrail/Breadcrumb';
import { globalContext } from '../components/globalContext/GlobalContext';
import Navbar from '../components/navbar/Navbar';
import ProductCard from '../components/productCard/ProductCard';

export default function Wishlist() {
    const breadcrumb = [
        {
            link:'/account',
            text:'My account'
        },
        {
            link:'/account/my-wishlist',
            text:'My wishlist'
        }
    ];
    const {wishlist} = useContext(globalContext);
    return (
        <>
            <DocumentTitle title='Wishlist'/>
            <Navbar/>
            <Breadcrumb array={breadcrumb}/>
            <h2 className='text-center font-semibold text-title dark:text-gray m-3'>My wishlist</h2>
            <div className='grid grid-cols-4 gap-2 w-95 max-w-[1000px] m-auto'>
                {wishlist.map(product => {
                        return <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} desc={product.desc} id={product.id} />
                    })
                }
            </div>
        </>
    )
}
