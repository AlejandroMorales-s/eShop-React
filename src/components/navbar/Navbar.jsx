import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';
import { FaMapMarkerAlt } from 'react-icons/fa';
import MyAccountDropdown from './MyAccountDropdown';
import ShoppingCartDropdown from './ShoppingCartDropdown';


export default function Navbar() {
    //* Global Context
    const {user} = useContext(globalContext);
    const {direction} = useContext(globalContext);

    console.log(direction); 

    const [showNavbar, setShowNavbar] = useState(true);

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
            <div className={`fixed ${showNavbar ? 'top-0' : '-top-[100px]'} bg-white dark:bg-darkBg transition-all ease-in-out delay-100 w-100 border-b-2 border-b-gray dark:border-gray-grayDark`}>
                <div className='w-95 max-w-130 m-auto flex justify-between items-center py-1'>
                    <Link to='/feed'>
                        <h1 className='text-primary dark:text-primary-ligth font-semibold text-logo'>LOGO</h1>
                    </Link>
                    <Link to='/direction'>
                        {direction.directionAdded ? 
                            <p className='text-text dark:text-gray'>{`Send to ${direction.name}`}</p>
                        :
                            <p className='text-text dark:text-gray'>{`Send to ${user.name}`}</p>
                        }
                        <div className='flex gap-0.5'>
                            <FaMapMarkerAlt className='text-primary dark:text-primary-ligth' />
                            {direction.directionAdded ? 
                                <p className=' text-boldText font-semibold dark:text-white'>{`${direction.streetAndNumber}, ${direction.country}`}</p>
                            :
                                <p className=' text-boldText font-semibold dark:text-white'>Add direction...</p>
                            }
                        </div>
                    </Link>
                    <div className='w-90 max-w-55 mx-2 h-fit relative'>
                        <input className='px-1 w-100 h-4 border-2 border-primary dark:border-primary-ligth focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth rounded dark:bg-darkBg dark:text-gray' type="search" name="" id="" />
                    </div>
                    <div className='flex gap-5'>
                        <MyAccountDropdown auth={user}/>
                        <ShoppingCartDropdown/>
                    </div>
                </div>
            </div>
        </>
    )
}
