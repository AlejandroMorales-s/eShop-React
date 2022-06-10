import React from 'react';
import DocumentTitle from 'react-document-title';
import Navbar from '../components/navbar/Navbar';
import Products from '../components/feed/Products';

export default function Feed() {

    return (
        <>
            <DocumentTitle title='Feed'/>
            <Navbar/>
            <h2 className='text-center font-semibold text-title dark:text-gray m-3'>Products</h2>
            <Products/>
        </>
    )
}
