import React, {createContext, useState} from 'react';

export const globalContext = createContext();

export default function GlobalContext({children}) {

    //* States
    const [user,setUser] = useState({
        id:"",
        name:"",
        email:"",
        logged:false
    });

    return (
        <globalContext.Provider value={{
            user,setUser
        }}>
            {children}
        </globalContext.Provider>
    )
}