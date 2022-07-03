import React, {createContext, useState, useEffect} from 'react';
import { get } from '../../api';

export const globalContext = createContext();

export default function GlobalContext({children}) {

    //* User
    const [user, setUser] = useState({
        user:{},
        logged:false
    });
    const [addresses, setAddresses] = useState([]);
    const [cards, setCards] = useState([]);
    const [shoppingAddress, setShoppingAddress] = useState({
        directionAdded: false
    });
    //* Orders
    const [orders, setOrders] = useState([]);
    //* Shopping cart
    const [shoppingCart, setShoppingCart] = useState([]);
    //const [state, dispatch] = cartReducer(cartReducer, initialState);
    //* Wishlist
    const [wishlist, setWishlist] = useState([]);
    //* Products
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState(products);
    const [history, setHistory] = useState([]);
    //* Buy Product
    const [buyNowQuantity, setBuyNowQuantity] = useState(1);
    const [buyDetails, setBuyDetails] = useState({
        products: [],
        shipping: '',
        payment: {},
        total: 0
    });

    useEffect( () => {
        if (user.type === 'LOGIN') {
            get(`/api/products/62ba13090a98147777f380c2?limit=35`)
            .then(({data}) => {
                setProducts(data);
            })
            .catch(error => {
                console.log(error);
            });

            get(`/api/cart`)
            .then((data) => {
                setShoppingCart(data);
            })
            .catch(error => {
                console.log(error);
            });
        };
    }, [user]);

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
            productsFiltered,
            setProductsFiltered,
            cards,
            setCards,
            orders,
            setOrders,
            buyNowQuantity,
            setBuyNowQuantity,
            history,
            setHistory
        }}>
            {children}
        </globalContext.Provider>
    )
}