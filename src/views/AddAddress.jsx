import React from 'react';
import DocumentTitle from 'react-document-title';
import AddAddressForm from '../components/address/AddAddressForm';
import Navbar from '../components/navbar/Navbar';

export default function Direction() {
    return (
        <>
            <DocumentTitle title='Add address'/>
            <Navbar/>
            <AddAddressForm/>
        </>
    )
}
