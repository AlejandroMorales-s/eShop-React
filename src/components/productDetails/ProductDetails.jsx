import React, {useContext, useState, useEffect} from 'react';
import ReactDocumentTitle from 'react-document-title';
import { Link, useParams } from 'react-router-dom';
import { globalContext } from '../../components/globalContext/GlobalContext';
//* Icons
import { AiOutlineHeart } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiTruck } from 'react-icons/fi';
import Modal from '../modals/Modal';

export default function ProductDetails() {
        //* Context
        const {products} = useContext(globalContext);
        const {wishlist, setWishlist} = useContext(globalContext);
        const {shoppingCart, setShoppingCart} = useContext(globalContext);
        const {buyNowQuantity, setBuyNowQuantity} = useContext(globalContext);
        const {history, setHistory} = useContext(globalContext);
        const [showingModal, setShowingModal] = useState(false);
        const [modalMessage, setModalMessage] = useState({
            title: "",
            message: ""
        });
        
        //* State
        const [inWishlist, setInWishlist] = useState(false);
        const [inShoppingCart, setInShoppingCart] = useState(false);
        
        const {idParams} = useParams();
        
        const product = products.filter(product => product._id === idParams);
        const {name, price, images, description, _id} = product[0];
    
        //* Add/Remove to wishlist
        const addToWishlist = () => {
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
                    description
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
        const addToCart = () => {
            if (shoppingCart.find(item => item._id === _id)) {
                setShoppingCart(shoppingCart.filter(item => item._id !== _id));
                setInShoppingCart(false);
                setShowingModal(true);
                setModalMessage({
                    title: `${name} removed from your shopping cart`,
                    isShowing: true,
                    message: "Item has been removed from your shopping cart successfully"
                });
            } else {
                setShoppingCart([...shoppingCart, {
                    _id,
                    name,
                    price,
                    images,
                    description,
                    quantity: buyNowQuantity
                }]);
                setInShoppingCart(true);
                setShowingModal(true);
                setModalMessage({
                    title: `${name} added to your shopping cart`,
                    isShowing: true,
                    message: "Item has been added to your shopping cart successfully"
                });
            };
        };
    
        console.log(product); 
        //* Add/Remove to history
        const addToHistory = () => {
            history.some(item => item._id === parseInt(idParams)) === false && setHistory([...history, {
                    _id,
                    name,
                    price,
                    images,
                    description
            }]);
        };
        
        useEffect(() => {
            addToHistory();
            setInWishlist(wishlist.find(item => item._id === parseInt(idParams)));
            setInShoppingCart(shoppingCart.find(item => item._id === parseInt(idParams)));
             // eslint-disable-next-line
        }, [inWishlist, idParams]);
    return (
        <>
            <ReactDocumentTitle title={name}/>
            <div className='w-95 max-w-130 mx-auto flex justify-center items-center my-5'>
                <div className='bg-white p-2 flex flex-col sm:grid sm:grid-cols-product w-full shadow-containersShadow rounded gap-2 dark:bg-darkBg'>
                    <div className='flex flex-col gap-1.5 overflow-auto'>
                        <div className='sm:h-[625px] h-[300px] rounded w-full overflow-hidden'>
                            <img src={images[0]} className=' w-full h-full object-cover' alt='Product '/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 overflow-auto'>
                        <div className='flex justify-between items-center'>
                            <h2 className='m-0 font-semibold text-title dark:text-white'>{name}</h2>
                            <AiOutlineHeart onClick={addToWishlist} className={`${inWishlist && 'text-primary'} text-[26px] cursor-pointer hover:text-primary dark:text-gray dark:hover:text-primary-light transition-all ease-out delay-50`}/>
                        </div>
                        <p className='text-[32.5px] font-semibold dark:text-gray'>${price} MXN</p>
                        <div className='flex flex-col gap-1'>
                            <div className='flex items-center gap-0.5'>
                                <TbTruckDelivery className='text-[20px] text-green'/>
                                <p className='text-green'>
                                    Arrives <span className='font-semibold'>tomorrow</span> <span className='text-boldText dark:text-gray'>for {price < 100 ? '$99 MXN' : 'FREE'}</span>
                                </p>
                            </div>
                            <div className='flex items-center gap-0.5'>
                                <FiTruck className='text-[17px] text-green'/>
                                <p className='text-green'>
                                    Arrives <span className='font-semibold'>the day after tomorrow</span> <span className='text-boldText dark:text-gray'>for {price < 100 ? '$99 MXN' : 'FREE'}</span>
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-0.5'>
                            <p className='text-bold font-medium dark:text-gray'>Quantity:</p>
                            <input className='border-2 rounded text-bold pl-0.5 w-[45px] border-gray dark:border-gray-grayDark' 
                            onInput={(e)=>{setBuyNowQuantity(e.target.value)}} type="number" min='1' max='50' defaultValue={buyNowQuantity} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Link to={`/${_id}/buy-product`}>
                                <button className={`shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light w-full`} type="submit">Buy now</button>
                            </Link>
                            <button onClick={addToCart} className='cursor-pointer bg-white rounded shadow-shadow border-2 border-primary dark:bg-darkBg dark:border-primary-light hover:bg-primary dark:hover:bg-primary-light transition-all ease-in-out delay-50 text-primary font-medium dark:text-primary-light p-1 text-center hover:text-white dark:hover:text-boldText delay-50 h-full w-full' type="submit">{inShoppingCart ? 'Remove from shopping cart' : 'Add to shopping cart'}</button>
                        </div>
                        <div>
                            <h3 className='text-subtitle font-medium dark:text-white'>Description</h3>
                            <p className='text-text dark:text-gray'>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
            {showingModal && <Modal type={'success'} title={modalMessage.title} desc={modalMessage.message} setShowingModal={setShowingModal}/>}
        </>
    )
}
