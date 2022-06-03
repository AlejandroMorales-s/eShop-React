import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoMdCart } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function ShoppingCartDropdown() {
    let dollar = '$';

    const items = [
        {
            name: 'Item 1',
            price: 10,
            quantity: 1,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: 'Item 2',
            price: 20,
            quantity: 2,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
    ]

    const [isOpen, setIsOpen] = React.useState(false);

    const rotateIcon = () => setIsOpen(!isOpen);
    return (
        <>
            <Menu>
                <Menu.Button>
                    <div onClick={rotateIcon} className='flex justify-center items-center'>
                        <IoMdCart className={`${isOpen ? 'text-primary dark:text-primary-ligth' : 'dark:text-white text-boldText'} transition-all ease-in-out delay-100 h-3 w-3`} />
                        <div className='flex gap-0.5'>
                            <p className={`${isOpen ? 'text-primary dark:text-primary-ligth' : 'dark:text-white text-boldText'} transition-all ease-in-out delay-100 font-semibold`}>Cart</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${isOpen ? 'rotate-180 text-primary dark:text-primary-ligth' : 'text-primary dark:text-primary-ligth rotate-0'} transition-all ease-in-out delay-100 h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                    <Menu.Items static className=' pb-[40px] flex flex-col bg-white border-2 border-gray rounded px-1 max-h-[365px] overflow-hidden relative max-w-[400px] shadow-containersShadow'>
                        {items.map((item, index) => (
                            <Menu.Item key={index}>
                            {({ active }) => (
                                <div className='flex gap-1.5 hover:cursor-pointer justify-center items-center max-w-100 border-b-gray border-b-2 py-1'>
                                    <div className=' border-2 border-gray w-[50px] h-[50px] rounded'>
                                        <img src="" alt="" />
                                    </div>
                                    <div className='max-w-[150px]'>
                                        <p className='font-semibold'>{item.name}</p>
                                        <p className='text-text line-clamp-2'>{item.desc}</p>
                                        <p className='text-sm'>{dollar.concat(item.price, '.00')}</p>
                                    </div>
                                    <div className='max-w-100 flex flex-col items-center'>
                                        <p className='text-sm font-semibold'>Quantity:</p>
                                        <p className='text-text'>{item.quantity}</p>
                                        <p className='text-sm font-semibold'>Total:</p>
                                        <p className='text-text'>{dollar.concat((item.price * item.quantity), '.00')}</p>
                                    </div>
                                </div>
                            )}
                            </Menu.Item>
                        ))}
                        <Menu.Item>
                            {({ active }) => (
                                <Link to='/account/shopping-cart'>
                                    <div className='border-t-2 border-t-gray absolute flex items-center justify-center bottom-0 bg-white w-100 h-[45px]'>
                                        <p className='font-semibold text-primary'>View shopping cart</p>
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
