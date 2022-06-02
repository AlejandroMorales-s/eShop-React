import React from 'react'
import { Menu, Transition } from '@headlessui/react'

export default function MyAccountDropdown({auth}) {
    const [isOpen, setIsOpen] = React.useState(false);

    const rotateIcon = () => setIsOpen(!isOpen);

    const darkMode = () => {
        document.getElementById('html').classList.toggle('dark');
        document.getElementById('html').classList.toggle('bg-darkBg');
    }
    return (
        <>
            <Menu>
                <Menu.Button>
                    <div onClick={rotateIcon}>
                        <p className='text-text dark:text-gray'>{`Hello ${auth.name}!`}</p>
                        <div className='flex gap-0.5'>
                            <p className={`${isOpen ? 'text-primary dark:text-primary-ligth' : 'dark:text-white text-boldText'} transition-all ease-in-out delay-100 font-semibold text-center`}>My account</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${isOpen ? 'rotate-180 dark:text-primary-ligth text-primary' : 'dark:text-primary-ligth text-primary rotate-0'} transition-all ease-in-out delay-100 h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                    className='absolute top-16'
                >
                    <Menu.Items className=' flex flex-col bg-white border-2 border-gray rounded p-1'>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'} transition-all ease-in-out delay-50 hover:text-primary hover:underline`}
                                href="/account-settings"
                            >
                                Account
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'} hover:text-primary hover:underline transition-all ease-in-out delay-50`}
                                href="/account-settings"
                            >
                                Payment methods
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'} hover:text-primary hover:underline transition-all ease-in-out delay-50`}
                                href="/account-settings"
                            >
                                Favorites
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'} hover:text-primary hover:underline transition-all ease-in-out delay-50`}
                                href="/account-settings"
                            >
                                Orders
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'} hover:text-primary hover:underline transition-all ease-in-out delay-50`}
                                href="/account-settings"
                            >
                                History
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <p
                                onClick={darkMode}
                                className={`${active && 'bg-blue-500'} hover:text-primary hover:underline transition-all ease-in-out delay-50`}
                            >
                                Dark mode
                            </p>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
