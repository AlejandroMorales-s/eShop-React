import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';
//* Icons
import { MdOutlineShoppingCart } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { useEffect } from 'react';
import { post } from '../../api';
import { del } from '../../api';

export default function ProductCard({setShowingModal, setModalMessage, product}) {
    const {name, price, images, desc, _id} = product;
    //* States
    const [inWishlist, setInWishlist] = useState(false);
    const [inShoppingCart, setInShoppingCart] = useState(false);
    
    //* Context
    const {wishlist, setWishlist} = useContext(globalContext);
    const {shoppingCart, setShoppingCart} = useContext(globalContext);

    const navigate = useNavigate();

    //* Img Lazy Load
    const lazyLoadingCallback = (entries)=>{
        for(let entry of entries){
            if(entry.isIntersecting){
                entry.target.src = entry.target.dataset.src
    
                lazyLoadingObserver.unobserve(entry.target)
            };
        };
    };

    let lazyLoadingObserver = new IntersectionObserver(lazyLoadingCallback,{
        rootMargin:"0px 0px 50px 0px",
    });
    
    const cardImage = document.getElementsByTagName("img");
    
    for(let image of cardImage){
        lazyLoadingObserver.observe(image);
    };

    //* Add/Remove to wishlist
    const addToWishlist = (e) => {
        e.stopPropagation();
        if (wishlist.find(item => item._id === _id)) {
            setWishlist(wishlist.filter(item => item._id !== _id));
            setInWishlist(false);
            setShowingModal(true);
            setModalMessage({
                title: `${name} removed from your wishlist`,
                isShowing: true,
                message: "Item has been removed from your wishlist successfully"
            });
        } else {
            setWishlist([...wishlist, {
                _id,
                name,
                price,
                images,
                desc
            }]);
            setInWishlist(true);
            setShowingModal(true);
            setModalMessage({
                title: `${name} added to your wishlist`,
                isShowing: true,
                message: "Item has been added to your wishlist"
            });
        };
    };

    //* Add/Remove to cart
    const addToCart = (e) => {
        e.stopPropagation();
        if (shoppingCart.some(item => item._id === _id)) {
            del('/api/cart/remove', {
                idProduct: _id,
            }).then(res => {
                setShoppingCart(res)
            }).catch(error => {
                console.log(error);
            });

            setInShoppingCart(false);
            setShowingModal(true);
            setModalMessage({
                title: `${name} removed from your shopping cart`,
                isShowing: true,
                message: "Item has been removed from your shopping cart successfully"
            });
        } else {

            post('/api/cart/add', {
                idProduct: _id,
                amount: 1
            }).then(res => {
                setShoppingCart(res)
            }).catch(error => {
                console.log(error);
            });

            setInShoppingCart(true);
            setShowingModal(true);
            setModalMessage({
                title: `${name} added to your shopping cart`,
                isShowing: true,
                message: "Item has been added to your shopping cart successfully"
            });
        };
    };
    
    //* Buy now
    const buyProduct = (e) => {
        e.stopPropagation();
        navigate(`/${_id}/buy-product`);
    };

    //* Product details
    const productDetailsShow = () => {
        navigate(`/product-details/${_id}`);
    };
    
    useEffect(() => {
        setInWishlist(wishlist.find(item => item._id === _id));
        if (shoppingCart !== undefined) {
            setInShoppingCart(shoppingCart.find(item => item._id === _id));
        }
    }, [inWishlist, inShoppingCart, wishlist, shoppingCart, _id]);
    

    return (
        <>
            <div onClick={productDetailsShow} className='bg-white relative p-1 rounded shadow-containersShadow z-10 cursor-pointer flex flex-col gap-0.5 border-2 border-gray dark:border-gray-grayDark hover:border-primary dark:hover:border-primary-light  dark:bg-darkBg hover:-translate-y-0.5 transition-all ease-in-out delay-50'>
                <div className='h-[250px] overflow-hidden rounded'>
                    <img className='w-100 object-cover h-100' 
                        src='https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'  
                        data-src={images[0]} alt={name}
                    />
                </div>
                <h3 className='text-bold text-boldText dark:text-white font-semibold'>{name}</h3>
                <p className='text-bold text-green font-semibold'>${price} MXN</p>
                <p className='text-text dark:text-gray line-clamp-2'>{desc}</p>
                <div className='absolute w-full h-full top-0 left-0 rounded pt-1.5 px-1.5 opacity-0 hover:opacity-100 transition-all ease-in-out delay-50'>
                    <div className='flex gap-1 justify-center'>
                        <button onClick={buyProduct}
                        className='px-1 py-0.5 bg-primary dark:bg-primary-light rounded border-2 border-primary dark:border-primary-light hover:bg-primary-light hover:border-primary-light hover:text-boldText font-medium text-white dark:text-boldText transition-all ease-in-out delay-50'>
                            Buy now
                        </button>
                        <button onClick={addToCart} className='p-1 border-2 border-white hover:border-primary dark:hover:border-primary-light rounded-full bg-white dark:bg-darkBg dark:border-gray-grayDark shadow-containersShadow'>
                            <MdOutlineShoppingCart className={`${inShoppingCart && 'text-primary dark:text-primary-light'} hover:text-primary dark:hover:text-primary-light dark:text-gray text-[20px]`}/>
                        </button>
                        <button onClick={addToWishlist} className='p-1 border-2 border-white hover:border-primary dark:hover:border-primary-light rounded-full bg-white dark:bg-darkBg dark:border-gray-grayDark shadow-containersShadow'>
                            <AiOutlineHeart className={`${inWishlist && 'text-primary dark:text-primary-light'} hover:text-primary dark:hover:text-primary-light dark:text-gray text-[20px]`}/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}