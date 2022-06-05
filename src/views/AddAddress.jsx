import React from 'react';
import DocumentTitle from 'react-document-title';
import AddAddressForm from '../components/address/AddAddressForm';
import Navbar from '../components/navbar/Navbar';
import Breadcrumb from '../components/breadcrumbTrail/Breadcrumb';

export default function Direction() {
    const breadcrumb = [
        {
            link:'/account',
            text:'My account'
        },
        {
            link:'/account/my-addresses',
            text:'My addresses'
        },
        {
            link:'/account/my-addresses/add-address',
            text:'Add address'
        }
    ]
    return (
        <>
            <DocumentTitle title='Add address'/>
            <Navbar/>
            <Breadcrumb array={breadcrumb}/>
            <AddAddressForm/>
        </>
    )
}
