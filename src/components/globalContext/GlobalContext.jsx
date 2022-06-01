import React, {createContext, useState} from 'react';

export const globalContext = createContext();

export default function GlobalContext({children}) {

    //* States
    const [auth,setAuth] = useState({
        id:"",
        name:"",
        email:"",
        logged:false
    });

    return (
        <globalContext.Provider value={{
            auth,setAuth
        }}>
            {children}
        </globalContext.Provider>
    )
}