import React from 'react';
import {Link} from 'react-router-dom';

export default function Form() {
    return (
        <form className='flex flex-col w-100 max-w-45 m-auto'>
            <div className='flex flex-col gap-y-0.5 mb-1.5'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input id='email' type="email" placeholder="Email" className='border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow' />            
            </div>
            <div className='flex flex-col gap-y-0.5 mb-1.5'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input id='password' type="password" placeholder="Password" className='border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow' />            
            </div>
            <div className='mt-1 flex justify-between items-center'>
                <Link to='/signup'>
                    <p className='text-primary font-medium'>You don't have account? Sign Up</p>
                </Link>
                <button className='shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary' type="submit">Login</button>
            </div>
        </form>
    )
}
