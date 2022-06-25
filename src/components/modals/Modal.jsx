import React, {useState} from 'react';
import {AiOutlineClose, AiFillCheckCircle, AiFillInfoCircle, AiFillCloseCircle} from 'react-icons/ai';
import {MdError} from 'react-icons/md';

export default function Modal({type, title, desc, setShowingModal}) {
    const closeModal = () => {
        setShowingModal(false);
    };

    return (
        <>
            <div className={`rounded p-2 h-fit items-start absolute bottom-2 left-2 sm:bottom-5 sm:left-5 w-fit flex gap-2 dark:bg-darkBg border-l-[5px] dark:border-y-2 dark:border-r-2 shadow-containersShadow dark:border-r-gray-grayDark dark:border-y-gray-grayDark ${type === 'info' ? 'border-blue bg-lightBlue' : type === 'error' ? 'border-red bg-lightRed' : type === 'success' ? 'border-greenModal bg-lightGreen' : 'border-yellowModal bg-lightYellow'}`}>
                {type === 'info' && <AiFillInfoCircle className='text-[70px] text-blue w-[25px] h-[25px]' />}
                {type === 'warning' && <MdError className='text-[70px] text-yellowModal w-[25px] h-[25px]' />}
                {type === 'success' && <AiFillCheckCircle className='text-[25px] text-greenModal w-[25px] h-[25px]' />}
                {type === 'error' && <AiFillCloseCircle className='text-[25px] text-red w-[25px] h-[25px]' />}
                <div>
                    <h2 className=' dark:text-white text-bold font-semibold'>{title}</h2>
                    <p className='dark:text-gray'>{desc}</p>
                </div>
                <AiOutlineClose onClick={() => closeModal()} className='text-[15px] w-[15px] h-[15px] dark:text-white cursor-pointer' />
            </div>
        </>
    )
}
