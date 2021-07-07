import React, {useState, createContext, useContext} from "react";

export const stravaActivityContext = createContext({});

export function useStravaActivityContext() {
    return useContext(stravaActivityContext)
}



function StravaActivityContextProvider({children}) {


    const [stravaData, setStravaData] = useState([])
    const [stravaUserProfile, setStravaUserProfile] = useState([])
    const [loading, toggleLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState("")
    const [clientId, setClientID] = useState()


    return (
        <stravaActivityContext.Provider value={{
            stravaData:stravaData,
            setStravaData: setStravaData,
            loading: loading,
            toggleLoading: toggleLoading,
            error: error,
            setError: setError,
            stravaUserProfile: stravaUserProfile,
            setStravaUserProfile: setStravaUserProfile,
            clientSecret:clientSecret,
            setClientSecret:setClientSecret,
            clientId:clientId,
            setClientID:setClientID
        }}
        >
            {children}
        </stravaActivityContext.Provider>
    )
}

export default StravaActivityContextProvider;