import React from 'react';
import {Link} from 'react-router-dom';

export default function Form() {

    return (
        <form className='flex flex-col w-100 max-w-45 m-auto'>
            <div className='flex flex-col gap-y-0.5 mb-1.5'>
                <label htmlFor="name" className='font-semibold dark:text-primary-ligth'>Name</label>
                <input id='name' type="text" placeholder="Name" className='border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-ligth dark:text-gray' />             
            </div>
            <div className='flex flex-col gap-y-0.5 mb-1.5'>
                <label htmlFor="email" className='font-semibold dark:text-primary-ligth'>Email</label>
                <input id='email' type="email" placeholder="Email" className='border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-ligth dark:text-gray' />             
            </div>
            <div className='flex flex-col gap-y-0.5 mb-1.5'>
                <label htmlFor="password" className='font-semibold dark:text-primary-ligth'>Password</label>
                <input id='password' type="password" placeholder="Password" className='border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-ligth dark:text-gray' />            
            </div>
            <div className='flex flex-col gap-y-0.5 mb-1.5'>
                <label htmlFor="confirmPassword" className='font-semibold dark:text-primary-ligth'>Confirm password</label>
                <input id='confirmPassword' type="password" placeholder="Password" className='border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-ligth dark:text-gray' />            
            </div>
            <div className='mt-1 flex justify-between items-center'>
                <Link to='/login'>
                    <p className='text-primary font-medium dark:text-primary-ligth'>You already have account? Login</p>
                </Link>
                <button className='shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-ligth dark:text-darkBg dark:border-primary-ligth dark:hover:bg-transparent dark:hover:text-primary-ligth' type="submit">Sign Up</button>
            </div>
        </form>
    )
}
