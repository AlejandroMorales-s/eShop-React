import React, {useContext, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import MyAccountDropdown from './MyAccountDropdown';


export default function Navbar() {
    //* Global Context
    const {auth} = useContext(globalContext);

    const [showNavbar, setShowNavbar] = useState(true);

    //* Refs
    const navbar = useRef();

    //* Show/Hide Navbar on scroll
    let currentPosition  = window.pageYOffset;
    window.onscroll = function() {
        let scrolling = window.pageYOffset;
        if(currentPosition >= scrolling){
            setShowNavbar(true)
        }
        else{
            setShowNavbar(false)
        }
        currentPosition = scrolling;
    }

    return (
        <>
            <div ref={navbar} className={`fixed ${showNavbar ? 'top-0' : '-top-[100px]'} transition-all ease-in-out delay-100 w-100 border-b-2 border-b-gray`}>
                <div className='w-95 max-w-130 m-auto flex justify-between items-center py-1'>
                    <Link to='/feed'>
                        <h1 className='text-primary font-semibold text-logo'>LOGO</h1>
                    </Link>
                    <div>
                        <p>{`Send to ${auth.name}`}</p>
                        <div className='flex'>
                            <FaMapMarkerAlt className='text-primary' />
                            <p className='font-semibold'>Add direction...</p>
                        </div>
                    </div>
                    <div className='w-90 max-w-55 mx-2 h-fit relative'>
                        <input className='px-1 w-100 h-4 border-2 border-primary focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary rounded' type="search" name="" id="" />
                    </div>
                    <div className='flex gap-5'>
                        <MyAccountDropdown auth={auth}/>
                        <div className='flex justify-center items-center'>
                            <IoMdCart className='h-3 w-3 text-primary' />
                            <div className='flex'>
                                <p className='font-semibold'>Cart</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
