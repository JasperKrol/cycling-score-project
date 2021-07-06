import React, {useState, createContext, useContext, useEffect} from "react";
import {auth} from "../Firebase"

export const authContext = createContext({});

export function useAuthContext() {
    return useContext(authContext)
}

function AuthContextProvider({children}) {

    // voor develop purpose even op true moet !isAuthenticated true zijn
    const [currentUser, setCurrentUser] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState()

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])


    return (
        <authContext.Provider value={{
            currentUser: currentUser,
            setCurrentUser: setCurrentUser,
            email:email,
            setEmail:setEmail,
            password:password,
            setPassword:setPassword,
            user:user,
            setUser:setUser,
            signUp
        }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;