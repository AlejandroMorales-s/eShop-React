import React, {useState} from 'react';
import Chip from '../../assets/chip-card.png';
import Visa from '../../assets/logo-visa.png';
import Mastercard from '../../assets/logo-mastercard.png';

export default function CardPreview({name, number, month, year, type, ccv, rotate}) {
    if (number.slice(0, 1) === '4') {
        type = 'Visa';
    } else if (number.slice(0, 1) === '5') {
        type = 'Mastercard';
    } else {
        type = '';
    }

    return (
        <>
            <div id='rotate' className={`${rotate && 'active'} card m-auto my-5 transition-all ease-in-out delay-50 relative w-[100%] max-w-[550px] cursor-pointer z-10`}>
                <div className={`${type === 'Visa' ? 'visa' : type === 'Mastercard' ? 'mastercard' : 'bg-white'} p-[30px] shadow-containersShadow flex justify-between`}>
                    <div className='flex flex-col gap-4 h-fit my-auto w-auto'>
                        <img className='h-[50px] w-fit' src={Chip} alt="" srcset="" />
                        <div className='min-h-[45px]'>
                            <p className={`${type === 'Visa' ? 'text-gray' : 'text-boldText'}`}>Card number</p>
                            <p className={`${type === 'Visa' ? 'text-white' : 'text-boldText'} text-bold font-semibold`}>{number === undefined || number.length === 0 ? '#### #### #### ####' : number}</p>
                        </div>
                        <div className='min-h-[45px]'>
                            <p className={`${type === 'Visa' ? 'text-gray' : 'text-boldText'}`}>Name</p>
                            <p className={`${type === 'Visa' ? 'text-white' : 'text-boldText'} text-bold font-semibold`}>{name === undefined || name.length === 0 ? 'John Doe' : name}</p>
                        </div>
                    </div>
                    <div className={`flex flex-col justify-between items-end ${type === 'Mastercard' ? 'pt-0 pb-2' : 'py-2'}`}>
                        <img className={`m-0 ${type === 'Visa' ? 'bg-white h-[40px]' : 'h-[90px]'} rounded`} src={type === 'Visa' ? Visa : type === 'Mastercard' ? Mastercard : ''} alt="" />
                        <p className={`${type === 'Visa' ? 'text-white' : 'text-boldText'} text-bold w-[68.5px] font-semibold`}>{month === undefined || month.length === 0 ? '00' : month} / {year === undefined || year.length === 0 ? '00' : year}</p>
                    </div>
                </div>

                <div className={`${type === 'Visa' ? 'visa' : type === 'Mastercard' ? 'mastercard' : 'bg-white'} w-[100%] p-0 back absolute top-0 shadow-containersShadow`}>
                    <div className='h-[55px] w-full bg-black mt-[30px]'></div>
                    <div className='max-w-[350px] ml-[25px] flex flex-col gap-1 mt-[30px]'>
                        <div className='w-full flex justify-between'>
                            <p className={`${type === 'Visa' ? 'text-gray' : 'text-boldText'}`}>Firma</p>
                            <p className={`${type === 'Visa' ? 'text-gray' : 'text-boldText'}`}>CCV</p>
                        </div>
                        <div className='h-[40px] w-full bg-white flex justify-end items-center rounded'>
                            <input type='password' className='text-boldText px-1 text-bold font-semibold w-[45px] rounded' value={ccv === undefined || ccv.length === 0 ? '' : ccv}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
