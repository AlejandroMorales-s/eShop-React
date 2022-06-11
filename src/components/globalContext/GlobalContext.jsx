import React, {createContext, useState} from 'react';

export const globalContext = createContext();
const prod = [
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

const card = [
    {
        id: 1,
        name: 'Alejandro',
        number: '4242 4242 4242 1234',
        expiry: '12/20',
        cvv: '123',
        type: 'Visa',
        default: true,
        paymentMethod: 'credit'
    },
    {
        id: 2,
        name: 'Alejandro',
        number: '4242 4242 4242 4382',
        expiry: '12/26',
        cvv: '123',
        type: 'Mastercard',
        default: true,
        paymentMethod: 'debit'
    },
]

export default function GlobalContext({children}) {

    //* States
    const [user, setUser] = useState({
        user:{},
        logged:false
    });
    const [addresses, setAddresses] = useState([]);
    const [cards, setCards] = useState(card);
    const [shoppingAddress, setShoppingAddress] = useState({
        direccionAdded: false
    });
    const [wishlist, setWishlist] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [buyDetails, setBuyDetails] = useState({
        products: [],
        shipping: {},
        payment: {},
        total: 0
    });
    const [products, setProducts] = useState(prod);

    return (
        <globalContext.Provider value={{
            user:user.user,
            logged:user.logged,
            setUser,
            addresses,
            setAddresses,
            shoppingAddress,
            setShoppingAddress,
            wishlist,
            setWishlist,
            shoppingCart,
            setShoppingCart,
            buyDetails,
            setBuyDetails,
            products,
            setProducts,
            cards,
            setCards
        }}>
            {children}
        </globalContext.Provider>
    )
}