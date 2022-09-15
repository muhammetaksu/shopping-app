import { createContext, useState } from "react";

export const LoginContext = createContext(null);



export const LoginProvider = ({children}) => {

    const [auth, setAuth] = useState({});


    const values = {
        auth,
        setAuth
    }


    return <LoginContext.Provider value={values}>{children}</LoginContext.Provider>

}