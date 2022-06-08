import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';
//* Icons
import { MdOutlineShoppingCart } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';

export default function ProductCard({name, price, image, desc, id}) {
    const {wishlist, setWishlist} = useContext(globalContext);

    const navigate = useNavigate();

    const addToWishlist = (e) => {
        e.stopPropagation();
        if (wishlist.find(item => item === id)) {
            setWishlist(wishlist.filter(item => item !== id));
        } else {
            setWishlist([...wishlist, id]);
        };
    };
    
    const product = () => {
        navigate(`/product-details/${id}`);
    };

    return (
        <>
            <div onClick={product} className='bg-white relative p-1 rounded shadow-containersShadow z-10 cursor-pointer flex flex-col gap-0.5 border-2 border-gray dark:border-gray-grayDark hover:border-primary dark:hover:border-primary-ligth  dark:bg-darkBg hover:-translate-y-0.5 transition-all ease-in-out delay-50'>
                <div className='h-[250px] overflow-hidden rounded'>
                    <img className='w-100 object-cover h-100' src={image} alt={name}/>
                </div>
                <h3 className='text-bold text-boldText dark:text-white font-semibold'>{name}</h3>
                <p className='text-bold text-green font-semibold'>{price} MXN</p>
                <p className='text-text dark:text-gray line-clamp-2'>{desc}</p>
                <div className='absolute w-full h-full top-0 left-0 rounded pt-1.5 px-1.5 opacity-0 hover:opacity-100 transition-all ease-in-out delay-50'>
                    <div className='flex gap-1 justify-center'>
                        <button 
                        className='px-1 py-0.5 bg-primary dark:bg-primary-ligth rounded border-2 border-primary dark:border-primary-ligth hover:bg-primary-ligth hover:border-primary-ligth hover:text-boldText font-medium text-white dark:text-boldText transition-all ease-in-out delay-50'>
                            Buy now
                        </button>
                        <button className='p-1 border-2 border-white hover:border-primary dark:hover:border-primary-ligth rounded-full bg-white dark:bg-darkBg dark:border-gray-grayDark shadow-containersShadow'>
                            <MdOutlineShoppingCart className='hover:text-primary dark:hover:text-primary-ligth dark:text-gray text-[20px]'/>
                        </button>
                        <button onClick={addToWishlist} className='p-1 border-2 border-white hover:border-primary dark:hover:border-primary-ligth rounded-full bg-white dark:bg-darkBg dark:border-gray-grayDark shadow-containersShadow'>
                            <AiOutlineHeart className='hover:text-primary dark:hover:text-primary-ligth dark:text-gray text-[20px]'/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}