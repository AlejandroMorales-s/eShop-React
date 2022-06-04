import React from 'react';
import DocumentTitle from 'react-document-title';
import Navbar from '../navbar/Navbar';

export default function Feed() {

    return (
        <>
            <DocumentTitle title='Feed'/>
            <Navbar/>
            <div className='h-130'>Feed</div>
        </>
    )
}
