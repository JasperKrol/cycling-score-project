import React, { useState, createContext, useContext } from "react";

export const authContext = createContext({});

export function useAuthContext() {
    return useContext(authContext)
}

function AuthContextProvider ( { children }) {

    // voor develop purpose even op true moet !isAuthenticated true zijn
    const [isAuthenticated, toggleIsAuthenticated] = useState(true)

    return (
        <authContext.Provider value={{
            isAuthenticated:isAuthenticated,
            toggleIsAuthenticated:toggleIsAuthenticated,
        }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;
//