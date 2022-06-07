import React from 'react';

export default function Product() {
    const bubbling = (e) => {
        e.stopPropagation();
    }
    return (
        <div className='h-full w-full absolute top-0 left-0 bg-transparent z-50 flex justify-center'>
            <div className='w-full h-full bg-black opacity-50 absolute top-0 left-0'></div>
            <div className='bg-white w-95 max-w-[1000px] h-[95%] max-h-[750px] m-auto rounded opacity-100 relative z-30'></div>
        </div>
    )
}
