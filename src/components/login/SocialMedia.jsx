import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { SiFacebook } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { providerLogin, signInMethods } from '../../libs/auth';
import { doc, setDoc } from 'firebase/firestore'
import { database } from '../../libs/firebase';

export default function SocialMedia() {
    const navigate = useNavigate();
    const loginWithProvider = (id) => {
        providerLogin(id)
        .then(async (res) => {
            const docRef = doc(database, 'users', res.user.uid)
            await setDoc(docRef, {
                role: 'REGULAR',
                shoppingCart:[],
                wishlist: [],
                paymentMethods: [],
                addresses:[]
            })
            navigate('/feed') 
        })
        .catch(error => {
            console.log(error); 
        })
    }
    return (
        <div>
            <p className=' font-semibold text-center border-b-2 border-gray mt-1.5 dark:text-gray dark:border-gray-grayDark'>or</p>
            <div className='flex items-center justify-center gap-2 pt-2'>
                <SiFacebook onClick={() => loginWithProvider(signInMethods.facebook)} className='h-3 w-3 text-fb'/>
                <FcGoogle onClick={() => loginWithProvider(signInMethods.google)} className='h-3 w-3'/>
                <BsGithub onClick={() => loginWithProvider(signInMethods.github)} className='h-3 w-3 dark:text-primary-light'/>
            </div>
        </div>
    )
}
