import React from 'react';
import ReactDocumentTitle from 'react-document-title';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { AiOutlineHeart } from 'react-icons/ai';

export default function Product() {
    const products = [
        {
            id: 1,
            name: 'Product 1',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
        {
            id: 2,
            name: 'Product 2',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
        {
            id: 3,
            name: 'Product 3',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
        {
            id: 4,
            name: 'Product 4',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
        {
            id: 5,
            name: 'Product 5',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
        {
            id: 6,
            name: 'Product 6',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
        {
            id: 7,
            name: 'Product 7',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
        {
            id: 8,
            name: 'Product 8',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
        {
            id: 9,
            name: 'Product 9',
            price: '$100',
            image: 'https://picsum.photos/200/300',
            desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
        },
    ]
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    
    return (
        <>
            <ReactDocumentTitle title={product.name}/>
            <Navbar/>
            <div className='w-95 max-w-130 mx-auto flex justify-center items-center my-5'>
                <div className='bg-white p-2 grid grid-cols-product w-full shadow-containersShadow rounded gap-2 dark:bg-darkBg'>
                    <div className='flex flex-col gap-1.5 overflow-auto'>
                        <div className='h-[625px] rounded w-full overflow-hidden'>
                            <img src={product.image} className=' w-full h-full object-cover' alt='Product '/>
                        </div>
                        <div>
                            <h3 className='text-subtitle font-medium dark:text-white'>Description</h3>
                            <p className='text-text dark:text-gray'>{product.desc}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 overflow-auto'>
                        <div className='flex justify-between items-center'>
                            <h2 className='m-0 font-semibold text-title dark:text-white'>{product.name}</h2>
                            <AiOutlineHeart className='text-[26px] cursor-pointer hover:text-primary dark:text-gray dark:hover:text-primary-light transition-all ease-out delay-50'/>
                        </div>
                        <p className='text-[32.5px] text-green font-semibold'>{product.price} MXN</p>
                    </div>
                </div>
            </div>
        </>
    )
}
