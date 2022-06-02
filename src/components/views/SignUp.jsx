import React from 'react';
import DocumentTitle from 'react-document-title';
import DarkModeToggle from '../login/DarkModeToggle';
import SocialMedia from '../login/SocialMedia';
import Form from '../signUp/Form';

export default function SignUp() {
    return (
        <>
            <DocumentTitle title="Sign Up" />
                <div className=' border-gray border-2 rounded w-95 max-w-65 m-auto p-2 h-fit dark:bg-darkBg dark:border-gray-grayDark'>
                    <div>
                        <h1 className='text-center font-semibold text-primary text-logo dark:text-primary-ligth'>LOGO</h1>
                        <p className='text-center font-semibold my-1 text-bold dark:text-gray'>Sign Up</p>
                        <Form/>
                        <SocialMedia/>
                    </div>
                </div>
            <DarkModeToggle/>
        </>
    )
}
