import React, {createContext, useState} from 'react';

export const globalContext = createContext();

export default function GlobalContext({children}) {

    //* States
    const [user, setUser] = useState({
        user:{},
        logged:false
    });
    const [addresses, setAddresses] = useState([]);
    const [shoppingAddress, setShoppingAddress] = useState({
        direccionAdded: false
    });
    const [wishlist, setWishlist] = useState([]);

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
            setWishlist
        }}>
            {children}
        </globalContext.Provider>
    )
}