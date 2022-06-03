import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { SiFacebook } from 'react-icons/si';

export default function SocialMedia() {
    return (
        <div>
            <p className=' font-semibold text-center border-b-2 border-gray mt-1.5 dark:text-gray dark:border-gray-grayDark'>or</p>
            <div className='flex items-center justify-center gap-2 pt-2'>
                <a href='https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/facebook'><SiFacebook className='h-3 w-3 text-fb'/></a>
                <a href='https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/google'><FcGoogle className='h-3 w-3'/></a>
                <a href='https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/github'><BsGithub className='h-3 w-3 dark:text-primary-ligth'/></a>
            </div>
        </div>
    )
}
