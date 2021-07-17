import React, {useState, createContext, useContext, useEffect} from "react";
import app from '../firebase/Firebase'
import Tile from "../components/Tile/Tile";

export const AuthContext = createContext({});

export function useAuthContext() {
    return useContext(AuthContext)
}

function AuthContextProvider({children}) {

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

    if (pageLoading) {
        return <>
            <div className="container"><Tile><h2>Loading</h2></Tile></div>
        </>
    }

    return (
        <AuthContext.Provider value={{
            email: email,
            setEmail: setEmail,
            password: password,
            setPassword: setPassword,
            user: user,
            setUser: setUser,
        }}>
            {!pageLoading && children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider