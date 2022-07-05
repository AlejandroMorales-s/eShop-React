import React from 'react';
import DocumentTitle from 'react-document-title';
import Navbar from '../components/navbar/Navbar';
import Products from '../components/feed/Products';
import Filters from '../components/filters/Filters';

export default function Feed() {

    return (
        <>
            <DocumentTitle title='Feed'/>
            <Navbar/>
            <Filters/>
            <Products/>
        </>
    )
}
