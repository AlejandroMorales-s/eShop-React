import React from 'react';
import AccountData from '../components/myData/AccountData';
import PersonalData from '../components/myData/PersonalData';
import Navbar from '../components/navbar/Navbar';
import ReactDocumentTitle from 'react-document-title';

export default function MyData() {
    return (
        <>
            <ReactDocumentTitle title='My data'/>
            <Navbar/>
            <AccountData/>
            <PersonalData/>
        </>
    )
}
