import React, {createContext, useState} from 'react';

export const globalContext = createContext();

export default function GlobalContext({children}) {

    //* States
    const [user, setUser] = useState({
        user:{},
        logged:false
    });
    const [direction, setDirection] = useState({
        directionAdded:false,
        country: "",
        name: "",
        streetAndNumber: "",
        postalCode: "",
        phoneNumber: "",
        instructions: "",
    });

    return (
        <globalContext.Provider value={{
            user:user.user,
            logged:user.logged,
            setUser,
            direction,
            directionAdded: direction.directionAdded,
            country:direction.country,
            name:direction.name,
            streetAndNumber:direction.streetAndNumber,
            postalCode:direction.postalCode,
            phoneNumber:direction.phoneNumber,
            instructions:direction.instructions,
            setDirection,
        }}>
            {children}
        </globalContext.Provider>
    )
}