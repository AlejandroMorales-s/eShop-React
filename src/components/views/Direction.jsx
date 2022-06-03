import React from 'react';
import DocumentTitle from 'react-document-title';
import AddDirection from '../direction/AddDirection';
import Navbar from '../navbar/Navbar';

export default function Direction() {
    return (
        <>
            <DocumentTitle title='Direction'/>
            <Navbar/>
            <AddDirection/>
        </>
    )
}
