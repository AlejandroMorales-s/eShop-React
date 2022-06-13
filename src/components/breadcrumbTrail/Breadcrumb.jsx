import React from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Breadcrumb({array}) {
    return (
        <div className='flex gap-1 justify-start items-center w-95 max-w-130 m-auto pt-3'>
            <Link to='/feed'>
                <p className='dark:text-primary-light text-primary font-medium'>Feed</p>
            </Link>
            {array.map((item, index) => (
                <Link to={item.link} key={index} className='flex gap-1 justify-center items-center'>
                    <HiOutlineArrowNarrowRight className='dark:text-gray'/>
                    <p className='dark:text-primary-light text-primary font-medium'>{item.text}</p>
                </Link>
            ))}
        </div>
    )
}
