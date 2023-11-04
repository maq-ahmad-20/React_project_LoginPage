import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password, college) => { }
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLogedIn] = useState(false);
    useEffect(() => {
        const storedUserLoginInfo = localStorage.getItem('isLoggedIn')
        if (storedUserLoginInfo) {
            setIsLogedIn(true);
        }

    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLogedIn(false);
    }
    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLogedIn(true);
    }

    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;