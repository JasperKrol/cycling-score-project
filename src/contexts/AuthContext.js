import React, { useState, createContext } from "react";

export const AuthContext = createContext({});

function AuthContextProvider ( { children }) {

    // voor develop purpose even op true moet !isAuthenticated true zijn
    const [isAuthenticated, toggleIsAuthenticated] = useState(true)

    return (
        <AuthContext.Provider value={{
            isAuthenticated:isAuthenticated,
            toggleIsAuthenticated:toggleIsAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
