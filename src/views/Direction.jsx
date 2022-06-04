import React from 'react';
import DocumentTitle from 'react-document-title';
import AddDirection from '../components/address/AddDirection';
import Navbar from '../components/navbar/Navbar';

export default function Direction() {
    return (
        <>
            <DocumentTitle title='Direction'/>
            <Navbar/>
            <AddDirection/>
        </>
    )
}
