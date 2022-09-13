import React, {useRef, useState, useEffect, useContext} from 'react';
import {
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../../libs/firebase';
import {Link, useNavigate} from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';

export default function Form({setShowingModal, setError}) {
    //* States

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const [inactiveButton, setInactiveButton] = useState(true);

    //* Refs
    const password = useRef();
    const email = useRef();

    //* Navigate
    const navigate = useNavigate();

    //* Global Context
    const {setUser} = useContext(globalContext);
    
    //* Show/Hide Password
    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
        isPasswordVisible ? password.current.type = "text" : password.current.type = "password";
    }

    //* Login
    const login = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(res => {
            setUser({
                user:{
                    name: res.user.displayName,
                    email: res.user.email,
                },
                logout: false
            })
            navigate('/feed')
        })
        .catch(error => {
            console.log(error);
        })
    }

    //* Enable/Disable Button
    const validation = () => {
        if (password.current.value.length >= 6 && email.current.value !== "") {
            setInactiveButton(false);
        } else {
            setInactiveButton(true);
        }
    }

    //* Effect
    useEffect(() => {
        password.current.oninput = validation;
        email.current.oninput = validation;
    }, [password, email]);
    
    return (
        <>
            <form onSubmit={login} className='flex flex-col w-100 max-w-45 m-auto'>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label htmlFor="email" className='text-bold font-medium dark:text-gray text-boldText'>Email</label>
                    <input ref={email} id='email' type="email" placeholder="Email" className='border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-light dark:text-gray focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary' />             
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label htmlFor="password" className='text-bold font-medium dark:text-gray text-boldText'>Password</label>
                    <div className='relative w-100'>
                        <input ref={password} id='password' type="password" placeholder="Password" className='w-100 border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-light dark:text-gray focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary' />            
                        {isPasswordVisible ?
                            <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" className=" font-semibold text-darkBg dark:text-gray h-6 w-6 absolute -translate-y-2/4 top-2/4 right-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        :
                            <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" className="font-semibold text-darkBg dark:text-gray h-6 w-6 absolute -translate-y-2/4 top-2/4 right-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                        }
                    </div>
                </div>
                <div className='mt-1 flex justify-between items-center'>
                    <Link to='/signup'>
                        <p className='text-primary font-medium dark:text-primary-light'>You don't have account? Sign Up</p>
                    </Link>
                    <button disabled={inactiveButton} className={`${inactiveButton ? 'opacity-50' : 'opacity-100'} shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`} type="submit">Login</button>
                </div>
            </form>
        </>
    )
}
