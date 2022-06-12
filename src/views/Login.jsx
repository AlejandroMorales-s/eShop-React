import React from 'react';
import DocumentTitle from 'react-document-title';
import Form from '../components/login/Form';
import SocialMedia from '../components/login/SocialMedia';
import DarkModeToggle from '../components/login/DarkModeToggle';

export default function Login() {
    return (
        <>
            <DocumentTitle title="Login" />

                <div className=' border-gray border-2 rounded w-95 max-w-65 m-auto p-2 h-fit bg-white shadow-containersShadow dark:bg-darkBg dark:border-gray-grayDark'>
                    <div>
                        <h1 className='text-center font-semibold text-primary text-logo dark:text-primary-light'>LOGO</h1>
                        <p className='text-center font-semibold my-1 text-bold dark:text-gray'>Login</p>
                        <Form/>
                        <SocialMedia/>
                    </div>
                </div>
            <DarkModeToggle/>
        </>
    )
}
