import React from 'react';
import DocumentTitle from 'react-document-title';
import Form from '../login/Form';
import SocialMedia from '../login/SocialMedia';

export default function Login() {
    return (
        <>
            <DocumentTitle title="Login" />
            <div className=' relative w-screen h-screen'>

                <div className=' border-gray border-2 rounded w-95 max-w-65 m-auto p-2 absolute inset-1/4 h-fit'>
                    <div>
                        <h1 className='text-center font-semibold text-primary text-logo'>LOGO</h1>
                        <p className='text-center font-semibold my-1 text-bold'>Login</p>
                        <Form/>
                        <SocialMedia/>
                    </div>
                </div>
            </div>
        </>
    )
}
