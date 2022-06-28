import React, {useContext, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { get } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';
//* Icons
import { BiHistory } from 'react-icons/bi';
import { BsBoxSeam } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';

export default function MyAccountDropdown({auth}) {
    const options = [
        {
            title: 'My account',
            link: '/account',
            icon: <AiOutlineUser className='text-primary dark:text-primary-light text-[30px]'/>
        },
        {
            title: 'Wishlist',
            link: '/account/my-wishlist',
            icon: <AiOutlineHeart className='text-primary dark:text-primary-light text-[30px]'/>
        },
        {
            title: 'Orders',
            link: '/account/my-orders',
            icon: <BsBoxSeam className='text-primary dark:text-primary-light text-[30px]'/>
        },
        {
            title: 'History',
            link: '/account/history',
            icon: <BiHistory className='text-primary dark:text-primary-light text-[30px]'/>
        },
        {
            title: 'Add product',
            link: '/add-product',
            icon: <IoMdAddCircleOutline className='text-primary dark:text-primary-light text-[30px]'/>
        }
    ]

    const [isOpen, setIsOpen] = useState(false);
    const [dark, setDark] = useState(false);

    const {setUser} = useContext(globalContext);
    
    const navigate = useNavigate();
    
    const rotateIcon = () => setIsOpen(!isOpen);

    const darkMode = () => {
        document.getElementById('html').classList.toggle('dark');
        document.getElementById('html').classList.toggle('bg-darkBody');
        document.getElementById('html').classList.toggle('bg-lightBg');
        document.getElementById('html').classList.contains('bg-darkBody') ? setDark(true) : setDark(false); 
    }
    const logout = () => {
        get("/api/auth/logout")
        .then( res => {
            setUser({type: 'LOGOUT', user: null});
            navigate("/login");
        })
    }
    return (
        <>
            <Menu>
                <Menu.Button>
                    <div onClick={rotateIcon}>
                        <p className='text-text dark:text-gray'>{`Hello ${auth.name}!`}</p>
                        <div className='flex gap-0.5'>
                            <p className={`${isOpen ? 'text-primary dark:text-primary-light' : 'dark:text-white text-boldText'} transition-all ease-in-out delay-100 font-semibold text-center`}>My account</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${isOpen ? 'rotate-180 dark:text-primary-light text-primary' : 'dark:text-primary-light text-primary rotate-0'} transition-all ease-in-out delay-100 h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </Menu.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-100 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    className='absolute top-16 right-[15%]'
                >
                    <Menu.Items className=' flex flex-col bg-white border-2 border-gray rounded p-1 gap-1 shadow-containersShadow dark:bg-darkBg dark:border-gray-grayDark'>
                        {options.map((option, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <Link to={option.link}>
                                        <div className='bg-white flex justify-between items-center gap-2 p-0.5 rounded w-100 dark:bg-darkBg border-2 border-white hover:border-gray dark:border-darkBg dark:hover:border-gray-grayDark hover:shadow-containersShadow transition-all ease-in-out delay-50'>
                                            {option.icon}
                                            <div className='w-100'>

                                                <p className='text-text dark:text-gray'>{option.title}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                        <Menu.Item onClick={darkMode} className='cursor-pointer bg-white rounded shadow-shadow w-100 border-2 border-primary dark:bg-darkBg dark:border-primary-light hover:bg-primary dark:hover:bg-primary-light transition-all ease-in-out delay-50'>
                            {({ active }) => (
                                    <div>
                                        <p className='text-primary font-medium dark:text-primary-light p-1 text-center hover:text-white dark:hover:text-boldText transition-all ease-in-out delay-50 h-full w-full'>{dark ? 'Light' : 'Dark'} mode</p>
                                    </div>
                            )}
                        </Menu.Item>
                        <Menu.Item onClick={logout} className='cursor-pointer bg-red rounded shadow-containersShadow w-100 hover:bg-transparent border-2 border-red transition-all ease-in-out delay-50'>
                            {({ active }) => (
                                <div className=''>
                                    <p className='p-1 text-white font-medium text-center hover:text-red transition-all ease-in-out delay-50 h-full w-full'>Log Out</p>
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
