import React, {useState, createContext, useContext} from "react";

export const StravaActivityContext = createContext({});


export function useStravaActivityContext() {
    return useContext(StravaActivityContext)
}

function StravaActivityContextProvider({children}) {



    const [stravaData, setStravaData] = useState([])
    const [stravaUserProfile, setStravaUserProfile] = useState([])
    const [loading, toggleLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState("")
    const [clientId, setClientID] = useState();



    return (
        <StravaActivityContext.Provider value={{
            stravaData: stravaData,
            setStravaData: setStravaData,
            loading: loading,
            toggleLoading: toggleLoading,
            error: error,
            setError: setError,
            stravaUserProfile: stravaUserProfile,
            setStravaUserProfile: setStravaUserProfile,
            clientSecret: clientSecret,
            setClientSecret: setClientSecret,
            clientId: clientId,
            setClientID: setClientID,
        }}
        >
            {children}
        </StravaActivityContext.Provider>
    )
}

export default StravaActivityContextProvider;