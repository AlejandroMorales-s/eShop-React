import React from 'react';
import Aside from './Aside';

export default function Template({children}) {
    return (
        <>
            <div className='grid grid-cols-product m-auto w-95 max-w-[1000px] my-5 bg-white dark:bg-darkBg border-2 border-white dark:border-gray-grayDark shadow-containersShadow'>
                {children}
                <Aside/>
            </div>
        </>
    )
}
