import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../libs/firebase';
import { globalContext } from '../globalContext/GlobalContext';

export default function OrderCard({item, setShowingModal, setModalMessage}) {
    const {user} = useContext(globalContext) 
    const {shoppingCart} = useContext(globalContext)
    let {name, price, amount, images} = item.data;

    const modifyAmount = (e) => {
        const docRef = doc(database, "users", user.id);
        getDoc(docRef)
        .then(res => {
            const shoppingCart = res.get('shoppingCart');

            const product = shoppingCart.find(prod => prod.id === item.id);
            product.data.amount = Number(e.target.value);

            const shoppingCartFiltered = shoppingCart.filter(prod => prod.id !== item.id);
            shoppingCartFiltered.push(product);

            setDoc(docRef, {shoppingCart:shoppingCartFiltered}, {merge: true})
        })
        .catch(error => console.log(error))
    };

    const removeFromCart = () => {
        const docRef = doc(database, "users", user.id)
        getDoc(docRef)
        .then(res => {
            const cartFilter = shoppingCart.filter(product => product.id !== item.id);
            setDoc(docRef, {shoppingCart: cartFilter}, {merge:true});
            setShowingModal(true)
            setModalMessage({
                title: "Removed from shopping cart",
                message: `${name} removed from shopping cart successfully`
            })
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='h-[150px] border-2 p-2 flex gap-2 border-gray rounded dark:border-gray-grayDark dark:bg-darkBg'>
            <div className='overflow-hidden w-[12.5%] rounded'>
                <img src={images[0]} alt={name} className='w-full h-full object-cover'/>
            </div>
            <div className='w-[57.5%] h-full flex flex-col justify-evenly'>
                <h2 className='font-semibold text-title dark:text-gray'>{name}</h2>
                <div className='flex gap-2'>
                    <p onClick={() => removeFromCart()} className='text-bold font-medium text-red cursor-pointer'>Delete</p>
                    <Link to={`/${item.id}/buy-product`}>
                        <p className='text-bold font-medium text-primary'>Buy now</p>
                    </Link>
                </div>
            </div>
            <div className='w-[15%] gap-1 flex justify-center items-center'>
                <input 
                    className='border-2 rounded pl-0.5 w-[40px] border-gray dark:border-gray-grayDark text-[20px] dark:bg-darkBg dark:text-gray' 
                    type="number" min='1' max='50' 
                    onClick={(e) => modifyAmount(e)} 
                    onInput={(e) => amount = e.target.value} 
                    defaultValue={amount}
                />
            </div>
            <div className='w-[15%] flex items-center justify-center'>
                <p className='text-bold font-medium dark:text-gray'>${price * amount} MXN</p>
            </div>
        </div>
    )
}