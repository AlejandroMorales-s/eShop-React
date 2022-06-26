import React, {useContext} from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoMdCart } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';

export default function ShoppingCartDropdown() {
    const {shoppingCart} = useContext(globalContext);

    const [isOpen, setIsOpen] = React.useState(false);

    const rotateIcon = () => setIsOpen(!isOpen);
    return (
        <>
            <Menu>
                <Menu.Button>
                    <div onClick={rotateIcon} className='flex justify-center items-center'>
                        <IoMdCart className={`${isOpen ? 'text-primary dark:text-primary-light' : 'dark:text-white text-boldText'} transition-all ease-in-out delay-100 h-3 w-3`} />
                        <div className='flex gap-0.5'>
                            <p className={`${isOpen ? 'text-primary dark:text-primary-light' : 'dark:text-white text-boldText'} transition-all ease-in-out delay-100 font-semibold`}>Cart</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${isOpen ? 'rotate-180 text-primary dark:text-primary-light' : 'text-primary dark:text-primary-light rotate-0'} transition-all ease-in-out delay-100 h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                    className='absolute top-16 right-24'
                >
                    <Menu.Items static className=' pb-[40px] flex flex-col bg-white dark:bg-darkBg border-2 border-gray dark:border-gray-grayDark rounded px-1 max-h-[365px] overflow-hidden relative min-w-[320px] max-w-[400px] shadow-containersShadow'>
                        {shoppingCart.map((item, index) => (
                            <Menu.Item key={index}>
                            {({ active }) => (
                                <div className='flex gap-1.5 hover:cursor-pointer justify-center items-center max-w-100 border-b-gray dark:border-b-gray-grayDark border-b-2 py-1'>
                                    <div className=' border-2 border-gray dark:border-gray-grayDark w-[50px] overflow-hidden h-[50px] rounded'>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className='max-w-[150px]'>
                                        <p className='font-semibold dark:text-white'>{item.name}</p>
                                        <p className='text-text dark:text-gray line-clamp-2'>{item.desc}</p>
                                        <p className='text-sm dark:text-gray'>{`$${item.price}.00`}</p>
                                    </div>
                                    <div className='max-w-100 flex flex-col items-center'>
                                        <p className='text-sm dark:text-white font-semibold'>Quantity:</p>
                                        <input onClick={(e) => e.stopPropagation()} className='border-2 rounded pl-0.5 w-[40px] border-gray dark:border-gray-grayDark dark:bg-darkBg dark:text-gray' 
                                        type="number" min='1' max='50' onInput={(e) => item.quantity = e.target.value} defaultValue={item.quantity}/>
                                        <p className='text-sm dark:text-white font-semibold'>Total:</p>
                                        <p className='text-text dark:text-gray'>{`$${item.price * item.quantity}.00`}</p>
                                    </div>
                                </div>
                            )}
                            </Menu.Item>
                        ))}
                        <Menu.Item>
                            {({ active }) => (
                                <Link to='/account/shopping-cart'>
                                    <div className='border-t-2 border-t-gray dark:border-t-gray-grayDark absolute flex items-center justify-center bottom-0 bg-white dark:bg-darkBg w-full h-[45px]'>
                                        <p className='font-semibold text-primary dark:text-primary-light'>View shopping cart</p>
                                    </div>
                                </Link>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
