import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

export default function InfoModal({open}) {
    let [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(open[4]);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute top-0 left-0" />
                </Transition.Child>

                <div className="absolute -top-80 left-0">
                    <div className="flex items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className={`h-fit w-95 max-w-40 transform overflow-hidden rounded bg-${open[0]} p-2 text-left align-middle shadow-xl transition-all`}>
                        <Dialog.Title
                            as="h3"
                            className="text-black font-semibold"
                        >
                            {open[1]}
                        </Dialog.Title>
                        <div className="my-1.5">
                            <p className="text-black">
                            {open[2]}
                            </p>
                        </div>

                        <div className="">
                            <Link to='/login'>
                                <button
                                type="button"
                                className="inline-flex justify-center shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary  dark:bg-primary-ligth dark:text-darkBg dark:border-primary-ligth "
                                onClick={closeModal}
                                >
                                {open[3]}
                                </button>
                            </Link>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}