import React, {useState, createContext, useContext, useEffect} from "react";
import app from '../../src/Firebase'
import { auth } from "../Firebase"

export const authContext = createContext({});

export function useAuthContext() {
    return useContext(authContext)
}

export function AuthContextProvider({children}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = app.auth().onAuthStateChanged(user => {
            setUser(user);
            setPageLoading(false);
        })
        return unsubscribe;
    }, []);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    return (
        <authContext.Provider value={{
            email:email,
            setEmail:setEmail,
            password:password,
            setPassword:setPassword,
            user:user,
            setUser:setUser,
            pageLoading:pageLoading,
            setPageLoading:setPageLoading,
            signup,
            login,
            logout
        }}>
            {!pageLoading && children}
        </authContext.Provider>
    )
}