import React from 'react'
import PriceFilter from './PriceFilter';
import CategoryFilter from './CategoryFilter';

export default function MyAccountDropdown() {


    return (
        <>
            <div className='w-95 max-w-[1000px] mt-5 m-auto flex justify-evenly'>
                <PriceFilter/>
                <CategoryFilter/>
            </div>
        </>
    )
}
